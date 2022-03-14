import json

import requests


url = 'http://localhost:8080/'
request_file = 'request_data.json'
response_file = 'response_data.json'


def test_freefall_solver_diver_case_returns_200_with_solution():
    with open(request_file)as f:
        request_json = json.load(f)

    response = requests.post(url, json=request_json)

    response_json_actual = response.json()

    with open(response_file) as f:
        response_json_expected = json.load(f)

    assert response.status_code == 200
    assert response_json_expected == response_json_actual


def test_freefall_solver_empty_data_returns_500():
    response = requests.post(url)
    assert response.status_code == 500
