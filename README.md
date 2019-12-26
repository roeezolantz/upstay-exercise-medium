# Reservation Feed

Welcome to UpStay, this repo contains a boilerplate for your UpStay exercise.

## Project aim

In this project you will create a live hotels reservations feed for display.
You will be provided with a stream of reservations, which you should keep track of using web sockets.
When a user opens the web-app, you should display the live feed for today's reservations.

## Instructions

You can start by forking this repo, complete the exercise and send us the a link to the forked repo.

![mockup](https://raw.githubusercontent.com/ancillary-streams/upstay-exercise-medium/master/preview-layout/lg.png)

### When complete, your submission should include:

1. Backend server in node.js
2. PostgreSQL database
3. Client in React

## Reservations source

Reservations are `POST`ed to the `/reservation` endpoint

## Tasks Overview

### 1. Insert reservations received in `/reservations` into the database.

Database initialization script:

```
CREATE TABLE ...
```

### 2. Create a new route for fetching reservations

Your backend node.js application should provide the relevant reservations for display.

### 3. Create a React app for viewing the reservations as a feed

Your frontend client application should display a live reservation feed according to the following specs and mock:

=== insert specs and mock here ===

### 4. Poll the server for continues updates of new reservations

Since this is a live feed, you should always check back to your backend application for new reservation to display.

### 5. Use a live exchange-rate provider to show all reservation prices in the same currency

Reservations may contain different currencies.
You will need to convert all prices to the same base currency in the display. Use a live (not static) exchange rate for the conversion process.

### 6. Allow the user to select the desired currency for display

Allow the user to choose a currency for the live feed display using a select-box.

Good Luck!
