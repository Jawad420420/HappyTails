import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "./models/User.js";
import Pet from "./models/Pet.js";
import Adoption from "./models/Adoption.js";
import Vaccination from "./models/Vaccination.js";

const petsData = [
  {
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 Years",
    ageGroup: "adult",
    gender: "male",
    location: "Dhaka",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Max is friendly, playful, and enjoys being around people. He gets along well with other dogs and children. He loves long walks in the park and playing fetch. Max is looking for a loving home where he can share his joyful energy.",
    personality: ["Friendly", "Playful", "Active", "Good with children", "Loyal"],
    mainImage:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Luna",
    type: "cat",
    breed: "Tabby Cat",
    age: "1 Year",
    ageGroup: "young",
    gender: "female",
    location: "Gazipur",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Luna is a gentle and calm tabby cat who loves sunny window spots and quiet cuddles. She is litter-trained, gentle with kids, and loves chasing string toys.",
    personality: ["Playful", "Indoor", "Calm", "Gentle"],
    mainImage:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Bruno",
    type: "dog",
    breed: "Jack Russell",
    age: "3 Years",
    ageGroup: "adult",
    gender: "male",
    location: "Narayanganj",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Bruno is an energetic, loyal companion with sharp instincts and high intelligence. He loves garden playtime, hiking, and loves learning new tricks.",
    personality: ["Loyal", "Trained", "Active", "Smart"],
    mainImage:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Mimi",
    type: "cat",
    breed: "Tabby Kitten",
    age: "3 Months",
    ageGroup: "baby",
    gender: "female",
    location: "Dhaka",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: false,
    aboutText:
      "Mimi is a tiny, super curious kitten rescued recently. She has huge playful energy, purrs loudly when cuddled, and gets along well with other pets.",
    personality: ["Cuddly", "Playful", "Curious"],
    mainImage:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Oreo",
    type: "cat",
    breed: "Tuxedo Cat",
    age: "2 Years",
    ageGroup: "adult",
    gender: "male",
    location: "Dhaka",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Oreo is a handsome tuxedo cat who loves quiet cozy afternoons on soft blankets. Very affectionate, well mannered and friendly with other quiet pets.",
    personality: ["Calm", "Cuddly", "Gentle"],
    mainImage:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Bella",
    type: "dog",
    breed: "Mixed Breed Puppy",
    age: "5 Months",
    ageGroup: "baby",
    gender: "female",
    location: "Dhaka",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: false,
    aboutText:
      "Bella is an adorable rescue puppy with floppy ears and a loving personality. She loves learning basic commands, treats, and making new friends.",
    personality: ["Playful", "Friendly", "Active"],
    mainImage:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Charlie",
    type: "dog",
    breed: "Beagle",
    age: "2 Years",
    ageGroup: "adult",
    gender: "male",
    location: "Sylhet",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Charlie is a sweet, cheerful beagle with curious eyes and an affectionate spirit. He loves outdoor sniffing adventures and loves cuddling up on the couch.",
    personality: ["Curious", "Friendly", "Gentle", "Loving"],
    mainImage:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
  {
    name: "Cleo",
    type: "cat",
    breed: "Persian Mix",
    age: "3 Years",
    ageGroup: "adult",
    gender: "female",
    location: "Chittagong",
    isVaccinated: true,
    isDewormed: true,
    isHealthy: true,
    isNeutered: true,
    aboutText:
      "Cleo is an elegant, fluffy cat who enjoys peaceful environments and gentle head scratches. She is fully indoor-trained and very well-behaved.",
    personality: ["Calm", "Affectionate", "Indoor", "Quiet"],
    mainImage:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80",
    ],
    status: "available",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");

    // 1. Seed Admin & User
    console.log("Seeding Users...");
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    let admin = await User.findOne({ email: "admin@happytails.com" });
    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: "admin@happytails.com",
        password: adminPassword,
        role: "admin",
      });
      console.log("Created Admin: admin@happytails.com / admin123");
    } else {
      admin.role = "admin";
      admin.password = adminPassword;
      await admin.save();
      console.log("Updated Admin: admin@happytails.com / admin123");
    }

    let regularUser = await User.findOne({ email: "user@happytails.com" });
    if (!regularUser) {
      regularUser = await User.create({
        name: "Tanzim Ahmed",
        email: "user@happytails.com",
        password: userPassword,
        role: "user",
      });
      console.log("Created Demo User: user@happytails.com / user123");
    } else {
      regularUser.role = "user";
      regularUser.password = userPassword;
      await regularUser.save();
      console.log("Updated Demo User: user@happytails.com / user123");
    }

    // 2. Seed Pets
    console.log("Seeding Pets...");
    await Pet.deleteMany({});
    const insertedPets = await Pet.insertMany(petsData);
    console.log(`Inserted ${insertedPets.length} pets successfully!`);

    // 3. Seed Sample Adoption Request for demo user
    console.log("Seeding Sample Adoption Request...");
    await Adoption.deleteMany({});
    const samplePet = insertedPets[0]; // Max
    await Adoption.create({
      user: regularUser._id,
      pet: samplePet._id,
      petName: samplePet.name,
      petImage: samplePet.mainImage,
      petBreed: samplePet.breed,
      applicantName: regularUser.name,
      applicantEmail: regularUser.email,
      applicantPhone: "+880 1712 345678",
      applicantLocation: "Dhanmondi, Dhaka",
      housingType: "House",
      ownOrRent: "Own",
      notes: "We have a loving family with a backyard and love Golden Retrievers.",
      status: "pending",
    });

    // 4. Seed Sample Vaccination for demo user
    console.log("Seeding Sample Vaccination...");
    await Vaccination.deleteMany({});
    await Vaccination.create({
      user: regularUser._id,
      petName: "Max",
      vaccineName: "Rabies Booster",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "pending",
    });

    console.log("=========================================");
    console.log("Database seeded successfully!");
    console.log("Admin login: admin@happytails.com / admin123");
    console.log("User login:  user@happytails.com  / user123");
    console.log("=========================================");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
