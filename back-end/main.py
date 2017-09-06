#!/bin/python
from surveycreator import create
from dataanalyzer import DataProcessor

import json
from twisted.internet.defer import succeed

from klein import Klein
from twisted.web.static import File

from properties import url

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
    data_processor = DataProcessor()


    def __init__(self):
        self.__items__ = {}

    @app.route('/', branch=True)
    def mainPage(self, request):
        request.redirect('/survey.html')
        return File('../front-end/')

    @app.route('/diagramData', methods=['POST'])
    def saveAlarmData(self, request):
        self.data_processor.processData(request)

    @app.route('/diagramData', methods=['GET'])
    def getNodes(self, request):
        return str(self.data_processor.fetchData())

    @app.route('/generateSurvey', methods=['GET'])
    def generateSurvey(self, request):
        return create(self.data_processor.nodes, self.data_processor.links)

    @app.route('/processSurvey', methods=['GET'])
    def processSurvey(self, request):
        return create(self.data_processor.nodes, self.data_processor.links)

if __name__ == '__main__':
    mainController = IndexController()

    mainController.app.run(url, 8081)
