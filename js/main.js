/* ============================================================
   PIEROGARNIA LIS — js/main.js
   Tudo que o site "faz": menu do celular, filtro do cardápio,
   validação do formulário e o ano automático no rodapé.
   ============================================================ */

   document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1. MENU DO CELULAR (botão hambúrguer) ---------- */
    const botao = document.getElementById("menuBotao");
    const nav = document.getElementById("menuNav");
  
    botao.addEventListener("click", function () {
      const aberto = nav.classList.toggle("aberto");
      botao.classList.toggle("aberto", aberto);
      botao.setAttribute("aria-expanded", aberto);
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
  
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("aberto");
        botao.classList.remove("aberto");
        botao.setAttribute("aria-expanded", "false");
      });
    });
  
    /* ---------- 2. FILTRO DO CARDÁPIO ---------- */
    /* Filtra as CATEGORIAS inteiras (não mais pratos individuais) */
    const botoesFiltro = document.querySelectorAll(".filtro-btn");
    const categorias = document.querySelectorAll(".menu-categoria");
  
    botoesFiltro.forEach(function (botao) {
      botao.addEventListener("click", function () {
        botoesFiltro.forEach(function (b) { b.classList.remove("ativo"); });
        botao.classList.add("ativo");
  
        const filtro = botao.dataset.filtro;
  
        categorias.forEach(function (cat) {
          const grupo = cat.dataset.categoriaGrupo;
          const mostrar = filtro === "todos" || grupo === filtro;
          cat.style.display = mostrar ? "" : "none";
        });
      });
    });
  
    /* ---------- 3. FORMULÁRIO DE CONTATO ---------- */
    const form = document.getElementById("formContato");
    const sucesso = form.querySelector(".form-sucesso");
  
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
  
      let valido = true;
  
      const regras = [
        ["nome", "Escreva seu nome."],
        ["email", "Escreva um e-mail válido."],
        ["mensagem", "Escreva sua mensagem."]
      ];
  
      form.querySelectorAll(".campo").forEach(function (c) {
        c.classList.remove("com-erro");
        const msg = c.querySelector(".erro-msg");
        if (msg) msg.hidden = true;
      });
  
      regras.forEach(function ([id, mensagem]) {
        const campo = document.getElementById(id);
        const valor = campo.value.trim();
        const ok = id === "email"
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
          : valor.length > 0;
  
        if (!ok) {
          valido = false;
          const caixa = campo.closest(".campo");
          caixa.classList.add("com-erro");
          const msg = caixa.querySelector(".erro-msg");
          if (msg) { msg.textContent = mensagem; msg.hidden = false; }
        }
      });
  
      if (!valido) return;
  
      const texto = encodeURIComponent(
        "Olá! Sou " + document.getElementById("nome").value.trim() +
        ". Assunto: " + document.getElementById("assunto").value +
        ". " + document.getElementById("mensagem").value.trim() +
        " (contato: " + document.getElementById("email").value.trim() + ")"
      );
      window.open("https://wa.me/554196348324?text=" + texto, "_blank");
  
      form.reset();
      sucesso.hidden = false;
      setTimeout(function () { sucesso.hidden = true; }, 6000);
    });
  
    /* ---------- 4. ANO AUTOMÁTICO NO RODAPÉ ---------- */
    document.getElementById("ano").textContent = new Date().getFullYear();
  });