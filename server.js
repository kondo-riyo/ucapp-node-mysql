const express = require('express')
const mysql = require('mysql');
// const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 5000;

const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

//mysqlへのコネクションの準備
    // ローカルでの接続
    // const connection = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   password: '17939176',
    //   database: 'ucapp_app_db'
    // });
    //ClearDBへの接続
    const connection = mysql.createConnection({
      host: 'us-cdbr-east-05.cleardb.net',
      user: 'b50d3f3766370a',
      password: '23b6c8c8',
      database: 'heroku_422a08e57bf0ab7'
    });

    // const db_config = {
    //   host: 'us-cdbr-east-05.cleardb.net',
    //   user: 'b50d3f3766370a',
    //   password: '23b6c8c8',
    //   database: 'heroku_422a08e57bf0ab7'
    // }
    // const pool = mysql.createPool(db_config);

// app.get('/', function(request, response) {
//     console.log("heroku-mysql!!");
//     pool.getConnection(function(err, connection){
//         connection.query('SELECT * FROM t_message WHERE id=1', function(err, rows, fields){
//         if(err){
//             console.log('error: ', err);
//             throw err;
//         }
//         response.writeHead(200,{'Content-Type': 'text/plain'});
//         response.write(rows[0].message);
//         response.end();
//         connection.release();
//         });
//     });
// });

//MySQLへの接続ができていない時にエラーを表示
// pool.getConnection(function (err, connection) {
    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('success');
    //     connection.release();
    // });
});

//usersテーブルの中身全て取得-----------------------------------------
app.get('/api/users', (req, res) => {
    // pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM users',
            (error, results) => {
                res.send(results);
                console.log(results)
        //         connection.release();
        //     }
        // );
    })
});

//ログイン(vue側とdb側のパスワードが一致しているアカウントをdbから取得)--------------------
app.post('/api/login', (req, res) => {
        const sqlGet = `select * from users where mail=?`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlGet, [req.body.mail],
            async (error, results) => {
                const hash_result = await bcrypt.compare(req.body.password, results[0].password)
                if (!hash_result) {
                    res.send({
                        msg: 'パスワードが違います!!!!',
                        user: null
                    })
                } else {
                    res.send({
                        msg: '',
                        user: results
                    });
                }
        //         connection.release();
        // });
    });
});
 
//usersテーブルに追加---------------------------------------
app.post('/api/signIn', (req, res) => {
        //パスワードのハッシュ化-------------
    // const bcrypt = require('bcrypt');
    const params = req.body;
    let hashed_password = bcrypt.hashSync(params.password, 10);
    console.log(hashed_password);
    const sqlInsert = `INSERT INTO users VALUES (?,?,?,?)`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlInsert, [params.userId, params.userName, params.mail, hashed_password], (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    });
});

//usersテーブルからuser削除--------------------------------------
app.delete('/api/deleteUser', (req, res) => {
        const params = req.query;
        const sqlDelete = `DELETE FROM users WHERE userId=?`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlDelete, params.id, (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    });
});
    
//usersテーブルの何か変更(update)-------------------------------
app.post('/api/updateUser', (req, res) => {
        const params = req.body;
        const sqlUpdate = `UPDATE users SET userName=? WHERE userId=?`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlUpdate, [params.userName, params.userId], (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    })
});

//costsテーブルの中身を取得---------------------------------------
app.get('/api/costs', (req, res) => {
    // pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM costs',
            (error, results) => {
                res.send(results);
        //     connection.release();
        // });
    });
});

//costsテーブルに追加----------------------------------------------
app.post('/api/addCosts', (req, res) => {
    const params = req.body;
    const sqlInsert = `INSERT INTO costs VALUES (?,?,?,?,?,?,?,?,?,?)`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlInsert, [
            params.costId,
            params.year,
            params.month,
            params.color,
            params.waterCost,
            params.eleCost,
            params.gasCost,
            params.totalCost,
            params.addDate,
            params.userId
        ], (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    });
});

//costsテーブルのデータを変更(update)-----------------------------------
app.post('/api/updateCost', (req, res) => {
    const params = req.body;
    const sqlUpdate = `UPDATE costs SET waterCost=?, gasCost=?, eleCost=?, totalCost=?, addDate=? WHERE costId=?`;
    // pool.getConnection(function (err, connection) {
        connection.query(sqlUpdate, [params.waterCost, params.gasCost, params.eleCost, params.totalCost, params.addDate, params.costId], (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    });
});

//costsテーブルのcostデータを削除(delete)---------------------------------------
app.delete('/api/deleteCost', (req, res) => {
    const params = req.query;
    console.log(params)
    // pool.getConnection(function (err, connection) {
        const sqlDelete = `DELETE FROM costs WHERE costId=?`;
        connection.query(sqlDelete, params.id, (err, result) => {
            res.send(result);
        //     connection.release();
        // });
    });
});

// app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

