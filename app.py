from flask import Flask, render_template, request

app = Flask(__name__)

# Dicionário com disciplinas separadas por CIC e ECP
disciplinas = {
    "CIC": ["AlgProg", "Cálculo 1", "Mat Discreta", "ARQ0"],
    "ECP": ["Circuitos", "Controle", "Sinais", "Eletrônica"]
}

# Exemplo de tópicos de fórum para demonstração
topics = [
    {"title": "A prova de eng de software é muito difícil??"},
    {"title": "Alguém tem a lista de exercícios de Cálculo 1?"},
    {"title": "Melhores práticas para estudar Matemática Discreta?"},
    {"title": "Qual é a melhor maneira de se preparar para a prova de Algoritmos?"},
    {"title": "Dicas para o trabalho final de ARQ0"},
]

# Rota principal
@app.route('/')
def index():
    etapa_disciplinas = disciplinas["CIC"]
    return render_template('forum.html', etapa_disciplinas=etapa_disciplinas, selected="CIC", topics=topics)

# Rota para alternar entre CIC e ECP
@app.route('/toggle/<string:curso>')
def toggle(curso):
    etapa_disciplinas = disciplinas.get(curso, [])
    return render_template('forum.html', etapa_disciplinas=etapa_disciplinas, selected=curso, topics=topics)

# Rota para criar um novo tópico no fórum
@app.route('/forum', methods=['POST'])
def add_topic():
    new_topic_title = request.form.get('titulo')
    topics.append({"title": new_topic_title})
    return render_template('forum.html', etapa_disciplinas=disciplinas["CIC"], topics=topics, selected="CIC")

# Rota para buscar tópicos no fórum
@app.route('/forum/search', methods=['GET'])
def search_forum():
    search_query = request.args.get('search', '').lower()
    filtered_topics = [topic for topic in topics if search_query in topic['title'].lower()]
    return render_template('forum.html', etapa_disciplinas=disciplinas["CIC"], topics=filtered_topics, selected="CIC")

if __name__ == '__main__':
    app.run(debug=True)
