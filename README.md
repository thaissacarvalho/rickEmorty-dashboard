# Rick & Morty Dashboard SPA

Este projeto é uma Single Page Application (SPA) desenvolvida com Angular 19, que consome a [API Rick and Morty](https://rickandmortyapi.com/) para exibir informações sobre personagens e episódios da série. O objetivo principal é criar um dashboard funcional e seguir boas práticas de desenvolvimento e documentação.

---

## 🔗 Funcionalidades Principais

### 🧙‍♂️ Listagem de Personagens
- Exibe uma lista de personagens com paginação (scroll infinito).
- Permite a busca global por nomes de personagens.
- Redireciona para uma página de detalhes ao selecionar um personagem.

### 📺 Listagem de Episódios
- Exibe uma lista de episódios com paginação (scroll infinito).
- Permite a busca global por títulos de episódios.
- Redireciona para uma página de detalhes ao selecionar um episódio.

### 🔍 Barra de Busca Global
- Funciona em todas as listagens (personagens e episódios).
- Mantém o termo de busca ativo ao navegar entre listagens.
- As listagens já carregam filtradas com base no termo de busca.

### 🔒 Sistema de Login
- Tela de login com autenticação simulada (mock).
- Página de perfil do usuário logado.
- Menu com o nome do usuário e opção para logout.

---

## 📁 Arquitetura e Rotas

O projeto foi estruturado com as seguintes rotas e funcionalidades:

| **Rota**              | **Componente**               | **Descrição**                          | **Protegida (AuthGuard)** |
|------------------------|------------------------------|----------------------------------------|---------------------------|
| `/login`              | `LoginComponent`            | Tela de login                          | ❌                         |
| `/profile`            | `ProfileComponent`          | Página de perfil do usuário logado     | ✅                         |
| `/dashboard`          | `DashboardComponent`        | Página inicial do dashboard            | ✅                         |
| `/characters`         | `CharactersComponent`       | Lista de personagens                   | ✅                         |
| `/characters/:id`     | `CharacterDetailsComponent` | Detalhes de um personagem específico   | ✅                         |
| `/episodes`           | `EpisodesComponent`         | Lista de episódios                     | ✅                         |
| `/episodes/:id`       | `EpisodeDetailsComponent`   | Detalhes de um episódio específico     | ✅                         |
| `/`                   | Redireciona para `/login`   | Rota padrão                            | ❌                         |

---

## 🛠️ Tecnologias Utilizadas

### **Frameworks e Ferramentas**
- **Angular 19**: Framework principal para o desenvolvimento da aplicação.
- **TypeScript**: Garantiu tipagem estática e segurança no código.
- **SCSS**: Estilização modular e estruturada.
- **Tailwind CSS**: Estilização utilitária para rápida prototipagem e consistência visual.

### **APIs e Integrações**
- **Rick and Morty API (REST)**: Fonte de dados para personagens e episódios.

### **Funcionalidades Complementares**
- **AuthGuard**: Proteção de rotas para páginas que requerem autenticação.
- **Mock Authentication**: Sistema simulado para login e logout.

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório**
   ```bash
   git clone <link-do-repositorio>
   cd <nome-do-projeto>

2. **Instale as dependências**: Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados em sua máquina. Depois, instale as dependências do projeto:

   ```bash
   npm install
   
3. **Inicie o servidor de desenvolvimento**: Para rodar o projeto localmente, utilize o seguinte comando para iniciar o servidor de desenvolvimento do Angular:

    ```bash
    ng serve


4. **Acesse a aplicação**: No navegador, abra `http://localhost:4200`. Você será redirecionado para a tela de login, onde pode usar as credenciais de mock para autenticação.

    - **Usuário**: `Rick` | **Senha**: `rick`
    - **Usuário**: `Morty` | **Senha**: `morty`

5. **Testando as funcionalidades**: Após o login, você será direcionado ao dashboard e poderá navegar pelas listagens de personagens e episódios.
    - Utilize a **barra de busca** para filtrar as listagens por nome de personagem ou título de episódio.
    - Ao clicar em um **personagem** ou **episódio**, você será redirecionado para a página de **detalhes**.
    - Acesse o **menu de perfil** para visualizar as informações do usuário logado.
    - Faça o **logout** utilizando a opção disponível no menu de perfil.
    
📂 Estrutura de Diretórios
--------------------------

```bash
    src/
    ├── app/
    │   ├── core/
    │   │   ├── guards/            # Guardas de autenticação (AuthGuard)
    │   │   ├── models/            # Modelos e interfaces TypeScript
    │   │   └── services/          # Serviços para integração com a API e autenticação
    │   ├── features/
    │   │   ├── characters/        # Funcionalidade de personagens
    │   │   │   └── character-details/  # Detalhes de um personagem
    │   │   ├── dashboard/         # Dashboard principal
    │   │   ├── episodes/          # Funcionalidade de episódios
    │   │   │   └── episodes-details/ # Detalhes de um episódio
    │   │   └── auth/              # Funcionalidade de autenticação
    │   │       ├── login/         # Tela de login
    │   │       └── profile/       # Página de perfil
    │   ├── share/
    │   │   └── components/        # Componentes reutilizáveis
    │   │       ├── header/        # Cabeçalho fixo
    │   │       └── sidebar/       # Menu lateral fixo
    │   ├── app.component.html     # Componente raiz do HTML
    │   ├── app.component.scss     # Estilos globais SCSS
    │   ├── app.component.ts       # Lógica do componente raiz
    │   ├── app.config.ts          # Configurações do projeto
    │   └── app.routes.ts          # Definição das rotas da aplicação
    └── environments/
        └── environment.ts         # Configurações de desenvolvimento
```

## 📝 Como Contribuir

1. **Faça um Fork do Repositório**
   - No canto superior direito da página do repositório, clique em **Fork** para criar uma cópia do repositório no seu perfil.

2. **Clone o Repositório para sua Máquina Local**
   - Clone o repositório utilizando o comando:
     ```bash
     git clone <URL-do-repositório>
     ```
   - Acesse o diretório do projeto:
     ```bash
     cd <nome-do-projeto>
     ```

3. **Crie uma Nova Branch**
   - Crie uma branch para trabalhar nas suas alterações:
     ```bash
     git checkout -b nome-da-sua-branch
     ```

4. **Faça as Alterações**
   - Implemente as modificações ou correções necessárias no código.

5. **Commit suas Alterações**
   - Faça commit das suas alterações com uma mensagem clara e concisa:
     ```bash
     git add .
     git commit -m "Descrição clara do que foi alterado"
     ```

6. **Push para o Repositório**
   - Envie suas alterações para o seu repositório fork:
     ```bash
     git push origin nome-da-sua-branch
     ```

7. **Abra um Pull Request**
   - No repositório original, clique em **New Pull Request** para abrir um Pull Request das suas alterações.
   - Descreva as alterações feitas e por que elas são necessárias.

8. **Aguarde a Revisão**
   - A equipe do projeto revisará seu Pull Request. Se necessário, poderá ser solicitado que faça ajustes.

9. **Finalização**
   - Quando o Pull Request for aprovado, ele será mesclado ao repositório principal.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para modificar, usar e distribuir o código conforme necessário.

---

## 🚨 Observações Finais

- A aplicação faz uso da **API Rick & Morty (REST)**, fornecendo informações atualizadas sobre personagens e episódios.
- Algumas funcionalidades como o login são simuladas para facilitar o desenvolvimento e os testes.
- A interface foi desenvolvida para ser simples, mas eficaz, com foco na usabilidade e na experiência do usuário.
- Certifique-se de ter uma boa conexão com a internet, pois a aplicação consome dados da API em tempo real.

---

**Desenvolvedores:**

- Thaissa Carvalho dos Santos - Criador do Projeto
