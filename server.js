const express = require('express')
const mysql = require('mysql');
// const bodyParser = require('body-parser')

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

//mysqlへのコネクションの準備
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '17939176',
      database: 'ucapp_app_db'
    });

//MySQLへの接続ができていない時にエラーを表示
    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('success');
    });

    //usersテーブルを全て取得-----------------------------------------
    app.get('/api/users', (req, res) => {
        connection.query('SELECT * FROM users',
            (error, results) => {
                console.log(results);
                res.send(results);
            }
        );
    });

    // const jsonWrite = function(res, ret) {
    //     if(typeof ret === 'undefined') {
    //         res.json({
    //             code: '1',
    //             msg: '操作失败'
    //         });
    //     } else {
    //         res.json(ret);
    //     }
    // };
    //usersテーブルに追加---------------------------------------
    app.post('/api/signIn', (req, res) => {
        const params = req.body;
        const sqlInsert = `INSERT INTO users VALUES (?,?,?,?)`;
        connection.query(sqlInsert, [params.userId, params.userName, params.mail, params.password], (err,result)=>{
            res.send(result);
    });
    });

    //usersテーブルからuser削除--------------------------------------
    app.delete('/api/deleteUser', (req, res) => {
        const params = req.query;
        // console.log(req.query)
        const sqlDelete = `DELETE FROM users WHERE userId=?`;
        connection.query(sqlDelete, params.id, (err, result) => {
            // connection.query(sqlDelete, (err, result) => {
            res.send(result);
        });
    });
    
    //usersテーブルの何か変更(update)-------------------------------
    app.post('/api/updateUser', (req, res) => {
        const params = req.body;
        // console.log(params);
        const sqlUpdate = `UPDATE users SET userName=? WHERE userId=?`;
        connection.query(sqlUpdate, [params.userName, params.userId], (err, result) => {
            res.send(result);
        })
    });
    //costsテーブルの中身を取得---------------------------------------
    app.get('/api/costs', (req, res) => {
        connection.query('SELECT * FROM costs',
            (error, results) => {
                console.log(results);
                res.send(results);
            }
        );
    });
    //costsテーブルに追加----------------------------------------------
    app.post('/api/addCosts', (req, res) => {
        const params = req.body;
        console.log('req.body=> '+req.body)
        const sqlInsert = `INSERT INTO costs VALUES (?,?,?,?,?,?,?,?,?)`;
        connection.query(sqlInsert, [
            params.costId,
            params.year,
            params.month,
            params.color,
            params.waterCost,
            params.eleCost,
            params.gasCost,
            params.totalCost,
            params.addDate
        ], (err, result) => {
            res.send(result);
            console.log(result)
    });
    });

app.listen(3000, () => console.log('Example app listening on port 3000!'))