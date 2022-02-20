import requests
import json
from tests.fixtures import PLOT_PARAMETERS, DIVER, SCENARIOS


def test_freefall_solver():

    file = open('request_data.json')
    request_data_json = json.load(file)

    url = 'http://localhost:8080/'
    response = requests.post(url, json=request_data_json)

    response_data = response.json()

    print(response_data)
