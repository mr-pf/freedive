from json import JSONEncoder


class CustomEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__
