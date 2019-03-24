const version = require('../helpers/version');
const cdnPath = require('../helpers/cdnPath');
const apiPath = require('../helpers/apiPath');
const Handler = require('../helpers/handler');
const PickedDirective = require('../documents/picked');

const SpinRequestHandler = Handler('SpinIntent', handlerInput => {
  
  const attributesManager = handlerInput.attributesManager;
  let sessionAttributes = attributesManager.getSessionAttributes();

  if(sessionAttributes.pickedText != ''){

    //already picked
    return handlerInput.responseBuilder
      .speak('The fork has choosen ' + sessionAttributes.pickedText + '.  Your destiny awaits.  Enjoy!')
      .getResponse();  

  }else{

    if(sessionAttributes.choices.length < 2){

        //need 2

        let speechAddOn = '';

        if(sessionAttributes.choices.length == 0){
          speechAddOn = 'Say something like, "Add Pizza."';
  
        }else if(sessionAttributes.choices.length == 1){
          speechAddOn = 'Say something like, "Add Tacos."';
        }

        return handlerInput.responseBuilder
          .speak('You need at least two things for the fork to choose from. ' + speechAddOn)
          .reprompt(speechAddOn)
          .getResponse();  

    }else{

      let pickedID = Math.floor(Math.random() * sessionAttributes.choices.length);
      let pickedText = sessionAttributes.choices[pickedID];

      sessionAttributes.pickedText = pickedText;
      attributesManager.setSessionAttributes(sessionAttributes);
    
      let choiceQueryString = '';
      for(var i = 0; i < 4; i++){
        if(sessionAttributes.choices[i] == null){
          choiceQueryString += '&choice' + i + '=';
        }else{
          choiceQueryString += '&choice' + i + '=' + encodeURIComponent(sessionAttributes.choices[i]);
        }      
      }

      if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {

        return handlerInput.responseBuilder

          .addDirective(
            PickedDirective({
              pickedID: pickedID,
              pickedText: pickedText,
              choiceQueryString: choiceQueryString
            })
          )
          .addDirective({
            type: 'Alexa.Presentation.APL.ExecuteCommands',
            token: 'picked',
            commands: [
              {
                type: 'SpeakItem',
                componentId: 'text-start',
                highlightMode: 'line',
                align: 'center'
              },              
              {
                type: 'ControlMedia',
                componentId: 'fork',
                command: 'play'
              },        
              {
                type: 'Idle',
                delay: 6000
              },                     
              {
                type: 'SpeakItem',
                componentId: 'fork-picked',
                highlightMode: 'line',
                align: 'center'
              },
              {
                type: 'SetValue',
                componentId: 'pickedImage',
                property: 'opacity',
                value: 1
              },
              {
                type: 'Idle',
                delay: 600
              },               
              {
                type: 'SpeakItem',
                componentId: 'fork-enjoy',
                highlightMode: 'line',
                align: 'center'
              },
              {
                type: 'Idle',
                delay: 4000
              }              
            ]
          })   
          .withShouldEndSession(true)
          .getResponse();    
        
        }else{

          return handlerInput.responseBuilder
            .speak('Ok. Here I go. Spinning fork to choose your path. <audio src="' + cdnPath + 'web/assets/sound/fork-jumping-ssml.mp3?v=' + version + '" /> The fork has choosen ' + pickedText + '.  Your destiny awaits.  Enjoy!')
            .withShouldEndSession(true)
            .getResponse();           

        }

      }
  }

});

module.exports = SpinRequestHandler;
