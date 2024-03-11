import { NextResponse } from "next/server";
import db from "../../config/db";
import { sendSlackNotification } from "./slack";
// Fetch all posts
export async function GET() { 
  try {
      const posts = await new Promise((resolve, reject) => {
          db.query("SELECT id, title, content, startDate, endDate, createdAt FROM posts ORDER BY createdAt DESC", (err, results) => {
              if (err) reject(err);
              else resolve(results);
          });
      });
      return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
      return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// Add a new post
// export async function POST(request) {
//     const data = await request.json(); // Parse the request body for data
//     try {
//         await new Promise((resolve, reject) => {
//             const query = "INSERT INTO posts (title, startDate, endDate, content) VALUES (?, ?, ?, ?)";
//             db.query(query, [data.title, data.startDate, data.endDate, data.content], (err) => {
//                 if (err) reject(err);
//                 else resolve();
//             });
//         });
//         return new NextResponse(JSON.stringify({ message: "Post added successfully" }), { status: 201 });
//     } catch (error) {
//         return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
//     }
// }
export async function POST(request) {
    const data = await request.json();
    try {
        await new Promise((resolve, reject) => {
            const query = "INSERT INTO posts (title, startDate, endDate, content) VALUES (?, ?, ?, ?)";
            db.query(query, [data.title, data.startDate, data.endDate, data.content], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Slack에 알림 보내기
        await sendSlackNotification(`새 포스트가 추가되었습니다: ${data.title}, ${data.content}`);

        return new NextResponse(JSON.stringify({ message: "Post added successfully" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
// Update a post
export async function PUT(request) {
    const data = await request.json(); // Parse the request body
    try {
        await new Promise((resolve, reject) => {
            const query = "UPDATE posts SET title = ?, startDate = ?, endDate = ?, content = ? WHERE id = ?";
            db.query(query, [data.title, data.startDate, data.endDate, data.content, data.id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        return new NextResponse(JSON.stringify({ message: "Post updated successfully" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

// Delete a post
export async function DELETE(request) {
    const data = await request.json(); // Parse the request body
    try {
        await new Promise((resolve, reject) => {
            const query = "DELETE FROM posts WHERE id = ?";
            db.query(query, [data.id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        return new NextResponse(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
