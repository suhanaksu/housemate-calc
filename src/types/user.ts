export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  hasHome: boolean;

  [key: string]: unknown;
}
