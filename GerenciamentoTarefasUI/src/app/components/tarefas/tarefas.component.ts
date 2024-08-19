import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefasService } from '../../services/tarefas.service';

interface Tarefa {
  id: number;
  descricao: string;
  status: string;
  dataVencimento: string;
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaSelecionada: Tarefa = { id: 0, descricao: '', status: '', dataVencimento: '' };

  constructor(
    private tarefasService: TarefasService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefasService.getTarefas().subscribe(
        (data: Tarefa[]) => {
          this.tarefas = data;
        },
        (error) => {
          console.error('Erro ao obter tarefas:', error);
        }
      );
    }
  }

  abrirModalEditar(tarefa: Tarefa): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefaSelecionada = { ...tarefa };
      const modalElement = document.getElementById('editarTarefaModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  salvarEdicao(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tarefasService.atualizarTarefa(this.tarefaSelecionada).subscribe(
        (response) => {
          console.log('Tarefa editada:', response);
          const index = this.tarefas.findIndex(t => t.id === response.id);
          if (index !== -1) {
            this.tarefas[index] = response;
          }
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
      this.tarefasService.excluirTarefa(tarefa.id).subscribe(
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
