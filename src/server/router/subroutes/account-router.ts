import { createRouter } from '../context';
import { UserSession } from '../../../pages/api/auth/[...nextauth]';
import { AccountService } from '../../services/account-service';

const service = new AccountService();

export const accountRouter = createRouter()
  .query('get-balance', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return;
      return await service.getBalance(userId);
    },
  })
  .query('get-user', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return;
      return await service.getUser(userId);
    },
  });
