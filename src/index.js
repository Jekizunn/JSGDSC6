import express from "express"; // Import express dari node_modules
import {guestRouter} from "./Routes/guest.routes.js";
import { paymentRouter } from "./Routes/payment.routes.js";
import { roomRouter } from "./Routes/room.routes.js";
import { reservationRouter } from "./Routes/reservation.routes.js";

const server = express(); // Inisialisasi express

const PORT = 3000; // Port yang digunakan untuk menjalankan server

server.use(express.json());


// Guest router

server.use("/api/guests" , guestRouter);

server.use("/api/payment" , paymentRouter);

server.use("/api/room", roomRouter);

server.use("/api/reservation", reservationRouter);




// Menjalankan server pada port 3000

server.listen(PORT, function (){

console.log("Horee, server berhasil berjalan pada port 3000");

})