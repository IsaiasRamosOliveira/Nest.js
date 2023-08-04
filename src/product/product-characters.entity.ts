import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_characters')
export class ProductCharacterEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @ManyToOne(() => ProductEntity, (product) => product.characters, { orphanedRowAction: "delete", onDelete: "CASCADE", onUpdate: "CASCADE" })
    product: ProductEntity;
}