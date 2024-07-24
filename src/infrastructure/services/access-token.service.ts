import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { IAccessTokenService } from 'src/application/services/access-token.service';

@Injectable()
export class AccessTokenService implements IAccessTokenService {
    public constructor(
        private readonly jwtService: JwtService,
    ) {}

    public sign(payload: any): string {
        return this.jwtService.sign(payload);
    }
}
