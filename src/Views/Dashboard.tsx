import React from 'react';
import { Center, ActiveView } from '../Center/Center';
import TextField from '@material-ui/core/TextField';
import Navigation from '../Components/Navigation';
import CurrentTempView from './CurrentTempView';
import FiveDayView from './FiveDayView';
import { Typography } from '@material-ui/core';



export default class Dashboard extends React.Component {
    constructor(props : any){
        super(props);
    }

    componentDidMount() {
        Center.addListener(this);
        Center.setUserLocation();
    }
    componentWillUnmount() {
        Center.removeListener(this);
    }

    render(){
        const state = Center.center().state;
        return (
        <div className="DashboardView">
            <div>
                <Navigation></Navigation>
                <div>
                    <Typography variant={'subtitle1'}>Forecast Location : {state.userCity} - {state.userLocation?.latitude} , {state.userLocation?.longitude}</Typography>
                </div>
            </div>
            {state.activeView == ActiveView.CurrentTemp &&
                <CurrentTempView></CurrentTempView>
            }
            {state.activeView == ActiveView.FiveDay &&
                <FiveDayView></FiveDayView>
            }

        </div>
        )
    }
}