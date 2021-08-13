# RocketElevators-AI-Chatbot

> Week 13 project for Rocket Elevators. Subsidiary of Codeboxx Technologies
## Table of Contents
* [General](#general)
* [Technologies](#technologies)
* [Setup](#setup)


## General
The purpose of this repo is to demonstrate our dialogFlow chatbot with our database API, also additionally we integrated the process with a Slackbot so our users can chat directly from slack.
>Link to API repo : https://github.com/PerrySawatzky/Rocket_Elevators_Foundation_API.git

## Technologies
* DialogFlow Chatbot
* .NET API
* Slack 

## Setup
Set up with a project like this is a little different since the project is within an online code editor. But here you all are anyways!

- Step 1: Create ypur very own Google Cloud account with a linked credit card. (We used their free trial and you should too.)
- Step 2: Add our intents to your dialogflow.cloud.google.com account Intents. I'm not sure you can actually import the json files we have attached but take their names, parse with your eyes for the other pertinent information in their json and add it to the intent. 
- Step 3: For each intent ensure you enable the 'Enable Webhook for this Intent' toggle at the bottom of the page for each intent.
- Step 4: Navigate to the Fulfillment tab and toggle on the Inline Editor. (This is the step that needs you to link your billing account) 
- Step 5: Paste in the index.js and package.json files from my repo into their respective tabs then hit DEPLOY at the bottom of the page.
- Step 6: After waiting for what feels like an eternity, you can test our intents from the top right quadrant of the screen where it says 'Try it now'.
- Step 7: For our RocketElevatorStats intent ask something along the lines of 'whats going on at rocket elevators?'.
- Step 8: For our elevatorStatus intent ask something along the lines of 'what is the status of elevator 33'? Any number up to 198 will return either online or offline.
- Step 9: To implement this marvel of engineering with a slack channel, head over to the Integrations tab and scroll down to the slack logo and click it. 
- Step 10: Click test bot then select or create the slack workspace you want to implement the bot in.





