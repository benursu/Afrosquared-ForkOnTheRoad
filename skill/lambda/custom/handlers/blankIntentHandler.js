const Handler = require('../helpers/handler');

const BlankIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.MoreIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateSettingsIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageUpIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageDownIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollRightIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollDownIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollLeftIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollUpIntent');
  },
  handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak('I don\'t know that one. You can either, "Add Something", "Remove Something", or "Spin The Fork".')
        .reprompt('You can either, "Add Something", "Remove Something", or "Spin The Fork".')      
        .getResponse()
  }
}

module.exports = BlankIntentHandler;