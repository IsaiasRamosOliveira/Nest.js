import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { OrderStatus } from "../enum/OrderStatus.enum";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "../../product/product.entity";

@Entity({ name: "ordered_item" })
export class OrderedItemEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "amount", nullable: false })
    amount: number

    @Column({ name: "price", enum: OrderStatus, nullable: false })
    price: number

    @ManyToOne(() => OrderEntity, (order) => order.orderedItem, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    order: OrderEntity

    @ManyToOne(() => ProductEntity, (product) => product.orderedItem, {
        cascade: ["update"]
    })
    product: ProductEntity
}
