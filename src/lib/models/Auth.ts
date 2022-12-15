export type LoginRequest = {
  username: string;
  password: string;
  forum: string;
};

export type LoginCookie = {
  cookies: [
    {
      name: string;
      value: string;
      expires: number;
      path: string;
      domain: string;
      secure: boolean;
    },
  ];
};
