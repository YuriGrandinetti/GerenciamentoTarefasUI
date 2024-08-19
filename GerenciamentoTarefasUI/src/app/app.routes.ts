import { Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { TarefasComponent } from './components/tarefas/tarefas.component'; // Importa o TarefasComponent

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CadastroUsuarioComponent },
  { path: 'dashboard', component: TarefasComponent }, // Adiciona a rota para a tela de tarefas
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
