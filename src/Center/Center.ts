import React from "react";
import { ForecastDay } from "../Models/ForecastDay";


export enum ActiveView {
    CurrentTemp,
    FiveDay
}

interface CenterState {
    activeView: ActiveView;
    userLocation?: {
        latitude: number;
        longitude: number;
    }; 
    userCity?: string;
    currentTemp : number;
    forecastDays: ForecastDay[];
}

const apiKey : string = '475427f62c3d25e731ed6a19c1e83f92';
const apiEndpoint : string = 'https://api.openweathermap.org/data/2.5/';
const iconEndpoint = "http://openweathermap.org/img/w/";

export class Center {
    private static instance: Center;
    public state : CenterState;

    private constructor() { 
        this.state = {
            activeView: ActiveView.CurrentTemp,
            currentTemp: 0,
            forecastDays: []
        }
    }

    public static center(): Center {
        if (!Center.instance) {
            Center.instance = new Center();
        }
        return Center.instance;
    }

    // ================== Update Functions ============================
    private listeners: React.Component[] = [];

    public static addListener(listener: React.Component) {
        Center.center().listeners.push(listener);
    }

    public static removeListener(listener: React.Component) {
        const index = Center.center().listeners.indexOf(listener);
        if (index > -1) {
            Center.center().listeners.splice(index, 1);
        }
    }

    public static update(): void {
        Center.center().listeners.forEach(listener => listener.setState({}));
    }

    //================= UI Functions =====================================

    public static navigate(view: ActiveView) : void {
        Center.center().state.activeView = view;
        Center.update();
    }

    //================== Data Functions =====================================

    public static setUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            let coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            Center.center().state.userLocation = coords;
            Center.update();
            Center.getWeatherData();
        })

    }

    public static async getWeatherData() : Promise<void> {
        const state = Center.center().state;
        if (!state.userLocation){
            console.error("No User Location Set");
            return;
        }
        const lat = state.userLocation.latitude;
        const lon = state.userLocation.longitude;

        const currentTempEndpoint = apiEndpoint + 
        `weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        const currentTempResponse = await fetch(currentTempEndpoint);
        const currentTempJSON = await currentTempResponse.json();
        const currentTemp = currentTempJSON["main"]["temp"];

        state.currentTemp = currentTemp;
        state.userCity = currentTempJSON["name"];

        const fiveDayEndpoint = apiEndpoint + 
        `forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        const fiveDayResponse = await fetch(fiveDayEndpoint);
        const fiveDayJSON = await fiveDayResponse.json();

        const list = fiveDayJSON["list"];

        let forecastDays: ForecastDay[] = [];

        list.forEach((item : any) => {
            const temperature : number = item["main"]["temp"];
            const imgUrl : string = iconEndpoint+ item["weather"][0]["icon"] + '.png';
            const date : Date = new Date(item["dt_txt"]);

            const forecastDay : ForecastDay = {
                imgUrl,
                temperature,
                date
            };
            forecastDays.push(forecastDay);
        })

        state.forecastDays = forecastDays;

        Center.update();
    }
}