import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common'

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(
        private configServices: ConfigService
    ) { }
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: this.configServices.get<string>('DB_HOST'),
            port: this.configServices.get<number>('DB_PORT'),
            username: this.configServices.get<string>('DB_USERNAME'),
            password: this.configServices.get<string>('DB_PASSWORD'),
            database: this.configServices.get<string>('DB_NAME'),
            entities: [__dirname + "/../**/*.entity.{js, ts}"],
        }
    }
}