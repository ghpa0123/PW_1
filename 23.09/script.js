let carrinho = [];
let total = 0;


function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();
}


function atualizarCarrinho() {

    let pedido = document.getElementById("pedido");

    pedido.innerHTML = "";

    carrinho.forEach(function(produto) {

        let item = document.createElement("p");

        item.textContent =
            "🍕 " + produto.nome +
            " - R$ " + produto.preco.toFixed(2).replace(".", ",");

        pedido.appendChild(item);
    });

    document.getElementById("total").textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}


function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio! 🍕");

        return;
    }

    alert(
        "Pedido realizado com sucesso! 🎉\n\n" +
        "Valor total: R$ " +
        total.toFixed(2).replace(".", ",")
    );
}
