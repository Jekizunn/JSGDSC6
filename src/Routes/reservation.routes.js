import { PrismaClient } from "@prisma/client";
import express from "express";

export const reservationRouter = express.Router();
const prisma = new PrismaClient();

// Create Reservation
reservationRouter.post("/", async (req, res) => {
   const { guest_id, room_id, check_in_date } = req.body;

   // Check if all required fields are provided
   if (guest_id == null || room_id == null || !check_in_date) {
       return res.status(400).json({ message: "Missing required fields in the request body" });
   }

   // Validate that guest_id and room_id are integers
   if (!Number.isInteger(guest_id) || !Number.isInteger(room_id)) {
       return res.status(400).json({ message: "guest_id and room_id must be integers" });
   }

   // Validate that check_in_date is a valid ISO date string in the format YYYY-MM-DD
   const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
   if (!isoDateRegex.test(check_in_date)) {
       return res.status(400).json({ message: "check_in_date must be a valid ISO date (YYYY-MM-DD)" });
   }

   // Parse the date and convert it to an ISO-8601 DateTime string
   const date = new Date(check_in_date);
   if (isNaN(date.getTime())) {
       return res.status(400).json({ message: "Invalid date" });
   }
   const check_in_date_iso = date.toISOString();

   try {
       // Validate guest_id
       const guestExists = await prisma.guest.findUnique({
           where: { guest_id }
       });

       if (!guestExists) {
           return res.status(404).json({ message: "Guest not found" });
       }

       // Validate room_id
       const roomExists = await prisma.room.findUnique({
           where: { room_id }
       });

       if (!roomExists) {
           return res.status(404).json({ message: "Room not found" });
       }

       // Create the reservation
       const newReservation = await prisma.reservation.create({
           data: {
               guest_id,
               room_id,
               check_in_date: check_in_date_iso, // Use the ISO-8601 DateTime string
           },
       });

       res.status(201).json(newReservation);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while creating the reservation." });
   }
});





// Get Reservation by ID
reservationRouter.get("/:reservation_id", async (req, res) => {
   const reservationId = parseInt(req.params.reservation_id);

   try {
      const reservation = await prisma.reservation.findUnique({
         where: {
            reservation_id: reservationId,
         },
      });

      if (reservation) {
         res.status(200).json(reservation);
      } else {
         res.status(404).json({ error: "Reservation not found." });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving the reservation." });
   }
});

// Update Reservation
reservationRouter.put("/:reservation_id", async (req, res) => {
   const { reservation_id } = req.params;
   const { guest_id, room_id, check_in_date } = req.body;

   // Check if reservation_id is provided and is an integer
   if (!Number.isInteger(parseInt(reservation_id))) {
       return res.status(400).json({ message: "reservation_id must be an integer" });
   }

   // Check if all required fields are provided
   if (guest_id == null || room_id == null || !check_in_date) {
       return res.status(400).json({ message: "Missing required fields in the request body" });
   }

   // Validate that guest_id and room_id are integers
   if (!Number.isInteger(guest_id) || !Number.isInteger(room_id)) {
       return res.status(400).json({ message: "guest_id and room_id must be integers" });
   }

   // Validate that check_in_date is a valid ISO date string in the format YYYY-MM-DD
   const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
   if (!isoDateRegex.test(check_in_date)) {
       return res.status(400).json({ message: "check_in_date must be a valid ISO date (YYYY-MM-DD)" });
   }

   // Parse the date and convert it to an ISO-8601 DateTime string
   const date = new Date(check_in_date);
   if (isNaN(date.getTime())) {
       return res.status(400).json({ message: "Invalid date" });
   }
   const check_in_date_iso = date.toISOString();

   try {
       // Validate reservation_id
       const reservationExists = await prisma.reservation.findUnique({
           where: { reservation_id: parseInt(reservation_id) }
       });

       if (!reservationExists) {
           return res.status(404).json({ message: "Reservation not found" });
       }

       // Validate guest_id
       const guestExists = await prisma.guest.findUnique({
           where: { guest_id }
       });

       if (!guestExists) {
           return res.status(404).json({ message: "Guest not found" });
       }

       // Validate room_id
       const roomExists = await prisma.room.findUnique({
           where: { room_id }
       });

       if (!roomExists) {
           return res.status(404).json({ message: "Room not found" });
       }

       // Update the reservation
       const updatedReservation = await prisma.reservation.update({
           where: { reservation_id: parseInt(reservation_id) },
           data: {
               guest_id,
               room_id,
               check_in_date: check_in_date_iso, // Use the ISO-8601 DateTime string
           },
       });

       res.status(200).json(updatedReservation);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while updating the reservation." });
   }
});


// Delete Reservation
reservationRouter.delete("/:reservation_id", async (req, res) => {
   const { reservation_id } = req.params;

   // Validate that reservation_id is provided and is an integer
   if (!Number.isInteger(parseInt(reservation_id))) {
       return res.status(400).json({ message: "reservation_id must be an integer" });
   }

   try {
       // Validate reservation_id
       const reservationExists = await prisma.reservation.findUnique({
           where: { reservation_id: parseInt(reservation_id) }
       });

       if (!reservationExists) {
           return res.status(404).json({ message: "Reservation not found" });
       }

       // Delete the reservation
       await prisma.reservation.delete({
           where: { reservation_id: parseInt(reservation_id) },
       });

       res.status(200).json({ message: "Reservation deleted successfully." });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while deleting the reservation." });
   }
});

