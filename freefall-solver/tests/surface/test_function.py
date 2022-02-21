import requests

from fixtures import get_request_json_data


def test_freefall_solver():
    url = 'http://localhost:8080/'
    request_json_data = get_request_json_data()

    response = requests.post(url, json=request_json_data)

    response_data = response.json()

    print(response_data)
