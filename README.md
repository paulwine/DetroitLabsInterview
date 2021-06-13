# Weather Forecast Application

This project is created using React in a typescript configuration, along with Jest for unit testing and Material UI for UI and stylization

## Project Overview

Here I will go over some of the major components and classes

### `Center`

Center is the heart of the application.  It serves as a central repository of truth accessible from any component as it is a singleton data store.  

This is not quite a FLUX based system as the Center does not process actions, rather it opens up functions to allow mutation on a single state.

If you would like to access the single instance of the entire center, simply call

```typescript
    Center.center();
```

In order to access the Center state, simply import Center into any component and call 

```typescript
    Center.state();
```

The Center state includes properties to display the active view (Current Temp or Five Day Forecast), current temperature, an array containing forecast day objects, user location and the name of the user's current city.

The Center also serves as a change broadcaster to all components that register as listeners.  In order to register a component as a listener, simply call the addListener function in the componentDidMount function
```typescript
    componentDidMount(){
        Center.addListener(this);
    }
```
and deregister it in componentWillUnmount
```typescript
    componentWillUnmount(){
        Center.removeListener(this);
    }
```

**Important Functions**
```typescript
    Center.setUserLocation();
```
The setUserLocation function triggers all other data functions in the center.  It contacts the JavaScript navigator API to get the geolocation coordinates of the user and calls the getWeatherData function

```typescript
    Center.getWeatherData();
```
The getWeatherData function uses the user location coordinates to construct api calls to retrieve current temperature data as well as get all items in the five day forecast and map them to `ForecastDay` objects in the Center state.


### `Dashboard`
Serves as a central navigation container holding the CurrentTempView and FiveDayView components.  Based on the Center state property 'activeView', it will display one or the other.

The dashboard also calls
```typescript
    Center.setUserLocation();
```
in it's componentDidMount function, which is the only function call needed to populate the application with data.
