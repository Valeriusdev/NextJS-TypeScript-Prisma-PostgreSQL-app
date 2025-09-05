import { publicProcedure, createTRPCRouter } from "../api/trpc";
import { db } from "../db";

export const clientRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return db.client.findMany();
  }),
  create: publicProcedure.mutation(async ({ input }) => {
    return db.client.create({ data: input });
  }),
});
