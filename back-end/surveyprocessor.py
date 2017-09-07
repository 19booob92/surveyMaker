import json

def process(request):
    data = json.loads(request.content.read())

    for answer in data:
        print(answer)
