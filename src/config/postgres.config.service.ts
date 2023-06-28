import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";

export class PostgresConfigService implements TypeOrmOptionsFactory{
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type:'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: "root",
            password: "root",
            database: "loja",
            entities: [],
            synchronize: true
        }
    }
}