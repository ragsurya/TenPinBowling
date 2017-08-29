import React from 'react';
import App from '../../components/app.js';
import NumberOfPinsHit from '../../components/app.js';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import _ from 'lodash';



it('renders without crashing', () => {
    expect(JSON.stringify(
      Object.assign({}, App, { _reactInternalInstance: 'censored' })
    )).toMatchSnapshot();
  });


describe('<App />', () => {
    it('renders 1 <app> component', () => {
        const component = shallow(<App />);
        expect(component).toHaveLength(1);
    });
})

describe('<NumberOfPinsHit />', () => {
    it('renders 1 <NumberOfPinsHit> component', () => {
        const component = shallow(<NumberOfPinsHit />);
        expect(component).toHaveLength(1);
    });
})
describe('NumberOfPinsHit nested inside App', () => {
    it('renders NumberOfPinsHit nested inside App', () => {
        const component = shallow(<App />);
        expect(component.find('NumberOfPinsHit').length).toEqual(1);
    });
})

describe('Frames nested inside App', () => {
    it('renders Frames nested inside App', () => {
        const component = shallow(<App />);
        expect(component.find('Frames').length).toEqual(1);
    });
})
describe('<App />', () => {
    it('renders 1 <app> component', () => {
        const component = mount(<App />);
        expect(component.state().TotalScore).toEqual(0);
    });
})

describe('<NumberOfPinsHit />', () => {
    it('This test replicates the behaviour of skittles or pins the player can knock down. initially it should be 10, where a player has a possibility of knocking down 0 through 10', () => {
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;
        expect(component.state().arrayOfPinCountHit.length).toEqual(11);
    });
})

describe('<NumberOfPinsHit />: when a player hits 2 pins in a bowl, he should have remaining 8 pins to be hit in the next attempt', () => {
    it('Verifies if a player knocks down 2 pins, he should only see 8 more pins, with the oprion of a zero hit, so that makes it 9', () => {
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;
        const span = component.find('span').at(2);
        span.simulate('click');

        expect(component.state().arrayOfPinCountHit.length).toEqual(9);
    });
})


describe('<NumberOfPinsHit />: when a player hits 9 pins in first attempt, and then he hits 1 in next, it should be a spare, he should have remaining 10 pins reset to be hit in the next frame', () => {
    it('verifies when a player hits 9 pins in first attempt, and then he hits 1 in next, it should be a spare, he should have remaining 10 pins reset to be hit in the next frame', () => {
       
        //var app = shallow(<App />);
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;
        const span1 = component.find('span').at(6);
        span1.simulate('click');

        // const span2 = component.find('span').at(1);
        // span2.simulate('click');
        
        
        expect(component.state().arrayOfPinCountHit.length).toEqual(5);
       // expect(component.state('totalScore')).toEqual(300);
    });
})

describe('<NumberOfPinsHit />: when a player hits 6 pins in first attempt, and then he hits 1 in next, the total score must be 7', () => {
    it('when a player hits 6 pins in first attempt, and then he hits 1 in next, the total score must be 7', () => {
       
        //var app = shallow(<App />);
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;
        const span1 = component.find('span').at(6);
        span1.simulate('click');

        const span2 = component.find('span').at(1);
        span2.simulate('click');
        
        
        expect(component.state().TotalScore).toEqual(7);
       // expect(component.state('totalScore')).toEqual(300);
    });
})


describe('<NumberOfPinsHit />: when a player hits 2 pins in first 10 attempts (five frames), and then he hits 1 spare next, followed by 2 2-s, then score shouled be 36', () => {
    it('verifies when a player hits 2 pins in first 10 attempts (five frames), and then he hits 1 spare next, followed by 2 2-s, then score shouled be 36', () => {
       
        //var app = shallow(<App />);
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;
        const span1 = component.find('span').at(2);
        span1.simulate('click');

        const span2 = component.find('span').at(2);
        span2.simulate('click');

        const span3 = component.find('span').at(2);
        span3.simulate('click');
        
        const span4 = component.find('span').at(2);
        span4.simulate('click');

        const span5 = component.find('span').at(2);
        span5.simulate('click');

        const span6 = component.find('span').at(2);
        span6.simulate('click');

        const span7 = component.find('span').at(2);
        span7.simulate('click');

        const span8 = component.find('span').at(2);
        span8.simulate('click');

        const span9 = component.find('span').at(2);
        span9.simulate('click');

        const span10 = component.find('span').at(2);
        span10.simulate('click');

        const span11 = component.find('span').at(5);
        span11.simulate('click');

        const span12 = component.find('span').at(5);
        span12.simulate('click');


        const span13 = component.find('span').at(2);
        span13.simulate('click');

        const span14 = component.find('span').at(2);
        span14.simulate('click');
        
        expect(component.state().TotalScore).toEqual(36);
       // expect(component.state('totalScore')).toEqual(300);
    });
})

describe('<NumberOfPinsHit />: when a player hits 3 pins all his 10 frames then score shouled be 30', () => {
    it(' when a player hits 3 pins all his 10 frames then score shouled be 30', () => {
       
        //var app = shallow(<App />);
        const component = mount(<NumberOfPinsHit />);
        component.state().framePosition=1;
        component.state().arrayOfPinCountHit = _.range(0,11); 
        component.state().scoresInEachFrame = []; 
        component.state().chancesPlayed = 0;
        component.state().isAllStrike = false;

        for (let i=0; i<10; i++)
            {
                var span = {i} + 'span';
                const  span= component.find('span').at(3);
                span.simulate('click');
            }
        
        expect(component.state().TotalScore).toEqual(30);
      
    });
})
