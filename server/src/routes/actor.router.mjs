
import {Router} from 'express'
import actorController from '../controllers/actor.controller.mjs'
// import actorService from '../services/actor.service.mjs'

const router = Router()

/*
router.get('/actors', async (req, res) =>{
    
    res.send(data)
})
*/

router.route('/actors').get(actorController.getAllActors)

router.route('/actors/:id').get(actorController.getActorById)

router.route('/actors').post(actorController.insertActor)

router.route('/actors/:id').put(actorController.modifyActor)

router.route('/actors/:id').delete(actorController.deleteActor)

export default router
