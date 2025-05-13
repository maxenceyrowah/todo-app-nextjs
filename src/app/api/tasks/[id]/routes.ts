import { NextResponse } from "next/server";

import { Task } from "@/models/Task";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json(
        { message: "Tâche non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  }
}
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedTask = await Task.findByIdAndDelete(params.id);
    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await _request.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  }
}
