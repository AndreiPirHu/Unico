/// <reference types="vite/client" />

type Product = {
  name: string;
  price: number;
  type: string;
  description: string;
  images: { front: string; back: string };
  imagesAll: string[];
};

type Products = {
  products: Product[];
};

type CartProduct = Product & {
  id: string;
  size: string;
};
