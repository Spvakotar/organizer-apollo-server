import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const NUMBER_OF_USERS = 4
const MAX_NUMBER_OF_LINKS = 5

const personData = Array.from({ length: NUMBER_OF_USERS }).map(() => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  number: faker.phone.number()
}));
console.log(personData)

async function main() {
  for (let entry of personData) {
    await prisma.person.create({
      data: {
        name: entry.name,
        email: entry.email,
        number: entry.number
      },
    })
  }
  console.log('mail seed call')
}

main().finally(async () => {
  await prisma.$disconnect()
})