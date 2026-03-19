import mongoose from "mongoose";
import { Errors } from "@/lib/core/errors";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongooseCache;
if (!cached) cached = global.mongooseCache = { conn: null, promise: null };

async function connectDB() {
  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI environment variable");
    throw Errors.INTERNAL_SERVER_ERROR();
  }

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: unknown) {
    cached.promise = null;
    console.error("MongoDB connection failed:", error);
    throw Errors.INTERNAL_SERVER_ERROR();
  }
}

export async function runService<T>(serviceFn: () => Promise<T>): Promise<T> {
  await connectDB();
  return serviceFn();
}
