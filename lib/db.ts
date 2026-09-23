import {PrismaPg} from "@prisma/adapter-pg"
import {PrismaClient} from "./generated/prisma/client"

const gloabalForPrisma = globalThis as unknown as {
    prisma : PrismaClient | undefined
}


function createPrismaClient(){
    const url = process.env.DATABASE_URL;
    if (!url){
        throw new Error("Database url is not set.")
    }

    const adapter = new PrismaPg({connectionString : url});
    return new PrismaClient({adapter})
}


export const prisma = gloabalForPrisma.prisma ?? createPrismaClient()

if(process.env.NODE_ENV !== "production"){
    gloabalForPrisma.prisma = prisma;
}