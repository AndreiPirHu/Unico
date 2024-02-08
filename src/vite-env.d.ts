/// <reference types="vite/client" />

type Product = {
  name: string;
  price: number;
  type: string;
  description: string;
  images: { front: string; back: string };
};

type Products = {
  products: Product[];
};
