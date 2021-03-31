# ZappyRide Rate Comparison

This is an interactive data visualiziation app (deployed [here](link)), which allows users to compare electricity rate plans.

## Setup

To run this project on your local machine, run the following commands:

```
git clone https://github.com/Kama580/zappyride-rate-comparison.git
npm install
npm start
```

## Add a Rate

The structure of a new rate is an object with three keys:

1. **Name** - a string
2. **Calculation** - a function which takes a single parameter, a load profile array
3. **Home load profile** - a non-EV load profile array which will be used for the B1 calculation

For example, for a rate called 'flat-17' which charges flat $17/kWh:

```
function flat17Rate(loadProfile){
    return loadProfile[0] * 0.17
}

{
    name: 'flat17',
    calculation: flat17Rate,
    homeLoadProfile: [
        {demand: 'null', kWh: 6937.45}
    ]
}

```

To add a new rate, add the rate object to the allRates array in the main App.js file.

You can place the rate function inside the rates.js file and export it with the rateFunctions object.

## Tech Stack

This app uses React and Victory on the frontend.

## Authors

- Kama Lee-Tal
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
