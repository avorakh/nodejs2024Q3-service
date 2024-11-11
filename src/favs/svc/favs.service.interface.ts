export interface FavoritesServiceInterface<T> {
  getAll(): T[];

  addToFavorites(id: string): void;

  deleteFromFavorites(id: string): void;
}
