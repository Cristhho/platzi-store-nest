import { Injectable } from '@nestjs/common';

import { Product } from '../../entities/product.entity';

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
    return this.products.find((item) => item.id == id);
  }

  create(payload: any) {
    this.idCounter++;
    const newProduct = {
      id: this.idCounter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
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
}
