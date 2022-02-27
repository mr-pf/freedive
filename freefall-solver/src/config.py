import os


def environment():
    return os.environ.get('ENVIRONMENT', 'dev')

