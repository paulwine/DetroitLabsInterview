import React from 'react';
import { Center, ActiveView } from '../Center/Center';

import { Button, Paper, Tabs, Tab } from '@material-ui/core';

interface NavigationProps {

}

interface NavigationState {

}

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props : NavigationProps){
        super(props);
    }

    componentDidMount() {
        Center.addListener(this);
    }
    componentWillUnmount() {
        Center.removeListener(this);
    }

    handleClick = (event: any, value: number) => {
        if (value == 0){
            Center.navigate(ActiveView.CurrentTemp)
        }
        else if (value == 1){
            Center.navigate(ActiveView.FiveDay)
        }
    }

    render(){
        const state = Center.state();
        return (
        <div className="Navigation">
                    <Paper square>
                    <Tabs
                        value={state.activeView}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleClick}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Current Temperature" />
                        <Tab label="Five Day Forecase"/>
                    </Tabs>
                </Paper>
        </div>
        )
    }
}