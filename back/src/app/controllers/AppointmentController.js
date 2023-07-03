import Appointment from "../models/Appointment"
import User from "../models/User"
import pt from 'date-fns/locale/pt'
import File from "../models/File"
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns"
import * as yup from 'yup'
import Notification from "../schemas/Notification"
import Queue from "../../lib/Queue"
import CancellationMail from "../jobs/CancellationMail"

class AppointmentController{
async index(req,res){
//colocamos na query da requisição a propriedade page e igualamos a 1

    const {page=1}=req.query;

const appointemnts=await Appointment.findAll({
where:{
    user_id:req.userId,
    canceled_at:null,
},
order:['date'],
attributes:['id','date','past','cancelable'],
//definimos o limite para 20 registros por vez
limit:20,
//quantos registros vamos pular
offset:(page-1)*20,


include:[{
model:User, as:'provider', attributes:['id','name'],
include:[{
    model:File,
    as:'avatar',
    attributes: ['id','path','url'],
}]

}
]

})

return res.json(appointemnts) 

}
async store(req,res){
const schema = yup.object().shape({
    provider_id:yup.number().required(),
    date:yup.date().required(),
})

if(!(await schema.isValid(req.body))){
    return res.status(400).json({error:'validation fails'})
}




const {provider_id,date}=req.body


const checkIsProvider=await User.findOne({
where:{
    id:provider_id, provider:true,
}
})
if(!checkIsProvider){
    return res
    .statur(401).json({error:'you can only create appointments with providers'})
}
//parseISO transforma a string data da req em um objeto date que 
//sera usado no startOfHour que transforma a hora e minutos em só 
//horas ex: 19:30 vira 19

const hourStart=startOfHour(parseISO(date))
console.log(hourStart)
//se a hourStart esta antes da hora atual (new Date())
if(isBefore(hourStart,new Date())){
return res.status(400).json({error:'past dates are not permitted'})
}

const checkAvailability= await Appointment.findOne({
where:{
    provider_id,
    canceled_at:null,
    date:hourStart,
}

})
if(checkAvailability){
    return res.status(400).json({error:'appointment date is not available'})


}


const appointment =await Appointment.create({

  user_id:req.userId,
  provider_id,
  date:hourStart,
})
const user = await User.findByPk(req.userId)
const  formattedDate=format(hourStart,
   "'dia' dd 'de 'MMMM', as' H:mm'h'",
    {locale:pt}
    
    )
await Notification.create({
content:`Novo agendamento de ${user.name} para  ${formattedDate}, as  `,
user:provider_id,
})

    return res.json(appointment)

}
async delete(req,res){



    const appointment=await Appointment.findByPk(req.params.id,{

include:[{model:User, as:'provider', attributes:['name', 'email']},{model:User, as:'user', attributes:['name']}],


    })
    //console.log(appointment)
if(appointment.user_id==!req.userId){
return res.status(401).json({error:'voce não esta logado'})
}
const dateWithSub=subHours(appointment.date,2)
if(isBefore(dateWithSub,new Date())){
    return res.status(401).json({error:'voce so pode cancelar duas horas antes'})

}

appointment.canceled_at= new Date();
await appointment.save()

await Queue.add(CancellationMail.key,{
appointment,

})
//await Mail.sendMail({
//to:`${appointment.provider.name}<${appointment.provider.email}>`,
//subject: 'agendamento cancelado',
//template:'cancellation',
//context:{
//provider:appointment.provider.name,
//user:appointment.user.name,
//date:format(appointment.date,
//    "'dia' dd 'de 'MMMM', as' H:mm'h'",
  //   {locale:pt}
     
    // )
//}
//})
    return res.json(appointment)
}




}

export default new AppointmentController()
