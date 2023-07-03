

import Sequelize,{Model} from 'sequelize'
import { isBefore,subHours } from 'date-fns';
class Appointment extends Model{
    
    static init(sequelize){
super.init({
date:Sequelize.DATE,
canceled_at: Sequelize.DATE, 
past:{
    type:Sequelize.VIRTUAL,
    get(){
return isBefore(this.date, new Date())
    },
},
cancelable:{
type:Sequelize.VIRTUAL,
get(){
return isBefore(new Date(), subHours(this.date,2))
},

},
},{sequelize})


return this;
    }
    static associate(models){
//A tabela do modelo Appointment possui uma coluna chamada user_id,
// que armazena o valor da chave primária do modelo User.
        this.belongsTo(models.User,{foreignKey:'user_id', as:'user'})
        this.belongsTo(models.User,{foreignKey:'provider_id', as:'provider'})

        }




}
export default Appointment;