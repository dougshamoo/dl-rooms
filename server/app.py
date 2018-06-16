# Flask imports
from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Fastai imports
from fastai.conv_learner import ConvLearner, resnet50
from fastai.dataset import ImageClassifierData, tfms_from_model, transforms_side_on, open_image

# System imports
import os
from time import strftime

# Misc imports
import numpy as np

app = Flask(__name__)
CORS(app, resources='/api/*', origins='http://localhost:1234')
CORS(app, resources='/images/*', origins='http://localhost:1234')

DATA_PATH = 'server/data'
TEST_PATH = f'{DATA_PATH}/test'
LABELS_PATH = f'{DATA_PATH}/labels.csv'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
BASE_URL = 'http://localhost:5000'

app.config['BASE_URL'] = BASE_URL
app.config['TEST_PATH'] = TEST_PATH

def get_tfms():
  return tfms_from_model(arch, sz, aug_tfms=transforms_side_on, max_zoom=1.1)

def get_classifier_data(sz, bs=64):
  tfms = get_tfms()
  return ImageClassifierData.from_csv(DATA_PATH, 'train', LABELS_PATH, tfms=tfms)

def load_model():
  global arch, learn, sz, bs, data
  print('loading model...')
  try:
    arch = resnet50
    sz = 224
    bs = 16
    data = get_classifier_data(sz, bs)
    learn = ConvLearner.pretrained(arch, data)
    learn.load('224_all_layers')
    # NOTE: save models with precompute=False
    # Uncomment this if you didn't:
    # learn.precompute = False
    print('model loaded successfully')
  except Exception as e:
    print(f'Error: {e}')

def predict_image(path):
  _, val_tfms = get_tfms()
  image = val_tfms(open_image(path)) # Load Image using fastai open_image in dataset.py
  log_preds_single = learn.predict_array(image[None]) # Predict Image
  max_prob_index = np.argmax(log_preds_single, axis=1)[0] # Pick the index with highest log probability
  probs = np.exp(log_preds_single)[0] # Get an array of probabilities for the classes
  probs_by_class = dict(zip(data.classes, probs.tolist())) # Create a dictionary of class: probability
  predicted_class = data.classes[max_prob_index] # Get predicted class
  return ( predicted_class, probs_by_class ) # Return a tuple because reasons, TODO: refactor

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload():
  if 'image' not in request.files:
    return jsonify(success=False, error='No file received')

  image = request.files['image']

  if image.filename == '':
    return jsonify(success=False, error='The file must have a name')

  if image and allowed_file(image.filename):
    # get name and extension
    secure_file_name = secure_filename(image.filename).rsplit('.', 1)
    f_name, f_ext = secure_file_name

    # build path and save file
    save_name = f"{strftime('%Y%m%d-%H%M%S')}.{f_ext}"
    path = os.path.join(app.config['TEST_PATH'], save_name)
    image.save(path)

    # predict the image
    predicted_class, probs_by_class = predict_image(path)

    # build url to get the image later
    url = os.path.join(app.config['BASE_URL'], 'images', save_name)

    return jsonify(
      success=True,
      name=f_name,
      url=url,
      predictedClass=predicted_class,
      probsByClass=probs_by_class
    )

  return 'Please POST an image for prediction'

@app.route('/images/<string:image_name>', methods=['GET'])
def get_image(image_name):
  return send_from_directory('data/test', image_name)

print(os.getcwd())
load_model()