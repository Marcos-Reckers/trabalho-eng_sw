document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0"; // Remove o padding ao colapsar
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    var submenuBtns = document.getElementsByClassName("submenu-btn");
    var submenuContents = document.getElementsByClassName("submenu-content");

    for (var i = 0; i < submenuBtns.length; i++) {
        submenuBtns[i].addEventListener("click", function() {
            for (var j = 0; j < submenuBtns.length; j++) {
                submenuBtns[j].classList.remove("active");
                submenuContents[j].style.display = "none";
            }
            this.classList.add("active");
            document.getElementById(this.dataset.target).style.display = "block";
        });
    }

    // Mostrar inicialmente o submenu CIC
    document.getElementById("cic").style.display = "block";

    // Verificar se o usuário está logado
    const userNameElement = document.getElementById('user-name');
    const loginLink = document.getElementById('login-link');
    const addMaterialForm = document.getElementById('add-material-form'); // Seleciona a div que será ocultada

    // Função para verificar o estado do login
    function checkLoginStatus() {
        const username = sessionStorage.getItem('username');
        
        if (username) {
            // Se o usuário estiver logado, esconder o botão de login e mostrar o nome do usuário
            loginLink.style.display = 'none'; // Oculta o link de login
            userNameElement.textContent = `Bem-vindo, ${username}!`; // Exibe o nome do usuário
        } else {
            // Se o usuário não estiver logado, mostrar o botão de login
            loginLink.style.display = 'block'; // Mostra o link de login
            userNameElement.textContent = ''; // Remove o nome do usuário
            addMaterialForm.style.display = 'none';
        }
    }

    // Chama a função para verificar o estado do login ao carregar a página
    checkLoginStatus();
});
