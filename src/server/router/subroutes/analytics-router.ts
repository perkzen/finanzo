import { createRouter } from '../context';
import { AnalyticsService } from '../../services/analytics-service';
import { z } from 'zod';
import { getUserId } from '../../helpers/getUserId';

const service = new AnalyticsService();

export const analyticsRouter = createRouter().query('.get-data-by-year', {
  input: z.object({
    year: z.number(),
  }),
  async resolve({ input, ctx }) {
    const userId = getUserId(ctx);
    return await service.getAccountDataByYear(userId, input.year);
  },
});
