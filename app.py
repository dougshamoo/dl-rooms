# Flask imports
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Fastai imports
from fastai.conv_learner import *
from fastai.dataset import *

# System imports
import os
from time import strftime

# Misc imports
import numpy as np

app = Flask(__name__)
CORS(app, resources='/api/*', origins='http://localhost:1234')

DATA_PATH = './data'
# TRAIN_PATH = f'{DATA_PATH}/train'
TEST_PATH = f'{DATA_PATH}/test'
LABELS_PATH = f'{DATA_PATH}/labels.csv'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

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
  trn_tfms, val_tfms = get_tfms()
  image = val_tfms(open_image(path)) # Load Image using fastai open_image in dataset.py
  # learn.precompute=False # We’ll pass in a raw image, not activations
  log_preds_single = learn.predict_array(image[None]) # Predict Image
  max_prob_index = np.argmax(log_preds_single, axis=1)[0] # Pick the index with highest log probability
  probs = np.exp(log_preds_single)[0] # If you want the probabilities of the classes
  print(data.classes)
  print(probs)
  probs_by_class = dict(zip(data.classes, probs.tolist()))
  print(probs_by_class)

  predicted_class = data.classes[max_prob_index] # Look up tactualPT   return predicted_class
  print(predicted_class)
  return ( predicted_class, probs_by_class )

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET', 'POST'])
def upload():
  if 'image' not in request.files:
    return jsonify(success=False, error='No file received')

  f = request.files['image']

  if f.filename == '':
    return jsonify(success=False, error='The file must have a name')

  if f and allowed_file(f.filename):
    # get name and extension
    f_name, f_ext = secure_filename(f.filename).split('.', 1)

    # build path
    path = os.path.join(app.config['TEST_PATH'], strftime('%Y%m%d-%H%M%S') + '.' + f_ext)
    f.save(path)

    pred = predict_image(path)
    print(pred)
    return jsonify(success=True, predicted_class=pred[0], probs_by_class=pred[1])

  return 'Please POST an image for prediction'

load_model()