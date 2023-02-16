import { Context } from '../context';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

export const getUserId = (ctx: Context): string =>
  (ctx.session as UserSession).user.id;
