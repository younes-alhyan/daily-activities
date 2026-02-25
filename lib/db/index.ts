import mongoose from "mongoose";
import { Errors } from "@/lib/core/errors";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI environment variable");
  throw Errors.INTERNAL_SERVER_ERROR();
}

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .catch((error: unknown) => {
        console.error("MongoDB connection failed:", error);
        cached.promise = null;
        throw Errors.INTERNAL_SERVER_ERROR();
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch(error: unknown) {
    throw Errors.INTERNAL_SERVER_ERROR();
  }
}

export async function runService<T>(serviceFn: () => Promise<T>): Promise<T> {
  await connectDB();
  return serviceFn();
}
