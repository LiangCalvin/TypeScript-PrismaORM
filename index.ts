import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      role: "USER", // or 'ADMIN' based on your enum definition
    },
  });
  console.log("Created user:", newUser);

  // Create a new profile for the user
  const newProfile = await prisma.profile.create({
    data: {
      bio: 'This is a test bio',
      userId: newUser.id, // Use the ID of the newly created user
    },
  });
  console.log('Created profile:', newProfile);

  // Create a new post
  const newPost = await prisma.post.create({
    data: {
      title: 'Test Post',
      authorId: newUser.id, // Use the ID of the newly created user
    },
  });
  console.log('Created post:', newPost);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
