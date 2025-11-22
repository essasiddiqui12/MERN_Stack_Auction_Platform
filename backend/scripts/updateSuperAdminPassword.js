import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({
  path: join(__dirname, "..", "config", "config.env"),
  override: true
});

const updateSuperAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");

    const superAdmin = await User.findOne({ role: "Super Admin" });
    if (!superAdmin) {
      console.log("No Super Admin found.");
      return;
    }

    // Get password from command line argument or use default
    const newPassword = process.argv[2] || "Admin@1234";
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedSuperAdmin = await User.findByIdAndUpdate(
      superAdmin._id,
      { password: hashedPassword },
      { new: true }
    );

    console.log("\nSuper Admin password updated successfully!");
    console.log("Email:", superAdmin.email);
    console.log("New password:", newPassword);
    console.log("\n⚠️  Please save this password securely!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

updateSuperAdminPassword(); 