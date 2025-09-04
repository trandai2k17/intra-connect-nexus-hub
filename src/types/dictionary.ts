
export interface DictionaryTerm {
  termId: string;           // RPD0001, RPD0002, etc.
  productGroup: string;     // RPD, etc.
  alphabeta: string;        // M, A, etc.
  dentalWord: string;       // Mandible, Maxilla, etc.
  vnTerm: string;           // Hàm dưới, Hàm trên, etc.
  engTerm: string;          // Mand, Max, etc.
  engDescription: string;   // The lower jaw, etc.
  vnDescription: string;    // Hàm dưới, etc.
  photos: DictionaryPhoto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DictionaryPhoto {
  id: string;
  termId: string;           // RPD0001, RPD0002, etc.
  photoName: string;        // RPD0001_1, RPD0001_2, etc.
  photoPath: string;        // URL or file path
  activePhoto: boolean;
}

export interface DictionaryCategory {
  id: string;
  name: string;
  color: string;
}
