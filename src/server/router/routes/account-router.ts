import { createRouter } from '../context';
import { AccountService } from '../../services/account-service';
import { getUserId } from '../../helpers/getUserId';

const service = new AccountService();

export const accountRouter = createRouter()
  .query('get-balance', {
    async resolve({ ctx }) {
      const userId = getUserId(ctx);
      return await service.getBalance(userId);
    },
  })
  .query('get-user', {
    async resolve({ ctx }) {
      const userId = getUserId(ctx);
      return await service.getUser(userId);
    },
  });
