
export interface DictionaryTerm {
  id: string;
  englishTerm: string;
  vietnameseTerm: string;
  description: string;
  explanation: string;
  code: string;
  images: string[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DictionaryCategory {
  id: string;
  name: string;
  color: string;
}
