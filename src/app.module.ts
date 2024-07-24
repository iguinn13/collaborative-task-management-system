import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'src/shared/config';
import { PresentationModule } from './presentation/presentation.module';
import { ServicesModule } from './infrastructure/services/services.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PresentationModule,
        ServicesModule,
    ],
})
export class AppModule {}
