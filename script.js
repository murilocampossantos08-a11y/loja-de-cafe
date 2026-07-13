let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    alert(nome + " adicionado ao carrinho!");
}

// Atualiza contador do carrinho
function atualizarCarrinho() {
    const contador = document.getElementById("cart-count");
    if (contador) {
        const quantidadeTotal = carrinho.reduce(
            (total, item) => total + item.quantidade,
            0
        );
        contador.innerText = quantidadeTotal;
    }
}

// Remove item do carrinho pelo índice
function removerItem(indice) {
    if (carrinho[indice].quantidade > 1) {
        carrinho[indice].quantidade--;
    } else {
        carrinho.splice(indice, 1);
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    exibirCarrinho();
}

// Exibe os itens do carrinho
function exibirCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("total-carrinho");
    if (!lista) return;
    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, indice) => {
        total += item.preco * item.quantidade;
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome} (${item.quantidade}x)</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                <button onclick="removerItem(${indice})">
                    X
                </button>
            </div>
        `;
    });
    if (totalElemento) {
        totalElemento.innerText = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Limpa todo o carrinho
function limparCarrinho() {
    carrinho = [];
    localStorage.removeItem("carrinho");
    atualizarCarrinho();
    exibirCarrinho();
}

// Finalizar compra
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso!");
    limparCarrinho();
}

// Executa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {

    // Corrige carrinhos antigos que não possuem quantidade
    carrinho.forEach(item => {
        if (!item.quantidade) {
            item.quantidade = 1;
        }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    exibirCarrinho();
});

//--------------carrosel de comentarios-------------------\\
const reviews = document.querySelectorAll('.review-slider .box');
const prevReview = document.querySelector('.prev-review');
const nextReview = document.querySelector('.next-review');

let currentReview = 0;

function showReview(index) {

    if (reviews.length === 0) return;
    reviews.forEach(review => {
        review.classList.remove('active');
    });
    reviews[index].classList.add('active');
}

if (nextReview) {
    nextReview.addEventListener('click', () => {
        currentReview++;
        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        showReview(currentReview);
    });
}

if (prevReview) {
    prevReview.addEventListener('click', () => {
        currentReview--;
        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        showReview(currentReview);
    });
}

// Troca automática a cada 3 segundos
if (reviews.length > 0) {
    showReview(currentReview);
    setInterval(() => {
        currentReview++;
        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        showReview(currentReview);
    }, 3000);
}

// ==================== CARREGAMENTO ====================

document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
    exibirCarrinho();
});