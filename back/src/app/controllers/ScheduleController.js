import User from "../models/User"
import File from "../models/File"
import Appointment from "../models/Appointment"
import {startOfDay, endOfDay,parseISO} from 'date-fns'
import{Op} from 'sequelize'
class ScheduleController{
async index(req,res){
    
const checkprovider= await User.findOne({
where:{
    id:req.userId, provider:true,
},
})
if (!checkprovider) {    
    return res.status(400).json({error:'user is not a provider'})
}
const {date}=req.query
const parsedDate=parseISO(date)
    const schedule= await Appointment.findAll({
        where:{
            provider_id:req.userId,
            canceled_at:null,
            include:[{
model:User,
as:'user',
attributes:['name'],


            }],
            date:{[Op.between]:[startOfDay(parsedDate), endOfDay(parsedDate)],

            },
        },
order:['date']

    })


return res.json({schedule})
}
}

export default new ScheduleController()
