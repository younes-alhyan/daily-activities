import mongoose from "mongoose";
import { httpErrors } from "@/lib/http/httpErrors";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI environment variable");
  throw httpErrors.INTERNAL_SERVER_ERROR();
}

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err);
        cached.promise = null; // allow retry
        throw httpErrors.INTERNAL_SERVER_ERROR();
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch {
    throw httpErrors.INTERNAL_SERVER_ERROR();
  }
}
