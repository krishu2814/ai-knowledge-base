import prisma from "../../lib/prisma.js";
import type { CreateUser, UpdateUser } from "./user.types.js";
import type { User } from "@prisma/client";

export class UserRepository {
  // create user
  async create(data: CreateUser): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log("Finding user by email:", email); // Log the email being searched
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUser): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
