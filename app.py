from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import pyttsx3
import openai
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set your OpenAI API key here
openai.api_key = os.environ.get('OPENAI_API_KEY')

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            return "Sorry, I did not understand that."
        except sr.RequestError:
            return "Sorry, my speech service is down."

def generate_response(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, I encountered an error while processing your request."

def speak(text):
    engine.say(text)
    engine.runAndWait()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400
    
    user_message = data['message']
    response = generate_response(user_message)
    
    # Optional: Speak the response
    # speak(response)
    
    return jsonify({
        "response": response,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/start-voice', methods=['GET'])
def start_voice():
    text = recognize_speech()
    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(debug=True) 