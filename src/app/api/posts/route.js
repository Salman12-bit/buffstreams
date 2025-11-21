import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { title, desc, time, matchDate, content, streamLink, file } = data;

    if (!title || !desc || !time || !matchDate || !content || !streamLink || !file) {
      return NextResponse.json(
        { error: "Validation Error: Missing fields" },
        { status: 400 }
      );
    }


    const [timePart, ampm] = time.split(" ");
    const [hourStr, minuteStr] = timePart.split(":");
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    if (ampm.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;

    const [year, month, day] = matchDate.split("-");
    const startTime = new Date(year, month - 1, day, hour, minute);

    await connect();

    const newPost = new Post({
      title,
      desc,
      time,
      matchDate,
      content,
      streamLink,
      file,
      startTime, 
    });

    await newPost.save();

    return NextResponse.json({ message: "Post has been created" }, { status: 201 });
  } catch (err) {
    console.error("Error saving post:", err);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export const GET = async (request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    const posts = username
      ? await Post.find({ username })
      : await Post.find();

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
