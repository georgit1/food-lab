// node scripts/seed.ts

const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.$connect();
    await database.category.createMany({
      data: [
        { name: 'Grains' },
        { name: 'Vegetables' },
        { name: 'Legumes' },
        { name: 'Nuts & Seeds' },
        { name: 'Oils & Fats' },
        { name: 'Herbs' },
        { name: 'Beverages' },
        { name: 'Dairy' },
        { name: 'Fruits' },
      ],
    });

    console.log('Success');
  } catch (error) {
    console.log('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
