import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { IHashCryptographyService } from 'src/application/services/hash-cryptography.service';

@Injectable()
export class HashCryptographyService implements IHashCryptographyService {
    private readonly salt: number = 10;

    public async encrypt(data: any): Promise<string> {
        return bcrypt.hash(data, this.salt);
    }

    public async compare(data: any, encryptedData: string): Promise<boolean> {
        return bcrypt.compare(data, encryptedData);
    }
}
