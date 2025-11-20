import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  for (let s = 1; s <= 3; s++) {
    for (let i = 1; i <= 8; i++) {
      await prisma.product.create({
        data: {
          title: `Piece ${i}`,
          price: 499 + i * 50,
          season: s,
          category: ['Chairs', 'Tables', 'Sofas'][i % 3],
          images: [`/images/p-${i}.jpg`, `/images/p-${i}-2.jpg`],
          description: `A lovely piece from season ${s}`
        }
      })
    }
  }
}

main().catch(e => {console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect())
