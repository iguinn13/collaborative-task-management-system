import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

import { IUniqueIdentifierGeneratorService } from 'src/application/services/unique-identifier-generator.service';

@Injectable()
export class UniqueIdentifierGeneratorService implements IUniqueIdentifierGeneratorService {
    public generate(): string {
        return randomUUID();
    }
}
