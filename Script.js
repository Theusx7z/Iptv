let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('active');
}
function toggleCart() {
  document.getElementById('cartMenu').classList.toggle('active');
}

function addToCart(item, preco) {
  carrinho.push({ item, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${item} adicionado ao carrinho!`);
}

function mostrarCategoria(id) {
  document.querySelectorAll('.categoria').forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
  toggleMenu();
}

// Envio do pedido
if (document.getElementById("formFinalizar")) {
  document.getElementById("formFinalizar").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const pagamento = document.getElementById("pagamento").value;
    const entrega = document.getElementById("entrega").checked;

    if (!nome || !endereco || !bairro || !pagamento || carrinho.length === 0) {
      alert("Preencha todos os campos e adicione produtos.");
      return;
    }

    const dataAtual = new Date().toLocaleDateString();
    const chave = `contador_${dataAtual}`;
    let numeroPedido = Number(localStorage.getItem(chave) || 0) + 1;
    if (numeroPedido > 200) numeroPedido = 1;
    localStorage.setItem(chave, numeroPedido);

    let total = entrega ? 4 : 0;
    let itens = carrinho.map(i => {
      total += i.preco;
      return `- ${i.item} (R$ ${i.preco.toFixed(2)})`;
    }).join('\n');

    const mensagem = `
Pedido nº ${String(numeroPedido).padStart(2, "0")} - Ceará Lanches

*Nome:* ${nome}
*Endereço:* ${endereco}, Bairro ${bairro}
*Entrega:* ${entrega ? "Sim (+R$4,00)" : "Não"}
*Pagamento:* ${pagamento}

*Itens:*
${itens}

*Total: R$ ${total.toFixed(2)}*
    `.trim();

    const numero = "5518996377806";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");

    localStorage.removeItem("carrinho");
  });
}
