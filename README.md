# Reservation Feed

Welcome to UpStay, this repo contains a boilerplate for your UpStay exercise.

## Project aim

In this project you will create a live feed hotels reservations web service.

You will be provided with a stream of reservations, which you should keep track of in the server and insert it to
the database, after successfully inserted your will broadcast it to the client using web sockets.
When a user opens the web-app, he should see the live feed for with all the reservations from the database:

This is how it should look like:

![large](https://raw.githubusercontent.com/ancillary-streams/upstay-exercise-medium/master/preview-layout/lg.png)

The web app should be fully responsive and from small breakpoint down (`@media (min-width: 576px)`) the layout should be look like this:

![sm](https://raw.githubusercontent.com/ancillary-streams/upstay-exercise-medium/master/preview-layout/sm.png)

## Establishment

1. Fork this project to your local machine.

2. Create a [Postgres](https://www.postgresql.org/) database using your favorite tools (we recommend [DataGrip IDE](https://www.jetbrains.com/datagrip/)) and execute the [ddl.sql](https://github.com/ancillary-streams/upstay-exercise-medium/blob/master/ddl.sql) provided in the project to generate your initial database structure.

3. create .env file and put there your ConnectionString under `DATABASE_URL` key as shown in [.env.example](https://github.com/ancillary-streams/upstay-exercise-medium/blob/master/.env.example)

4. Your all set! start the project using `npm install` and `npm start`. you will see a [web page](http://localhost:9999) opened with a beautiful "Welcome to UpStay" message :)

## Instructions [Back-End]

1. Create a reservation route that returns all the reservations from the database.

2. Use the code provided and attach a callback to new reservation events in the generator stream.

3. Insert new reservations to the database and broadcast them to the client using the socket provided from [socket.io](https://socket.io/) implementation. The broadcast to the client should only occur on successfully insertion!

4. Create a route that returns live exchange rates for currencies using an external public API of your choice.

## Instructions [Front-End]

1. Create the feed page displaying all the reservations from the database on application load, as describe in the preview mocks above. No need for pagination! All the data should be rendered endlessly onto the page.

2. Activate the `filter input by uuid`: on every keystroke the feed should refresh to display any matches to the reservation's uuid. This filter should be dynamic client-side only.

3. Activate the `select box change currency`: on every change all the reservation prices should be converted to the new selected currency (all reservations are in USD). Use your previously created currencies route to populate the ComboBox and make the conversion by their actual current values from your chosen external API.

4. Subscribe your socket.io client to the corresponding event your chose in the server and listen to new reservation events. Add any new reservations to the live feed.

## Notes

1. To make your (and our :)) life easier, we already made a pretty solid code infrastructure for the Server and the Client. Before your begin coding, please take 10-15 minutes to evaluate the existing implementation and make sure you understand the project structure and design architecture.
   If you have any questions before you start you can [reach out to us](mailto:adiel@upstay.tech) any time!

2. Some of the libraries used in the project are not opinionative, please use them:

-   [axios](https://github.com/axios/axios) - HTTP Client for Node & Browser
-   [pg](https://node-postgres.com/) - Postgres Databse Client
-   [socket.io](https://socket.io/) - Real Time engine based on web sockets

If you are not familiar with those technologies please find the time to go through them and understand the basic use API. This is part of the test. Besides those, you may use any other tool you know and love for the job.

3. In the Front-End, we are using a custom webpack config that supports all the new javascript goodies implementations. This setup support React (of course :)), JSX, hooks, css, scss (sass) and styled-components. You can add whatever tool or babel plugin your like if you need extra compile assets (no need to use create-react-app - everything is already working for you!).
   Dev server and hot reload are also implemented, so you can work on the same url in the client and the server (no need to complicate yourself with proxy for your ajax calls and other stuff).

4. Please use any UI library you want (or css framework) to make our project more shiny.

5. We look for clean and organized code. Keep it DRY!

6. We recommend using [VSCode IDE](https://code.visualstudio.com/) with those extensions:

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

For better development experience with fully eslint and prettier IDE support

7. Submit your solution by committing & pushing all your code and send us the forked repo URL.

Good Luck! We hope you will learn a lot and also have fun :)
