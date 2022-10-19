export interface IEncryptionService {
  hash(str: string): Promise<string>;
  areEqual(data: string, hash: string): Promise<boolean>;
  generateToken(): Promise<string>;
}
