import bcrypt from "bcrypt";

import type { RegisterDto } from "./auth.dto.js";
import { UserRepository } from "../users/user.repository.js";
import { generateAccessToken } from "./auth.utils.js";
import type { LoginInput } from "./auth.types.js";

export class AuthService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return user;
  }

  // login user
  async login(data: LoginInput) {
    console.log("Login data:", data); // Log the incoming login data
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateAccessToken(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
