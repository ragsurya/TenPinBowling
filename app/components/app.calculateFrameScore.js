import _ from 'lodash';
export const calculateFrameScore = (App, hitStatus, clickedNumber) => {
    var frameScore = App.state.scoreUnderEachFrame;

    var index = _.findIndex(frameScore, {id: Math.ceil(App.state.ScoresInEachFrame.length/2)});
    if(Math.ceil(App.state.ScoresInEachFrame.length/2 > frameScore.length)) index = Math.ceil(App.state.ScoresInEachFrame.length/2) -1;
    if(index < 0) return;
if(hitStatus != 'strike')
    {
        
        if(App.state.ScoresInEachFrame.length == 20 && App.state.ScoresInEachFrame[19].strikeStatus == 'spare')
            {
                App.state.scoreUnderEachFrame.push({'id':11, 'score':0, 'hitStatus': 'spare', 'isHidden': true})
                //Frames.StrikePositionList.push(21);
            }
            if(frameScore[index] != undefined )
                {
                frameScore[index].score = (App.state.sumOfPairInAFrame + clickedNumber === 10) ? '-' : App.state.sumOfPairInAFrame + clickedNumber;
                
                frameScore[index].hitStatus = (App.state.sumOfPairInAFrame + clickedNumber === 10) ? 'spare' : '';
                }

                // App is for the last chance for the spare  
            if(frameScore[index-1] != undefined && frameScore[index-1].score === '-' )
                {
                    if(frameScore[index-1].hitStatus == 'strike')
                        {
                            frameScore[index-1].score =  10 + App.state.sumOfPairInAFrame + clickedNumber;
                        }
                        else if(frameScore[index-1].hitStatus == 'spare')
                            {
                                frameScore[index-1].score =  10 + (frameScore.length > 10 ? clickedNumber : App.state.sumOfPairInAFrame ) ;
                            }
                }

                //App is to handle 2 strikes in a row and then less-than-10 hit
                App.setFrameScoreForPenultimateStrike(frameScore, index, clickedNumber);
                if(frameScore[index+1] != undefined && frameScore[index+1].score >0 && App.state.scoreUnderEachFrame.length > 10)
                    {
                        frameScore[index].score = 10 + clickedNumber;
                        
                    }
            
        }
        else{
            
            let maxLengthOfArrayforStrike = 23;
            //Award 2 bonus chances if its all strike
            if(App.state.ScoresInEachFrame.length == 20 && App.state.isAllStrike)
                {
                    App.state.scoreUnderEachFrame.push({'id':11, 'score':0, 'hitStatus': 'strike', 'isHidden': true})
                    App.state.StrikePositionList.push(21);
                }
            frameScore[index].hitStatus = 'strike';
            if(frameScore[index-2] != undefined )
                {
                    if(frameScore[index-2].score === '' || frameScore[index-2].score === '-')
                        {
                            frameScore[index-2].score = frameScore[index-2].hitStatus === 'spare' ? 10 + clickedNumber : (App.state.isAllStrike ? 30 : frameScore[index-2].score);
                        }
                   // frameScore[index-2].score = (frameScore[index-2].score === '' || frameScore[index-2].score === '-' && App.state.isAllStrike)  ? 30 : frameScore[index-2].score;
                }
                if(frameScore[index-1] != undefined)
                    {
                    if(frameScore[index-1].hitStatus === 'spare')
                    {
                        frameScore[index-1].score = (frameScore[index-1].score === '' || frameScore[index-1].score === '-')  ? 20 : frameScore[index-1].score;
                    }
                    
                }
            if(App.state.isAllStrike && App.state.ScoresInEachFrame.length === maxLengthOfArrayforStrike)
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

    App.setState({scoreUnderEachFrame: frameScore});
    let finalScore = 0;
    console.log('scoreUnderEachFrameArray: ' + App.state.scoreUnderEachFrame);
    App.state.scoreUnderEachFrame.map(function(item){
        if(item.id <= 10)
            {
            finalScore += item.score != 0 && item.score != '-' ? item.score : 0;
            }
        
    });
    App.setState({TotalScore: finalScore}, function(){
        console.log('TotalScore: ' +  finalScore);
    });
}