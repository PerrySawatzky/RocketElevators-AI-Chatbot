// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const axios = require('axios');

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  
  function idFunction(agent){
  	const id = agent.parameters.number;
    //agent.add(`The status of elevator ${id} is:`);
    return axios.get(`https://whispering-tundra-91467.herokuapp.com/api/Elevators/status/${id}`)
      .then((result) =>{
      console.log("then");
      //console.log("result:" + result.data.toString());
      agent.add(`Elevator ${id} is ` + result.data.toString());
      //agent.add("test here");
      //console.log(result);
      	
    }).catch((err) => {
        console.log(`ERROR: ${err.message}`);
	});
    //agent.add('testing'+ id);
  }
  
  function statsFunction(agent){
   return axios.get(`https://whispering-tundra-91467.herokuapp.com/api/Addresses/Alexa`)
    .then((result) =>{
     console.log("result:"+ result); 
     console.log("result.data:"+ result.data);
     console.log("result.data[0]"+result.data[0]);
     agent.add(`There are currently ${result.data[0].toString()} rocket elevator elevators deployed in the ${result.data[1].toString()} buildings of your ${result.data[2].toString()} customers. 
        Currently, ${result.data[3].toString()} elevators are not in Running Status and are being serviced. 
        ${result.data[4].toString()} Batteries are deployed across ${result.data[5].toString()} cities. 
        On another note you currently have ${result.data[6].toString()} quotes awaiting processing.
        You also have ${result.data[7].toString()} leads in your contact requests.`); 	
     }).catch((err) => {
        console.log(`ERROR: ${err.message}`);
	 });
  }
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
 
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('elevatorStatus', idFunction);
  intentMap.set('RocketElevatorsStats', statsFunction);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
