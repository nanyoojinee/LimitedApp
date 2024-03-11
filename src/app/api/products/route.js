import { NextResponse } from "next/server";
import db from "../../../config/db";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM users", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        console.log(results);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500
            }
        );
    }
}

// 기존에 제공된 POST 함수를 데이터베이스에 데이터를 추가하는 기능으로 확장
export async function POST(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = "INSERT INTO product (name, price) VALUES (?, ?)";
            db.query(query, [data.name, data.price], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Product added successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// 제품 정보를 업데이트하는 PUT 함수 추가
export async function PUT(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = "UPDATE product SET name = ?, price = ? WHERE id = ?";
            db.query(query, [data.name, data.price, data.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Product updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// 제품을 삭제하는 DELETE 함수 추가
export async function DELETE(request) {
    const data = await request.json(); // 요청 본문에서 데이터를 파싱
    try {
        await new Promise((resolve, reject) => {
            const query = "DELETE FROM product WHERE id = ?";
            db.query(query, [data.id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
