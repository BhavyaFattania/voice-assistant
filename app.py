from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all domains
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type"]
}})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        print("Received request")  # Debug print
        data = request.json
        print("Received data:", data)  # Debug print
        
        # Simple echo response for testing
        user_message = data['messages'][0]['content']
        return jsonify({
            "response": f"You said: {user_message}"
        })

    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is working!"})

if __name__ == '__main__':
    print("Server starting...")
    # Make sure to bind to 0.0.0.0 to accept external connections
    app.run(debug=True, host='0.0.0.0', port=5000) 