export type User = {
  id: string;
  email: string;
  name: string;
};

export type ApiClientResponse = {
  message?: string;
  data?: any;
  error?: string;
};
