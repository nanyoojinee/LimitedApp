import { NextResponse } from "next/server";
import db from "../../../config/db";

export async function GET(request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to 1
    const limit = parseInt(url.searchParams.get("limit") || "4", 10); // Default to 4
    const offset = (page - 1) * limit;

    try {
        const paginatedResults = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM goplan ORDER BY createdAt DESC LIMIT ? OFFSET ?";

            db.query(query, [limit, offset], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // const paginatedResults = await new Promise((resolve, reject) => {
        //     const query = "SELECT * FROM goplan ORDER BY createdAt DESC";
        //     db.query(query, (err, results) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(results);
        //         }
        //     });
        // });


        // Count total items
        const totalCount = await new Promise((resolve, reject) => {
            const query = "SELECT COUNT(*) AS total FROM goplan";
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].total); // Assuming results[0].total contains the count
                }
            });
        });

        // Include both paginated results and total count in the response
        return NextResponse.json({ items: paginatedResults, totalItems: totalCount });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
// POST 함수에서 NULL 처리 수정
export async function POST(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = `INSERT INTO goplan (text, link) VALUES (?, ?)`;
            // JavaScript의 null 사용
            const linkValue = data.link || null; // 링크가 없을 경우 JavaScript의 null 사용
            db.query(query, [data.text, linkValue], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Data added successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function PUT(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = "UPDATE goplan SET text = ?, link = ? WHERE id = ?";
            db.query(query, [data.text, data.link, data.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Data updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = "DELETE FROM goplan WHERE id = ?";
            db.query(query, [data.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Data deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
