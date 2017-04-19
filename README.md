# VSH-API

A RESTful API for a private project. Handles a basic customers / orders approach.

## Built with
* Node.JS v7.7.3
* MongoDB v3.4.1

## Documentation
* GET /customers
  * Retrieves the list of customers as an array


* POST /customers
  * Creates a new customer. See `example_customer.json` for parameters. You can only use the `profile` parameters and they shall **not** be in a `profile` object. `last_name` and `first_name` are mandatory.
  * Example body: `{ "first_name": "John", last_name": "Doe", "age": 19 }`


* GET /customers/{customerId}
  * Retrieves the specified customer.


* PUT /customers/{customerId}
  * Updates the specified customer. See `POST /customers` for parameters.


* DELETE /customers/{customerId}
  * Deletes the specified customer.


* GET /customers/{customerId}/orders
  * Retrieves the orders of the specified customer.


* POST /customers/{customerId}/orders
  * Creates a new order for the specified customer. See `example_order.json` for parameters. `amount` and `type` are mandatory. You must not specify `_id`, `customer_id` and `date`.
  * Example body: ` { "type": "Marriage", "amount": 50, "description": "Was cool." } `


* GET /orders
  * Retrieves the list of orders as an array


* GET /orders/{orderId}
  * Retrieves the specified order.


* PUT /orders/{orderId}
  * Updates the specified order.


* DELETE /orders/{orderId}
  * Delete the specified order.
