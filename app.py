from flask import Flask, render_template, jsonify, request
import pandas as pd
import os
import json 
from flask import Response

app = Flask(__name__)

# Define the path to the datasets folder
DATASETS_DIR = os.path.join(os.path.dirname(__file__), 'datasets')

# Load datasets based on crop type
def load_dataset(crop_name):
    file_path = os.path.join(DATASETS_DIR, f'{crop_name}_synthetic_full_actions.csv')
    print(file_path)
    if os.path.exists(file_path):
        return pd.read_csv(file_path)
    else:
        return pd.DataFrame()  # Return an empty DataFrame if the file is not found

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/simulate')
def simulate():
    crop_name = request.args.get('crop', default='rice', type=str)  # Default crop is 'rice'
    dataset = load_dataset(crop_name)
    if not dataset.empty:
        # Select a random row from the dataset
        simulated_data = dataset.sample(n=1).to_dict(orient='records')[0]
        return jsonify(simulated_data)
    else:
        json_string = json.dumps(simulated_data, indent=2, sort_keys=False)
        return Response(json_string, mimetype='application/json')
    
if __name__ == '__main__':
    app.run(debug=True)
