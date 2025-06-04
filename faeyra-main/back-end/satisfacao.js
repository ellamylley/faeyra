const Cliente = require('./clienteClasse')

function calculoSatisfacao () {
    getRaiva();
    getFelicidade();

    const satisfacao = ((this.raiva + this.felicidade) / 3).toFixed(1)
    if (satisfacao < this.satisfacaoMinima) {

    }
    return satisfacao
}