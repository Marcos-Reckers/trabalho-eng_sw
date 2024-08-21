from flask import Flask, request, redirect, url_for, render_template, send_from_directory
import os

app = Flask(__name__)

# Defina o diretório onde os materiais serão salvos
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_materials_by_professor(professor):
    materials = {
        "livros": [],
        "resumos": [],
        "provas": [],
        "listas": []
    }
    
    # Caminho para os materiais do professor específico
    professor_folder = os.path.join(app.config['UPLOAD_FOLDER'], professor)
    
    for material_type in materials.keys():
        material_folder = os.path.join(professor_folder, material_type)
        if os.path.exists(material_folder):
            materials[material_type] = [
                {"title": f, "url": url_for('static', filename=os.path.join(material_folder, f))}
                for f in os.listdir(material_folder)
                if os.path.isfile(os.path.join(material_folder, f))
            ]
    
    return materials

# Função para garantir que os diretórios necessários existam
def ensure_directories(professor, material_type):
    path = os.path.join(app.config['UPLOAD_FOLDER'], professor, material_type)
    if not os.path.exists(path):
        os.makedirs(path)
    return path


@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

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
    professors = ["marcelo_walter", "professor_2"]
    all_materials = {professor: get_materials_by_professor(professor) for professor in professors}
    return render_template('algprog.html', materials=all_materials)

@app.route('/add_material', methods=['POST'])
def add_material():
    # Recebe os dados do formulário
    material_type = request.form['material_type']
    material_title = request.form['material_title']
    professor = request.form['professor']
    material_file = request.files['material_file']
    
    # Garantir que os diretórios corretos existam
    directory = ensure_directories(professor, material_type)
    
    # Cria um nome de arquivo único para evitar conflitos
    filename = f"{material_title}.{material_file.filename.split('.')[-1]}"
    filepath = os.path.join(directory, filename)
    
    # Salva o arquivo na pasta correta
    material_file.save(filepath)

    # Redireciona de volta para a página principal
    return algprog()

if __name__ == '__main__':
    # Cria o diretório de uploads, se não existir
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)