import { IsEnum } from "class-validator";
import { OrderStatus } from "../enum/OrderStatus.enum";

export class UpdateOrderDTO {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}