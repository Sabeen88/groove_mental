import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import axios from "axios";
import { protect } from "./middleware/authMiddleware.js";
// import path from "path";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(path.resolve(), "/backend/uploads"))
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.post("/api/khalti", async (req, res) => {
  const { totalPrice, items, email, name } = req.body;
  const data = {
    return_url: "http://localhost:5173/",
    website_url: "http://localhost:5173/",
    amount: totalPrice,
    purchase_order_id: Math.floor(Math.random() * 1000000).toString(),
    purchase_order_name: items.map((item) => item.name).join(", "),
    customer_info: {
      name: name,
      email: email,
    },
  };

  try {
    const response = await axios({
      method: "post",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      data: data,
      headers: {
        Authorization: "key 1f321a829ba14e379b80dedb83327539",
        "Content-Type": "application/json",
      },
    });

    res.json({ data: response.data });
  } catch (error) {
    console.error("Error from Khalti API", error.response.data);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

app.post("/api/payment", protect, async (req, res) => {
  // const { bookingId, status } = req.body;
  // const bookingIdInt = parseInt(bookingId, 10); // Convert bookingId to integer

  try {
    // await prisma.payment.upsert({
    //   where: { id: bookingIdInt },
    //   update: { status },
    //   create: {
    //     status,
    //     bookingId: bookingIdInt,
    //   },
    // });

    res.status(200).json({ message: "Payment status updated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the payment status." });
  }
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
