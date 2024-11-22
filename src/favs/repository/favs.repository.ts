export interface FavoriteIdRepository {
  findAll(): string[];
  create(id: string): void;
  delete(id: string): boolean;
}
