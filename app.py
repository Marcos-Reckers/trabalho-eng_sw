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
def home():
    return render_template('home.html')

# Rota para criar um novo tópico no fórum
@app.route('/forum', methods=['POST'])
def add_topic():
    new_topic_title = request.form.get('titulo')
    topics.append({"title": new_topic_title})
    return render_template('forum.html', etapa_disciplinas=disciplinas["CIC"], topics=topics, selected="CIC")

@app.route('/forum')
def forum():
    return render_template('forum.html')

@app.route('/avaliacao_professor')
def avaliacao_professor():
    return render_template('avaliacao_professor.html')

@app.route('/algprog')
def algprog():
    return render_template('diciplinas/algprog.html')

if __name__ == '__main__':
    app.run(debug=True)
