// Insira o número do WhatsApp da sua loja aqui (com DDD e Código do País)
const TELEFONE_WHATSAPP = "5535999647435"; 

// Lista de produtos de exemplo
const produtos = [
  {
    id: 1,
    nome: "Terço Personalizado em Prata 925",
    preco: 189.90,
    categoria: ["catolico", "prata", "feminino", "masculino"],
    imagem: "https://images.tcdn.com.br/img/img_prod/680812/tero_noiva_luxo_perola_de_agua_doce_folheado_a_pra_1_20260730154234_3fddb89dafef.jpg"
  },
  {
    id: 2,
    nome: "Escapulário em Ouro 18k Personalizado",
    preco: 450.00,
    categoria: ["catolico", "ouro", "masculino", "feminino"],
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNenEVe6gJAe-XKdLYTmQeoyzjLG_IIn4dPe6xpMThO6c9O0ePBN9w79g&s=10"
  },
  {
    id: 3,
    nome: "Pulseira Masculina Prata de Lei",
    preco: 220.00,
    categoria: ["prata", "masculino"],
    imagem: "https://mirianteofilojoias.com.br/wp-content/uploads/2024/07/8752-1.jpg"
  },
  {
    id: 4,
    nome: "Colar Feminino Ouro com Nome",
    preco: 320.00,
    categoria: ["ouro", "feminino"],
    imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    nome: "Medalha de São Bento em Prata",
    preco: 149.90,
    categoria: ["catolico", "prata", "masculino"],
    imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lx02s760kple18"
  }
  {
    id: 6,
    nome: "Medalha de São Bento em Ouro",
    preco: 199.90,
    categoria: ["catolico", "Ouro", "masculino"],
    imagem: "https://cdn.awsli.com.br/2452/2452519/produto/166985894/whatsapp-image-2026-03-11-at-09-18-18-v54pdojgu5.jpeg"
  }
];

let carrinho = [];

// Carregar produtos na tela
function renderProdutos(lista) {
  const container = document.getElementById('products-container');
  container.innerHTML = "";

  lista.forEach(prod => {
    container.innerHTML += `
      <div class="card">
        <img src="${prod.imagem}" alt="${prod.nome}">
        <div class="card-info">
          <h3>${prod.nome}</h3>
          <div class="price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
          <button class="btn-add" onclick="adicionarAoCarrinho(${prod.id})">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;
  });
}

// Filtro de Categorias
function filtrar(categoria) {
  // Atualizar visual dos botões
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (categoria === 'todos') {
    renderProdutos(produtos);
  } else {
    const filtrados = produtos.filter(p => p.categoria.includes(categoria));
    renderProdutos(filtrados);
  }
}

// Abrir/Fechar Carrinho
function toggleCarrinho() {
  document.getElementById('cart-sidebar').classList.toggle('open');
}

// Adicionar Item
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  atualizarCarrinho();
  toggleCarrinho();
}

// Remover Item
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Atualizar Interface do Carrinho
function atualizarCarrinho() {
  const cartContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartCount.innerText = carrinho.length;

  if (carrinho.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
    cartTotal.innerText = 'R$ 0,00';
    return;
  }

  cartContainer.innerHTML = '';
  let total = 0;

  carrinho.forEach((prod, index) => {
    total += prod.preco;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${prod.nome}</h4>
          <small>R$ ${prod.preco.toFixed(2).replace('.', ',')}</small>
        </div>
        <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
      </div>
    `;
  });

  cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Finalizar Pedido no WhatsApp
function finalizarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer o seguinte pedido personalizado:\n\n";
  let total = 0;

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  mensagem += `\n*Total:* R$ ${total.toFixed(2)}`;

  const url = `https://wa.me/${TELEFONE_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Inicializar renderização
renderProdutos(produtos);
