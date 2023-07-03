import { startOfDay, endOfDay, setSeconds, setMinutes, setHours,format, isAfter } from "date-fns";
import {Op} from 'sequelize'
import Appointment from "../models/Appointment";

class AvaliableController{
async index(req,res){
const {date}=req.query
if(!date){
    return res.status(400).json({error:'invalid date'})
}

const searchDate=Number(date)


const appointments= await Appointment.findAll({
where:{
    provider_id:req.params.providerId,
    canceled_at:null,
    date:{[Op.between]:[startOfDay(searchDate), endOfDay(searchDate)]},

}


})

const schedule=[
'08:00',
'09:00',
'10:00',
'11:00',
'12:00',
'13:00',
'14:00',
'15:00',
'16:00',
'17:00',
'18:00',
'19:00',
]
const available=schedule.map(time=>{
const [hour, minute] = time.split(':')
const value = setSeconds(setMinutes(setHours(searchDate,hour),minute),0)

return{
time,
value:format(value,"yyyy-MM-dd'T'HH:mm:ssxxx"),
//available é uma propriedade que retorna false ou true dependendo do 
//resultado das verificações 


//isAfter retorna valores booleanos
available:isAfter(value,new Date()) &&

//ao adicionar o operador lógico ! antes da expressão, ele nega o
// resultado da busca. Isso significa que a expressão !appointments.
//find(a => format(a.date, 'HH:mm') === time) retornará true se
// nenhum compromisso for encontrado em que a formatação da
// data corresponda a time. Caso contrário, se houver pelo menos 
//um compromisso encontrado com a formatação de data correspondente, 
//a expressão retornará false.
!appointments.find(a=>
   format(a.date, 'HH:mm') === time ),
}
})

return res.json(available);
}
}
export default new AvaliableController()