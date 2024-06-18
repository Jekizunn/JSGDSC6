### Payment Endpoints Documentation


#### Base URL: `/api`


#### Create Payment

- **URL**: `/payments`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "reservation_id": 1,
    "payment_date": "2024-06-11",
    "amount": 120.5
  }
  ```
- **Response**:
  ```json
  {
    "payment_id": 1,
    "reservation_id": 1,
    "payment_date": "2024-06-11",
    "amount": 120.5
  }
  ```

#### Get Payment by ID

- **URL**: `/payments/:payment_id`
- **Method**: `GET`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to retrieve.
- **Response**:
  ```json
  {
    "payment_id": 1,
    "reservation_id": 1,
    "payment_date": "2024-06-11",
    "amount": 120.5
  }
  ```

#### Update Payment

- **URL**: `/payments/:payment_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to update.
- **Request Body**:
  ```json
  {
    "reservation_id": 1,
    "payment_date": "2024-06-12",
    "amount": 150.0
  }
  ```
- **Response**:
  ```json
  {
    "payment_id": 1,
    "reservation_id": 1,
    "payment_date": "2024-06-12",
    "amount": 150.0
  }
  ```

#### Delete Payment

- **URL**: `/payments/:payment_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to delete.
- **Response**:
  ```json
  {
    "message": "Payment deleted successfully."
  }
  ```

---

### Sample Error Response

- **Status**: `400 Bad Request`
- **Response**:

  ```json
  {
    "error": "Bad Request",
    "message": "Description of the error."
  }
  ```

- **Status**: `404 Not Found`
- **Response**:

  ```json
  {
    "error": "Not Found",
    "message": "The requested resource could not be found."
  }
  ```

- **Status**: `500 Internal Server Error`
- **Response**:
  ```json
  {
    "error": "Internal Server Error",
    "message": "An unexpected error occurred."
  }
  ```
