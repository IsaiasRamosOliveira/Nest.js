import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dtos/CreateProduct.dto";
import { randomUUID } from "crypto";
import { UpdateProductDTO } from "./dtos/UpdateProduct.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }
    async listAll() {

        return
    }
    async save(data: CreateProductDTO) {
        const productEntity = new ProductEntity();

        productEntity.id = randomUUID();
        productEntity.name = data.name;
        productEntity.value = data.value;
        productEntity.amount = data.amount;
        productEntity.description = data.description;
        productEntity.category = data.category;
        productEntity.characters = data.characters;
        productEntity.images = data.images;
        const product = await this.productRepository.save(productEntity);

        return product;
    }
    async update(id: string, data: UpdateProductDTO) {
        return
    }
    async delete(id: string) {
        return
    }
}