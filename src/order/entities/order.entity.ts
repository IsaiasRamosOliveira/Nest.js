import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../enum/OrderStatus.enum";
import { UserEntity } from "../../user/user.entity";
import { OrderedItemEntity } from "./ordereditem.entity";

@Entity({ name: "orders" })
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "value", nullable: false })
    value: number

    @Column({ name: "status", enum: OrderStatus, nullable: false })
    status: OrderStatus

    @ManyToOne(() => UserEntity, (user) => user.order)
    user: UserEntity

    @OneToMany(() => OrderedItemEntity, (orderedItem) => orderedItem.order, {
        cascade: true,
    })
    orderedItem: OrderedItemEntity[]

    @CreateDateColumn({ name: "created_at" })
    createdAt: string

    @UpdateDateColumn({ name: "update_at" })
    updatedAt: string

    @DeleteDateColumn({ name: "delete_at" })
    deleteAt: string
}
