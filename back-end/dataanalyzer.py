import json
import status

class Node(object):

    def __init__(self, question, min_percent, name):
        self.question = question
        self.min_percent = min_percent
        self.name = name
        self.status = ''

class DataProcessor(object):

    def __init__(self):
        self.nodes = {}
        self.links = {}

    def processData(self, request):
        self.nodes = {}
        self.links = {}

        data = json.loads(request.content.read())
        for node in data['nodeDataArray']:
            nodeToCreate = Node(node['question'], node['value'], node['name'])
            nodeToCreate.status = status.statuses[node['color']]
            self.nodes[node['key']] = nodeToCreate

        for link in data['linkDataArray']:
            self.appendLinkToMap(link['from'], link['to'])

    def fetchData(self):
        return (self.nodes, self.links)

    def appendLinkToMap(self, fromKey, toKey):
        if (fromKey in self.links):
            self.links[fromKey].append(toKey)
        else:
            self.links[fromKey] = [toKey]
