const express = require('express')
const mysql = require('mysql');
// const bodyParser = require('body-parser')

const app = express()
const bcrypt = require('bcrypt');

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

//usersテーブルの中身全て取得-----------------------------------------
    app.get('/api/users', (req, res) => {
        connection.query('SELECT * FROM users',
            (error, results) => {
                console.log(results);
                res.send(results);
            }
        );
    });

    //ログイン(vue側とdb側のパスワードが一致しているアカウントをdbから取得)--------------------
app.post('/api/login', (req, res) => {
        console.log(req.body.password)
        const sqlGet = `select * from users where mail=?`;
    // const params = req.body
        connection.query(sqlGet,[req.body.mail],
            async (error, results) => {
                console.log(results);
                // results.forEach(user => {
                const user = results;
                // const hash_result = bcrypt.compareSync(req.body.password, user.password)
                const hash_result = await bcrypt.compare(req.body.password, user.password)
                console.log('hash_result=> '+ hash_result)
                // if (!hash_result ) {
                //     res.send({
                //         msg: 'パスワードが違います!!!!',
                //         user: null
                //     })
                // } else {
                    res.send({
                        msg: '',
                        user: results
                //     });
                // }
                    // if (bcrypt.compareSync(req.body.password, user.password)) {
                    //     res.send(results);
                    // } else {
                    //     res.send(error)
                    // }
                });
            }
        );
    });
// app.get('/api/login', (req, res) => {
//         connection.query('SELECT * FROM users',)
//     })

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
        //パスワードのハッシュ化-------------
    // const bcrypt = require('bcrypt');
    const params = req.body;
    let hashed_password = bcrypt.hashSync(params.password, 10);
    console.log(hashed_password);
        const sqlInsert = `INSERT INTO users VALUES (?,?,?,?)`;
        connection.query(sqlInsert, [params.userId, params.userName, params.mail, hashed_password], (err,result)=>{
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