📚 Minha Biblioteca
Um aplicativo multiplataforma (Mobile e Web) inspirado no Kindle e no Skoob, criado para gerir a sua coleção pessoal de livros, guardar reflexões de leitura e acompanhar a sua jornada literária num ambiente tranquilo e moderno.

✨ Funcionalidades
Gestão de Acervo: Adicione livros à sua coleção com título, autor e capa.

Anotações Literárias: Escreva e guarde notas, citações ou reflexões para cada livro de forma independente.

Perfil Personalizado: Altere a sua foto de perfil, biografia e acompanhe as suas métricas (total de livros e anotações).

Design Moderno: Interface limpa em tons pastel com navegação baseada numa barra flutuante translúcida (efeito Glassmorphism).

Multiplataforma: Experiência fluida e idêntica em iOS, Android e Web.

🛠️ Tecnologias Utilizadas
Frontend: React Native & Expo

Navegação: React Navigation (Combinação de Bottom Tabs e Stack)

Base de Dados: Firebase Firestore (NoSQL em tempo real)

Ícones vetoriais: Lucide React Native (suporte total a SVG na Web e Mobile)

🎨 Design & Processo Criativo
Figma: Utilizado como a ferramenta principal de UX/UI Design para estruturar a paleta de cores (tons pastel, cartões arredondados) e arquitetar a experiência do utilizador antes da codificação.

Inteligência Artificial: Atuou como ferramenta de apoio durante o desenvolvimento para otimizar a organização do código, estruturar os ficheiros CSS e resolver problemas de compatibilidade entre as versões Mobile e Web.


🚀 Como Executar o Projeto Localmente

1. Clone o repositório e instale as dependências:

Bash
npm install

2. Configure o Firebase:
Certifique-se de que o ficheiro src/config/firebase.js contém as credenciais do seu projeto Firebase Firestore.

3. Inicie o servidor de desenvolvimento:

Bash
npx expo start
(Utilize a aplicação Expo Go no seu telemóvel para ler o QR Code ou digite w no terminal para abrir no navegador).
