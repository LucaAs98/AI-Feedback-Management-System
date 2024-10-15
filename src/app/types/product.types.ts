export enum ProductType {
  FILM = 'FILM',
  MUSIC = 'MUSIC',
  BOOK = 'BOOK',
}

export type Product = {
  id: number;
  title: string;
  image: string;
  type: ProductType;
  genre_category: string;
};

export type Film = {
  product_id: number;
  director: string;
  duration: number;
  description: string;
};

export type Book = {
  product_id: number;
  description: string;
  publisher: string;
  author: string;
  isbn: string;
};

export type Music = {
  product_id: number;
  duration: number;
  producer: string;
  artist: string;
};

export type CompleteProduct = Product &
  (Partial<Film> | Partial<Book> | Partial<Music>);
