export type PortfolioItem = {
  id: number;
  user: string;
  name: string;
  image: string;
  context: string;
  position: number;
  created_at: string;
  updated_at: string;
};

export type PortfolioCreate = {
  user: string;
  name: string;
  image: string | Buffer;
  context?: string;
  position?: number;
};
