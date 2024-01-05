import {CacheModuleAsyncOptions} from "@nestjs/cache-manager";
import {redisStore} from "cache-manager-redis-yet";


export const RedisOptions: CacheModuleAsyncOptions = {
    useFactory: async () => ({
        store: await redisStore()
    })
}