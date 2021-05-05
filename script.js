//array
const transactionUL = document.getElementById('transactions');
const valorRenda = document.getElementById('money-plus')
const valorDespesa = document.querySelector('#money-minus')
const valorSaldo = document.getElementById('balance');
const formulario = document.getElementById('form');
const inputNomeTransacao = document.getElementById('text');
const inputValorTransacao = document.getElementById('amount');

//array teste
let dummyTransactions = [

]

/* FUNÇÃO RESPONSÁVEL POR CRIAR TRANSAÇÕES (ENTRADA -SAIDA)*/

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()

}

const addOperationDom = transaction => {

    const operador = transaction.amount < 0 ? '-' : '+'; // se o valor da operacao for maior ou menor que zero adiciona os sinais
    const valorSemOperador = Math.abs(transaction.amount); //renderiza o valor abs
    const cssClass = transaction.amount < 0 ? 'minus' : 'plus'; // cria uma variavel que executa um css mediante a cond.
    const li = document.createElement('li'); //cria um item HTMl "li"


    li.classList.add(cssClass); //adciona o objeto cssClass criado, ao criar uma li
    li.innerHTML = // criar o valor da li
        `${transaction.name}
        <span>${operador} R$ ${valorSemOperador}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        X
        </button>`;
    transactionUL.prepend(li); //append add o ultimo elmt


}

/* FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS VALORES  */
const atualizaValores = () => {

    const valoresTransacoes = dummyTransactions.map(transaction => transaction.amount);

    const total = valoresTransacoes
        .reduce((accumulator, transaction) => accumulator + transaction, 0) //accumulator armazena os valore, e o transaction recebe o primeiro item dos amounts
        .toFixed(2); //reduce transforma os valores de um array em um unico valor.
    const renda = valoresTransacoes
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const despesa = valoresTransacoes
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    valorRenda.textContent = `R$ ${renda}`;
    valorSaldo.textContent = `R$ ${total}`;
    valorDespesa.textContent = ` R$ ${despesa}`;

}


const init = () => {
    transactionUL.innerHTML = ''
    dummyTransactions.forEach(addOperationDom);
    atualizaValores()
}
init();

const gerarId = () => Math.round(Math.random() * 1000) //CRIA UM NUMERO ALEATORIO DE 0 A 1000

//cria uma função para quando o formulário tentar ser enviado.
formulario.addEventListener('submit', event => {
    event.preventDefault()
    const nomeTransacao = inputNomeTransacao.value.trim()
    const valorTransacao = inputValorTransacao.value.trim()

    if (nomeTransacao === '' || valorTransacao === '') {
        alert('Os campos Nome da transação e Valor da trasnsação devem ser preenchidos');
        return
    }
    const transaction = {
        id: gerarId(),
        name: nomeTransacao,
        amount: Number(valorTransacao)
    }
    console.log(transaction)

    dummyTransactions.push(transaction)
    init()
    inputNomeTransacao.value = '';
    inputValorTransacao.value = '';

})