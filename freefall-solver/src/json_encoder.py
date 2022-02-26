from dataclasses import is_dataclass
from json import JSONEncoder


class CustomEncoder(JSONEncoder):

    def default(self, o):
        if is_dataclass(o):
            return o.__dict__
        else:
            return JSONEncoder.default(o)
