import { Router } from "express";
import productRouter from "./product";
import addressRoutes from "./address/address.routes";
import userRoutes from "./user/user.routes";
import cartRouter from "./cart";
import orderRouter from "./order";
import routerRating from "./rating";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/address", addressRoutes);
router.use("/orders", orderRouter);
router.use('/ratings',routerRating)

export default router;
