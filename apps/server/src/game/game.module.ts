import {Module} from '@nestjs/common';
import {GameService} from './game.service';
import {GameGateway} from './game.gateway';
import {CacheModule} from "@nestjs/cache-manager";
import {RedisOptions} from "../config/app.options.constant";

@Module({
    imports: [CacheModule.registerAsync(RedisOptions)],
    providers: [GameGateway, GameService],
})
export class GameModule {
}
