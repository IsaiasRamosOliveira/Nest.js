import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enum/OrderStatus.enum';
import { OrderedItemEntity } from './entities/ordereditem.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }
  async create(userId: string, data: CreateOrderDTO) {
    const orderEntity = new OrderEntity();
    const products = data.orderedItem.map((orderedItem) => orderedItem.productId);
    const product = await this.productRepository.findBy({id: In(products)})
    const user = await this.userRepository.findOneBy({ id: userId })

    orderEntity.status = OrderStatus["IN_PROCESS"];
    orderEntity.user = user;

    const orderedItemEntities = data.orderedItem.map((orderedItem) => {
      const productRelation = product.find((product) => product.id === orderedItem.productId)
      const orderedItemEntity = new OrderedItemEntity();
      orderedItemEntity.product = productRelation;
      orderedItemEntity.price = productRelation.value;
      orderedItemEntity.amount = orderedItem.amount;
      orderedItemEntity.product.amount -= orderedItem.amount;
      return orderedItemEntity
    })

    const valueTotal = orderedItemEntities.reduce((total, item) => {
      return total + item.price * item.amount
    }, 0)

    orderEntity.orderedItem = orderedItemEntities;
    orderEntity.value = valueTotal;

    const order = await this.orderRepository.save(orderEntity);
    return order
  }

  async findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, data: UpdateOrderDTO) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
