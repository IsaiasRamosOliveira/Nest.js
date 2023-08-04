import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [ProductRepository, ProductService]
})

export class ProductModule { }