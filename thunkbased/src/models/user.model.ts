export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  id: number;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  user: User;
}
