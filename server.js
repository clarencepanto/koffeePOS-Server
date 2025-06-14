import express from "express";
import cors from "cors";
import ingredientOrderRoutes from "./routes/ingredient_orders-routes.js";
import ingredientsRoutes from "./routes/ingredients-routes.js";
import productsRoutes from "./routes/products-routes.js";
import salesRoutes from "./routes/sales-routes.js";
import suppliersRoutes from "./routes/suppliers-routes.js";
import userRoutes from "./routes/users-routes.js";
import salesRecord from "./routes/salesrecord-routes.js";
import restockRecords from "./routes/restockrecord-routes.js";
import recipes from "./routes/recipes-routes.js";
import productavail from "./routes/product_availability-routes.js";
import loyalcust from "./routes/loyalcust-routes.js";
import customerProducts from "./routes/customerproducts-routes.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const logRequest = (req, res, next) => {
  console.log(`Request: ${req.method} for ${req.path}`);
  next();
};
const PORT = 8080;

app.use(express.json());
app.use(logRequest);
app.use(cors());

// Create HTTP server from Express app
const server = http.createServer(app);

// establish connection real time updates in the front end
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // or "*" during dev
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/ingredient_orders", ingredientOrderRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/products", productsRoutes);
app.use("/sales", salesRoutes(io));
app.use("/recipes", recipes);
app.use("/productavail", productavail);
app.use("/suppliers", suppliersRoutes);
app.use("/users", userRoutes);
app.use("/salesrecord", salesRecord);
app.use("/restockrecord", restockRecords);
app.use("/loyalcust", loyalcust);
app.use("/customerproducts", customerProducts);

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
