const express = require('express')
const mysql = require('mysql');

const app = express()

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
    app.get('/api/users', (req, res) => {
        connection.query('SELECT * FROM users',
            (error, results) => {
                console.log(results);
                res.send(results);
            }
        );
    });

app.listen(3000, () => console.log('Example app listening on port 3000!'))