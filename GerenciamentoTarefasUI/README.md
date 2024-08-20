# GerenciamentoTarefasUI

## Visão Geral

O `GerenciamentoTarefasUI` é o frontend da aplicação de gerenciamento de tarefas, desenvolvido em Angular. Este projeto fornece a interface de usuário (UI) para interação com a API backend (`GerenciamentoTarefasAPI`). A interface permite que os usuários façam login, visualizem, criem, editem e excluam tarefas. Além disso, a aplicação organiza as tarefas por status (pendente, em progresso, concluída, cancelada).

## Tecnologias Utilizadas

- **Angular 15**: Framework principal utilizado para a construção do frontend.
- **TypeScript**: Linguagem utilizada para escrever a lógica do aplicativo.
- **HTML5 e CSS3**: Tecnologias utilizadas para estruturação e estilização das páginas.
- **Bootstrap**: Framework CSS para criação de layouts responsivos e componentes de interface.
- **Angular Material**: Biblioteca de componentes visuais para Angular.
- **RxJS**: Biblioteca para manipulação de operações assíncronas com programação reativa.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.

## Estrutura do Projeto

- **src/app**: Diretório principal onde está localizada a aplicação Angular.
  - **components**: Contém os componentes reutilizáveis da UI.
    - `login`: Componente para a tela de login.
    - `task-list`: Componente que exibe a lista de tarefas.
    - `task-detail`: Componente para exibir e editar os detalhes de uma tarefa.
    - `task-create`: Componente para criar uma nova tarefa.
  - **services**: Contém os serviços que fornecem dados e lógica de negócio para os componentes.
    - `auth.service.ts`: Serviço para autenticação e gerenciamento de tokens JWT.
    - `task.service.ts`: Serviço para gerenciar operações relacionadas a tarefas, como criação, edição, exclusão e consulta.
  - **guards**: Contém os guards que controlam o acesso a determinadas rotas.
    - `auth.guard.ts`: Garante que apenas usuários autenticados possam acessar certas rotas.
  - **models**: Contém os modelos de dados utilizados pela aplicação.
    - `task.model.ts`: Modelo que representa uma tarefa.
    - `user.model.ts`: Modelo que representa um usuário.

## Configuração do Ambiente

### 1. **Clonar o Repositório**

```bash
git clone https://github.com/seu-usuario/GerenciamentoTarefasUI.git
cd GerenciamentoTarefasUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
2. Instalar Dependências
Use o npm para instalar as dependências do projeto:
npm install

3. Configurar o Ambiente
Atualize os arquivos de ambiente (environment.ts) com as URLs corretas para a API backend e as chaves de configuração necessárias.

4. Executar o Projeto
Inicie o servidor de desenvolvimento Angular:
ng serve

A aplicação estará disponível em http://localhost:4200.

5. Build para Produção
Para construir o projeto para produção, use o comando:
ng build --prod

Os arquivos de build estarão na pasta dist/.

Funcionalidades Principais
Login e Autenticação: Permite que os usuários façam login utilizando suas credenciais e recebam um token JWT.
Gerenciamento de Tarefas: Criação, visualização, edição e exclusão de tarefas.
Filtragem por Status: Exibe as tarefas de acordo com seu status (pendente, em progresso, concluída, cancelada).
Proteção de Rotas: Utiliza guards para garantir que apenas usuários autenticados possam acessar certas páginas.
Estrutura de Diretórios
app/components: Contém todos os componentes reutilizáveis da aplicação.
app/services: Serviços Angular que encapsulam lógica de negócios e comunicação com a API.
app/guards: Guards para proteger rotas e verificar autenticação.
app/models: Modelos de dados usados em toda a aplicação.
Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Envie para o repositório remoto (git push origin feature/nova-feature).
Abra um Pull Request.
Licença
Este projeto é licenciado sob a Licença MIT - veja o arquivo LICENSE.md para mais detalhes.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
