import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash'
require("../style.css");
import css from '../style.css';
import InputRange from 'react-input-range';
import App from './app'

const ScoreCalculation = (props) => {

    this.props.ScoresInEachFrame.map(chance => chance.chancesPlayed === props.chancesPlayed ?
        // transform the one with a matching id
        { ...chance, 
        
            if(isAllStrike)
                {
                    if(this.props.ScoresInEachFrame[chances.chancesPlayed -6] != undefined)
                        {
                            this.props.ScoresInEachFrame[chances.chancesPlayed -6].isScored = true;
                        }
                        if(props.chancesPlayed === 20)
                            {
                                this.props.ScoresInEachFrame[17].isScored = true;
                                this.props.ScoresInEachFrame[19].isScored = true;
                            }
                }
                
         } : 
        // otherwise return original todo
        chance
    ) 


    return {
          
    };

}