# 📚 Minha Biblioteca

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=firebase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

> **Disciplina:** CCP150 — Desenvolvimento de Aplicativos Móveis  
> **Instituição:** Centro Universitário FEI  
> **Professor:** Vinicius Peruzzi  
> **Autor:** Gabriel Vieira Leite da Silva — RA: `22.125.036-8`

---

## 📌 1. Visão Geral e Requisitos

O **Minha Biblioteca** é um aplicativo multiplataforma (iOS, Android e Web) desenvolvido em React Native com Expo para gerenciamento de acervo pessoal de livros e anotações de leitura.

### Motivação e Objetivo
Leitores frequentemente perdem o controle dos livros que possuem ou deixam citações e reflexões espalhadas em blocos de notas genéricos. O objetivo do projeto é oferecer um espaço calmo, visualmente organizado e centralizado — inspirado em plataformas como Kindle e Skoob — onde o usuário pode catalogar sua coleção, registrar ideias vinculadas a cada obra e acompanhar suas métricas de leitura em tempo real.

### Atendimento aos Requisitos do Projeto

| Requisito | Implementação no Projeto | Status |
| :--- | :--- | :---: |
| **Mínimo de 6 telas distintas** | 7 telas distintas (`Home`, `Biblioteca`, `AddLivro`, `DetalhesLivro`, `Anota`, `ListaAnotacoes`, `Perfil`), sem contar telas de login/cadastro | ✅ |
| **Navegação (React Navigation)** | Navegação híbrida combinando **Bottom Tabs** (barra flutuante em *Glassmorphism*) e **Stack Navigation** | ✅ |
| **Uso de Imagens** | Capas dos livros cadastrados, foto personalizável no perfil do leitor e ícone/favicon do app | ✅ |
| **Interface e UX** | Prototipado no Figma com paleta pastel, alinhamento consistente, espaçamento adequado e feedback visual/tátil | ✅ |
| **Banco de Dados (CRUD Completo)** | Persistência em nuvem em tempo real utilizando **Firebase Firestore** (Create, Read, Update e Delete) | ✅ |
| **Sensor ou Atuador** | Atuador de **Vibração (`Vibration`)** acionado ao salvar um novo livro na biblioteca para feedback tátil | ✅ |

---

## 🛠️ 2. Tecnologias Utilizadas

* **React Native & Expo:** Base para desenvolvimento multiplataforma (Android, iOS e Web) com compilação rápida e acesso a APIs nativas.
* **React Navigation (`@react-navigation/native`, `bottom-tabs`, `native-stack`):** Gerenciamento de rotas entre as 7 telas do aplicativo, integrando abas principais com fluxos de detalhes e formulários.
* **Firebase Firestore (`firebase/firestore`):** Banco de dados NoSQL em nuvem utilizado para armazenar, consultar, atualizar e excluir livros, anotações e dados de perfil em tempo real.
* **Lucide React Native (`lucide-react-native`) + `react-native-svg`:** Biblioteca de ícones vetoriais escolhida em substituição ao `@expo/vector-icons` para garantir renderização consistente de SVGs tanto no mobile quanto na versão web (Vercel). Todos os ícones recebem `size` e `color` explícitos.
* **API Nativa `Vibration` (`react-native`):** Utilizada como atuador para emitir feedback tátil (`Vibration.vibrate(500)`) no momento da confirmação de cadastro de um livro.
* **Figma:** Ferramenta utilizada para criação dos wireframes, definição da paleta de cores, tipografia e fluxo de UX/UI antes da implementação.
* **Vercel:** Hospedagem da versão web do aplicativo configurada como SPA (*Single Page Application*) por meio do arquivo `vercel.json`.

---

## ✨ 3. Funcionalidades

### Telas do Aplicativo
1. **`Home`:** Tela inicial de boas-vindas com atalhos diretos para a coleção de livros, perfil e central de anotações.
2. **`Biblioteca`:** Listagem completa dos livros cadastrados no Firestore, com barra de pesquisa em tempo real, exibição de capas e indicador visual informando se o livro já possui anotações.
3. **`AddLivro`:** Formulário para cadastro de novas obras (título, autor e URL da capa), com validação de campos obrigatórios, controle de teclado (`keyboardShouldPersistTaps="handled"`), alerta de confirmação e feedback tátil por vibração.
4. **`DetalhesLivro`:** Visualização ampliada da obra selecionada, exibindo capa, informações principais e ações rápidas para criar/editar anotações ou remover o livro da coleção.
5. **`Anota`:** Editor dedicado para escrever, atualizar ou excluir reflexões e citações vinculadas a um livro específico.
6. **`ListaAnotacoes`:** Visão consolidada de todas as anotações registradas pelo usuário, com acesso direto à edição de cada nota.
7. **`Perfil`:** Área pessoal do leitor com edição de foto de perfil, biografia e contadores dinâmicos de livros cadastrados e anotações criadas.

