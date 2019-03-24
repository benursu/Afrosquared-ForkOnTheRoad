const version = require('../helpers/version');
const cdnPath = require('../helpers/cdnPath');
const apiPath = require('../helpers/apiPath');

module.exports = (resource) => ({
  type: 'Alexa.Presentation.APL.RenderDocument',
  token: 'picked',
  document: {
    type: 'APL',
    version: '1.0',
    theme: 'dark',
    import: [
      {
        name: 'alexa-styles',
        version: '1.0.0-beta'
      },
      {
        name: 'alexa-layouts',
        version: '1.0.0-beta'
      },
      {
        name: 'layouts',
        version: '1.0.0',
        source: `${cdnPath}skill/apl/layouts.json?v=${version}`
      },
      {
        name: 'styles',
        version: '1.0.0',
        source: `${cdnPath}skill/apl/styles.json?v=${version}`
      }
    ],
    resources: [
      {
        when: '${viewport.width > 1024}',
        strings: {
          loadingImage: `${cdnPath}web/assets/skill/loading_1280_800.png?v=${version}`
        }
      },
      {
        when: '${viewport.width > 480 && viewport.width <= 1024}',
        strings: {
          loadingImage: `${cdnPath}web/assets/skill/loading_1024_600.png?v=${version}`
        }
      },
      {
        when: '${viewport.width <= 480}',
        strings: {
          loadingImage: `${cdnPath}web/assets/skill/loading_480_480.png?v=${version}`
        }
      },      
      {
        when: '${viewport.width > 1024}',
        strings: {
          homeImage: `${apiPath}?v=${version}&size=large` + resource.choiceQueryString
        }
      },
      {
        when: '${viewport.width > 480 && viewport.width <= 1024}',
        strings: {
          homeImage: `${apiPath}?v=${version}&size=medium` + resource.choiceQueryString
        }
      },
      {
        when: '${viewport.width <= 480}',
        strings: {
          homeImage: `${apiPath}?v=${version}&size=small` + resource.choiceQueryString
        }
      },
      {
        when: '${viewport.width > 1024}',
        strings: {
          pickedImage: `${apiPath}?v=${version}&size=large&picked=` + resource.pickedText
        }
      },
      {
        when: '${viewport.width > 480 && viewport.width <= 1024}',
        strings: {
          pickedImage: `${apiPath}?v=${version}&size=medium&picked=` + resource.pickedText
        }
      },
      {
        when: '${viewport.width <= 480}',
        strings: {
          pickedImage: `${apiPath}?v=${version}&size=small&picked=` + resource.pickedText
        }
      }      
    ],    
    features: {
      idleTimeout: 120000
    },
    mainTemplate: {
      parameters: ['payload'],
      item: {
        type: 'Container',
        direction: 'column',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        bottom: 0,
        items: [                     
          {
            type: 'Container',
            direction: 'row',
            height: '100%',
            width: '100%',              
            items: [
              {
                type: 'Image',
                id: 'homeImageBehind',
                source: '@loadingImage',
                width: '100%',
                height: '100%',
                position: 'absolute',
                scale: 'best-fill'
              },              
              {
                type: 'Image',
                id: 'homeImage',
                source: '@homeImage',
                width: '100%',
                height: '100%',
                position: 'absolute',
                scale: 'best-fill'
              },                                 
              {
                id: 'fork-container',
                type: 'Container',
                width: '100%',
                height: '100%',
                direction: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',  
                position: 'absolute',
                items: [           
                  {
                    id: 'fork',
                    type: 'Video',
                    source: [
                      {
                        url: `${cdnPath}web/assets/video/fork-spin` + resource.pickedID + '.mp4?v=${version}'
                      }
                    ],
                    autoplay: false,
                    width: '128dp',
                    height: '72dp',
                    paddingLeft: '14dp',
                    scale: 'best-fill',                      
                  }
                ]       
              },         
              {
                type: 'Image',
                id: 'pickedImage',
                source: '@pickedImage',
                width: '100%',
                height: '100%',
                position: 'absolute',
                scale: 'best-fill',
                opacity: 0
              },                  
              {
                id: 'text-start',
                type: 'Text',
                opacity: '0',
                speech: '${payload.data.properties.speechStart}'
              },              
              {
                id: 'fork-picked',
                type: 'Text',
                speech: '${payload.data.properties.speechPicked}'
              },
              {
                id: 'fork-enjoy',
                type: 'Text',
                speech: '${payload.data.properties.speechEnjoy}'
              }                                       
            ]
          }                  
        ]
      }
    }
  },
  datasources: {
    data: {
      properties: {
        speechssmlStart: 'Ok. Here I go. Spinning fork to choose your path.',
        speechssmlPicked: 'The fork has choosen ' + resource.pickedText + '.  Your destiny awaits.',
        speechssmlEnjoy: 'Enjoy!'
      },
      transformers: [
        {
          inputPath: 'speechssmlStart',
          outputName: 'speechStart',
          transformer: 'ssmlToSpeech'
        },
        {
          inputPath: 'speechssmlPicked',
          outputName: 'speechPicked',
          transformer: 'ssmlToSpeech'
        },
        {
          inputPath: 'speechssmlEnjoy',
          outputName: 'speechEnjoy',
          transformer: 'ssmlToSpeech'
        }
      ]
    }
  }
});
