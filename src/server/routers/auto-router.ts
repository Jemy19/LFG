import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

export const authRouter = router({
    getDatabaseSyncStatus: publicProcedure.query(({ c }) => {
        return c.json({ status: "success" });
    }),
})