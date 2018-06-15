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

app = Flask(__name__)
CORS(app, resources='/api/*', origins='http://localhost:1234')

DATA_PATH = './data'
TRAIN_PATH = f'{DATA_PATH}/train'
TEST_PATH = f'{DATA_PATH}/test'
LABELS_PATH = f'{DATA_PATH}/labels.csv'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app.config['TEST_PATH'] = TEST_PATH

def get_classifier_data(sz, bs=64):
  tfms = tfms_from_model(arch, sz, aug_tfms=transforms_side_on, max_zoom=1.1)
  return ImageClassifierData.from_csv(DATA_PATH, 'train', LABELS_PATH, tfms=tfms)

def load_model():
  global arch, learn, sz, bs
  print('loading model...')
  try:
    arch = resnet50
    sz = 224
    bs = 16
    data = get_classifier_data(sz, bs)
    learn = ConvLearner.pretrained(arch, data)
    learn.load('224_all_layers')
    # TODO: save models with precompute=False
    # learn.precompute = False
    print('model loaded successfully')
  except Exception as e:
    print(f'Error: {e}')


# def get_tfms():
#   return tfms_from_model(arch, sz)

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET', 'POST'])
def upload():
  if 'image' not in request.files:
    return jsonify(error='WHERE IS THE FILE?!?')

  f = request.files['image']

  if f.filename == '':
    return jsonify(error='NO SELECTED FILE!!!')

  if f and allowed_file(f.filename):
    # get name and extension
    f_name, f_ext = secure_filename(f.filename).split('.', 1)

    # build path
    path = os.path.join(app.config['TEST_PATH'], strftime('%Y%m%d-%H%M%S') + '.' + f_ext)
    f.save(path)
    return jsonify(filename=f_name)

  return 'Please POST an image for prediction'

load_model()