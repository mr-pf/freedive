import requests

from fixtures import get_request_json_data

URL = 'http://localhost:8080/'


def test_freefall_solver():
    request_json_data = get_request_json_data()

    response = requests.post(URL, json=request_json_data)

    response_data = response.json()

    print(response_data)


def test_freefall_solver_empty_data_returns_500():
    response = requests.post(URL)
    assert response.status_code == 500
