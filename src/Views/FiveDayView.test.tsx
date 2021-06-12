import 'regenerator-runtime/runtime'
import React from 'react'
import {Center, ActiveView } from '../Center/Center'
import {shallow, configure } from 'enzyme'

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
    })
})