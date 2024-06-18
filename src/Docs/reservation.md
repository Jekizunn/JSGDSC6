
### API Documentation

#### Base URL: `/api`
---

### Reservation Endpoints

#### Create Reservation
- **URL**: `/reservations`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "guest_id": 1,
    "room_id": 1,
    "check_in_date": "2024-06-10"
  }
  ```
- **Response**:
  ```json
  {
    "reservation_id": 1,
    "guest_id": 1,
    "room_id": 1,
    "check_in_date": "2024-06-10"
  }
  ```

#### Get Reservation by ID
- **URL**: `/reservations/:reservation_id`
- **Method**: `GET`
- **URL Parameters**:
  - `reservation_id` (integer): ID of the reservation to retrieve.
- **Response**:
  ```json
  {
    "reservation_id": 1,
    "guest_id": 1,
    "room_id": 1,
    "check_in_date": "2024-06-10"
  }
  ```

#### Update Reservation
- **URL**: `/reservations/:reservation_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `reservation_id` (integer): ID of the reservation to update.
- **Request Body**:
  ```json
  {
    "guest_id": 1,
    "room_id": 1,
    "check_in_date": "2024-06-11"
  }
  ```
- **Response**:
  ```json
  {
    "reservation_id": 1,
    "guest_id": 1,
    "room_id": 1,
    "check_in_date": "2024-06-11"
  }
  ```

#### Delete Reservation
- **URL**: `/reservations/:reservation_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `reservation_id` (integer): ID of the reservation to delete.
- **Response**:
  ```json
  {
    "message": "Reservation deleted successfully."
  }
  ```