import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
    private products: ProductEntity[] = [];

    ListAll() {
        return this.products;
    }

    save(data: ProductEntity) {
        this.products.push(data);
        return data;
    }

    private searchPerId(id: string) {
        const productExists = this.products.find((product) => product.id === id);

        if (!productExists) {
            throw new Error('Produto não existe');
        }

        return productExists;
    }

    async update(id: string, data: Partial<ProductEntity>) {
        const dataNotUpdate = ['id', 'usuarioId'];
        const product = this.searchPerId(id);
        Object.entries(data).forEach(([key, value]) => {
            if (dataNotUpdate.includes(key)) {
                return;
            }
            product[key] = value;
        });

        return product;
    }

    async remove(id: string) {
        const product = this.searchPerId(id);
        this.products = this.products.filter((product) => product.id !== id);
        return product;
    }
}