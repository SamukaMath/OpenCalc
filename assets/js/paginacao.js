 // Configuração: número de itens por página
 const itemsPerPage = 5;

 // Seleciona o container da seção e da paginação
 const section = document.getElementById("contentSection");
 const pagination = document.querySelector(".pagination");
 const items = section.querySelectorAll("ul li"); // Seleciona os itens da lista

 // Função para renderizar uma página específica
 function renderPage(page) {
     // Oculta todos os itens
     items.forEach(item => item.classList.remove("active"));

     // Calcula os índices inicial e final dos itens
     const start = (page - 1) * itemsPerPage;
     const end = start + itemsPerPage;

     // Exibe apenas os itens da página atual
     for (let i = start; i < end; i++) {
         if (items[i]) items[i].classList.add("active");
     }
 }

 // Função para criar os botões de paginação
 function createPagination(totalItems, itemsPerPage) {
     const totalPages = Math.ceil(totalItems / itemsPerPage);

     // Limpa a paginação anterior
     pagination.innerHTML = "";

     // Adiciona botões para cada página
     for (let i = 1; i <= totalPages; i++) {
         const link = document.createElement("a");
         link.href = "#";
         link.textContent = i;
         if (i === 1) link.classList.add("active"); // Torna a primeira página ativa
         link.addEventListener("click", (e) => {
             e.preventDefault();

             // Atualiza a classe "active" nos botões
             const links = pagination.querySelectorAll("a");
             links.forEach(l => l.classList.remove("active"));
             link.classList.add("active");

             // Renderiza a página correspondente
             renderPage(i);
         });
         pagination.appendChild(link);
     }
 }

 // Inicializa a paginação e renderiza a primeira página
 createPagination(items.length, itemsPerPage);
 renderPage(1);