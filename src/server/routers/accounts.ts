import { AccountService } from '../services/account-service';
import { getUserId } from '../helpers/getUserId';
import { protectedProcedure, router } from '../trpc';

const service = new AccountService();

export const accountRouter = router({
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getBalance(userId);
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getUser(userId);
  }),
});
