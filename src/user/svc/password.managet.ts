import { genSalt, hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordManager {
  async hashPassword(password: string): Promise<string> {
    const cost = this.generateCost();
    return genSalt(cost).then((salt) => hash(password, salt));
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  private generateCost(min = 6, max = 12): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
