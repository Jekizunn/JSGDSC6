
### API Documentation

#### Base URL: `/api`
---

### Guest Endpoints

#### Create Guest
- **URL**: `/guests`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
  "username": "john_doe",
  "password": "securepassword123",
  "name": "John Doe",
  "email": "john.doe@example.com"
  }
  ```
- **Response**:
  ```json
  {
  "guest_id": 1,
  "username": "john_doe",
  "name": "John Doe",
  "email": "john.doe@example.com"
  }
  ```

#### Get Guest by ID
- **URL**: `/guests/:guest_id`
- **Method**: `GET`
- **URL Parameters**:
  - `guest_id` (integer): ID of the guest to retrieve.
- **Response**:
  ```json
  {
    "guest_id": 1,
    "name": "John Doe",
    "address": "123 Main St",
    "phone_number": "123-456-7890"
  }
  ```

#### Update Guest
- **URL**: `/guests/:guest_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `guest_id` (integer): ID of the guest to update.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "address": "456 Elm St",
    "phone_number": "987-654-3210"
  }
  ```
- **Response**:
  ```json
  {
    "guest_id": 1,
    "name": "John Doe",
    "address": "456 Elm St",
    "phone_number": "987-654-3210"
  }
  ```

#### Delete Guest
- **URL**: `/guests/:guest_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `guest_id` (integer): ID of the guest to delete.
- **Response**:
  ```json
  {
    "message": "Guest deleted successfully."
  }
  ```
