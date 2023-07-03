import Notification from '../schemas/Notification'
import User from '../models/User';
import Notification from '../schemas/Notification';
class NotificationController{
    async index(req,res){
        const checkIsProvider=await User.findOne({
            where:{
                id:req.userId, provider:true,
            }
            })
            if(!checkIsProvider){
                return res
                .statur(401).json({error:'only providers can load notifications'})
            }

const notifications= await Notification.find({

    user:req.userId,

}).sort({createdAt: 'desc'}).limit(20)


        return res.json(notifications);
    }

    async update(req,res){
        const notification=await Notification.findByIdAndUpdate(
            req.params.id,
            {read:true},
//{new:true} depois que atualizar vai retornar a nova notificacao 
//atualizada se nao colocar ele vai no banco atualiza mas nao 
//retorna o registro atualizado

            {new:true}
        )
        return res.json(notification)
    }
}
export default new NotificationController()