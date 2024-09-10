# Diário de anotações do Projeto on.orbit

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
