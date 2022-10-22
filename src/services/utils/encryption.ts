import { compare, hash } from "bcryptjs";
import { IEncryptionService } from "../contracts/encryption-service";
import { randomBytes } from 'crypto';

export class EncryptionService implements IEncryptionService {
  async hash(str: string): Promise<string> {
    return hash(str, 12);
  }

  async areEqual(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }

  public async generateToken(): Promise<string> {
    return randomBytes(32).toString('hex');
  }
}