### Operações CRUD (Firebase Firestore)
* **Create (Salvar):** Cadastro de novos livros (`addDoc` na coleção `livros`) e criação de anotações vinculadas.
* **Read (Recuperar):** Leitura e filtragem de livros na `Biblioteca`, carregamento de detalhes, listagem em `ListaAnotacoes` e cálculo de métricas no `Perfil`.
* **Update (Atualizar):** Edição do texto das anotações na tela `Anota` e atualização das informações do `Perfil`.
* **Delete (Remover):** Exclusão de livros em `DetalhesLivro` e remoção de anotações em `Anota`.

### Navegação e Experiência do Usuário (UX/UI)
* **Barra Flutuante (*Glassmorphism*):** Menu inferior translúcido sobreposto às telas principais, com ajuste de `paddingBottom` nas listas para evitar sobreposição de conteúdo.
* **Feedback ao Usuário:** Uso combinado de alertas (`Alert`), indicadores visuais de estado vazio (*empty states*) e vibração do dispositivo.

---

## 🎥 4. Demonstração



### Fluxo em Funcionamento (GIF / Vídeo)

https://github.com/user-attachments/assets/d11762f6-bc56-4b8c-96ec-53f43a2957c6


---

## 🚀 5. Instalação e Execução

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* Aplicativo **Expo Go** instalado no smartphone (Android ou iOS)
* Conta configurada no [Firebase](https://firebase.google.com/) com Firestore ativado

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
   cd SEU-REPOSITORIO
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   npx expo install react-native-svg
   ```

3. **Configure o Firebase:**
   Verifique se o arquivo `src/config/firebase.js` contém as credenciais do seu projeto no Firebase Firestore.

4. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   ```
   * Escaneie o **QR Code** com o aplicativo **Expo Go** no celular, ou pressione `w` no terminal para abrir no navegador.

### Deploy da Versão Web (Vercel)
```bash
npx expo export --platform web -c
vercel
```

### Resolução de Problemas Comuns
* **Login no Expo bloqueado pelo navegador:** Caso o redirecionamento do login no terminal falhe, gere um *Personal Access Token* em `expo.dev` (*Account Settings > Personal Access Tokens*) e autentique via terminal:
  ```bash
  eas login --token SEU_TOKEN_AQUI
  ```
  Ou no PowerShell (Windows):
  ```powershell
  $env:EXPO_TOKEN="SEU_TOKEN_AQUI"
  ```
* **Ícones não aparecem na Vercel:** Apague as pastas de cache (`dist` e `.expo`) e gere a exportação limpa com `npx expo export --platform web -c`. No Windows PowerShell:
  ```powershell
  Remove-Item -Recurse -Force dist, .expo
  ```
* **Erro de `bundleIdentifier` no iOS (EAS Build):** Certifique-se de manter a chave `"bundleIdentifier"` preenchida dentro do bloco `"ios"` no arquivo `app.json`.

---

## 🧠 6. Aprendizados e Próximos Passos

### Processo Criativo e Uso Ético de Ferramentas
* **Figma:** Utilizado no planejamento visual e estrutural do aplicativo, permitindo validar hierarquia de informação, contraste e fluidez de navegação antes da codificação.
* **Uso Ético de Inteligência Artificial:** Ferramentas de IA (LLMs) foram utilizadas de forma transparente como apoio no refinamento visual dos estilos (`StyleSheet`), na organização da documentação, na investigação de erros de compatibilidade entre React Native Mobile e Web (como a migração de `Ionicons` para `lucide-react-native` + `react-native-svg` na Vercel e o controle de teclado em formulários) e na resolução de problemas de autenticação via token no Expo. Todo o código foi revisado, testado e integrado manualmente ao projeto.

### Principais Aprendizados
* Integração prática de um CRUD completo em tempo real com Firebase Firestore.
* Diferenças de comportamento entre ambientes Mobile e Web no Expo (renderização de SVGs, cache do Metro Bundler e rotas SPA via `vercel.json`).
* Importância de detalhes de UX em aplicativos móveis, como recolhimento automático do teclado em formulários e feedback tátil com atuadores nativos.

### Próximos Passos
* Implementar autenticação de usuários com Firebase Auth para sincronização individual de bibliotecas entre dispositivos.
* Integrar uma API pública de livros (como Google Books API) para preenchimento automático de título, autor e capa via busca ou leitura de código de barras (ISBN).
* Adicionar status de leitura (*Quero ler*, *Lendo*, *Concluído*) e sistema de avaliação por estrelas.
