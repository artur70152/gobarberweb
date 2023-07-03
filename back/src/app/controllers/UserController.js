import User from "../models/User";
//yup é usado para fazer validações nome obrigatorio e etc...
import File from "../models/File";

import * as yup from 'yup'
class UserController{

async store(req, res){
// o yup segue o schema validation,estamos validando um objeto(req.body)
//depois declaramos o fomato que o objeto tem que ter: object().shape()


const schema=yup.object().shape({
name:yup.string().required(),
email:yup.string().email().required(),
password: yup.string().required().min(3),

})
if(!(await schema.isValid(req.body))){
    return res.status(400).json({error:'validation fails'})
 
}
const user = await User.findByPk(req.userId);

if(email && email!=user.email){  
    const userExists=await User.findOne({where:{email:req.body.email}})

    if(userExists){
        return res.status(400).json({error:'user already exists'})
    }
}
const {id,name,email,provider}=await User.create(req.body)

return res.json({id,name,email,provider})
}

async Update(req,res){
//como o middleware de auteticação colocou o userId dentro da req,
//toda rota que vem desse middleware tambem tera acesso a esse id


const schema=yup.object().shape({
    name:yup.string(),
    email:yup.string().email(),
    oldPassword: yup.string(),
    //when é uma validação condicional, no when temops acesso a todos
    //os outros campos do yup, quando oldPassword for preenchida,
    //o password sera obrigatorio o segundo parametro do when pode ser
    //uma função que recebe oldPassword e field como parametros
    //field se refere ao password 
    password:yup.string().min(3).when('oldPassword',(oldPassword,field)=>
    oldPassword ? field.required():field
    
    ),
    confirmPassword:yup.string().when('password',(password,field)=>
     password ? field.required().oneOf([yup.ref('password')]):field   
    ),
    })

   //if(!(await schema.isValid(req.body))){

    // return res.status(400).json({error:'validation failsa'})
     
//}







console.log('req.body')

console.log(req.body)
const{email,oldPassword}=req.body;

//findbypk= find by primary key
const user= await User.findByPk(req.userId)
console.log(req.body)
console.log(user.email)
if(email && email==!user.email){
    const userExists=await User.findOne({where:{email}})
    if(userExists){
        return res.status(400).json({error:'user already exists'})
    }

}
if(oldPassword && !(await user.checkPassword(oldPassword))){
    return res.status(401).json({error:"password does not match"})
}



await user.update(req.body)



console.log('aaa')
const {id,name,avatar}= await User.findByPk(req.userId,{
include:[
    {
    model:File,
    as:'avatar',
    attributes:['id', 'path', 'url'],
    }
]

})
console.log('certo')
return res.json({id,name,email,avatar})

}


}


export default new UserController();