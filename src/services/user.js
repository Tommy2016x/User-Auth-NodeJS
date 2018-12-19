const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

const signUp = async (email,password) => {
    try{
        const user = await User.findOne({
            email:email
        })

        if(user)
            return('user already exists')

        const hashedPass = bcrypt.hashSync(password)
        
        const newUser = await User.create({
            email,
            password: hashedPass    
        })

        await newUser.save();

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
        
        return jwt.sign({
            email,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');

    } catch(err){
        return 'Invalid information';
    }
        
   
}

const login = async (email,password) => {
    try{
        const user = await User.findOne({
            email
        })

        const correctPass = bcrypt.compareSync(password,user.password);

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
        return 'Invalid information'
    }
}

module.exports =  {signUp,login}