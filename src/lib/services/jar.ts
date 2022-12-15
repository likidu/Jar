import Cookies from 'js-cookie';

import type { LoginCookie, LoginRequest } from '@/lib/models';
import { client, clientHandleError } from './client';

export class Jar {
  /**
   * Login to forum
   * @param request LoginRequest
   * @returns void
   */
  static async login(request: LoginRequest): Promise<void> {
    try {
      const { data } = await client.post<LoginCookie>('/', request);
      // Save to cookie
      // Cookies.set('hello', 'world', { domain: 'www.azure.com' });
      document.cookie = 'hello=world;path=/;domain=example.com';

      data.cookies.forEach((cookie) => {
        const { name, value, expires, path, domain } = cookie;
        const expDate = expires === -1 ? 365 : new Date(expires * 1000);
        console.log(domain);
        Cookies.set(name, value, { path, expires: expDate });
      });
    } catch (error) {
      clientHandleError(error);
    }
  }
}
