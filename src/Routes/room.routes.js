import { PrismaClient } from "@prisma/client";
import express from "express";

export const roomRouter = express.Router();
const prisma = new PrismaClient();

// Create Room
roomRouter.post("/", async (req, res) => {
   const { room_type, price_per_night, room_status } = req.body;

   try {
      const newRoom = await prisma.room.create({
         data: {
            room_type,
            price_per_night,
            room_status,
         },
      });

      res.status(201).json(newRoom);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while creating the room." });
   }
});

// Get Room by ID
roomRouter.get("/:room_id", async (req, res) => {
   const roomId = parseInt(req.params.room_id);

   try {
      const room = await prisma.room.findUnique({
         where: {
            room_id: roomId,
         },
      });

      if (room) {
         res.status(200).json(room);
      } else {
         res.status(404).json({ error: "Room not found." });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving the room." });
   }
});

// Update Room
roomRouter.put("/:room_id", async (req, res) => {
   try {
       const roomId = parseInt(req.params.room_id);
       const body = req.body;

       // Check if the room exists before updating
       const existingRoom = await prisma.room.findUnique({
           where: { room_id: roomId }
       });

       if (!existingRoom) {
           return res.status(404).json({ message: "Room not found" });
       }

       const updatedRoom = await prisma.room.update({
           where: {
               room_id: roomId,
           },
           data: body,
       });

       res.status(200).json(updatedRoom);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while updating the room." });
   }
});


// Delete Room
roomRouter.delete("/:room_id", async (req, res) => {
   const roomId = parseInt(req.params.room_id);

   try {
      await prisma.room.delete({
         where: {
            room_id: roomId,
         },
      });

      res.status(200).json({ message: "Room deleted successfully." });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the room." });
   }
});
