import type { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  password: string;
  role: "customer" | "admin";
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  dateOfBirth?: Date;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
