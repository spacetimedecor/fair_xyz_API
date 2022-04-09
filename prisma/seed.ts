import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const collectionsData: Prisma.CollectionCreateInput[] = [
  {
    name: 'test2',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
  {
    name: 'test3',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const collectionData of collectionsData) {
    const collection = await prisma.collection.create({
      data: collectionData,
    });
    console.log(`Created collection with id: ${collection.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
