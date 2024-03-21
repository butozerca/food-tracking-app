from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
from openai import OpenAI
import os
import requests

client = OpenAI()
api_key=os.environ.get('OPENAI_API_KEY')

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/transcribe", methods=['POST'])
def transcribe():
    print("transcribe\n")
    print(f"req: {request.data}")

    audio_url = request.json['url']
    print(f"url: {audio_url}")

    file = requests.get(audio_url)

    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=file.content
    )
    response = make_response(transcription.text)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


if __name__ == "__main__":
    app.run(port=5000)