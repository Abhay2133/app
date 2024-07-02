// Import Prisma Client
// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require("@prisma/client")

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the main function that will handle database operations
async function main() {
	// Create a new user in the database using Prisma Client
	const user1 = await prisma.user.create({
		data: {
			email: `abhay${Math.floor(Math.random()*100)}@example.com`,
			name: 'Abhay',
			password: 'most_secure_password', // Note: In a real application, ensure passwords are hashed!
		},
	});
	// Output the email of the newly created user
	console.log(`Created user: ${user1.email}`);

    const course1 = await prisma.courses.create({
        data : {name : "DSA "+Math.floor(Math.random()*100),
        duration : '2024-07-02T20:33:00Z', 
        price:2000.0}
    })

	await prisma.counter.create({
		data : {
			value : 0
		}
	})

}

// Execute the main function and handle disconnection and errors
main()
	.then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
	.catch(async (e) => {
		console.error(e); // Log any errors
		await prisma.$disconnect(); // Ensure disconnection even if an error occurs
		process.exit(1); // Exit the process with an error code
	});
