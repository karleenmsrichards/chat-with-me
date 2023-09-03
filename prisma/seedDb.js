const prisma = require("./prismaClient.js");

const users = [];

function createUsers() {
  const user1 = {
    profileName: "Lily",
    password: "password1234",
    email: "lily123@gmail.com",
  };
  const user2 = {
    profileName: "John",
    password: "password5678",
    email: "john456@gmail.com",
  };
  const user3 = {
    profileName: "Emily",
    password: "password9012",
    email: "emily789@gmail.com",
  };
  const user4 = {
    profileName: "Michael",
    password: "password3456",
    email: "michael234@gmail.com",
  };
  const user5 = {
    profileName: "Sophia",
    password: "password7890",
    email: "sophia567@gmail.com",
  };

  users.push(user1, user2, user3, user4, user5);
}

async function seedDb() {
  await prisma.user.createMany({ data: users });
}

async function main() {
  createUsers();
  await seedDb();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
