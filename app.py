from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/forum')
def forum():
    return render_template('forum.html')

@app.route('/avaliacao_professor')
def avaliacao_professor():
    return render_template('avaliacao_professor.html')

if __name__ == '__main__':
    app.run(debug=True)
