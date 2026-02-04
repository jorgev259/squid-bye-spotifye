import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  account: { accountLinking: { enabled: true, allowDifferentEmails: true } },
  plugins: [genericOAuthClient()],
});
