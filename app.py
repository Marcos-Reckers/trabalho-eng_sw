from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/avaliacao_professores')
def avaliacao_professores():
    return render_template('avaliacao_professores.html')

if __name__ == '__main__':
    app.run(debug=True)
