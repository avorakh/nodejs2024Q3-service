export interface FavoritesServiceInterface<T> {
  getAll(): Promise<T[]>;

  addToFavorites(id: string): Promise<void>;

  deleteFromFavorites(id: string): Promise<void>;
}
