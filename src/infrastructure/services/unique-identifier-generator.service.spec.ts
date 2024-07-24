import { describe, it, expect, beforeEach } from 'vitest';

import { UniqueIdentifierGeneratorService } from './unique-identifier-generator.service';

describe('UniqueIdentifierGeneratorService', () => {
    let uniqueIdentifierGeneratorService: UniqueIdentifierGeneratorService;

    beforeEach(() => {
        uniqueIdentifierGeneratorService = new UniqueIdentifierGeneratorService();
    });

    it('should generate a unique identifier', () => {
        const uuid = uniqueIdentifierGeneratorService.generate();

        expect(uuid).toBeDefined();
        expect(uuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        );
    });

    it('should generate unique identifiers', () => {
        const uuid1 = uniqueIdentifierGeneratorService.generate();
        const uuid2 = uniqueIdentifierGeneratorService.generate();

        expect(uuid1).not.toBe(uuid2);
    });
});
