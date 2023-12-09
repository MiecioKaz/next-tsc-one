// 1-st OPTION (fFrom You-Tube tutorial on next13-prisma-mongodb)

// import { PrismaClient } from "@prisma/client";

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV === "production") globalThis.prisma = client;

// export default client;
// ************************************

// 2-nd OPTION (From Vercels tutorial on nextjs-prisma and some db)

// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
// ********************************

// 3-rd OPTION (From GitHub Discassions)

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
