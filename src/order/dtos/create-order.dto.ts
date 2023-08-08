import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from "class-validator"
import { Type } from "class-transformer";

class OrderItemDTO {
    @IsUUID()
    productId: string
    
    @IsInt()
    amount: number
}

export class CreateOrderDTO {
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => OrderItemDTO)
    orderedItem: OrderItemDTO[];
}
