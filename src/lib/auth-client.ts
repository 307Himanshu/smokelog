import { createAuthClient } from "better-auth/client";
import type { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [inferAdditionalFields<typeof auth>()],
});
