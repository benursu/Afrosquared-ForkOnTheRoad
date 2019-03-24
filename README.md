# "Alexa, ask Fork On The Road"
Amazon Alexa Skill: 
[https://www.amazon.com/gp/product/B07NPC1W56](https://www.amazon.com/gp/product/B07NPC1W56)

Demo Video: [https://www.youtube.com/watch?v=-eal8qUcKwk](https://www.youtube.com/watch?v=-eal8qUcKwk)

Dev Post: [https://devpost.com/software/fork-on-the-road](https://devpost.com/software/fork-on-the-road)


## Inspiration
A friend of mine told me about the Amazon Multimodal Contest, #AmazonAlexaMultimodalChallenge, and I thought I'd take a stab at making my first Alexa Skill. While researching the Amazon Presentation Language I looked for inspiration in my daily life to guide my direction. One evening, my family and I were trying to decide on what movie we would watch. This sparked the idea of a fun and interactive decision maker. Thus was born, "Fork On The Road".

## Description
The skill is invoked with "Alexa, ask Fork On The Road". Users are asked to add up to four things for the fork to choose from. Users can also remove items they've added. While users are adding things, an animation of the fork bounces in the intersection of two roads. A full 3D scene is used to present items in a fun and unique way, with items placed as dynamic 3D extruded text. When there as at least 2 items the user can "Spin the Fork". When the fork is choosing, it bounces up and spins around, slowly stopping on the path it would like you to take. A final screen presents the forks decision using another dynamic 3D scene. This skill works responsively across all Alexa products ranging from speech-only to TV. "Your destiny awaits. Enjoy!"

## Technologies
This project was created using several different technologies. It primarily uses open-source and Amazon platforms. The key technology is Amazon's APL. The APL is designed using several layers of APL Components, including APL Video, that are sequenced with SendEvent Commands and Document Directives. Document transforms, game logic and speech response is managed using the ASK SDK for Node.js running on Lamba. Skill configuration for invocations, utterances, intents, lambda, etc, are maintained and deployed through a Skill Manifest and the ASK CLI. Resources and Assets come from two different sources. Static files are hosted on S3 with a Cloudfront instance on top. Dynamic assets, like the dynamically generated 3D scene, are requested from a Lambda service with API Gateway routing requests. This dynamic asset service uses a Headless Chrome Node API called Puppeteer to load a website, take a screen capture, and send it back to the Alexa device with a "image/png" header. The captured website uses Three.js to dynamically construct a scene based on the variables in the request and composes elements such as extruded text. Animations were also scripted in Three.js and then captured, cropped and embedded in the APL. The 3D scene was first composed in Unity to get the look and feel correct and then exported. Finally, the fork's sound effect was composed in Sony Acid Pro using a couple of layered sounds and exported to the appropriate MP3 specs using Audacity.

## What's next for Fork On The Road
The big item on my list is the ability to change the 3D environments to things like a winter wonderland or desert scene. Ideally this would be done with a menu system that uses the TouchWrapper Component.



