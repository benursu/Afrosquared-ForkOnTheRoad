// const SolarSystemResponse = require('../multimodal_responses/solarSystemResponse');
// const ExploreResponse = require('../multimodal_responses/exploreResponse');

const EventHandler = {
  canHandle: handlerInput =>
    handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent',
  handle: handlerInput => {
    const args = handlerInput.requestEnvelope.request.arguments;
    const event = args[0];
    const data = args[1];

    // switch (event) {
    //   case 'startEvent':
    //     return SolarSystemResponse(handlerInput);
    //   case 'exploreEvent':
    //     return ExploreResponse(handlerInput, data, false);
    //   default:
    //     return SolarSystemResponse(handlerInput);
    // }
  }
};

module.exports = EventHandler;
