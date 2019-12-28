import sys
import fcntl
import json

import serial
from flask import Flask, current_app
from flask_restful import reqparse, abort, Api, Resource
from flask_restful import marshal_with, fields

import ac

PORT = '/dev/blabla'
BAUD = 9600
PREFIX = '.'

CACHEFILE = '.ac_state'


class AirConditioner(Resource):
    def get(self):
        with open(CACHEFILE) as f:
            try:
                fcntl.lockf(f, fcntl.LOCK_SH)
            except IOError:
                abort(503)
            state = json.load(f)
            fcntl.lockf(f, fcntl.LOCK_UN)
        return state

    def post(self):
        
