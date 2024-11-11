import { FavoriteIdRepository } from './favs.repository';

export class InMemoryFavoriteIdRepository implements FavoriteIdRepository {
  private favoriteIds: Set<string> = new Set();

  findAll(): string[] {
    return Array.from(this.favoriteIds);
  }
  create(id: string): void {
    this.favoriteIds.add(id);
  }
  delete(id: string): boolean {
    return this.favoriteIds.delete(id);
  }
}
