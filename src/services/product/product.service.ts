import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';

@Injectable()
export class ProductService {
  private idCounter = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id);
    if (!product) throw new NotFoundException('Product not exist');
    return product;
  }

  create(payload: CreateProductDto) {
    this.idCounter++;
    const newProduct = {
      id: this.idCounter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id == id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return {
      message: 'product deleted',
    };
  }
}
