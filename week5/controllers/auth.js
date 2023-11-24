const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE});

exports.register = (req,res)=>{
    console.log(req.body);
    const {name,email,password,passwordconfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?',[email], async (error,result)=>{
        if(error){
            console.log(error)
        }
        
        if(result.length > 0){
            return res.render('register', {
                message: 'email is taken'
            })
        } else if(password !== passwordconfirm){
            return res.render('register', {
                message: 'passwords do not match'
            })
        }
        let hashedpass = await bcrypt.hash(password,8);
        console.log(hashedpass)

        db.query('INSERT INTO users SET ?',{name:name,email:email,password:hashedpass},(error,results)=>{
            if (error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register',{message:'user registered'});
            }
        })
    })
}

exports.login = (req,res)=>{
    console.log(req.body);
    const {name,password} = req.body;

    db.query('SELECT * FROM users WHERE name = ?',[name], async (error,result)=>{
        if(error){
            console.log(error)
        }

        if (result.length > 0) {
            const passtocheck = result[0].password;
            const matching = await bcrypt.compare(password,passtocheck);

            if (matching){
                return res.render('profile')
            } else{
                return res.render('login',{message: 'name or password not found'})
            }
        }else{
            return res.render('login',{message: 'username or password not found'})
        }
    })
}