
### API Documentation

#### Base URL: `/api`

---

### Room Endpoints

#### Create Room
- **URL**: `/rooms`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "room_type": "Deluxe",
    "price_per_night": 120.50,
    "room_status": "available"
  }
  ```
- **Response**:
  ```json
  {
    "room_id": 1,
    "room_type": "Deluxe",
    "price_per_night": 120.50,
    "room_status": "available"
  }
  ```

#### Get Room by ID
- **URL**: `/rooms/:room_id`
- **Method**: `GET`
- **URL Parameters**:
  - `room_id` (integer): ID of the room to retrieve.
- **Response**:
  ```json
  {
    "room_id": 1,
    "room_type": "Deluxe",
    "price_per_night": 120.50,
    "room_status": "available"
  }
  ```

#### Update Room
- **URL**: `/rooms/:room_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `room_id` (integer): ID of the room to update.
- **Request Body**:
  ```json
  {
    "room_type": "Deluxe",
    "price_per_night": 130.00,
    "room_status": "booked"
  }
  ```
- **Response**:
  ```json
  {
    "room_id": 1,
    "room_type": "Deluxe",
    "price_per_night": 130.00,
    "room_status": "booked"
  }
  ```

#### Delete Room
- **URL**: `/rooms/:room_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `room_id` (integer): ID of the room to delete.
- **Response**:
  ```json
  {
    "message": "Room deleted successfully."
  }
  ```
