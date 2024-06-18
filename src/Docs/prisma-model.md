
# Prisma Schema Documentation

## Overview
This document provides an overview of the Prisma schema for the Hotel Reservation System. It includes the definitions of models, fields, and relationships between them.

## Models

### Room

The `Room` model represents the rooms available in the hotel.

```prisma
model Room {
  room_id        Int         @id @default(autoincrement())
  room_type      String
  price_per_night Float
  room_status    RoomStatus
  reservations   Reservation[]
}
```

- **room_id**: Integer, Primary Key, Auto-increment
- **room_type**: String, Type of the room (e.g., Deluxe, Suite)
- **price_per_night**: Float, Price per night for the room
- **room_status**: Enum, Status of the room (available, booked, maintenance)
- **reservations**: One-to-Many relation with `Reservation` model

### Guest

The `Guest` model represents the guests staying at the hotel.

```prisma
model Guest {
  guest_id  Int    @id @default(autoincrement())
  name      String
  address   String
  phone_number String
  reservations Reservation[]
}
```

- **guest_id**: Integer, Primary Key, Auto-increment
- **name**: String, Name of the guest
- **address**: String, Address of the guest
- **phone_number**: String, Phone number of the guest
- **reservations**: One-to-Many relation with `Reservation` model

### Reservation

The `Reservation` model represents the reservations made by guests.

```prisma
model Reservation {
  reservation_id Int       @id @default(autoincrement())
  guest_id       Int
  room_id        Int
  check_in_date  DateTime
  guest          Guest     @relation(fields: [guest_id], references: [guest_id])
  room           Room      @relation(fields: [room_id], references: [room_id])
  payments       Payment[]
}
```

- **reservation_id**: Integer, Primary Key, Auto-increment
- **guest_id**: Integer, Foreign Key referencing `Guest` model
- **room_id**: Integer, Foreign Key referencing `Room` model
- **check_in_date**: DateTime, Check-in date for the reservation
- **guest**: Many-to-One relation with `Guest` model
- **room**: Many-to-One relation with `Room` model
- **payments**: One-to-Many relation with `Payment` model

### Payment

The `Payment` model represents the payments made for reservations.

```prisma
model Payment {
  payment_id     Int       @id @default(autoincrement())
  reservation_id Int
  payment_date   DateTime
  amount         Float
  reservation    Reservation @relation(fields: [reservation_id], references: [reservation_id])
}
```

- **payment_id**: Integer, Primary Key, Auto-increment
- **reservation_id**: Integer, Foreign Key referencing `Reservation` model
- **payment_date**: DateTime, Date of the payment
- **amount**: Float, Amount of the payment
- **reservation**: Many-to-One relation with `Reservation` model

### Enums

#### RoomStatus

The `RoomStatus` enum represents the status of a room.

```prisma
enum RoomStatus {
  available
  booked
  maintenance
}
```

- **available**: The room is available for booking
- **booked**: The room is currently booked
- **maintenance**: The room is under maintenance


## Schema File

Below is the full content of the `schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = "mysql://user:password@localhost:3306/hotel"
}

model Room {
  room_id        Int         @id @default(autoincrement())
  room_type      String
  price_per_night Float
  room_status    RoomStatus
  reservations   Reservation[]
}

model Guest {
  guest_id  Int    @id @default(autoincrement())
  name      String
  address   String
  phone_number String
  reservations Reservation[]
}

model Reservation {
  reservation_id Int       @id @default(autoincrement())
  guest_id       Int
  room_id        Int
  check_in_date  DateTime
  guest          Guest     @relation(fields: [guest_id], references: [guest_id])
  room           Room      @relation(fields: [room_id], references: [room_id])
  payments       Payment[]
}

model Payment {
  payment_id     Int       @id @default(autoincrement())
  reservation_id Int
  payment_date   DateTime
  amount         Float
  reservation    Reservation @relation(fields: [reservation_id], references: [reservation_id])
}

enum RoomStatus {
  available
  booked
  maintenance
}
```