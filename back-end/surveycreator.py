import status

QUESTION_IDX = 0
KEY_IDX = 1

DIV = 'div'
BR = 'br'

def create(nodes, links):
    outputHtml = ''

    for questKey in nodes:
        quest = nodes[questKey]
        if status.QUEST == quest.status:
            outputHtml += frameStart()
            outputHtml += createQuestion(quest.question)
            outputHtml += createRadio(questKey, 'Tak')
            outputHtml += createRadio(questKey, 'Nie')

            subquests = findSubquests(questKey, nodes, links)
            for subquest in subquests:
                outputHtml += createQuestion(subquest[QUESTION_IDX])
                outputHtml += createNumberInput(questKey, subquest[KEY_IDX])

            outputHtml += createEndTag(DIV)

            outputHtml += createStartTag(BR)

    return outputHtml

def frameStart():
    return ' <div style=\'border-style:groove; width:320px; margin:5px; padding-left:8px; padding-bottom:8px\'>'

def createStartTag(tag):
    return ' <'+ tag +'>'

def createEndTag(tag):
    return ' </' + tag +'>'


def findSubquests(key, nodes, links):
    subquests = []
    try:
        childKeys = links[key]
        for childKey in childKeys:
            childNode = nodes[childKey]
            if status.EXTRA_QUEST == childNode.status:
                subquests.append((childNode.question, childKey))
    except:
        pass

    return subquests

def createQuestion(value):
    return "<p>" + value + "</p>"

def createRadio(key, value):
    return '<input name=\"answer_%s\" value=\"%s\" type=\"radio\"/>%s <br>' % (key, value, value)

def createNumberInput(key, value):
    return '<input name=\"answer_%s_%s\" type=\"number\"/> <br>' % (key, value)
