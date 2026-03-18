import { Injectable, UnauthorizedException } from '@nestjs/common';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkService {
  private readonly clerk = clerkClient;

  async verifyToken(token: string) {
    try {
      // Verify JWT token from Clerk
      const payload = await this.clerk.verifyToken(token);
      const userId = payload.sub;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.clerk.users.getUser(userId);

      return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        metadata: user.publicMetadata,
      };
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }

  async getUser(userId: string) {
    try {
      const user = await this.clerk.users.getUser(userId);
      return user;
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }

  async updateUserMetadata(userId: string, metadata: any) {
    try {
      const user = await this.clerk.users.updateUser(userId, {
        publicMetadata: metadata,
      });
      return user;
    } catch (error) {
      throw new Error('Failed to update user metadata');
    }
  }
}
