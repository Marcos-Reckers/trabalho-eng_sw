from flask import Flask, request, redirect, url_for, render_template
import os

app = Flask(__name__)

# Defina o diretório onde os materiais serão salvos
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

@app.route('/algprog')
def algprog():
    return render_template('diciplinas/algprog.html')

@app.route('/add_material', methods=['POST'])
def add_material():
    # Recebe os dados do formulário
    material_type = request.form['material_type']
    material_title = request.form['material_title']
    material_file = request.files['material_file']
    
    # Cria o caminho para salvar o arquivo
    if material_file:
        filename = f"{material_title}_{material_type}.{material_file.filename.split('.')[-1]}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        material_file.save(filepath)
    
    # Aqui você pode adicionar o material ao banco de dados ou lista de materiais

    # Redireciona de volta para a página principal
    return redirect(url_for('home'))

if __name__ == '__main__':
    # Cria o diretório de uploads, se não existir
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)