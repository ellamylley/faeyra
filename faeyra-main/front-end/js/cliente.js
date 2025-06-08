function buscarCliente() {
   fetch('http://localhost:3000/clientes')
    .then(res => {

        if (!res.ok) {
            throw new Error("Nenhum cliente encontrado.");
        }
        return res.json();
    })
    .then(data => {
        data.satisfacao_atual = data.satisfacao_minima;
        if (!data || !data.satisfacao_atual || data.satisfacao_minima === undefined) {
            throw new Error("Dados do cliente incompletos.");
        }

        const satisfacao = data.satisfacao_atual;
        let expressao;

        if (satisfacao >= 80) {
            expressao = "feliz";
        } else if (satisfacao >= 40) {
            expressao = "neutro";
        } else {
            expressao = "raiva";
        }

        const imagem = `/faeyra-main/front-end/imagens/clientes/${data.id_cliente}_${expressao}.jpg`;
        const personagem = document.getElementById("personagem").querySelector("img");
        personagem.src = imagem;
        document.getElementById("personagem").style.display = "flex";
    })
    .catch(err => {
        console.error("Erro ao buscar cliente:", err.message);
    });

}
