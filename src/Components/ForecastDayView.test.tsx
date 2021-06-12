import 'regenerator-runtime/runtime'
import React from 'react'
import {Center, ActiveView } from '../Center/Center'
import {shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import 'jest-fetch-mock';
import { ForecastDayView } from './ForecastDayView';

configure({ adapter: new Adapter() });

describe('ForecastDayView', () =>{
    it('should render forecastDays correctly' , async () => {
        const forecastDays =[
            {"imgUrl":"http://openweathermap.org/img/w/10d.png","temperature":82.4,"date": new Date("2021-06-13T04:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/10n.png","temperature":74.62,"date": new Date("2021-06-13T07:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/10n.png","temperature":67.96,"date": new Date("2021-06-13T10:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/10n.png","temperature":67.6,"date": new Date("2021-06-13T13:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/03d.png","temperature":67.57,"date": new Date("2021-06-13T16:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/04d.png","temperature":71.83,"date": new Date("2021-06-13T19:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/03d.png","temperature":80.17,"date": new Date("2021-06-13T22:00:00.000Z")},
            {"imgUrl":"http://openweathermap.org/img/w/01d.png","temperature":80.83,"date": new Date("2021-06-14T01:00:00.000Z")}
        ];
        const forecastDayView = shallow(<ForecastDayView items={forecastDays}/>)
        expect(forecastDayView.html()).toMatchSnapshot();
    })
    
})