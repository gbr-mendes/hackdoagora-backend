## 
<h1 align="center">
  <img alt="Provi hack do Agora" title="#ProviHack" src="https://marketing.provi.com.br/hs-fs/hubfs/provihack%20do%20agora-85.jpg?width=630&upscale=true&name=provihack%20do%20agora-85.jpg" />
</h1>

##

##
<h3 align="center"> 
    <img alt="Troca Inteligente" title="#TrocaInteligente" width="400" src="https://i.imgur.com/SPOsol2.png" />
</h3>

##

<h1>Equipe 42</h1>


## Tópicos
=================

   - [Tópicos](#tópicos)
   - [Repositórios](#repositórios)
   - [Deploy da aplicação](#deploy-da-aplicação)
   - [Sobre](#sobre-o-projeto)
   - [Iniciar Projeto](#como-iniciar-o-projeto)
   - [Instalação](#instalação)
   - [Tecnologias](#tecnologias)
   - [Vídeos](#vídeos-de-apresentação)
   - [Equipe](#equipe)

---

## Repositórios

* #### Back-end  [link](https://github.com/gbr-mendes/hackdoagora-backend)

* #### Fron-end  [link](https://github.com/Ferreira94/troca_inteligente_frontend)

---

### Deploy da aplicação
* Back-end [Heroku](https://hackdoagora-backend.herokuapp.com/)
* Front-end [Vercel](https://troca-inteligente.vercel.app/)

---
## Sobre o projeto

A Troca Inteligente, trata-se de uma lixeira que gerencia os resíduos pós consumo e garante benefícios em pontos para que você descarte os resíduos corretamente.

---

## Como iniciar o projeto:

 * Clone este repositório em sua máquina
```
 $ git clone https://github.com/gbr-mendes/hackdoagora-backend.git
```
---

## Instalação:
 
**Node.JS**
- Para inicializar o projeto precisamos do Node.JS instalado na máquina, entre nesse [link](https://nodejs.org/en/) e baixe a versão LTS referente ao seu sistema operacional.
- Quando terminar a instalação, abra o terminal do seu computador e digite os comandos abaixos:

```bash
node -v
```
```bash
npm -v
```
- Se ambos os comandos acima imprimirem as versões do node e npm respectivamente, você esta pronto para seguir
- Entre na pasta no diretório que você clonou e execulte o comando abaixo.

```bash
npm install
```
- Crie um arquivo .env na raiz do projeto e inclua as seguintes informações:
  
  - CLOUDINARY_NAME=string
  - CLOUDINARY_API_KEY=string
  - CLOUDINARY_API_SECRET=string
  - TOKEN_SECRET=string Necessário para geração de jwt
  - HOST=localhost:3000

- Faça cadastro na [cloudinary](https://cloudinary.com/) para obter as informações acima
- Você também pode incluir a seguinte variável de ambiente para usar uma base de dados na nuvem como no [atlas](https://www.mongodb.com/atlas/database), caso contrário precisará ter o [mongodb](https://www.mongodb.com/pt-br) instalado na sua máquina:
  - DB_URI=string
  
- Com isso setado, execute os comandos abaixo:
```bash
npm run swagger auto-gen
```
```bash
npm run devStart
```
- Acesse a [url](http://localhost:3000) e veja a documentação da api

- ATENÇÃO. Para a api funcionar localmente, é necessário que você tenha ao menos um Reciclável e uma lixeira cadastrados no banco de dados. A rota de criação da lixeira é reservada a usuários admin, mas foi liberada para propósitos de teste.Você pode fazer a adição pelo swagger.Após a adição dos items divirta-se


---

## Tecnologias 

No desenvolvimento do projeto, utilizamos as seguintes tecnologias e ferramentas: 

* Desenvolvimento Front-End: HTML, CSS, Nextjs, ChakraUI;
* Desenvolvimento Back-End: Nodejs e Express;
* Banco de dados: MongoDB;
* Gerenciamento de Media: Cloudinary
* Ux Design: Figma;

---



## Vídeos de apresentação

* [Pitch](https://www.youtube.com/watch?v=eB_1QfH71Tc&feature=youtu.be)
* [Demo](https://www.loom.com/share/5964f7aeb36b4128924347060fff8631)

---


## Equipe:

 * Eliezer Perez - **Desenvolvedor Full Stack**

<a href="https://github.com/eliezerlobaton" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"> 
<a href="https://www.linkedin.com/in/eliezerprogramadorfullstack/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

 * Gabriel Silva - **Desenvolvedor Back-end**
  
<a href="https://github.com/gbr-mendes" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"> 
<a href="https://www.linkedin.com/in/gabriel-mendes-da-silva/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

 * Alexssandra Pimentel - **Desenvolvedora Back-end**
  
<a href="https://github.com/AlexaPim" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"> 
<a href="https://www.linkedin.com/in/alexssandra-pimentel/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

 * Luciano Ferreira - **Desenvolvedor Front-end**

<a href="https://github.com/Ferreira94" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"> 
<a href="https://www.linkedin.com/in/luciano-ferreira-b302b61a7/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

 * Bianca Medrado - **Product Owner**

<a href="https://www.linkedin.com/in/biancamedrado" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
 
 * Audrey Doanne - **Ux Designer**

<a href="https://www.linkedin.com/in/audrey-doanne/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

