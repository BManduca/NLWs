# Diário de anotações do Projeto on.orbit
<br>

# Back-end

## Node
- [Instalação](https://medium.com/@ayseleynavuz/how-to-install-node-js-on-mac-48c641a1437d):
  - **Como no momento da criação do projeto, estou usando sistema Mac OS, estarei focando nas instalações voltada para este OS**
  - Inicialmente verificar se existe o arquivo .zshrc(arquivo de configuração usado pela Zsh Shell, dai o nome zsh) e dentro deste arquivo geralmente contém os comandos que vão ser executados quando o Zsh é iniciado.
  - De maneira mais direto ao ponto, realizei os seguintes passos:
    - Acessei o seguinte link: [Github nvm](https://github.com/nvm-sh/nvm)
    - Naveguei até a seção de instalação e update
    - copiei o seguinte comando de instalação: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    - Logo em seguida executei no terminal
    - Após executar o passo anterior, apliquei o comando source ~/.zshrc no terminal para aplicar os comandos no zsh e assim, habilitar o uso dos comandos para o nvm(Node version management)
    - para verificar se o passo a passo funcionou, basta digitar no terminal, o seguinte comando: nvm --version
    - Para listar todas as versões disponíveis, basta digitar nvm ls-remote no terminal
    - Netse projeto estarei utilizando a versão LTS (Long term support) do node, estas versões são preferidas para projetos de longo prazo ou pessoais, devido à sua estabilidade e suporte estendido.
  - Para instalar versões do node, basta fazer o seguinte:
    - nvm install <version-number>
  - Para usar uma versão especifica do node, basta fazer o seguinte:
    - nvm use <version-number>

## Criando o package.json do projeto
- digitar o seguinte comando no terminal: npm init -y

## Javascript
- instalação: npm i typescript -D
- Após instalação do TS, vamos executar o seguinte comando npx tsc --init
  - npx: Ele vem instalando quando instalamos o node e basicamente ele é um atalho para executarmos scripts de bibliotecas instaladas
  - tsc é um script presente dentro da pasta .bin
- Após executar o comando anterior, será gerado um arquivo tsconfig.json
- Para configurar melhor o arquivo tsconfig.json, até com base na versão que estamos utilizando do node, basta acessar o seguinte repositorio [tsconfig bases](https://github.com/tsconfig/bases) da microsoft, que é a mantenedora do TS e depois procuramos como mencionado anteriormente pela versão do node que estamos utilizando, que por exemplo no momento que estou criando este projeto, seria a versão [@tsconfig/node20](https://www.npmjs.com/package/@tsconfig/node20) e copio a seguinte estrutura de tsconfig:
    >
      {
        "$schema": "https://json.schemastore.org/tsconfig",
        "_version": "20.1.0",

        "compilerOptions": {
          "lib": ["es2023"],
          "module": "node16",
          "target": "es2022",

          "strict": true,
          "esModuleInterop": true,
          "skipLibCheck": true,
          "moduleResolution": "node16"
        }
      }
- Logo em seguida, colo dentro do arquivo tsconfig.json do projeto

## Biblioteca @types/node e tsx
- O @types/node traz a integração do TS com o Node
- O Node por padrão não entende TS, para isso, foi instalado o TS, para que o editor em si, entenda que o projeto é sim um projeto TS e evite que que aconteça alguns erros de tipagem 
- A tipagem basicamente evita que aconteça erros durante o desenvolvimento que podem ser erros 'pesados', quando a aplicação for colocada em produção.
- A Biblioteca tsx permite executar nosso projeto sem precisar converte-ló antes para JS
- Realiza o processo de converter o código de TS para JS e já fazer a execução desse código.
- instalação: npm i @types/node tsx -D

## Fastify
- instalação: npm i fastify
- Framework
- É um Framework web altamente focado em fornecer a melhor experiência de desenvolvedor com no mínimo de overhead e uma arquitetura de plugin poderosa. Ele é inspirado no Hapi e no Express e até onde sabemos, é um dos frameworks web mais rápidos atualmente.

## Biome
- Projeto basicamente concorrente do ESlint
- Permite com que façamos formatação e linting do código, onde é basicamente uma forma de padronizar o código, quando várias pessoas estão mexendo no projeto, mas também ajuda muito no desenvolvimento, pois, apartir dele, não preciso me preocupar em escrever o código da forma mais 'bonita', que ao escrever e salvar o mesmo o arquivo, o Biome ira organizar o código automaticamente
- instalação: npm i -D --save-exact @biomejs/biome

## Docker
- Uma plataforma de virtualização de contêineres que permite que pessoas desenvolvedoras empacotem suas aplicações em ambientes portáveis e autossuficientes que podem ser executados em qualquer lugar, independentemente do sistema operacional e da infraestrutura de hospedagem. Em outras palavras, ele torna a criação, implantação e gerenciamento de aplicativos muito mais fácil e eficiente.
- Além disso, o Docker oferece às equipes de desenvolvimento de software uma maior capacidade de garantir que seu aplicativo seja executado da mesma maneira em qualquer ambiente.
- para instalar basta acessar próprio site do [docker](https://www.docker.com/) e seguir seu passo a passo, de acordo com seu OS.
- rodando o docker docker compose up
  - neste comando pode ser adicionado o -d, para caso de desenvolvimento
- para derrubar o docker, basta aplicar o comando docker compose down
- para so visualizar o container que esta rodando no momento, bastta digitar no terminal o comando docker ps
- para verificar todos os containers presentes, basta digitar o comando docker ps -a
- caso quiser ver mais afundo sobre algum docker em especifico, basta digitar o comando docker ps -1, copiar o id do docker e inserir o seguinte comando docker logs <id_docker>

## Drizzle ORM
- O Drizzle ORM ele converte tipos de SQL para TS e pode ajudar desenvolvedores de JS a trabalhar com banco de dados relacionais em ambientes TypeScript
- título de curiosidade ORM é um recurso utilizado durante a fase de desenvolvimento de software para mapear objetos presentes em um banco de dados relacional (SQL). No passado, esse código era escrito manualmente, porém, o ORM automatiza esse processo.
- Sua maior característica é a interação do código relacionado com sistemas de banco de dados. O desenvolvedor tem a liberdade de não precisar fazer consultas SQL e nem se preocupar com a forma como os objetos são armazenados, em um processo de abstração.
- instalação: npm i drizzle-orm

## Zod
- Biblioteca para validação de dados
- npm i zod

## Gerando migrations
- Para gerar as migrations do projeto, foi criado um arquivo schema.ts dentro da pasta src/db
- Foi definido neste arquivo, todas as informações e o nome da tabela
- Ao realizarmos o seguinte comando: npx drizzle-kit generate, será gerado um arquivo .sql que terá as intruções para criar a tabela no banco de dados, porém, a tabela ainda não foi criada e sim somente a migration.

## 'Rodando' a migration
- para se conectar com banco de dados postgres, precisamos ter instalado uma determinada biblioteca e para conseguirmos efetuar essa conexão, estaremos instalando o driver do postgres, da seguinte forma: npm i postgres
- Basta executar o seguinte código(após a instalação do driver): npx drizzle-kit migrate
- para visualizar a tabela, basta digitar no terminal: npx drizzle-kit studio e acessar o link gerado

## Algoritmo [CUID2](https://www.npmjs.com/package/@paralleldrive/cuid2)
- Algoritmo de geração de ID único
- instalação: npm i @paralleldrive/cuid2

## Trabalhando com Datas em JS
- instalação: npm i dayjs

## Rotas do Projeto
- Rota para cadastrar metas
- Rota para marcar uma meta como concluída
- Rota que retorne os dados da minha semana (resumo da semana)
- Rota para indicar as metas, tanto as concluídas quanto as que ainda não foram concluídas

## [Fastify Type Provider Zod](https://github.com/turkerdev/fastify-type-provider-zod)
- Plugin do Fastify
- Automatiza a validação das rotas existentes no projeto
- instalação: npm i fastify-type-provider-zod

## [WITH Queries (Common Table Expressions)](https://www.postgresql.org/docs/current/queries-with.html)
- o WITH fornece uma maneira de escrever instruções auxiliares para uso em uma consulta maior. Essas instruções, que geralmente são chamadas de Common Table Expressions ou CTEs, podem ser consideradas como "definindo tabelas temporárias que existem apenas para uma consulta". Cada instrução auxiliar em uma cláusula WITH pode ser um SELECT, INSERT, UPDATE ou DELETE, e a própria cláusula WITH é anexada a uma instrução primária que pode ser um SELECT, INSERT, UPDATE, DELETE ou MERGE.

## Agregação SQL
- Basicamente o fato de realizar uma agregação em si, é ter o poder de pegar uma lista e tranformar a mesma em uma estrutura de dados, através do SQL
- No postgres, podemos realizar este fato, através da função, JSON_AGG()

## @fastify/cors
- Cors: método de segurança, que basicamente é uma forma de evitar que o backend seja acessível por qualquer front-end

<br>
<br>

# Front-end

## Vite
- Vite é uma palavra francesa para 'rápido', pronunciada como veet ou vit
- É uma ferramenta de construção de projetos de frontend que se destina oferecer uma experiência de desenvolvimento mais rápida e leve para projetos web modernos. Ela consiste em duas partes principais:
  - Um servidor de desenvolvimento que oferece uma [rica melhoria de funcionalidades](https://pt.vitejs.dev/guide/features) sobre [módulos de ECMAScript nativo](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules), como por exemplo [Substituição de Módulos Instantânea](https://pt.vitejs.dev/guide/features#hot-module-replacement)
  - Um 'build command' que empacota nosso código com a [Rollup](https://rollupjs.org/), pré-configurado para produzir ativos estáticos altamente otimizados para produção.

## Tailwind CSS
- Uma biblioteca 'utility classes'
  - Cada classe que é aplicado em um elemento, aplica um css diferente
- Bem sólida no mercado 
- Vantagens do Tailwind, ao se conectar com os frameworks que temos atualmente(as bibliotecas de criação de interface), como React, Vue...
  - Essas bibliotecas já tem um padrão de componentização, ou seja, dividir nossa aplicação em vários componentes menores.
  - Isso se resume a menos código em tela, menos html e consequentemente menos classes, resultando assim na ação de não causar um efeito muito negativo de forma visual, no momento que estamos vendo o código.
  - Theme-first-api
    - O que isso quer dizer?
      - Que no caso, você não deveria sair utilizando qualquer valor para tamanho de fonte, para espaçamento, para arredondamento de borda, ou seja, você vai configurar o seu tema, quais seriam os padrões que o seu projeto vai seguir.
  - Manutenção local
    - Todos os elementos do HTML, eles tem o seu css 'zerado' apartir do momento que instalamos o tailwind, por isso precisamos aplicar a cada elemento exclusivamente as classes que vão estilizar aquele elemento.
- Instalação: 
  - Instalando o tailwind, o postcss e o autoprefixer: 
    - npm install -D tailwindcss postcss autoprefixer
  - Criando o arquivo de configuração do Tailwind
    - npx tailwindcss init -p

## Tailwind Merge
- Permite que seja feito a união de classes tailwind 

## Tailwind Variants
- Permite por exemplo, um dos buttons da aplicação tenha diferentes cores e tamanhos baseado em atributos que são passados para o mesm, ou seja, para relação de tamanho do button, se passarmos a propriedade size small, ele terá uma configuração, senão, ele terá a config default.

## Biblioteca lucid-react
- Biblioteca para ícones
- instalação: npm i lucide-react

## Biblioteca Radix
- Uma 'component library' de código aberto otimizada para desenvolvimento rápido, de fácil manutenção e acessibilidade. Basta importar e pronto - sem necessidade de configuração.
- Essa lib traz comportamentos comuns presente na web, em formato de components no react.
- São 100% acessíveis, ou seja, o component em si ele 'passa' a ser interpretado como um component nativo para o leitor de tela.

## Hooks
- São funções do React que nos permitirão conectar(anexar ou anexar uma funcionalidade ao componente) ao estado e ao ciclo de vida da aplicação(entre outras funcionalidades). Eles foram criados especificamente para componentes funcionais.
- Conceitos importantes:
  - Estados: São varíaveis que armazenam e alteram informações sobre um componente
  - Ciclo de vida: Refere-se a funções executadas em momentos diferentes e que realizam ações diferentes.
- Os hooks surgiram na versão 16.6 do React e já estáveis na versão 16.8.0, resolvendo problemas como:
  - Reutilização de código entre componentes
  - Comprimento dos componentes, tornando-se algo muito complexo de entender.
  - Otimizar o uso do this.

## TanStack Query
- Biblioteca focada em fetch de dados
- Anteriormente conhecida como React Query
- Frequentemente descrita como a biblioteca que faltava para aplicativos web, mas em ermos mais técnicos, ela facilita a busca, o armazenamento em cache, a sincronização e a atualização do estado do servidor em seus aplicativos web.
- instalação: npm i @tanstack/react-query

- ## Function invalidateQueries (queryClient => TanStack Query)
- Toda vez que é feito uma invalidação de uma query, passando o ID dela, essa query, por debaixo dos panos, é feita de novo, ou seja, no nosso caso, será feita uma query, para completar a 'goal' e outra pra trazer o summary atualizado.

## SWR Vercel
- O Nome SWR é derivado de 'stale-while-revalidate'
- Uma técnica de invalidação de cache de HTTP popularizada pela [HTTP RFC 5861](https://datatracker.ietf.org/doc/html/rfc5861). SWR é a estratégia de primeiro retornar os dados do cache(state), depois enviar a solicitação de fetch(revalidate) e finalmente retornar com os dados atualizados.

## React-hook-form
- Com o React Hook Form, basicamente você registra os campos do seu formulário usando a função register, que basicamente associa um campo de entrada HTML a um estado interno da biblioteca. Isso permite que o React Hook Form gerencie o estado do formulário, sem a necessidade de criar estados separados para cada campo.
- Reduz a quantidade de código que você precisa escrever e remove renderizações desnecessárias.

- ## @hookform/resolvers
- Biblioteca auxiliar para o React Hook Form, que é a bibliteca de integração com as bibliotecas de validação (zod)