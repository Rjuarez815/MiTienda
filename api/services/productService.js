// const faker = require('faker');

// class ProductsService {

//   constructor() {
//     this.products = [];
//     this.generate();
//   }

//   generate() {
//     const limit = 100;
//     for (let index = 0; index < limit; index++) {
//       this.products.push({
//         id: faker.datatype.uuid(),
//         name: faker.commerce.productName(),
//         price: parseInt(faker.commerce.price(), 10),
//         image: faker.image.imageUrl(), // Corrected
//       });
//     }
//   }

//   create(data) {
//     const newProduct = {
//       id: faker.datatype.uuid(),
//       ...data
//     }
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   find() {
//     return this.products;
//   }

//   findOne(id) {
//     return this.products.find(item => item.id === id);
//     if (index === -1) {
//       throw new Error('Product not found');
//     }
//     this.products[index] = changes;
//     return this.products[index];
//   }

//   update(id) {
//     const index = this.products.findIndex(item => item.id === id);
//   }

//   delete(id) {
//     return this.products.find(item => item.id === id);
//     if (index === -1) {
//       throw new Error('Product not found');
//     }
//     this.products.splice(index, 1);
//     return { id };
//   }
// }

const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block')
    } else {
    return product;
    }
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products[index] = { ...this.products[index], ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
}

module.exports = ProductsService;
