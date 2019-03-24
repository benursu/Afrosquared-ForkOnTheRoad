'use strict';

// @params
//    intent: String
//    handle: Function<HandlerInput> : Response
//
function Handler(intent, handle) {
    return {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === intent;
        },
        handle: handle
    };
}

module.exports = Handler;
