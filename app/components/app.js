import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash'
require("../style.css");
import css from '../style.css';
import InputRange from 'react-input-range';

const NumberOfPinsHit = (props) => {
   
    return (
        <div>
        
        <div className="text-center">
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
   
        {Frames.list.map((number, i) => 
            frames.push(<div disabled = {i+1 === props.formMessage.activeFrame} key={i} className="col-6 parentDiveFrame">
            <div className="circle">{i+1}</div>
             <div className="outerFrame col-6" >
             
                    <div className="innerFrames col-2">
                    <span>
                    {props.scoresInEachFrame != undefined && props.scoresInEachFrame.length&& props.scoresInEachFrame[i] != undefined ?
                        (props.scoresInEachFrame[i].isAllStrike ? 'X' : 5)
                         :''}
                        
                    </span>
                    </div>
                    <div className="innerFrames col-2">
                    
                    </div>
    
              </div>
              </div>)

        )};
        {props.scoreUnderEachFrame.map((number, i) =>
            scoreUnderFrames.push(
            <div key={i} className="scoreField col-6" >
            Score: {number.score }
            </div>
            )
    )};
    

        return (
            <div>
            <div className="container">
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
            totalFrames: "10",
            maxNumOfPlayers: "1",
            message: "This bowling score app is developed using React Js"
       },
       framePosition:1,
       selectedNumber: 10,
       isAllStrike: true,
       previousHit: '',
       sumOfPairInAFrame: 0,
       arrayOfPinCountHit : _.range(0,11),
       ScoresInEachFrame: [],
       chancesPlayed:1,
       scoreUnderEachFrame: [{'id':1, 'score':0, 'hitStatus': ''},{'id':2, 'score':0, 'hitStatus': ''},{'id':3, 'score':0, 'hitStatus': ''}
       ,{'id':4, 'score':0, 'hitStatus': ''},{'id':5, 'score':0, 'hitStatus': ''},{'id':6, 'score':0, 'hitStatus': ''},
       {'id':7, 'score':0, 'hitStatus': ''},{'id':8, 'score':0, 'hitStatus': ''},{'id':9, 'score':0, 'hitStatus': ''},
       {'id':10, 'score':0, 'hitStatus': ''}]
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
                                    arrayOfPinCountHit:  this.state.framePosition == 19 ? [] : this.state.arrayOfPinCountHit }, function () {
                                        console.log('sumOfPairInAFrame : ' + this.state.sumOfPairInAFrame)});
                                        this.setFrameScore('strike', clickedNumber);
                    
             }
             else{
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
                                arrayOfPinCountHit:  _.range(0, 11),}, function () {
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
    var peeps = this.state.scoreUnderEachFrame;
    var index = _.findIndex(peeps, {id: this.state.ScoresInEachFrame.length/2});
if(hitStatus != 'strike')
    {
    if(this.state.sumOfPairInAFrame + clickedNumber === 10) 
        {
            peeps[index].score = '';
        }
        else{
            peeps[index].score =  this.state.sumOfPairInAFrame + clickedNumber ;
        }
        if(peeps[index-1] != undefined && peeps[index-1].score == '')
            {
                
                        peeps[index-1].score =  10 + (peeps[index-1].hitStatus == 'strike' ?  this.state.sumOfPairInAFrame + clickedNumber
                        : this.state.sumOfPairInAFrame);
               
            }
            if(peeps[index-2] != undefined && (peeps[index-2].score == 0 || peeps[index-2].score == ''))
                {
                    peeps[index-2].score = 10 + this.state.sumOfPairInAFrame + clickedNumber;
                }
            
        }
        else{
            peeps[index].hitStatus = 'strike';
            if(peeps[index-2] != undefined && (peeps[index-2].score == '' || peeps[index-2].score == 0))
                {
                    peeps[index-2] = 30;
                }
           
        }

    this.setState({scoreUnderEachFrame: peeps});
}
};

     render() {
     return (
        <div>
        <Frames formMessage = {this.state.formParams}
         selectedNumber= {this.state.selectedNumber}
          framePosition = {this.state.framePosition} 
          scoreUnderEachFrame = {this.state.scoreUnderEachFrame} />
      
        <div   className="col-6 parentDiveFrame totalScoreFrame">
          <div key="11" className="outerFrame col-6" >
          Total Score: 123
           </div>
         </div>
        <div className="bowlOption col-6" >
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