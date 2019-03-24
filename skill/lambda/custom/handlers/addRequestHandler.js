const version = require('../helpers/version');
const cdnPath = require('../helpers/cdnPath');
const apiPath = require('../helpers/apiPath');
const Handler = require('../helpers/handler');

const AddRequestHandler = Handler('AddIntent', handlerInput => {
  const slot = handlerInput.requestEnvelope.request.intent.slots.item.value.toLowerCase();

  const attributesManager = handlerInput.attributesManager;
  let sessionAttributes = attributesManager.getSessionAttributes();

  if(sessionAttributes.pickedText != ''){

    //already picked
    return handlerInput.responseBuilder
      .speak('The fork has choosen ' + sessionAttributes.pickedText + '.  Your destiny awaits.  Enjoy!')
      .getResponse();  

  }else{

    if(sessionAttributes.choices.length == 4){
      
      //already 4 things
      
      let speech = 'You\'ve already added four things. Say, "Spin the Fork."';
      let reprompt = 'Say, "Spin the Fork."';

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
          .reprompt(reprompt)
          .getResponse();

      }

    }else{

      let slotPosition = sessionAttributes.choices.indexOf(slot);
      
      if(slotPosition == -1){
        //add new

        sessionAttributes.choices.push(slot);
        attributesManager.setSessionAttributes(sessionAttributes);

        let choiceQueryString = '';
        for(var i = 0; i < 4; i++){
          if(sessionAttributes.choices[i] == null){
            choiceQueryString += '&choice' + i + '=';
          }else{
            choiceQueryString += '&choice' + i + '=' + encodeURIComponent(sessionAttributes.choices[i]);
          }      
        }

        let hintTextComponentHide = 'hintText3';
        let hintTextComponentShow = 'hintText2';
        if(sessionAttributes.choices.length >= 2){
          hintTextComponentHide = 'hintText2';
          hintTextComponentShow = 'hintText3';
        }

        let speech = 'Adding ' + slot + '. ';
        let speechAddOn = '';
        let speechComponent = 'speechPrompt0';
        let reprompt = '';

        if(sessionAttributes.choices.length == 1){
          speechAddOn = 'Try adding something else.';
          speechComponent = 'speechPrompt1';
          reprompt = 'Say something like, "Add Tacos."';
 
        }else if(sessionAttributes.choices.length >= 2 && sessionAttributes.choices.length < 4){
          speechAddOn = 'Try adding something else. Or say, "Spin the Fork."';
          speechComponent = 'speechPrompt2';
          reprompt = 'Try adding something else. Or say, "Spin the Fork."';

        }else if(sessionAttributes.choices.length >= 4){
          speechAddOn = 'The fork is ready. Say, "Spin the Fork."';
          speechComponent = 'speechPrompt3';
          reprompt = 'Say, "Spin the Fork."';

        }
        
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {

          let commands = [        
            {
              when: '${viewport.width > 1024}',
              type: 'SetValue',
              componentId: 'homeImage',
              property: 'source',
              value: `${apiPath}?v=${version}&size=large=` + choiceQueryString
            },
            {
              when: '${viewport.width > 480 && viewport.width <= 1024}',
              type: 'SetValue',
              componentId: 'homeImage',
              property: 'source',
              value: `${apiPath}?v=${version}&size=medium` + choiceQueryString
            },
            {
              when: '${viewport.width <= 480}',
              type: 'SetValue',
              componentId: 'homeImage',
              property: 'source',
              value: `${apiPath}?v=${version}&size=small` + choiceQueryString
            },
            {
              type: 'SetValue',
              componentId: 'hintText1',
              property: 'opacity',
              value: 0
            },
            {
              type: 'SetValue',
              componentId: hintTextComponentHide,
              property: 'opacity',
              value: 0
            },
            {
              type: 'SetValue',
              componentId: hintTextComponentShow,
              property: 'opacity',
              value: 1
            },
            {
              type: 'SpeakItem',
              componentId: speechComponent,
              highlightMode: 'line',
              align: 'center'
            }              
          ];

          if(handlerInput.requestEnvelope.context.Viewport.pixelWidth >= 1280){
            return handlerInput.responseBuilder
              .addDirective({
                type: 'Alexa.Presentation.APL.ExecuteCommands',
                token: 'splash-screen',
                commands: commands
              })
              .speak(speech)
              .getResponse();  

          }else{
            return handlerInput.responseBuilder
              .addDirective({
                type: 'Alexa.Presentation.APL.ExecuteCommands',
                token: 'splash-screen',
                commands: commands
              })
              .speak(speech)
              .reprompt(false)
              .getResponse();  

          }

        }else{
          return handlerInput.responseBuilder
            .speak(speech + speechAddOn)
            .reprompt(reprompt)
            .getResponse(); 
            
        }

      }else{

        //already exists
        return handlerInput.responseBuilder
          .speak(slot + ' is already added. Try adding something else.')
          .reprompt('Try adding something else.')
          .getResponse();  

      }

    }

  }

});

module.exports = AddRequestHandler;
