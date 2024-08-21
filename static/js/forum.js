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
});

document.getElementById('submit-btn').addEventListener('click', function() {
    // Capture os valores do input e textarea
    const title = document.getElementById('new-topic-title').value;
    const content = document.getElementById('new-topic-content').value;

    // Crie um novo elemento de tópico
    const newTopic = document.createElement('div');
    newTopic.classList.add('topic-item');
    newTopic.textContent = title;

    // Adicione o novo tópico à lista de tópicos
    const topicsList = document.querySelector('.topics-list');
    topicsList.appendChild(newTopic);

    // Limpe os campos de input e textarea
    document.getElementById('new-topic-title').value = '';
    document.getElementById('new-topic-content').value = '';
});

    document.getElementById('search-btn').addEventListener('click', function() {
        // Capture o valor do campo de busca
        const searchTerm = document.getElementById('search-input').value.toLowerCase();

        // Percorra a lista de tópicos
        const topicsList = document.querySelector('.topics-list');
        const topics = topicsList.querySelectorAll('.topic-item');
        
        topics.forEach(topic => {
            // Verifique se o texto do tópico contém a palavra-chave
            if (topic.textContent.toLowerCase().includes(searchTerm)) {
                // Destaque o tópico (por exemplo, alterando a cor de fundo)
                topic.style.backgroundColor = 'yellow';
            } else {
                // Remova o destaque dos tópicos que não correspondem
                topic.style.backgroundColor = '';
            }
        });
    });
