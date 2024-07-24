import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { describe, it, expect } from 'vitest';

import { AccessTokenService } from './access-token.service';

describe('AccessTokenService', () => {
    it('should sign a payload and return a token', () => {
        const jwtService: JwtService = {
            sign: vitest.fn().mockReturnValue(randomUUID()),
        } as unknown as JwtService;

        const accessTokenService = new AccessTokenService(jwtService);

        const payload = { id: randomUUID() };
        const result = accessTokenService.sign(payload);

        expect(!!result).toBeTruthy();
        expect(typeof result).toBe('string');
    });
});
