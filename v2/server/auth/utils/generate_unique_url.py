import random
import string

def generate_unique_url():
    return ''.join(random.choice(string.ascii_letters) for _ in range(30))
