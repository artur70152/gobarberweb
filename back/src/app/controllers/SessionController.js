import User from "../models/User";
import File from "../models/File";

import jwt from "jsonwebtoken";
import * as yup from 'yup'
import authconfig from "../../config/auth";
class SessionController{
async store(req,res){
    const schema=yup.object().shape({
        
        email:yup.string().email().required(),
        password: yup.string().required()
        
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'validation fails'})
         
        }
        
const {email,password}=req.body

const user=await User.findOne({where:{email},
include:[

    {
        model:File,
        as :'avatar',
        attributes:['id','path','url'],
    }
]

})
if(!user){
    return res.status(401).json({error:'User not found'})
}
if(!(await user.checkPassword(password))){
    return res.status(401).json({error:'password does not match'})
}

const {id, name, avatar,provider}=user;
return res.json({
    user:{
        id,name,email,avatar,provider
    },
    token: jwt.sign({id},authconfig.secret,{
        expiresIn:authconfig.expiresIn,
    })
})
}


}
export default new SessionController();