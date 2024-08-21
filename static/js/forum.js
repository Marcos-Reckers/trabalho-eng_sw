document.addEventListener("DOMContentLoaded", function() {
    // Carregar os tópicos do localStorage
    let topics = JSON.parse(localStorage.getItem('topics')) || [];
    const topicsList = document.querySelector('.topics-list');
    topics.forEach(topic => {
        const newTopic = document.createElement('div');
        newTopic.classList.add('topic-item');
        newTopic.textContent = topic.title;
        newTopic.setAttribute("data-content", topic.content);

        // Adicione o evento de clique ao novo tópico
        newTopic.addEventListener("click", function() {
            var title = this.textContent;
            var content = this.getAttribute("data-content");

            // Atualizar o conteúdo da área de exibição do tópico
            document.getElementById("topic-title").textContent = title;
            document.getElementById("topic-content").textContent = content;

            // Exibir a área de exibição do tópico
            document.querySelector(".topic-display").style.display = "block";

            // Limpar a área de comentários
            const commentsDisplay = document.getElementById("comments-display");
            commentsDisplay.innerHTML = '';

            // Carregar os comentários do localStorage
            let comments = JSON.parse(localStorage.getItem(title)) || [];
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.textContent = comment;
                commentsDisplay.appendChild(commentItem);
            });
        });

        topicsList.appendChild(newTopic);
    });

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

    // Adicionar evento de clique aos tópicos
    var topicItems = document.getElementsByClassName("topic-item");
    for (var i = 0; i < topicItems.length; i++) {
        topicItems[i].addEventListener("click", function() {
            var title = this.textContent;
            var content = this.getAttribute("data-content");
    
            // Atualizar o conteúdo da área de exibição do tópico
            document.getElementById("topic-title").textContent = title;
            document.getElementById("topic-content").textContent = content;
    
            // Exibir a área de exibição do tópico
            document.querySelector(".topic-display").style.display = "block";
    
            // Limpar a área de comentários
            const commentsDisplay = document.getElementById("comments-display");
            commentsDisplay.innerHTML = '';
    
            // Carregar os comentários do localStorage
            let comments = JSON.parse(localStorage.getItem(title)) || [];
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.textContent = comment;
                commentsDisplay.appendChild(commentItem);
            });
        });
    }

    document.getElementById('submit-btn').addEventListener('click', function() {
        // Capture os valores do input e textarea
        const title = document.getElementById('new-topic-title').value;
        const content = document.getElementById('new-topic-content').value;
    
        if (title && content) {
            // Crie um novo elemento de tópico
            const newTopic = document.createElement('div');
            newTopic.classList.add('topic-item');
            newTopic.textContent = title;
            newTopic.setAttribute("data-content", content);
    
            // Adicione o novo tópico à lista de tópicos
            const topicsList = document.querySelector('.topics-list');
            topicsList.appendChild(newTopic);
    
            // Adicione o evento de clique ao novo tópico
            newTopic.addEventListener("click", function() {
                var title = this.textContent;
                var content = this.getAttribute("data-content");
    
                // Atualizar o conteúdo da área de exibição do tópico
                document.getElementById("topic-title").textContent = title;
                document.getElementById("topic-content").textContent = content;
    
                // Exibir a área de exibição do tópico
                document.querySelector(".topic-display").style.display = "block";
    
                // Limpar a área de comentários
                const commentsDisplay = document.getElementById("comments-display");
                commentsDisplay.innerHTML = '';
    
                // Carregar os comentários do localStorage
                let comments = JSON.parse(localStorage.getItem(title)) || [];
                comments.forEach(comment => {
                    const commentItem = document.createElement('div');
                    commentItem.classList.add('comment-item');
                    commentItem.textContent = comment;
                    commentsDisplay.appendChild(commentItem);
                });
            });
    
            // Salvar o tópico no localStorage
            let topics = JSON.parse(localStorage.getItem('topics')) || [];
            topics.push({ title: title, content: content });
            localStorage.setItem('topics', JSON.stringify(topics));
    
            // Limpe os campos de input e textarea
            document.getElementById('new-topic-title').value = '';
            document.getElementById('new-topic-content').value = '';
        }
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

    document.getElementById('add-comment-btn').addEventListener('click', function() {
        const commentContent = document.getElementById('comment-content').value;
        const topicTitle = document.getElementById('topic-title').textContent;
        
        if (commentContent) {
            // Crie um novo elemento de comentário
            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            newComment.textContent = commentContent;

            // Adicione o novo comentário à área de exibição de comentários
            document.getElementById('comments-display').appendChild(newComment);

            // Salvar o comentário no localStorage
            let comments = JSON.parse(localStorage.getItem(topicTitle)) || [];
            comments.push(commentContent);
            localStorage.setItem(topicTitle, JSON.stringify(comments));

            // Limpar o campo de comentário
            document.getElementById('comment-content').value = '';
        }
    });
});