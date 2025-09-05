import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      { name: "Liam", age: 34, gender: "Male", hobby: "Photography" },
      { name: "Olivia", age: 28, gender: "Female", hobby: "Hiking" },
      { name: "James", age: 41, gender: "Male", hobby: "Cooking" },
      { name: "Emma", age: 25, gender: "Female", hobby: "Painting" },
      { name: "Oliver", age: 37, gender: "Male", hobby: "Cycling" },
      { name: "Ava", age: 31, gender: "Female", hobby: "Gardening" },
      { name: "Benjamin", age: 29, gender: "Male", hobby: "Reading" },
      { name: "Sophia", age: 36, gender: "Female", hobby: "Traveling" },
    ],
  });
  console.log("Dummy clients added!");
}

main().finally(() => prisma.$disconnect());
