import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash'
require("../style.css");
import css from '../style.css';
import InputRange from 'react-input-range';

const NumberOfPinsHit = (props) => {
   
    let pinsHitInEachChance = [];
{props.scoresInEachFrame.map((number, i) => 
    pinsHitInEachChance.push(
        
  
     <span key={i} className={(i + 1) % 2 == 0 ? 'innerFrames sameFrame' : 'innerFrames nextFrame' } >
     {number.pinsHit}
  
      </span>
     ))
};     
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
       scoreUnderEachFrame: [{'id':1, 'score':'-', 'hitStatus': ''},{'id':2, 'score':'-', 'hitStatus': ''},{'id':3, 'score':'-', 'hitStatus': ''}
       ,{'id':4, 'score':'-', 'hitStatus': ''},{'id':5, 'score':'-', 'hitStatus': ''},{'id':6, 'score':'-', 'hitStatus': ''},
       {'id':7, 'score':'-', 'hitStatus': ''},{'id':8, 'score':'-', 'hitStatus': ''},{'id':9, 'score':'-', 'hitStatus': ''},
       {'id':10, 'score':'-', 'hitStatus': ''}]
   };
   this.setFramePosition = (clickedNumber) => {

    
    let nextFramePosition = 0;
    if(Frames.StrikePositionList.includes(this.state.framePosition)){
    //if the frame position is in a member of the Strike Position List array and number returned is 10 then its a strike
         if(clickedNumber === 10)
             {
                this.state.ScoresInEachFrame.push(
                    {'framePos':this.state.framePosition, 'strikeStatus': 'strike', 'isAllStrike': this.state.isAllStrike, 'clickedNumber': clickedNumber, chancesPlayed: this.state.ScoresInEachFrame.length+1,
                     'pinsHit' : clickedNumber, 'isScored': false} 
                );
                this.state.ScoresInEachFrame.push(
                {'framePos':this.state.framePosition, 'strikeStatus': 'parentStrike', 'isAllStrike': this.state.isAllStrike, 'clickedNumber': clickedNumber, 
                chancesPlayed: this.state.ScoresInEachFrame.length+1, 
                'pinsHit' : 0, 'isScored': false}
            );
       
                 nextFramePosition = this.state.framePosition + 2;
                this.setState({
                    sumOfPairInAFrame:  0,}, function () {
                        console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                        this.setState({
                                    arrayOfPinCountHit:  
                                    this.state.isAllStrike ?( this.state.framePosition == 21 && this.state.scoreUnderEachFrame==23 ? [] : this.state.arrayOfPinCountHit)
                                : (this.state.framePosition == 21 ? [] : this.state.arrayOfPinCountHit)}, function () {
                                        console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                                        this.setFrameScore('strike', clickedNumber);
                    
             }
             else{
                //  this.setState({
                //      isAllStrike: false
                //  })
                this.state.ScoresInEachFrame.push({'framePos':this.state.framePosition, 
                'strikeStatus': 'none', 
                'isAllStrike': false, 
                'clickedNumber': clickedNumber, 
                'chancesPlayed': this.state.ScoresInEachFrame.length+1,
                'pinsHit' : clickedNumber,
                'isScored': false});

                

                 //increase the score
                 nextFramePosition = this.state.framePosition + 1;
                 this.setState({
                    sumOfPairInAFrame: clickedNumber,}, function () {
                        console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                        this.setState({
                         arrayOfPinCountHit:  _.range(0, 11-clickedNumber),}, function () {
                        console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                        this.setFrameScoreForSpare(clickedNumber);
                    
                                                        
             }
    }
    else{
        nextFramePosition = this.state.framePosition + 1;
     this.setState({
        sumOfPairInAFrame: clickedNumber != 10 ? this.state.sumOfPairInAFrame + clickedNumber : 0,}, function () {
            console.log('sumOfPairInAFrame : ' +this.state.sumOfPairInAFrame);
            clickedNumber = 0;
        });
                            this.setState({
                                arrayOfPinCountHit:  (this.state.scoreUnderEachFrame.length == 11 ) ? [] : _.range(0, 11),}, function () {
                                    console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                                    
                                    this.state.ScoresInEachFrame.push({'framePos':this.state.framePosition,
                                     'strikeStatus': this.state.sumOfPairInAFrame + clickedNumber === 10 ? 'spare' : 'none', 
                                     'isAllStrike': false,
                                     'clickedNumber': clickedNumber,
                                    'chancesPlayed' : this.state.ScoresInEachFrame.length+1, 
                                'pinsHit' : clickedNumber,
                                'isScored': false});
                                this.setFrameScore('', clickedNumber);
                               //goes here
                                   
    }
    
    this.setState({
        framePosition: nextFramePosition
        
    }, function () {
        console.log('Next Frame Position : ' +this.state.framePosition)});
       
        this.setState({
            ScoresInEachFrame: this.state.ScoresInEachFrame,}, function (){
                console.log(this.state.ScoresInEachFrame)});
                this.setState({
                    chancesPlayed : this.state.ScoresInEachFrame.length
                }, function () {
                    console.log('Current  Chance : ' + this.state.chancesPlayed )});
       
        
};
this.setFrameScore = (hitStatus, clickedNumber) => {
    var frameScore = this.state.scoreUnderEachFrame;

    var index = _.findIndex(frameScore, {id: Math.ceil(this.state.ScoresInEachFrame.length/2)});
    if(Math.ceil(this.state.ScoresInEachFrame.length/2 > frameScore.length)) index = Math.ceil(this.state.ScoresInEachFrame.length/2) -1;
    if(index < 0) return;
if(hitStatus != 'strike')
    {
        
        if(this.state.ScoresInEachFrame.length == 20 && this.state.ScoresInEachFrame[19].strikeStatus == 'spare')
            {
                this.state.scoreUnderEachFrame.push({'id':11, 'score':0, 'hitStatus': 'spare', 'isHidden': true})
                //Frames.StrikePositionList.push(21);
            }
            if(frameScore[index] != undefined )
                {
                frameScore[index].score = (this.state.sumOfPairInAFrame + clickedNumber === 10) ? '-' : this.state.sumOfPairInAFrame + clickedNumber;
                
                frameScore[index].hitStatus = (this.state.sumOfPairInAFrame + clickedNumber === 10) ? 'spare' : '';
                }

                // this is for the last chance for the spare  
            if(frameScore[index-1] != undefined && frameScore[index-1].score === '-' )
                {
                    if(frameScore[index-1].hitStatus == 'strike')
                        {
                            frameScore[index-1].score =  10 + this.state.sumOfPairInAFrame + clickedNumber;
                        }
                        else if(frameScore[index-1].hitStatus == 'spare')
                            {
                                frameScore[index-1].score =  10 + (frameScore.length > 10 ? clickedNumber : this.state.sumOfPairInAFrame ) ;
                            }
                }

                //this is to handle 2 strikes in a row and then less-than-10 hit
                this.setFrameScoreForPenultimateStrike(frameScore, index, clickedNumber);
                if(frameScore[index+1] != undefined && frameScore[index+1].score >0 && this.state.scoreUnderEachFrame.length > 10)
                    {
                        frameScore[index].score = 10 + clickedNumber;
                        
                    }
            
        }
        else{
            
            let maxLengthOfArrayforStrike = 23;
            //Award 2 bonus chances if its all strike
            if(this.state.ScoresInEachFrame.length == 20 && this.state.isAllStrike)
                {
                    this.state.scoreUnderEachFrame.push({'id':11, 'score':0, 'hitStatus': 'strike', 'isHidden': true})
                    Frames.StrikePositionList.push(21);
                }
            frameScore[index].hitStatus = 'strike';
            if(frameScore[index-2] != undefined )
                {
                    if(frameScore[index-2].score === '' || frameScore[index-2].score === '-')
                        {
                            frameScore[index-2].score = frameScore[index-2].hitStatus === 'spare' ? 10 + clickedNumber : (this.state.isAllStrike ? 30 : frameScore[index-2].score);
                        }
                   // frameScore[index-2].score = (frameScore[index-2].score === '' || frameScore[index-2].score === '-' && this.state.isAllStrike)  ? 30 : frameScore[index-2].score;
                }
                if(frameScore[index-1] != undefined)
                    {
                    if(frameScore[index-1].hitStatus === 'spare')
                    {
                        frameScore[index-1].score = (frameScore[index-1].score === '' || frameScore[index-2].score === '-' && !this.state.isAllStrike)  ? 20 : frameScore[index-1].score;
                    }
                    
                }
            if(this.state.isAllStrike && this.state.ScoresInEachFrame.length === maxLengthOfArrayforStrike)
                {
                    if(frameScore[index-1].hitStatus === 'strike' && frameScore[index].isHidden)
                        {
                            frameScore[index-1].score = 30;
                        }
                    frameScore.map(function(item){
                           item.id === index ? item.score = 30 : item.score = item.score;
                    });
                  
                }
        }

    this.setState({scoreUnderEachFrame: frameScore});
    let finalScore = 0;
    console.log('scoreUnderEachFrameArray: ' + this.state.scoreUnderEachFrame);
    this.state.scoreUnderEachFrame.map(function(item){
        if(item.id <= 10)
            {
            finalScore += item.score != 0 && item.score != '-' ? item.score : 0;
            }
        
    });
    this.setState({TotalScore: finalScore});
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
         selectedNumber= {this.state.selectedNumber}
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
            selectedNumber= {this.state.selectedNumber}
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

render(<App message="This is my first React component"/>, document.getElementById('app'));