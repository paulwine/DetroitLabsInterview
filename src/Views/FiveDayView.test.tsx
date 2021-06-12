import 'regenerator-runtime/runtime'
import React from 'react'
import {Center, ActiveView } from '../Center/Center'
import {shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import FiveDayView from './FiveDayView';
import 'jest-fetch-mock';
import { ForecastDayView } from '../Components/ForecastDayView';

configure({ adapter: new Adapter() });

describe('FiveDayView', () =>{
    beforeAll(() => {
        Center.center().state = {
            userCity: undefined,
            userLocation: {
                latitude: 43.500096,
                longitude: -81.935808
            },
            forecastDays: [],
            currentTemp: 0,
            activeView: ActiveView.CurrentTemp
        }
    }),
    it('should seperate forecastDays based on date' , async () => {
        await Center.getWeatherData();
        const fiveDayView = shallow(<FiveDayView/>);
        expect(fiveDayView.find(ForecastDayView).length).toBe(5);
    })
})