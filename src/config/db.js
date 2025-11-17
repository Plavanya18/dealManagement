const { PrismaClient } = require('@prisma/client');

const getdb = new PrismaClient();

getdb.$on('query', (e) => {
  console.log(e);
});

process.on('SIGINT', async () => {
  await getdb.$disconnect();
  process.exit(0);
});

module.exports = {
  getdb,
};
