const Alexa = require('ask-sdk-core');

const {
  LaunchRequestHandler,
  HelpRequestHandler,
  EventHandler,
  FallbackHandler,
  CancelIntentHandler,
  BlankIntentHandler,
  AddRequestHandler,
  RemoveRequestHandler,
  SpinRequestHandler
} = require('./handlers');

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak("I hoped you've left hungry for life.").getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpRequestHandler,
    EventHandler,
    FallbackHandler,
    CancelIntentHandler,
    BlankIntentHandler,
    AddRequestHandler,
    RemoveRequestHandler,
    SpinRequestHandler,
    SessionEndedRequestHandler
  )
  .lambda();
