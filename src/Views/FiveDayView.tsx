import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { Center } from '../Center/Center';
import { ForecastDayView } from '../Components/ForecastDayView';
import './styles.css'

interface FiveDayViewProps {

}

interface FiveDayViewState {

}

export default class FiveDayView extends React.Component<FiveDayViewProps, FiveDayViewState> {
    constructor(props : FiveDayViewProps){
        super(props);
    }

    componentDidMount() {
        Center.addListener(this);
    }
    componentWillUnmount() {
        Center.removeListener(this);
    }


    render(){
        const state = Center.center().state;
        const forecastDays = state.forecastDays;

        const dayOne = state.forecastDays.slice(0,8);
        const dayTwo = state.forecastDays.slice(8,16);
        const dayThree = state.forecastDays.slice(16,24);
        const dayFour = state.forecastDays.slice(24,32);
        const dayFive = state.forecastDays.slice(32);

        const sectionedDays = [dayOne, dayTwo, dayThree, dayFour, dayFive];

        return (
        <div>
            <Typography variant={"h4"} style={{background:'#4287f5', color: 'white'}}>Five Day Forecast</Typography>
            <Card className="forecastContainer">
                <ForecastDayView items={dayOne}></ForecastDayView>
                <ForecastDayView items={dayTwo}></ForecastDayView>
                <ForecastDayView items={dayThree}></ForecastDayView>
                <ForecastDayView items={dayFour}></ForecastDayView>
                <ForecastDayView items={dayFive}></ForecastDayView>
            </Card>
        </div>
        )
    }
}