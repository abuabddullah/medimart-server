import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { orderService } from "./order.service";

export const orderController = {
  createOrder: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const order = await orderService.createOrder(userId, req.body);
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    }
  ),

  getUserOrders: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json({
        success: true,
        data: orders,
      });
    }
  ),

  getOrderById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const order = await orderService.getOrderById(req.params.id, page, limit);
      res.status(200).json({
        success: true,
        data: order,
      });
    }
  ),

  updateOrderStatus: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    }
  ),

  cancelOrder: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const order = await orderService.cancelOrder(req.params.id, userId);
      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
      });
    }
  ),

  getAllOrders: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const { category, name } = req.query;

      const filters: Record<string, any> = {};
      if (category) filters.category = category;
      if (name) filters.brand = name;
      const orders = await orderService.getAllOrders(page, limit, filters);
      res.status(200).json({
        success: true,
        data: orders,
      });
    }
  ),

  updateOrderPrescriptionStatus: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { orderPrescriptionStatus } = req.body;
      const order = await orderService.updateOrderPrescriptionStatus(
        req.params.id,
        orderPrescriptionStatus
      );
      res.status(200).json({
        success: true,
        message: "Order prescription status updated successfully",
        data: order,
      });
    }
  ),
};
