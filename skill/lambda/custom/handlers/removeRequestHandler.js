const version = require('../helpers/version');
const cdnPath = require('../helpers/cdnPath');
const apiPath = require('../helpers/apiPath');
const Handler = require('../helpers/handler');

const RemoveRequestHandler = Handler('RemoveIntent', handlerInput => {
  const slot = handlerInput.requestEnvelope.request.intent.slots.item.value.toLowerCase();

  const attributesManager = handlerInput.attributesManager;
  let sessionAttributes = attributesManager.getSessionAttributes();

  if(sessionAttributes.pickedText != ''){

    //already picked
    return handlerInput.responseBuilder
    .speak('The fork has choosen ' + sessionAttributes.pickedText + '.  Your destiny awaits.  Enjoy!')
    .getResponse();  

  }else{

    if(sessionAttributes.choices.length == 0){
        //no items
        let speech = 'There is nothing to remove. Say something like, "Add Pizza."';
        let reprompt = 'Say something like, "Add Pizza."';
  
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

      let speechAddOn = '';
      let speechComponent = 'speechPrompt0';
      let reprompt = '';
      
      if(slotPosition == -1){
        //doesn't exists

        if(sessionAttributes.choices.length == 0){
          reprompt = 'Say something like, "Add Pizza."';
  
        }else if(sessionAttributes.choices.length == 1){          
          reprompt = 'Say something like, "Add Tacos."';
  
        }else if(sessionAttributes.choices.length >= 2 && sessionAttributes.choices.length < 4){
          reprompt = 'Try adding something else. Or say, "Spin the Fork."';
  
        }else if(sessionAttributes.choices.length >= 4){
          reprompt = 'The fork is ready. Say, "Spin the Fork."';
        }

        return handlerInput.responseBuilder
          .speak('I can\'t find ' + slot + '. ' + reprompt)
          .reprompt(reprompt)
          .getResponse();  

      }else{
        //remove item

        sessionAttributes.choices.splice(slotPosition, 1);
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

        let speech = 'Removing ' + slot + '. ';
        if(sessionAttributes.choices.length == 0){
          speechComponent = 'speechPrompt0';
          reprompt = 'Say something like, "Add Pizza."';
  
        }else if(sessionAttributes.choices.length == 1){
          speechComponent = 'speechPrompt1';
          reprompt = 'Say something like, "Add Tacos."';
  
        }else if(sessionAttributes.choices.length >= 2 && sessionAttributes.choices.length < 4){
          speechComponent = 'speechPrompt2';
          reprompt = 'Try adding something else. Or say, "Spin the Fork."';
  
        }else if(sessionAttributes.choices.length >= 4){
          speechComponent = 'speechPrompt3';
          reprompt = 'The fork is ready. Say, "Spin the Fork."';
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
            .speak(speech + reprompt)
            .reprompt(reprompt)
            .getResponse(); 

        } 

      }

    }

  }

});

module.exports = RemoveRequestHandler;
