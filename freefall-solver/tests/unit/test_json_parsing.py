from fixtures import get_request_json_data, DIVER_CASE
from json_parsing import parse_diver_case


def test_parse_diver_case():
    json_data = get_request_json_data()

    result = parse_diver_case(json_data)

    assert result == DIVER_CASE
