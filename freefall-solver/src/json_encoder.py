from dataclasses import is_dataclass
from json import JSONEncoder
import numpy as np


class CustomEncoder(JSONEncoder):

    def default(self, o):
        if is_dataclass(o):
            return o.__dict__
        elif isinstance(o, np.ndarray):
            return JSONEncoder().default(list(o))
        else:
            return JSONEncoder().default(o)
