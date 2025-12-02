# Calculadora de Orçamento APF (Análise de Pontos de Função)

> Uma ferramenta web para estimativa de custos e prazos de desenvolvimento de software, baseada na metodologia IFPUG, com geração de propostas em PDF.

![Badge Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![Badge TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Badge HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## Preview

## Sobre o Projeto

Este projeto é uma **Calculadora de Orçamento de Software** desenvolvida para facilitar a vida de desenvolvedores freelancers e pequenas fábricas de software. Utilizando a **Análise de Pontos de Função (APF)**, o sistema converte funcionalidades técnicas em estimativas precisas de horas e valores monetários.

A interface foi projetada com uma identidade visual **"Raw/Dev"** (inspirada em terminais, editores de código e design brutalista), focada na usabilidade e responsividade total para dispositivos móveis.

### Funcionalidades Principais

- **Configuração Dinâmica:** Ajuste o valor da hora técnica e a produtividade (horas por ponto de função) em tempo real.
- **Gestão de Escopo:** Adicione funcionalidades classificando-as por:
  - **Tipo:** ALI, AIE, EE, SE, CE.
  - **Complexidade:** Baixa, Média, Alta.
- **Validação de Dados:** Impede a inserção de itens sem descrição.
- **Responsividade Mobile-First:** Layout otimizado para celulares, com inputs empilhados verticalmente e tabelas com scroll horizontal para não quebrar a tela.
- **Exportação Profissional:** Geração de **PDF** instantâneo contendo:
  - Dados do Projeto e Cliente.
  - Tabela detalhada do escopo.
  - Totais de pontos, horas e orçamento final.
  - Design técnico "monospaced" (fonte Courier).

---

## Tecnologias Utilizadas

- **Frontend:** HTML5 Semântico, CSS3 (Grid, Flexbox, Variáveis CSS).
- **Lógica:** **TypeScript** (transpilado para ES6), garantindo tipagem forte e segurança no código.
- **Bibliotecas (Via CDN):**
  - `jspdf` (Geração do arquivo PDF).
  - `jspdf-autotable` (Criação das tabelas dentro do PDF).

---

## Como Rodar o Projeto Localmente

Como o projeto utiliza **TypeScript**, é necessário compilá-lo se você desejar fazer alterações no código fonte (`.ts`).

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (necessário apenas para rodar o compilador TypeScript).

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/mickeiascharles/calculadora-apf.git](https://github.com/mickeiascharles/calculadora-apf.git)
    cd calculadora-apf
    ```

2.  **Instale o TypeScript (caso não tenha):**

    ```bash
    npm install -g typescript
    ```

3.  **Compile o código:**
    O navegador não lê arquivos `.ts` diretamente. Rode este comando para gerar o `script.js` atualizado:

    ```bash
    tsc script.ts --target es6 --watch
    ```

    _(A flag `--watch` manterá o compilador rodando e atualizando o JS automaticamente sempre que você salvar o arquivo TS)._

4.  **Execute:**
    Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor web para rodar, mas é recomendado usar algo como o "Live Server" do VS Code para melhor experiência.

---

## Identidade Visual

O design system foi construído do zero, sem frameworks CSS (como Bootstrap), para garantir leveza e personalização total.

- **Tipografia:** `Fira Code` (Monospace) para dados técnicos e `Roboto` para legibilidade.
- **Cores:** Tema monocromático cinza/preto (`#E0E0E0`, `#1A1A1A`), simulando documentação técnica.
- **Layout:** Grid responsivo que se adapta de desktops largos até celulares pequenos.

---

## Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.

---

<div align="center">
  <p>Desenvolvido por <strong>Mickeias Charles</strong></p>
  
  <p>
    <a href="https://www.linkedin.com/in/mickeiascharles/" target="_blank">
      <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
    </a> 
    <a href="https://github.com/mickeiascharles" target="_blank">
      <img src="https://img.shields.io/badge/-GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white" target="_blank">
    </a>
  </p>
</div>
