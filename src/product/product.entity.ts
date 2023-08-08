import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ProductCharacterEntity } from './product-characters.entity';
import { ProductImageEntity } from './product-image.entity';
import { OrderedItemEntity } from '../order/entities/ordereditem.entity';


@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'value', nullable: false })
    value: number;

    @Column({ name: 'amount', nullable: false })
    amount: number;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @Column({ name: 'category', length: 100, nullable: false })
    category: string;

    @OneToMany(() => ProductCharacterEntity, productCharacterEntity => productCharacterEntity.product, { cascade: true, eager: true })
    characters: ProductCharacterEntity[];

    @OneToMany(() => ProductImageEntity, productImageEntity => productImageEntity.product, { cascade: true, eager: true })
    images: ProductImageEntity[];

    @OneToMany(() => OrderedItemEntity, (orderedItem) => orderedItem.product)
    orderedItem: OrderedItemEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}