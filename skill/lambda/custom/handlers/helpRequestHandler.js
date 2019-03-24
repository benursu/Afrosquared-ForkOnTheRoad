const Handler = require('../helpers/handler');

const HelpRequestHandler = Handler('AMAZON.HelpIntent', handlerInput => {

  let speech = 'You can either, "Add Something", "Remove Something", or "Spin The Fork".';

  if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
    if(handlerInput.requestEnvelope.context.Viewport.pixelWidth >= 1280){
      return handlerInput.responseBuilder
        .speak(speech)
        .getResponse();

    }else{
      return handlerInput.responseBuilder
        .speak(speech)
        .reprompt(false)
        .getResponse();

    }

  }else{

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(speech)
      .getResponse();

  }  

});

module.exports = HelpRequestHandler;
