import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const collectionsData: Prisma.CollectionCreateInput[] = [
  {
    name: 'Collection 1',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
  {
    name: 'Collection 2',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
  {
    name: 'Collection 3',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
  {
    name: 'Collection 4',
    launch_date: null,
  },
  {
    name: 'Collection 5',
    launch_date: new Date('2020-12-23T12:45:00.000Z').toISOString(),
  },
  {
    name: 'Collection 6',
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
