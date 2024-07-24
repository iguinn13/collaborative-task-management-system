export interface IHashCryptographyService {
    encrypt(data: any): Promise<string>;
    compare(data: any, encryptedData: string): Promise<boolean>;
}
