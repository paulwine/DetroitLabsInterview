import 'regenerator-runtime/runtime'
import {ActiveView, Center} from './Center';
import 'jest-fetch-mock';

describe('Center', () => {
    beforeEach(() => {
        Center.center().internalState = {
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
    it('should fetch weather data, populating currentTemp and forecastDays', async () => {
        let state = Center.center().internalState;
        expect(state.currentTemp).toBe(0);
        expect(state.forecastDays.length).toBe(0);

        await Center.getWeatherData()

        expect(state.currentTemp).not.toBe(0);
        expect(state.forecastDays.length).toBe(40);
    })
    it ('should set city name according to latitude and longitude', async () => {
        let state = Center.center().internalState;
        expect(state.userCity).toBeUndefined();

        await Center.getWeatherData()

        expect(state.userCity).toEqual('Bayfield');
    })
})