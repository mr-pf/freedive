import json

from main import execute


def test_execute():
    file = open('request_data.json')
    request_data_json = json.load(file)

    execute(request_data_json)


