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