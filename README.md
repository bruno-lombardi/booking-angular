# Booking

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Dont forget to config the environment api variable to the correct backend server address on angular environment.
Example:
[/src/environments/environment.ts](https://github.com/bruno-lombardi/booking-angular/blob/master/src/environments/environment.ts)
```
export const environment = {
  production: false,
  api: 'http://localhost:3000/api/v1'
};

```
Run `npm run dev` inside /server folder for backend server. By default server is loaded on port 3000. The backend server will be required for app to work. Don't forget to config .env file for the server, the required fields are below.
Example:
`/server/.env`
```
NODE_ENV=development
DB_URI=mongodb://localhost:27017/booking
DB_TEST_URI=mongodb://localhost:27017/booking_test
JWT_SECRET=YOUR_SECRET
## JWT_EXPIRATION should be in the format {amount:number}{time_unit:letter}. For example, 22h, 1d, 3440m, 1Y
## The letter should be according to momentjs .add() shorthand [here](http://momentjs.com/docs/#/manipulating/add/)
JWT_EXPIRATION=1h
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Inside server folder, run `npm test` to execute unit tests in watch mode via [Jest](https://jestjs.io/)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
