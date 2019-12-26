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

1. Create a reservation route that return all the reservations from the database.

2. Use the code provided that attach the callback for listening to new reservation event from the generator stream, insert the new reservation to the database and broadcast it to the client using the socket provided from [socket.io](https://socket.io/) implementation. The broadcast to the client should occur only on successfully insertion!

3. Create a route that return all the currencies exchange rates using an external public API of your choice.

## Instructions [Front-End]

1. Create the feed page displaying all the reservations from the database on load of the application as describe in the preview mocks above. no need for pagination! all the data should be rendered endlessly to the page.

2. Activate the `filter input by uuid`: on every keystroke the feed should be refresh if there is any match with the reservation uuid, this filter is dynamic client side only!

3. Activate the `select box change currency`: on every change all the reservation prices should be converted to the new selected currency. (all the reservation are USD in the database) Use your early created currencies route to populate the ComboBox and make the conversion by their actual current values from your chosen external API.

4. Subscribe your socket.io client to the corresponding event your chose in the server to listen to the new reservation, use this reservation to update the live feed.

## Notes

1. To make your (and our :)) life more easy, we already make a pretty solid code infrastructure for the Server and the Client. Before your begin coding, please take 10-15 minutes to evaluate the exist implementation and understand the project structure and design architecture. if you have any questions before you start you can consult [Us](mailto:adiel@upstay.tech) any time!

2. Some of the libraries used in the project are not opinionative, please use them:

-   [axios](https://github.com/axios/axios) - HTTP Client for Node & Browser
-   [pg](https://node-postgres.com/) - Postgres Databse Client
-   [socket.io](https://socket.io/) - Real Time engine based on web sockets

If you are not familiar with those technologies please find the time to go through them and understand the basic use API. this is part of the test.
Other then that you can use any tool you know and love for the job.

3. In the Front-End, we are using a custom webpack config that supports all the new goodies javascript implementations. this setup support React(of course :)), JSX, hooks, css, scss(sass) and styled-components, you can add whatever tool or babel plugin your like if you need extra compile assets. (no need to use create-react-app - everything is already working for you!)
   Dev server and hot reload are also implemented in our express so you can work on the same url in the client and in the server (no need to complicate yourself with proxy for your ajax calls and other stuff)

4. Please use any UI library you want (or css framework) to make our project more shiny.

5. Extra points will be given for clean organized code. DRY!. We prefer your make less missions with robust code then the opposite.

6. We recommend using [VSCode IDE](https://code.visualstudio.com/) with those extensions:

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

For better development experience with fully eslint and prettier IDE support

7. Submit your solution by commit & push all your code and send us the forked URL.

Good Luck! Hope you will learn a lot and also have fun :)
