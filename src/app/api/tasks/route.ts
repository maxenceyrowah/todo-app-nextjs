import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/Task";

export async function GET() {
  const tasks = await Task.find();
  await connectDB();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  const newTask = await Task.create(data);
  return NextResponse.json(newTask, { status: 201 });
}
