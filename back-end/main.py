#!/bin/python

import json
from twisted.internet.defer import succeed

from klein import Klein
from twisted.web.static import File

class Node(object):

    id = 0
    question = ''
    min_percent = 0
    name = ''

    def __init__(self, id, question, min_percent, name):
        self.id = id
        self.question = question
        self.min_percent = min_percent
        self.name = name

class IndexController(object):

    app = Klein()

    def __init__(self):
        self.__items__ = {}
        self.nodes = []
        self.links = {}

    @app.route('/', branch=True)
    def mainPage(self, request):
        request.redirect('/index.html')
        return File('../pages/')

    @app.route('/diagramData', methods=['POST'])
    def saveAlarmData(self, request):
        data = json.loads(request.content.read())
        for node in data['nodeDataArray']:
            nodeToCreate = Node(node['key'], node['question'], node['value'], node['name'])
            self.nodes.append(nodeToCreate)

    @app.route('/diagramData', methods=['GET'])
    def getNodes(self, request):
        return len(self.nodes) + ' ' + len(self.links)

if __name__ == '__main__':
    mainController = IndexController()

    mainController.app.run('192.168.8.101', 8081)
