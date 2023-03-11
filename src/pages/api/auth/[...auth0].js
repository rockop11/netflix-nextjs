import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});
