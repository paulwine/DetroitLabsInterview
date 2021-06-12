import { Typography } from '@material-ui/core';
import React from 'react';
import { Center } from '../Center/Center';

export default class CurrentTempView extends React.Component {
    constructor(props : any){
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
        if (!state.currentTemp){
            return (
                <div>
                    <h2>User Location Not Set</h2>
                </div>
            )
        }
        return (
        <div>
            <Typography variant={"h4"}>Current Temperature</Typography>
            <Typography variant={"h2"}>{state.currentTemp}°F</Typography>
        </div>
        )
    }
}