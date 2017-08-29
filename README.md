# TenPinBowling
This app is created in React Js using React components.  This app is the primary approach to writing a program for a scoring a game of Ten Pin Bowling. This app is event based and interacts with the Player

Curretly I have built it as per the requirements, it supports one player and scores based on the pins hit in the allocated chances.

_**How it works:**_
1. A frame consists of 2 chances
1. The numbers in Green Circles that appear on the UI is assumed to be the number of pins knocked down by a single roll. For instance, if you think on chance 1, the player knocks down 5 pins, you must click number 5 green circle to denote the roll. If it is a strike, number 10 must be clicked. if it is a gutter then 0 and so on.
1. when On a frame, if a player hits less than 10, then the next chance will have the numbers that can add up to 10. For instance, when a player hits 5 in the first chance of a frame, then for the next chance, the options presented will be 0,1,2,3,4,5 which means he needs to hit only 5 balls max to get a spare. if the player hits a 0, then the score for that frame is 5.
1. The UI is basic uses bootstraps classes since the focus is purely on react js and unit tests.

_**This app properly :**_

* awards the player with 2 Bonus chances in the last frame if it is a strike
* awards the player with One Bonus chance in the last frame if it is a spare.
* Calculates score after each frame's chances are over 
* Updates total score after each and every chance.

## Project Overview

* This app is built using React js as the front end js framework.
* Babel is used for transpilation of ES6 and jsx into plain javascript for all browsers
* Webpack is used for bundling, module handling and loaders for various things like css, assets, plugins, js file serving and so on

## Unit testing (TDD)

The unit testing is done using Jest and Enzyme. All the node modules necessary for this testing framework have been included in the package.json
I have used both shallow and mount features of enzyme to unit test the code

# **Project Setup in a Mac**

The code is committed into this repository from my macbook including node_modules required. the node_modules are a bit larger and could have been installed globally instead of adding them to the repo (I will correct this next time :)). 

To make the app run on your local, simply clone it on to your mac and
* open a terminal and navigate to the app's physical directory
* type npm install - this will pull down all the packages mentioned in the package.json required for this app from npm gallery
* type npm run build - this is webpack's build shortcut. It will compile the app successfully, if there are any errors, it will be listed on the terminal
* type npm run start. 
* this will initiate a port 8080 and the app will listen on this port. The app can be accesed on a browser by navigating to http://localhost:8080

The app will look like this

<img width="1212" alt="app" src="https://user-images.githubusercontent.com/17691926/29800991-187493c8-8c65-11e7-9fd6-42e2848f9c0c.png">



All the scenarios given in the word doc are tested along with many other scenarios. 


