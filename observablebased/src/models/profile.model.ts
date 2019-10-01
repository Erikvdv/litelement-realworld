export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export enum ProfileTab {
  my = 'MY',
  favorited = 'FAVORITED',
}
