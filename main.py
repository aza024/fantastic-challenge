import requests 
import datetime
import time
import threading
import json

from flask import Flask

app = Flask(__name__, 
            static_url_path='',
            static_folder='static')

class ResponseList(object):
    def __init__(self):
        self.responses = []

    def add_response(self, response):
        self.responses.append(response)
        self.remove_old_entries()
    
    def remove_old_entries(self):
        pass

    def to_json(self):
        return json.dumps(
            [
                {
                    'timestamp': r.timestamp,
                    'status_code': r.status_code
                }
                for r in self.responses
            ]
        )

class Response(object):
    def __init__(self, timestamp, status_code):
        self.timestamp = timestamp 
        self.status_code = status_code


response_list = ResponseList()

def query_loop(): 

    while True:
        print('making request')
        r = requests.get('http://localhost:12345/')
        r.status_code
        print(r.status_code)

        req_time = int(time.time())
        data = Response(req_time, r.status_code)   
        
        response_list.add_response(data)

        time.sleep(30)


@app.route('/stats', methods=['GET'])
def get_response_stats():
    return response_list.to_json()


@app.route('/home', methods=['GET'])
def root():
    #f = file
    with open('index.html') as f:
        data = f.read()
    
    print(data)
    return data


if __name__ == '__main__':
    threading.Thread(target=query_loop).start()
    app.run(port=8000)


# time.sleep(15)
# thread.start_new_thread ( function, args[, kwargs] )