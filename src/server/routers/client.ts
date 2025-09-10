import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../api/trpc";
import { db } from "../db";

export const clientRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return db.client.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
        gender: z.string(),
        hobby: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return db.client.create({ data: input });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return db.client.delete({ where: { id: input.id } });
    }),
});
