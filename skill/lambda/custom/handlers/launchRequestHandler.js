const LaunchDirective = require('../documents/launch');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    handlerInput.attributesManager.setSessionAttributes({
      choices: [],
      pickedText: ''
    });

    if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {

      let speech = 'Looks like you need some help making a decision.';
      let commands = [
        {
          type: 'SpeakItem',
          componentId: 'splashScroller',
          highlightMode: 'line',
          align: 'center',
          delay: 1000
        },
        {
          type: 'ControlMedia',
          componentId: 'fork-jumping',
          command: "play",
          delay: 1000
        }          
      ];

      if(handlerInput.requestEnvelope.context.Viewport.pixelWidth >= 1280){
        return handlerInput.responseBuilder
          .addDirective(LaunchDirective())
          .addDirective({
            type: 'Alexa.Presentation.APL.ExecuteCommands',
            token: 'splash-screen',
            commands: commands
          })
          .speak(speech)
          .getResponse();

      }else{
        return handlerInput.responseBuilder
          .addDirective(LaunchDirective())
          .addDirective({
            type: 'Alexa.Presentation.APL.ExecuteCommands',
            token: 'splash-screen',
            commands: commands
          })
          .speak(speech)
          .reprompt(false)
          .getResponse();

      }

    } else {
      return handlerInput.responseBuilder
      .speak('Looks like you need some help making a decision.  Let the fork on the road be your guide.  Add up to four things for the fork to choose from. Say something like, "Add Pizza".')
      .reprompt('Say something like, "Add Pizza"')
      .getResponse();
      
    }
    
  }
};

module.exports = LaunchRequestHandler;
