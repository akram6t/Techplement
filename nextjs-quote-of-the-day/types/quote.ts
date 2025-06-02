export interface Quote {
    id: string;
    text: string;
    author: string;
    category: string;
    likes?: number;
  }
  
  export interface Author {
    id: string;
    name: string;
    profession: string;
    initials: string;
    category: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    color: string;
  }