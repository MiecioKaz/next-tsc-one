// import clientPromise from "./mongodb";
// import bcrypt from "bcryptjs";
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { WithId, Document } from "mongodb";

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/userAuth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     maxAge: 60 * 60 * 24,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         const client = await clientPromise;
//         const usersCollection = client
//           .db(process.env.DB_NAME)
//           .collection("users");
//         const email = credentials!.email.toLowerCase();
//         const user = await usersCollection.findOne({ email });

//         if (!user) {
//           throw new Error("User does not exist");
//         }

//         // validate password
//         const passValid = bcrypt.compare(credentials!.password, user.password);
//         if (!passValid) {
//           throw new Error("Invalid credentials");
//         }
//         return {
//           id: user._id,
//           ...user,
//         } as any;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("JWT Callback", { token, user });
//       if (user) {
//         return {
//           id: user.id,
//           ...token,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("Session Callback", { session, token });
//       return {
//         ...session,
//         user: {
//           id: token.id,
//           ...session.user,
//         },
//       };
//     },
//   },
// };
