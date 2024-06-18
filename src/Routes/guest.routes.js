import { PrismaClient } from "@prisma/client";
import express from "express";

export const guestRouter = express.Router();
const prisma = new PrismaClient();

// Create a new guest
guestRouter.post("/", async (req, res) => {
    const body = req.body;

    try {
        const newGuest = await prisma.guest.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name,
                email: body.email,
            },
            select: {
                guest_id: true,
                username: true,
                name: true,
                email: true,
            }
        });

        console.log(body);
        res.status(201).json(newGuest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the guest." });
    }
});

// Get a guest by ID
guestRouter.get("/:guest_id", async (req, res) => {
    const guestId = req.params.guest_id;

    try {
        const guest = await prisma.guest.findUnique({
            where: {
                guest_id: parseInt(guestId),
            },
        });

        if (guest) {
            res.status(200).json(guest);
        } else {
            res.status(404).json({ message: "Guest not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the guest." });
    }
});

// Update a guest by ID
guestRouter.put("/:guest_id", async (req, res) => {
    const guestId = req.params.guest_id;
    const body = req.body;

    try {
        const guest = await prisma.guest.update({
            where: {
                guest_id: parseInt(guestId),
            },
            data: {
                username: body.username,
                password: body.password,
                name: body.name,
                email: body.email,
            },
        });

        res.status(200).json(guest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the guest." });
    }
});

// Delete a guest by ID
guestRouter.delete("/:guest_id", async (req, res) => {
    const guestId = req.params.guest_id;

    // Validate that guest_id is an integer
    if (!Number.isInteger(parseInt(guestId))) {
        return res.status(400).json({ message: "guest_id must be an integer" });
    }

    try {
        // Check if the guest has associated reservations
        const reservations = await prisma.reservation.findMany({
            where: {
                guest_id: parseInt(guestId),
            },
        });

        if (reservations.length > 0) {
            return res.status(400).json({ message: "Guest cannot be deleted because they have existing reservations." });
        }

        // Proceed with deleting the guest
        const guest = await prisma.guest.delete({
            where: {
                guest_id: parseInt(guestId),
            },
        });

        res.status(200).json({ message: "Guest deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the guest." });
    }
});
