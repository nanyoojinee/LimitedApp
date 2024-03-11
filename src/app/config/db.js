const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Axxa123!',
  database: 'myapp',
});

// 연결 시도는 `connection` 객체를 사용해야 합니다.
connection.connect(err => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// 여기서는 `connection` 객체를 내보내야 합니다.
module.exports = connection;

