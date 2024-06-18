import { PrismaClient } from "@prisma/client";
import express from "express";

export const paymentRouter = express.Router();
const prisma = new PrismaClient();

paymentRouter.post("/", async (req, res) => {
   const { reservation_id, amount } = req.body;

   // Validate that reservation_id is provided and is an integer
   if (!Number.isInteger(parseInt(reservation_id))) {
       return res.status(400).json({ message: "reservation_id must be an integer" });
   }

   // Validate that amount is provided and is a positive number
   if (typeof amount !== 'number' || amount <= 0) {
       return res.status(400).json({ message: "amount must be a positive number" });
   }

   try {
       // Retrieve reservation details including room_id to get price_per_night
       const reservation = await prisma.reservation.findUnique({
           where: { reservation_id: parseInt(reservation_id) },
           include: { room: true }
       });

       if (!reservation) {
           return res.status(404).json({ message: "Reservation not found" });
       }

       // Calculate expected payment amount based on price_per_night and number of nights
       const pricePerNight = reservation.room.price_per_night;
       const checkInDate = new Date(reservation.check_in_date);
       const checkOutDate = new Date(); // Assuming current date for check out
       const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Calculate number of nights

       const expectedAmount = pricePerNight * numberOfNights;

       // Check if amount paid is less than expected amount
       if (amount < expectedAmount) {
           // Handle notification or special response for underpayment
           return res.status(400).json({ message: "Underpayment detected. Please pay the correct amount." });
       }

       // Create the payment
       const newPayment = await prisma.payment.create({
           data: {
               reservation_id: parseInt(reservation_id),
               payment_date: new Date(),
               amount,
           },
       });

       res.status(201).json(newPayment);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while processing the payment." });
   }
});


paymentRouter.get("/:payment_id", async (req, res) => {
   const paymentId = req.params.payment_id;

   const payment = await prisma.payment.findUnique({
      where: {
         payment_id: parseInt(paymentId)
      }
   });

   res.status(200).json(payment);
});

paymentRouter.put("/:payment_id", async (req, res) => {
   const paymentId = req.params.payment_id;
   const body = req.body;

   const payment = await prisma.payment.update({
      where: {
         payment_id: parseInt(paymentId),
      },
      data: body
   });

   res.status(200).json(payment);
});

paymentRouter.delete("/:payment_id", async (req, res) => {
   const paymentId = req.params.payment_id;

   // Validate that payment_id is provided and is an integer
   if (!Number.isInteger(parseInt(paymentId))) {
       return res.status(400).json({ message: "payment_id must be an integer" });
   }

   try {
       // Check if the payment exists
       const payment = await prisma.payment.findUnique({
           where: {
               payment_id: parseInt(paymentId),
           },
       });

       if (!payment) {
           return res.status(404).json({ message: "Payment not found" });
       }

       // Delete the payment
       await prisma.payment.delete({
           where: {
               payment_id: parseInt(paymentId),
           },
       });

       res.status(200).json({ message: "Payment deleted successfully" });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred while deleting the payment" });
   }
});

