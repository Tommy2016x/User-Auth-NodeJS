const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

const signUp = async (email,password) => {

    try{

    console.log('reached function')

        const user = await User.findOne({
            email:email
        })

        console.log(user)

       

        if(user)
            return('user already exists')

       console.log('determined')

         const hashedPass = bcrypt.hashSync(password)
        
        const newUser = await User.create({
            email,
            password: hashedPass    
        })

        console.log(newUser);

        await newUser.save();
        

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
        
        
        
        return jwt.sign({
            email,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');

    } catch(err){
        return err;
    }
        
   
}

const login = async (email,password) => {
    try{
        const user = await User.findOne({
            email
        })


        console.log(user)

        const correctPass = bcrypt.compareSync(password,user.password);

        console.log('we good')

        if(!user || !correctPass)
            return('wrong login info')
        
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
        
        return jwt.sign({
            email,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');

    } catch(err){
        throw err
    }
}

module.exports =  {signUp,login}