import AppDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/AppError";
import { ICreateProduct } from "../../interfaces";

const createProductService = async ({
  name,
  price,
  img_url,
  type,
  quantity_stock,
  label,
  description,
}: ICreateProduct) => {
  const productRepository = AppDataSource.getRepository(Product);

  const checkProductExists = await productRepository.findOne({
    where: {
      name,
    },
  });

  if (checkProductExists) {
    throw new AppError(409, "Product already registred");
  }

  const newProduct = productRepository.create({
    name,
    price,
    img_url,
    type,
    quantity_stock,
    label,
    description,
    ratings:[]
  });

  await productRepository.save(newProduct);

  return newProduct;
};

export default createProductService;
