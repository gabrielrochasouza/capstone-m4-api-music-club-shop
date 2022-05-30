import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import createProductService from "../../services/product/createProduct.service";

const createProductController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      img_url,
      type,
      quantity_stock,
      label,
      description,
    } = req.body;

    const newProduct = await createProductService({
      name,
      price,
      img_url,
      type,
      quantity_stock,
      label,
      description,
    });

    return res.status(201).json(instanceToPlain(newProduct) );
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createProductController;
