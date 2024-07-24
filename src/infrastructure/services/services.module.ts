import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AccessTokenService } from './access-token.service';
import { HashCryptographyService } from './hash-cryptography.service';
import { UniqueIdentifierGeneratorService } from './unique-identifier-generator.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ],
            useFactory: (
                configService: ConfigService
            ) => ({
                secret: configService.get<string>('config.accessTokenSecret'),
            }),
        }),
    ],
    providers: [
        {
            provide: 'IHashCryptographyService',
            useClass: HashCryptographyService,
        },
        {
            provide: 'IUniqueIdentifierGeneratorService',
            useClass: UniqueIdentifierGeneratorService,
        },
        {
            provide: 'IAccessTokenService',
            useClass: AccessTokenService,
        },
    ],
    exports: [
        'IHashCryptographyService',
        'IUniqueIdentifierGeneratorService',
        'IAccessTokenService',
    ],
})
export class ServicesModule {}
