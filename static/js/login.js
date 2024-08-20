// Função para processar o login
function login(event) {
    event.preventDefault(); // Evita o reload da página ao submeter o formulário

    const username = document.getElementById('username').value;
    const cardNumber = document.getElementById('card-number').value;
    const password = document.getElementById('password').value;

    // Validação simples para o número do cartão (deve ter exatamente 8 dígitos numéricos)
    const cardNumberRegex = /^[0-9]{8}$/;

    if (!cardNumberRegex.test(cardNumber)) {
        alert("O número do cartão deve ter exatamente 8 dígitos numéricos.");
        return;
    }

    // Como é um MVP, assumimos que o login sempre é bem-sucedido
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
    
    // Redireciona para a página inicial ou outra página protegida
    window.location.href = '/'; // Substitua '/home' pela URL correta
}

// Função para verificar o estado de login em outras páginas
function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        // Se o usuário não estiver logado, redireciona para a página de login
        window.location.href = 'login.html';
    } else {
        // Exibir informações sobre o usuário logado (opcional)
        const username = localStorage.getItem('username');
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
            userInfoElement.textContent = `Bem-vindo, ${username}!`;
        }
    }
}

// Adicionar a lógica ao evento de envio do formulário de login
document.getElementById('login-form').addEventListener('submit', login);

// Verificar o estado do login em cada página
// window.onload = checkLogin;
