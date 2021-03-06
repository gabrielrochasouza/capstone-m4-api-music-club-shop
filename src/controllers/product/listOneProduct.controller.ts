import { Request, Response } from "express";
import listOneProductService from "../../services/product/listOneProduct.service";
import { AppError, handleError } from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";

const listOneProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await listOneProductService({ id });

    return res.status(200).json(instanceToPlain(product) );
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listOneProductController;
