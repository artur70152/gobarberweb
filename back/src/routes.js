import{Router}from'express'
import ProviderController from './app/controllers/ProviderController'
import multer from 'multer'
import multerconfig from './config/multer'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import FileController from './app/controllers/FileController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationController from './app/controllers/NotificationController'
import AvaliableController from './app/controllers/AvaliableController'
const routes=new Router()
//multer(multerconfig) inicia o multer com a configuração fornecida
const upload=multer(multerconfig)


routes.post('/users',UserController.store)

routes.post('/sessions',SessionController.store)


//No exemplo fornecido, o authMiddleware está sendo utilizado como um middleware global, pois é definido após a rota routes.post('/sessions', SessionController.store). 
//Isso significa que todas as rotas definidas após a inclusão do middleware authMiddleware irão passar por ele antes de serem processadas.
//Portanto, o authMiddleware estará verificando o cabeçalho da requisição para obter o token de autenticação em todas as rotas subsequentes. 
//Ele terá acesso aos dados da requisição atual, incluindo o cabeçalho da requisição, onde o token de autenticação geralmente é enviado.
//Por exemplo, se uma requisição HTTP for feita para a rota PUT /users, que atualiza as informações do usuário, a requisição passará pelo authMiddleware. 
//Nesse caso, o authMiddleware terá acesso ao cabeçalho da requisição para obter o token de autenticação e realizar a validação necessária antes de permitir que a requisição seja processada pelo controlador
// UserController.Update.
routes.use(authMiddleware)



routes.put('/users',UserController.Update)


routes.get('/providers',ProviderController.index)
routes.get('/appointments',AppointmentController.index)
routes.get('/notifications',NotificationController.index)
routes.put('/notifications/:id',NotificationController.update)


routes.post('/appointments',AppointmentController.store)
routes.get('/schedule',ScheduleController.index)
routes.delete('/appointments/:id',AppointmentController.delete)
routes.get('/providers/:providerId/available',AvaliableController.index)

//upload.single('file') é um middleware, o single faz upload de um 
//arquivo por vez e o file é o nome do campo que sera enviado na req
routes.post('/files',upload.single('file'),FileController.store)





export default routes