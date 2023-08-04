import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDTO } from './dtos/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async create(@Body() data: CreateProductDTO) {
        const product = new ProductEntity();

        product.id = randomUUID();
        product.name = data.name;
        product.userId = data.userId;
        product.value = data.value;
        product.amount = data.amount;
        product.description = data.description;
        product.category = data.category;
        product.characters = data.characters;
        product.images = data.images;

        const productRegistered = this.productService.save(product);
        return productRegistered;
    }

    // @Get()
    // async listAll() {
    //     return this.productService.ListAll();
    // }

    // @Put('/:id')
    // async update(
    //     @Param('id') id: string,
    //     @Body() data: UpdateProductDTO,
    // ) {
    //     const product = await this.productService.update(
    //         id,
    //         data,
    //     );

    //     return {
    //         message: 'produto atualizado com sucesso',
    //         product
    //     };
    // }

    // @Delete('/:id')
    // async remove(@Param('id') id: string) {
    //     const product = await this.productService.remove(id);

    //     return {
    //         message: 'produto removido com sucesso',
    //         product
    //     };
    // }
}