const { PrismaClient } = require('@prisma/client/edge')

module.exports = {
  prisma: new PrismaClient(),
}
