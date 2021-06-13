import 'regenerator-runtime/runtime'
import {shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import {Center, ActiveView } from '../Center/Center'
import CurrentTempView from './CurrentTempView'

configure({ adapter: new Adapter() });

describe('CurentTempView', () =>{
    beforeAll(() => {
        Center.center().internalState = {
            userCity: undefined,
            userLocation: {
                latitude: 43.500096,
                longitude: -81.935808
            },
            forecastDays: [],
            currentTemp: 90,
            activeView: ActiveView.CurrentTemp
        }
    }),
    it('should render component to match snapshot' , async () => {
        const currentTempView = shallow(<CurrentTempView></CurrentTempView>)
        expect(currentTempView.html()).toMatchSnapshot();
    })
})