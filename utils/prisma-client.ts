// import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prismaClient = new PrismaClient().$extends(withAccelerate())

// export default prismaClient;
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prismaClient = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prismaClient

if (process.env.STAGE !== 'production') globalThis.prismaGlobal = prismaClient