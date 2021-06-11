import { Card, Typography } from "@material-ui/core";
import React from "react";
import { ForecastDay } from "../Models/ForecastDay";

interface ForecastDayViewProps {
    items: ForecastDay[];
}

export class ForecastDayView extends React.Component<ForecastDayViewProps>{
    constructor(props: ForecastDayViewProps){
        super(props);
    }
    render() {
        if (!this.props.items || this.props.items.length == 0){
            return (
                <div>
                    <h2>User Location Not Set</h2>
                </div>
            )
        }
        return (
            <div style={containerStyle}>
            <Typography variant={"h5"} style={{color: 'white'}}> {this.props.items[0].date.toLocaleDateString()}</Typography>
                {this.props.items.map(day =>{
                    return (
                        <Card style={itemStyle} elevation={3}>
                            <h5>{day.date.toLocaleTimeString()}</h5>
                            <img src={day.imgUrl}></img>
                            <h4>{day.temperature}°F</h4> 
                        </Card>
                    )
                })}
            </div>
        )
    }
}

const containerStyle = {
    background: '#4287f5',
    padding: 10
}

const itemStyle = {
    margin: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    border: '2px solid gray'

}