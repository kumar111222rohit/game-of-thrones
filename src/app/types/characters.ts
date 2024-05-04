export type Gender = 'Male' | 'Female' | 'Non-Binary';

export interface Characters {
  ages: CharacterAge;
  url: string;
  name: string;
  gender: Gender;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface CharacterAge {
  name: string;
  age: number;
  count: number;
}

export interface PaginationLinks {
  next: string;
  prev: string;
  last: string;
  first: string;
}
