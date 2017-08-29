import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash'
require("../style.css");
import css from '../style.css';
import InputRange from 'react-input-range';
import {utils} from './app.utils'
import {calculateFrameScore} from './app.calculateFrameScore'

const NumberOfPinsHit = (props) => {
   
    
    return (
        <div>
        
        <div className="roll text-center">
        <div>
        {props.arrayOfPinCountHit.map((number,i) =>
        <span className="pinsHit" key={i}  onClick= {() => props.setFramePosition(number)}>{number}</span>
    )}
        </div>
       
        </div>
        
        
        </div>
    );
};

const Frames = (props) =>  {
    
    let frames = [];
   let scoreUnderFrames = [];
   let currFrameScore = 0;
   let nextFrameScore = 0;
   let index = props.scoresInEachFrame.length -1;
   let pinsHitInEachChance = [];
   {props.scoresInEachFrame.map((number, i) => 
       pinsHitInEachChance.push(
        <span key={i} className={(i + 1) % 2 == 0 ? 'innerFrames sameFrame' : 'innerFrames nextFrame' } >
        {number.pinsHit}
         </span>
        ))
   };     
   if(props.scoresInEachFrame[props.scoresInEachFrame.length -1] != undefined)
    {
        index = props.scoresInEachFrame.length -1;
        currFrameScore= props.scoresInEachFrame[props.scoresInEachFrame.length -1].pinsHit;
        nextFrameScore = props.scoresInEachFrame[index +1] != undefined ? props.scoresInEachFrame[index +1].pinsHit : ''
    }
        {Frames.list.map((number, i) => 
            frames.push(<div  key={i} className="col-6 parentDiveFrame">
            <div className="circle">{i+1}</div>
             <div className="outerFrame col-6" >
             
              </div>
              </div>)

        )};
        
        {props.scoreUnderEachFrame.map((number, i) =>
            
            scoreUnderFrames.push(
           !number.isHidden ? <div key={i} className="scoreField col-6" >
            Score: {number.score }
            </div> : <div key={i}></div>
            )
        
    )};
    

        return (
           <div>
            <div className="">
            <div>{props.formMessage.message} </div>
            
            {frames}
           
            </div>
            <div>{pinsHitInEachChance}</div>
             <div className="scoreFieldParent">
        {scoreUnderFrames}
        </div>

        </div>
           
        );
    };

    Frames.list = _.range(0, 10);
    Frames.StrikePositionList = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    Frames.ScoresInEachFrame=[];


class App extends React.Component {
    constructor() {
        super();
   this.state = {
       formParams: 
        {
           // totalFrames: "10",
          //  maxNumOfPlayers: "1",
            message: "This bowling score app is developed using React Js"
       },
       framePosition:1,
       sumOfPairInAFrame: 0,
       arrayOfPinCountHit : _.range(0,11),
       ScoresInEachFrame: [],
       chancesPlayed:1,
       isAllStrike: true,
       TotalScore: 0,
       StrikePositionList: Frames.StrikePositionList,
       scoreUnderEachFrame: [{'id':1, 'score':'-', 'hitStatus': ''},{'id':2, 'score':'-', 'hitStatus': ''},{'id':3, 'score':'-', 'hitStatus': ''}
       ,{'id':4, 'score':'-', 'hitStatus': ''},{'id':5, 'score':'-', 'hitStatus': ''},{'id':6, 'score':'-', 'hitStatus': ''},
       {'id':7, 'score':'-', 'hitStatus': ''},{'id':8, 'score':'-', 'hitStatus': ''},{'id':9, 'score':'-', 'hitStatus': ''},
       {'id':10, 'score':'-', 'hitStatus': ''}]
   };

   this.setFramePosition = (clickedNumber) => {
    utils(this, clickedNumber);
   };
  
this.setFrameScore = (hitStatus, clickedNumber) => {
    calculateFrameScore(this, hitStatus, clickedNumber);
}


this.setFrameScoreForSpare = (clickedNumber) => {
   
    if(this.state.ScoresInEachFrame!= undefined && this.state.ScoresInEachFrame.length > 1)
        {
            var frameScore = this.state.scoreUnderEachFrame;
            var index = _.findIndex(frameScore, {id: Math.ceil(this.state.ScoresInEachFrame.length/2)});
            if(index < 0) return;
           
            if(frameScore[index-1].score === '-' && frameScore[index-1].hitStatus === 'spare')
                {
                    frameScore[index-1].score = 10 + clickedNumber;
                }
                this.setFrameScoreForPenultimateStrike(frameScore, index, clickedNumber);
        }
}

this.setFrameScoreForPenultimateStrike = (frameScore, index, clickedNumber) =>
{
    if(frameScore[index-2] != undefined && frameScore[index-2].score === '-')
        {
            if(frameScore[index-2].hitStatus == 'strike')
                {
                    frameScore[index-2].score = 20 + clickedNumber;
                }
                else{
            frameScore[index-2].score = 10 + this.state.sumOfPairInAFrame + clickedNumber;
        }
    }
}

};

     render() {
     return (
        <div className ="container">
        <Frames formMessage = {this.state.formParams}
          framePosition = {this.state.framePosition} 
          scoreUnderEachFrame = {this.state.scoreUnderEachFrame}
          scoresInEachFrame = { this.state.ScoresInEachFrame }  />
      
        <div   className="col-6  totalScoreFrame">
          <div key="11" className=" col-6" >
          Total Score: {this.state.TotalScore}
           </div>
         </div>
        <div className=" col-6" >
        <NumberOfPinsHit 
            framePosition={this.state.framePosition} 
            totalScore ={this.state.TotalScore}
            setFramePosition={this.setFramePosition}
            arrayOfPinCountHit = {this.state.arrayOfPinCountHit} 
            scoresInEachFrame = { this.state.ScoresInEachFrame } 
            chancesPlayed = {this.state.chancesPlayed}
            isAllStrike = {this.state.isAllStrike}/>
       
       
        </div>
       
        </div>
      );
    }
};



render(<App message=""/>, document.getElementById('app') || document.createElement('div'));
module.exports = App;

