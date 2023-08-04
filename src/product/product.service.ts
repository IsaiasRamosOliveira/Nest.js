import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dtos/CreateProduct.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }
    async listProducts() {

        return
    }
    async listProduct() {
        return
    }
    async save(data: CreateProductDTO) {
        const product = await this.productRepository.save(data);
        return product;
    }
    async update() {
        return
    }
    async delete() {
        return
    }
}