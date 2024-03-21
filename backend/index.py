from flask import Flask, request, render_template, redirect, url_for
from flask_cors import CORS, cross_origin
import json
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello_world():
    with open('db.json', 'r') as open_file:
        json_result = json.load(open_file)
    issues = json_result["tickets"]
    tasks = json_result["tasks"]

    images = os.listdir('static/images/')

    return render_template('index.html', issues=issues, tasks=tasks, impaths=images)

@app.route('/tasks', methods=['GET'])
@cross_origin()
def get_tasks():

    with open('db.json', 'r') as open_file:
         json_result = json.load(open_file)
         tasks = json.dumps(json_result["tasks"])

    return tasks

@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():

    with open('db.json', 'r') as open_file:
         json_result = json.load(open_file)
         users = json.dumps(json_result["users"])

    return users


@app.route('/delete_task/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    with open('db.json', 'r') as open_file:
         data = json.load(open_file)
    tasks = data['tasks']
    for task in tasks:
        if task['id'] == task_id:
            tasks.remove(task)
            break
    with open('db.json', 'w') as f:
        json.dump(data, f)
    return redirect(url_for('hello_world'))


@app.route('/delete_issue/<int:issue_id>', methods=['POST'])
def delete_issue(issue_id):
    with open('db.json', 'r') as open_file:
         data = json.load(open_file)
    tickets = data['tickets']
    for ticket in tickets:
        if ticket['id'] == issue_id:
            tickets.remove(ticket)
            break
    with open('db.json', 'w') as f:
        json.dump(data, f)
    return redirect(url_for('hello_world'))

@app.route('/create_task', methods=['POST'])
def create_task():
    with open('db.json', 'r') as open_file:
         data = json.load(open_file)
    tasks = data['tasks']
    new_task = {
        'id': len(tasks) + 1,
        'title': request.form['title'],
        'description': request.form['description'],
        'category': request.form['category'],
        'done': 'False',
        'user_id': 1
    }
    tasks.append(new_task)
    with open('db.json', 'w') as f:
        json.dump(data, f)
    return redirect(url_for('hello_world'))

@app.route('/fast_prompts', methods=['GET'])
@cross_origin()
def get_fast_prompts():

    with open('db.json', 'r') as open_file:
         json_result = json.load(open_file)
         fast_prompts = json.dumps(json_result["fast_prompts"])

    return fast_prompts    

@app.route('/ticketing', methods=['GET', 'POST'])
@cross_origin()
def ticketing():

    if request.method == 'POST': 
        new_ticket = request.get_json()
        print("new ticket")
        print(new_ticket)

        with open('db.json', 'r') as open_file:
         json_object = json.load(open_file)
         print(json_object["tickets"])
         last_id = json_object["tickets"][-1]["id"]
         
         print(last_id)
         new_ticket["id"] = last_id + 1
         json_object["tickets"].append(new_ticket)
         
         with open('db.json', 'w') as db_file:
            json.dump(json_object, db_file, indent=4)

        return "OK"
    else:      
        with open('db.json', 'r') as open_file:
            json_result = json.load(open_file)
            tickets = json.dumps(json_result["tickets"])
            return tickets      


@app.route('/save_image', methods=['POST', 'GET'])
@cross_origin()
def save_image():
    import base64
    from io import BytesIO
    from PIL import Image
 
    data = json.loads(request.data.decode())
    id = data["id"]
    data = data["image_data"]

    starter = data.find(',')
    image_data = data[starter+1:]
    image_data = bytes(image_data, encoding="utf-8")
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    im.save('static/images/image' + str(id) +'.jpeg')
    
    return 'OK'