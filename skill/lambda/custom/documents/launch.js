const version = require('../helpers/version');
const cdnPath = require('../helpers/cdnPath');
const apiPath = require('../helpers/apiPath');

module.exports = () => {

  return {
    type: 'Alexa.Presentation.APL.RenderDocument',
    token: 'splash-screen',
    document: {
      type: 'APL',
      version: '1.0',
      theme: 'light',
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
            landingImage: `${cdnPath}web/assets/skill/landing_1280_800.png?v=${version}`
          }
        },
        {
          when: '${viewport.width > 480 && viewport.width <= 1024}',
          strings: {
            landingImage: `${cdnPath}web/assets/skill/landing_1024_600.png?v=${version}`
          }
        },
        {
          when: '${viewport.width <= 480}',
          strings: {
            landingImage: `${cdnPath}web/assets/skill/landing_480_480.png?v=${version}`
          }
        },
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
            homeImage: `${cdnPath}web/assets/skill/home_1280_800.png?v=${version}`
          }
        },
        {
          when: '${viewport.width > 480 && viewport.width <= 1024}',
          strings: {
            homeImage: `${cdnPath}web/assets/skill/home_1024_600.png?v=${version}`
          }
        },
        {
          when: '${viewport.width <= 480}',
          strings: {
            homeImage: `${cdnPath}web/assets/skill/home_480_480.png?v=${version}`
          }
        }
      ],
      features: {
        idleTimeout: 30000
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
              type: 'ScrollView',
              width: '100%',
              height: '100%',
              position: 'absolute',
              onScroll: [
                {
                  type: 'SetValue',
                  componentId: 'splashImage',
                  property: 'opacity',
                  value: '${1 - (event.source.value * 2)}'
                }
              ],
              item: [
                {
                  type: 'Container',
                  paddingTop: '100vh',
                  items: [
                    {
                      type: 'Text',
                      text: 'Add up to four things for the fork to choose from. Say something like, "Add Pizza".',
                      opacity: '0',
                      id: 'splashScroller',
                      paddingTop: '100vh',
                      speech: '${payload.data.properties.speechIntro}'
                    }
                  ]
                }
              ]
            },
            {
              type: 'Container',
              direction: 'row',
              height: '100%',
              width: '100%',              
              items: [
                {
                  type: 'Text',
                  id: 'speechPrompt0',
                  position: 'absolute',
                  text: '',
                  opacity: '0',
                  speech: '${payload.data.properties.speechPrompt0}'
                },                
                {
                  type: 'Text',
                  id: 'speechPrompt1',
                  position: 'absolute',
                  text: '',
                  opacity: '0',
                  speech: '${payload.data.properties.speechPrompt1}'
                },                
                {
                  type: 'Text',
                  id: 'speechPrompt2',
                  position: 'absolute',
                  text: '',
                  opacity: '0',
                  speech: '${payload.data.properties.speechPrompt2}'
                },                
                {
                  type: 'Text',
                  id: 'speechPrompt3',
                  position: 'absolute',
                  text: '',
                  opacity: '0',
                  speech: '${payload.data.properties.speechPrompt3}'
                },                
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
                      id: 'fork-jumping',
                      type: 'Video',
                      source: [
                        {
                          url: `${cdnPath}web/assets/video/fork-jumping.mp4?v=${version}`,
                          repeatCount: -1
                        }
                      ],
                      autoplay: false,
                      position: 'absolute',
                      width: '128dp',
                      height: '72dp',
                      paddingLeft: '14dp',
                      scale: 'best-fill'           
                    },
                    {
                      id: 'fork-spin0',
                      type: 'Video',
                      source: [
                        {
                          url: `${cdnPath}web/assets/video/fork-spin0.mp4?v=${version}`,
                          repeatCount: 0
                        }
                      ],
                      autoplay: false,
                      opacity: 0,
                      position: 'absolute',
                      width: '1dp',
                      height: '1dp',
                      scale: 'best-fill'           
                    },
                    {
                      id: 'fork-spin1',
                      type: 'Video',
                      source: [
                        {
                          url: `${cdnPath}web/assets/video/fork-spin1.mp4?v=${version}`,
                          repeatCount: 0
                        }
                      ],
                      autoplay: false,
                      opacity: 0,
                      position: 'absolute',
                      width: '1dp',
                      height: '1dp',
                      scale: 'best-fill'           
                    },
                    {
                      id: 'fork-spin2',
                      type: 'Video',
                      source: [
                        {
                          url: `${cdnPath}web/assets/video/fork-spin2.mp4?v=${version}`,
                          repeatCount: 0
                        }
                      ],
                      autoplay: false,
                      opacity: 0,
                      position: 'absolute',
                      width: '1dp',
                      height: '1dp',
                      scale: 'best-fill'           
                    },
                    {
                      id: 'fork-spin3',
                      type: 'Video',
                      source: [
                        {
                          url: `${cdnPath}web/assets/video/fork-spin3.mp4?v=${version}`,
                          repeatCount: 0
                        }
                      ],
                      autoplay: false,
                      opacity: 0,
                      position: 'absolute',
                      width: '1dp',
                      height: '1dp',
                      scale: 'best-fill'           
                    }                                        
                  ]       
                },
                {
                  when: '${@viewportProfile != @hubRoundSmall}',
                  id: 'hintText1',
                  type: 'AlexaFooter',
                  position: 'absolute',
                  opacity: 1,
                  hintText: '${payload.data.properties.hintText1T}'
                },                               
                {
                  when: '${@viewportProfile != @hubRoundSmall}',
                  id: 'hintText2',
                  type: 'AlexaFooter',
                  position: 'absolute',
                  opacity: 0,
                  hintText: '${payload.data.properties.hintText2T}'
                },                               
                {
                  when: '${@viewportProfile != @hubRoundSmall}',
                  id: 'hintText3',
                  type: 'AlexaFooter',
                  position: 'absolute',
                  opacity: 0,
                  hintText: '${payload.data.properties.hintText3T}'
                }                                
              ]
            },
            {
              type: 'Frame',
              id: 'splashImage',
              backgroundColor: 'black',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              item: [
                {
                  type: 'Container',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  items: [
                    {
                      type: 'Text',
                      color: '#FFFFFF',
                      fontSize: '60dp',
                      text: 'Fork',
                      fontWeight: '100',
                    },
                    {
                      type: 'Text',
                      color: '#FFFFFF',
                      fontSize: '24dp',
                      text: 'On The Road',
                      fontWeight: '100',
                    },
                    {
                      type: 'Image',
                      width: '100vw',
                      height: '100vh',
                      scale: 'best-fill',
                      source: '@landingImage',
                      position: 'absolute'
                    } 
                  ]
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
          hintText1: 'Add Pizza.',
          hintText2: 'Add Tacos.',
          hintText3: 'Spin the Fork.',
          speechssmlIntro: '<speak>Let the fork <emphasis level="strong">on</emphasis> the road be your guide. Add up to four things for the fork to choose from. Say something like, "Add Pizza".</speak>',
          speechssmlPrompt0: '<speak>Say something like, "Add Pizza."</speak>',
          speechssmlPrompt1: '<speak>Say something like, "Add Tacos."</speak>',
          speechssmlPrompt2: '<speak>Try adding something else. Or say, "Spin the Fork."</speak>',
          speechssmlPrompt3: '<speak>The fork is ready. Say, "Spin the Fork."</speak>'          
        },
        transformers: [
          {
            inputPath: 'hintText1',
            outputName: 'hintText1T',
            transformer: 'textToHint'
          },
          {
            inputPath: 'hintText2',
            outputName: 'hintText2T',
            transformer: 'textToHint'
          },
          {
            inputPath: 'hintText3',
            outputName: 'hintText3T',
            transformer: 'textToHint'
          },
          {
            inputPath: 'speechssmlIntro',
            outputName: 'speechIntro',
            transformer: 'ssmlToSpeech'
          },
          {
            inputPath: 'speechssmlPrompt0',
            outputName: 'speechPrompt0',
            transformer: 'ssmlToSpeech'
          },
          {
            inputPath: 'speechssmlPrompt1',
            outputName: 'speechPrompt1',
            transformer: 'ssmlToSpeech'
          },
          {
            inputPath: 'speechssmlPrompt2',
            outputName: 'speechPrompt2',
            transformer: 'ssmlToSpeech'
          },
          {
            inputPath: 'speechssmlPrompt3',
            outputName: 'speechPrompt3',
            transformer: 'ssmlToSpeech'
          }
        ]
      }
    }
  };
};
