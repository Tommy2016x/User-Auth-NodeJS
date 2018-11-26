const router = require('express').Router();

const {signUp,login} = require('../../services/user');

router.post('/signup',async (req,res) => {
  const {email,password} = req.body;

  console.log(email)

  try{

    const token = await signUp(email,password);

    console.log(token)
    res.send(token);
    
  } catch(err){
    throw err;
  }
})

router.post('/login', async (req,res) => {
  const {email,password} = req.body;

  try{

    const token = await login(email,password);

    res.send(token);

  } catch(err){
    throw err
  }
})
module.exports = router;