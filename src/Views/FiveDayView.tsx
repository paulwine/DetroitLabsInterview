import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { Center } from '../Center/Center';
import { ForecastDayView } from '../Components/ForecastDayView';
import { ForecastDay } from '../Models/ForecastDay';

interface FiveDayViewProps {}

interface FiveDayViewState {
    dayOne: ForecastDay[];
    dayTwo: ForecastDay[];
    dayThree: ForecastDay[];
    dayFour: ForecastDay[];
    dayFive: ForecastDay[];
}

export default class FiveDayView extends React.Component<FiveDayViewProps, FiveDayViewState> {
    constructor(props : any){
        super(props);

        this.state = {
            dayOne: [],
            dayTwo: [],
            dayThree: [],
            dayFour: [],
            dayFive: [],
        }
    }

    componentDidMount() {
        Center.addListener(this);

        const state = Center.state();
        const forecastDays = state.forecastDays;

        let currentDate = new Date().getDate();

        const dayOne = state.forecastDays.filter(day => day.date.getDate() == currentDate);
        const dayTwo = state.forecastDays.filter(day => day.date.getDate() == currentDate + 1);
        const dayThree = state.forecastDays.filter(day => day.date.getDate() == currentDate + 2);
        const dayFour = state.forecastDays.filter(day => day.date.getDate() == currentDate + 3);
        const dayFive = state.forecastDays.filter(day => day.date.getDate() == currentDate + 4);

        this.setState({
            dayOne,
            dayTwo,
            dayThree,
            dayFour,
            dayFive
        });
    }
    componentWillUnmount() {
        Center.removeListener(this);
    }


    render(){
        return (
        <div>
            <Typography variant={"h4"} style={{background:'#4287f5', color: 'white'}}>Five Day Forecast</Typography>
            <Card style={containerStyle}>
                <ForecastDayView items={this.state.dayOne}></ForecastDayView>
                <ForecastDayView items={this.state.dayTwo}></ForecastDayView>
                <ForecastDayView items={this.state.dayThree}></ForecastDayView>
                <ForecastDayView items={this.state.dayFour}></ForecastDayView>
                <ForecastDayView items={this.state.dayFive}></ForecastDayView>
            </Card>
        </div>
        )
    }
}

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    background: 'linear-gradient(90deg, rgba(156,246,255,1) 0%, rgba(0,212,255,1) 100%)'
}