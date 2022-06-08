import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express()

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  
  await prisma.post.update({
    where: {
      slug: 'my-first-post'
    },
    data: {
      comments: {
        createMany: {
          data: [
            {comment: 'Great post!'},
            {comment: "Can't wait to read more!"}
          ]
        }
      }
    }
  })

  const posts = await prisma.post.findMany({
    include: {
      comments: true
    }
  })
  console.dir(posts, { depth: Infinity})
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export { app }