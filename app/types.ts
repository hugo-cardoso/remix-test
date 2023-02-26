export type UserRepo = {
  id: number;
  name: string;
};

export type User = {
  username: string;
  name: string;
  avatar: string;
  repos: UserRepo[];
}