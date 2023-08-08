import { OrderEntity } from "../order/entities/order.entity"
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "name", length: 100, nullable: false })
    name: string

    @Column({ name: "email", length: 70, nullable: false })
    email: string

    @Column({ name: "password", length: 255, nullable: false })
    password: string

    @OneToMany(() => OrderEntity, (order) => order.user)
    order: OrderEntity[]

    @CreateDateColumn({ name: "created_at" })
    createdAt: string

    @UpdateDateColumn({ name: "update_at" })
    updatedAt: string

    @DeleteDateColumn({ name: "delete_at" })
    deleteAt: string
}