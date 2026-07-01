export interface Generation {
  id: string;
  genre: string;
  environment: string;
  style: string;
  inspiredBy: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface GenerateInput {
  genre: string;
  environment: string;
  style: string;
  inspiredBy: string;
  prompt: string;
}

export interface GenerateResponse {
  success: boolean;
  generation: {
    id: string;
    imageUrl: string;
    prompt: string;
  };
}
