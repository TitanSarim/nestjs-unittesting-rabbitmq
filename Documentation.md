# API Documentation

## This document provides an overview of the available API routes for the application, detailing their functionality, request formats, and expected responses. The API includes authentication routes and meal management routes. Additionally, the integration with RabbitMQ is described for messaging purposes. And two functional testing for Auth, and unit tesitng.

## Table of Contents
### Authentication Routes
    POST /auth/signup
    GET /auth/login

### Meal Management Routes
    POST /meals
    GET /meals
    GET /meals/resturant/
    GET /meals/
    PUT /meals/
    DELETE /meals/

### RabbitMQ Integration
    User Creation Message

## Authentication Routes
    POST /auth/signup

### Description:
Registers a new user.

Request Body:
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

Response:

201 Created Success Response:
```
{
  "token": "jwt_token_here"
}
```
409 Conflict
Error Response if email already exists:
```
{
  "statusCode": 409,
  "message": "Duplicate Email Enterence",
  "error": "Conflict"
}
```

    GET /auth/login

Description:

Logs in an existing user.

Request Body:

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

Response:

    200 OK
Success Response:
```
{
  "token": "jwt_token_here"
}
```

    401 Unauthorized
Error Response if credentials are incorrect:
```
{
  "statusCode": 401,
  "message": "Invalid Email address Please register",
  "error": "Unauthorized"
}
```

## Meal Management Routes

    POST /meals

Description:
Creates a new meal.

Request Body:
```
{
  "name": "Pizza",
  "price": 12.99,
  "description": "Delicious cheese pizza",
  "restaurantId": "1234567890abcdef"
}
```

Headers:
    Authorization: Bearer jwt_token_here

Response:

    201 Created
Success Response:
```
{
  "id": "meal_id_here",
  "name": "Pizza",
  "price": 12.99,
  "description": "Delicious cheese pizza",
  "restaurantId": "1234567890abcdef",
  "createdBy": "user_id_here"
}
```

    GET /meals
Description:
Retrieves all meals.

Response:

    200 OK
Success Response:

```
[
  {
    "id": "meal_id_here",
    "name": "Pizza",
    "price": 12.99,
    "description": "Delicious cheese pizza",
    "restaurantId": "1234567890abcdef"
  },
  ...
]

```

    GET /meals/resturant/

Description:
Retrieves meals by restaurant ID.

Parameters:

    id: The ID of the restaurant.

Response:

    200 OK Success Response:

```
[
  {
    "id": "meal_id_here",
    "name": "Pizza",
    "price": 12.99,
    "description": "Delicious cheese pizza",
    "restaurantId": "1234567890abcdef"
  },
  ...
]

```

    GET /meals/

Description:
Retrieves a specific meal by its ID.

Parameters:
    id: The ID of the meal.

Response:

    200 OK Success Response:

```
{
  "id": "meal_id_here",
  "name": "Pizza",
  "price": 12.99,
  "description": "Delicious cheese pizza",
  "restaurantId": "1234567890abcdef"
}
```

    404 Not Found
Error Response if the meal is not found:
```
{
  "statusCode": 404,
  "message": "Meal not found",
  "error": "Not Found"
}

```

    PUT /meals/
Description:
Updates a specific meal by its ID.

Parameters:

    id: The ID of the meal.

Request Body:
```
{
  "name": "Pizza Margherita",
  "price": 13.99,
  "description": "Delicious Margherita pizza"
}
```
Headers:

    Authorization: Bearer jwt_token_here
Response:

    200 OK

Success Response:

```
{
  "id": "meal_id_here",
  "name": "Pizza Margherita",
  "price": 13.99,
  "description": "Delicious Margherita pizza",
  "restaurantId": "1234567890abcdef"
}

```

    DELETE /meals/

Description:

    Deletes a specific meal by its ID.

Parameters:

    id: The ID of the meal.

Headers:

    Authorization: Bearer jwt_token_here

Response:

    200 OK

Success Response:
```
{
  "deleted": true
}

```


## RabbitMQ Integration 

### User Creation Message
After a user is successfully created through the POST /auth/signup route, a message is published to RabbitMQ with the details of the new user.

    Queue Name: user_queue

    Message Pattern: user_created

    Message Payload:


```
{
  "id": "user_id_here",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```