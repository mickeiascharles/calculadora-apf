const TABELA_PF = {
    ALI: { Baixa: 7, Media: 10, Alta: 15 },
    AIE: { Baixa: 5, Media: 7, Alta: 10 },
    EE: { Baixa: 3, Media: 4, Alta: 6 },
    SE: { Baixa: 4, Media: 5, Alta: 7 },
    CE: { Baixa: 3, Media: 4, Alta: 6 },
};
let listaFuncionalidades = [];
const inputDesc = document.getElementById("descNova");
const selectTipo = document.getElementById("tipoNovo");
const selectComp = document.getElementById("compNova");
const btnAdicionar = document.getElementById("btnAdicionar");
const tbodyLista = document.getElementById("lista-items");
const inputValorHora = document.getElementById("valorHora");
const inputProdutividade = document.getElementById("produtividade");
const labelTotalPF = document.getElementById("totalPF");
const labelTotalHoras = document.getElementById("totalHoras");
const labelPrecoFinal = document.getElementById("precoFinal");
const btnExportar = document.getElementById("btnExportar");
function adicionarItem() {
    const descricao = inputDesc.value;
    const tipo = selectTipo.value;
    const complexidade = selectComp.value;
    if (descricao.trim() === "") {
        alert("Digite uma descrição para a funcionalidade.");
        return;
    }
    const pontos = TABELA_PF[tipo][complexidade];
    listaFuncionalidades.push({
        id: Date.now(),
        descricao,
        tipo,
        complexidade,
        pontos,
    });
    inputDesc.value = "";
    inputDesc.focus();
    atualizarInterface();
}
function removerItem(id) {
    listaFuncionalidades = listaFuncionalidades.filter((item) => item.id !== id);
    atualizarInterface();
}
function renderizarTabela() {
    tbodyLista.innerHTML = "";
    listaFuncionalidades.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.descricao}</td>
            <td>${item.tipo}</td>
            <td>${item.complexidade}</td>
            <td><strong>${item.pontos}</strong></td>
            <td></td> 
        `;
        const tdAction = row.querySelector("td:last-child");
        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnDelete.className = "btn-delete";
        btnDelete.onclick = () => removerItem(item.id);
        tdAction.appendChild(btnDelete);
        tbodyLista.appendChild(row);
    });
}
function calcularTotais() {
    const valorHora = parseFloat(inputValorHora.value) || 0;
    const produtividade = parseFloat(inputProdutividade.value) || 0;
    const totalPF = listaFuncionalidades.reduce((acc, item) => acc + item.pontos, 0);
    const totalHoras = totalPF * produtividade;
    const preco = totalHoras * valorHora;
    if (labelTotalPF)
        labelTotalPF.innerText = totalPF.toString();
    if (labelTotalHoras)
        labelTotalHoras.innerText = `${totalHoras}h`;
    if (labelPrecoFinal) {
        labelPrecoFinal.innerText = preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
}
function atualizarInterface() {
    renderizarTabela();
    calcularTotais();
}
function gerarPDF() {
    const elProjeto = document.getElementById("nomeProjeto");
    const elCliente = document.getElementById("nomeCliente");
    const nomeProj = elProjeto && elProjeto.value ? elProjeto.value : "Projeto Sem Nome";
    const nomeCli = elCliente && elCliente.value ? elCliente.value : "Cliente Não Informado";
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("courier", "normal");
    doc.setFontSize(18);
    doc.text("Mickeias Charles", 14, 20);
    doc.setFontSize(10);
    doc.text("Software Developer | Orçamento Técnico", 14, 26);
    doc.line(14, 29, 196, 29);
    doc.setFont("courier", "bold");
    doc.text(`PROJETO: ${nomeProj}`, 14, 40);
    doc.text(`CLIENTE: ${nomeCli}`, 14, 45);
    doc.setFont("courier", "normal");
    const hoje = new Date().toLocaleDateString("pt-BR");
    doc.text(`Data: ${hoje}`, 14, 55);
    doc.text(`Config: R$ ${inputValorHora.value}/h | ${inputProdutividade.value}h/PF`, 14, 60);
    const dadosTabela = listaFuncionalidades.map((item) => [
        item.descricao,
        item.tipo,
        item.complexidade,
        item.pontos.toString(),
    ]);
    doc.autoTable({
        startY: 65,
        head: [["Funcionalidade", "Tipo", "Complex.", "PF"]],
        body: dadosTabela,
        theme: "plain",
        styles: {
            font: "courier",
            fontSize: 9,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [220, 220, 220],
            textColor: [0, 0, 0],
            fontStyle: "bold",
        },
    });
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.text(`Total Pontos: ${labelTotalPF.innerText}`, 14, finalY);
    doc.text(`Horas Estimadas: ${labelTotalHoras.innerText}`, 14, finalY + 6);
    doc.setFontSize(14);
    doc.setFont("courier", "bold");
    doc.text(`TOTAL: ${labelPrecoFinal.innerText}`, 14, finalY + 15);
    doc.setFontSize(8);
    doc.setFont("courier", "normal");
    doc.text("Documento gerado automaticamente via Calculadora de Orçamento APF.", 14, 280);
    doc.text("Validade da proposta: 30 dias.", 14, 284);
    const nomeArquivo = `orcamento_${nomeProj
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.pdf`;
    doc.save(nomeArquivo);
}
btnAdicionar.addEventListener("click", adicionarItem);
inputValorHora.addEventListener("input", calcularTotais);
inputProdutividade.addEventListener("input", calcularTotais);
inputDesc.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        adicionarItem();
});
if (btnExportar)
    btnExportar.addEventListener("click", gerarPDF);
