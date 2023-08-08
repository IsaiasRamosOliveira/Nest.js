import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
} from '@nestjs/common';
import { CreateProductDTO } from './dtos/CreateProduct.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dtos/UpdateProduct.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async create(@Body() data: CreateProductDTO) {
        const product = this.productService.save(data);
        return product;
    }

    @Get()
    async listAll() {
        return this.productService.listAll();
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() data: UpdateProductDTO,
    ) {
        const product = await this.productService.update(
            id,
            data,
        );

        return {
            message: 'produto atualizado com sucesso',
            product
        };
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const product = await this.productService.delete(id);

        return {
            message: 'produto removido com sucesso',
            product
        };
    }
}