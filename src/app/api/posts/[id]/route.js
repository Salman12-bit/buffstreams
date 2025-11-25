import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";


export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    const post = await Post.findById(id);
    return NextResponse.json(post, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post has been deleted" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};


export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();

  try {
    await connect();

    const updated = await Post.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updated },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
};
