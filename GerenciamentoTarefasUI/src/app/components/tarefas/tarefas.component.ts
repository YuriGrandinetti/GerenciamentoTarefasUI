import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefasService } from '../../services/tarefas.service';

interface Tarefa {
  id?: number;
  descricao: string;
  status: string;
  dataVencimento: string;
  usuarioid: number;
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaSelecionada: Tarefa = { id: 0, descricao: '', status: '', dataVencimento: '', usuarioid: 0 };

  // Propriedades para pesquisa
  pesquisaDescricao: string = '';
  pesquisaStatus: string = '';
  pesquisaData: string = '';

  showModal: boolean = false;
  novaTarefaDescricao: string = '';
  novaTarefaDataVencimento: string = '';

  constructor(
    private tarefasService: TarefasService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarTarefas();
    }
  }

  carregarTarefas() {
    this.tarefasService.getTarefas().subscribe(
      (data: Tarefa[]) => (this.tarefas = data),
      (error) => console.error('Erro ao obter tarefas do usuário logado:', error)
    );
  }

  pesquisarTarefas() {
    this.tarefasService.pesquisarTarefas(this.pesquisaDescricao, this.pesquisaStatus, this.pesquisaData).subscribe(
      (data: Tarefa[]) => {
        this.tarefas = data;
      },
      (error) => {
        console.error('Erro ao pesquisar tarefas:', error);
      }
    );
  }

  cadastrarTarefa() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      // Decodifica o payload do token JWT
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      const userId = decodedToken.sub;  // Supondo que "sub" contém o ID do usuário

      if (!userId) {
        console.error('ID do usuário não encontrado');
        return;
      }

      const novaTarefa: Tarefa = {
        descricao: this.novaTarefaDescricao,
        dataVencimento: this.novaTarefaDataVencimento,
        status: 'Pendente',
        usuarioid: parseInt(userId, 10)  // Converte o ID para número se necessário
      };

      this.tarefasService.criarTarefa(novaTarefa).subscribe(
        (response: Tarefa) => {
          console.log('Nova tarefa cadastrada:', response);
          this.tarefas.push(response);

          this.closeModal();
          this.novaTarefaDescricao = '';
          this.novaTarefaDataVencimento = '';
        },
        (error: any) => {
          console.error('Erro ao cadastrar tarefa:', error);
        }
      );

    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  abrirModalEditar(tarefa: Tarefa): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefasService.obterTarefaPorId(tarefa.id!).subscribe(
        (tarefa: Tarefa) => {
          const data = new Date(tarefa.dataVencimento);
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const ano = data.getFullYear();
          tarefa.dataVencimento = `${ano}-${mes}-${dia}`;
          this.tarefaSelecionada = tarefa;

          const modalElement = document.getElementById('editarTarefaModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
          }
        },
        (error) => {
          console.error('Erro ao obter tarefa:', error);
        }
      );
    }
  }

  salvarEdicao(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefasService.atualizarTarefa(this.tarefaSelecionada).subscribe(
        (response) => {
          console.log('Tarefa editada:', response);

          // Recarrega as tarefas do usuário logado
          this.carregarTarefas();

          // Fecha o modal
          const modalElement = document.getElementById('editarTarefaModal');
          if (modalElement) {
            const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        },
        (error) => {
          console.error('Erro ao editar tarefa:', error);
        }
      );
    }
  }

  excluirTarefa(tarefa: Tarefa): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefasService.excluirTarefa(tarefa.id!).subscribe(
        () => {
          console.log('Tarefa excluída:', tarefa);
          this.tarefas = this.tarefas.filter(t => t.id !== tarefa.id);
        },
        (error) => {
          console.error('Erro ao excluir tarefa:', error);
        }
      );
    }
  }
}
