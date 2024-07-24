import { describe, it, expect, beforeEach } from 'vitest';

import { HashCryptographyService } from './hash-cryptography.service';

describe('HashCryptographyService', () => {
    let hashService: HashCryptographyService;

    beforeEach(() => {
        hashService = new HashCryptographyService();
    });

    it('should encrypt data correctly', async () => {
        const data = 'password123';
        const hashedData = await hashService.encrypt(data);

        expect(hashedData).toBeDefined();
        expect(hashedData).not.toBe(data);
    });

    it('should compare data correctly', async () => {
        const data = 'password123';
        const hashedData = await hashService.encrypt(data);
        const isMatch = await hashService.compare(data, hashedData);

        expect(isMatch).toBe(true);
    });

    it('should fail to compare incorrect data', async () => {
        const data = 'password123';
        const incorrectData = 'wrongpassword';
        const hashedData = await hashService.encrypt(data);
        const isMatch = await hashService.compare(incorrectData, hashedData);

        expect(isMatch).toBe(false);
    });
});
