import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import {
  getDaysController,
  addDayController,
  deleteDayController,
  updateDayActivityController,
} from "@/server/controllers/day.controller";

const dayData = {
  activities: [
    {
      type: "watching",
    },
    {
      type: "gaming",
    },
    {
      type: "watching",
    },
    {
      type: "coding",
    },
    {
      type: "watching",
    },
    {
      type: "reading",
    },
    {
      type: "watching",
    },
  ],
};

export const GET = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authMiddleware(authHeader || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const days = await getDaysController();
    return NextResponse.json(days, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch days" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authMiddleware(authHeader || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const newDay = await addDayController();
    return NextResponse.json(newDay, { status: 200 });
  } catch (error) {
    console.error("Error adding day:", error);
    return NextResponse.json({ error: "Failed to add day" }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authMiddleware(authHeader || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing id query parameter" },
        { status: 400 },
      );
    }

    const deleted = await deleteDayController(id);
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete day" },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authMiddleware(authHeader || "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, activityId, description, state } = await request.json();
  try {
    const updated = await updateDayActivityController(
      id,
      activityId,
      description,
      state,
    );
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update day activity" },
      { status: 500 },
    );
  }
};
