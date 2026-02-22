export type PortfolioItem = {
  id: string;
  user: string;
  name: string;
  path: string;
  context: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioCreate = {
  user: string;
  name: string;
  path: string;
  context?: string;
  position?: number;
};
