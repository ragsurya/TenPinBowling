import {_} from 'lodash';


export const utils = (App, clickedNumber) => {
    
            let nextFramePosition = 0;
            if(App.state.StrikePositionList.includes(App.state.framePosition)){
            //if the frame position is in a member of the Strike Position List array and number returned is 10 then its a strike
                 if(clickedNumber === 10)
                     {
                        App.state.ScoresInEachFrame.push(
                            {'framePos':App.state.framePosition, 'strikeStatus': 'strike', 'isAllStrike': App.state.isAllStrike, 'clickedNumber': clickedNumber, chancesPlayed: App.state.ScoresInEachFrame.length+1,
                             'pinsHit' : clickedNumber, 'isScored': false} 
                        );
                        App.state.ScoresInEachFrame.push(
                        {'framePos':App.state.framePosition, 'strikeStatus': 'parentStrike', 'isAllStrike': App.state.isAllStrike, 'clickedNumber': clickedNumber, 
                        chancesPlayed: App.state.ScoresInEachFrame.length+1, 
                        'pinsHit' : 0, 'isScored': false}
                    );
               
                         nextFramePosition = App.state.framePosition + 2;
                        App.setState({
                            sumOfPairInAFrame:  0,}, function () {
                                console.log('sumOfPairInAFrame : ' + App.state.sumOfPairInAFrame)});
                                App.setState({
                                            arrayOfPinCountHit:  
                                            App.state.isAllStrike ?( App.state.framePosition == 21 && App.state.scoreUnderEachFrame==23 ? [] : App.state.arrayOfPinCountHit)
                                        : (App.state.framePosition == 21 ? [] : App.state.arrayOfPinCountHit)}, function () {
                                                console.log('sumOfPairInAFrame : ' + App.state.sumOfPairInAFrame)});
                                                App.setFrameScore('strike', clickedNumber);
                            
                     }
                     else{
                        //  App.setState({
                        //      isAllStrike: false
                        //  })
                        App.state.ScoresInEachFrame.push({'framePos':App.state.framePosition, 
                        'strikeStatus': 'none', 
                        'isAllStrike': false, 
                        'clickedNumber': clickedNumber, 
                        'chancesPlayed': App.state.ScoresInEachFrame.length+1,
                        'pinsHit' : clickedNumber,
                        'isScored': false});
        
                        
        
                         //increase the score
                         nextFramePosition = App.state.framePosition + 1;
                         App.setState({
                            sumOfPairInAFrame: clickedNumber,}, function () {
                                console.log('sumOfPairInAFrame : ' + App.state.sumOfPairInAFrame)});
                                App.setState({
                                 arrayOfPinCountHit:  _.range(0, 11-clickedNumber),}, function () {
                                console.log('sumOfPairInAFrame : ' + App.state.sumOfPairInAFrame)});
                                App.setFrameScoreForSpare(clickedNumber);
                            
                                                                
                     }
            }
            else{
                nextFramePosition = App.state.framePosition + 1;
             App.setState({
                sumOfPairInAFrame: clickedNumber != 10 ? App.state.sumOfPairInAFrame + clickedNumber : 0,}, function () {
                    console.log('sumOfPairInAFrame : ' +App.state.sumOfPairInAFrame);
                    clickedNumber = 0;
                });
                                    App.setState({
                                        arrayOfPinCountHit:  (App.state.scoreUnderEachFrame.length == 11 ) ? [] : _.range(0, 11),}, function () {
                                            console.log('sumOfPairInAFrame : ' + App.state.sumOfPairInAFrame)});
                                            
                                            App.state.ScoresInEachFrame.push({'framePos':App.state.framePosition,
                                             'strikeStatus': App.state.sumOfPairInAFrame + clickedNumber === 10 ? 'spare' : 'none', 
                                             'isAllStrike': false,
                                             'clickedNumber': clickedNumber,
                                            'chancesPlayed' : App.state.ScoresInEachFrame.length+1, 
                                        'pinsHit' : clickedNumber,
                                        'isScored': false});
                                        App.setFrameScore('', clickedNumber);
                                       //goes here
                                           
            }
            
            App.setState({
                framePosition: nextFramePosition
                
            }, function () {
                console.log('Next Frame Position : ' +App.state.framePosition)});
               
                App.setState({
                    ScoresInEachFrame: App.state.ScoresInEachFrame,}, function (){
                        console.log(App.state.ScoresInEachFrame)});
                        App.setState({
                            chancesPlayed : App.state.ScoresInEachFrame.length
                        }, function () {
                            console.log('Current  Chance : ' + App.state.chancesPlayed )});
               
                
        
};


