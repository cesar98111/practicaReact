import actorService from '../services/actor.service.mjs'
import httpCodes from '../errors/httpCodes.js'
/*
const getAllActors = async (req, res) =>{
try{

    const actors = await actorService.getAllActors()
    res.json({
        data: actors,
        status: 'success'
    })
}catch (error){
    res.status(500).json({error: err.message})
}
}

*/

const getAllActors = async (req, res) =>{
    try{
        let {name} = req.query
        
        let data
        if(!name){
            data = await actorService.getAllActors()
        }else{
            data = await actorService.getLastActor(name)
        }
            
        
        if(!data || data.length === 0){
            res.status(httpCodes.NOT_FOUND)
        }
        res.send({
            statusCode: httpCodes.OK,
            statusMessage: !data || data.length ===0 ? 'empty':'Ok',
            message: 
                !data|| data.length === 0
                ? 'Actores table is empty'
                : 'Successfully retrieved all actors',

            data
            
        })
    }catch (error){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        .send({
            statusCode: httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage: 'Internal Server Error',
            message :  null,
            data: null
        })
        
    }
    }


    const getActorById = async (req, res) =>{
        const { id } = req.params

        if (!id){
            res.status(httpCodes.BAD_REQUEST).send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Param id is required',
                message :  'Actor param is needed',
                data: null
            })
        }
        try{
            const data = await actorService.getActorById(id)
            if(!data || data.length === 0){
                res.status(httpCodes.NOT_FOUND)
            }
            res.send({
                statusCode: !data || data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage:!data || data.length === 0 ? 'not found' : 'ok',
                message:
                    !data || data.length === 0
                     ? 'Actors is not found'
                     : 'Successfully retrieved actor data',
                    data
            })
        }catch(error){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message :  null,
                data: null
            })
    }
    }

    const insertActor = async (req, res) =>{
        const {first_name, last_name } = req.body
        if(!first_name || !last_name){
            
            return res.status(httpCodes.BAD_REQUEST).send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Param  is required',
                message :  'Actor param is needed',
                data: null
            })
        }
        try{
            
            const data= await actorService.insertActor(first_name,last_name)
            console.log(data)

            res.send({
                statusCode: httpCodes.OK,
                statusMessage:'Ok',
                message: 'whit id: '+ data.insertId +' Actor add'
                    
            })
        }catch(error){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message :  null,
                data: null
            })
        }
    }

    const modifyActor = async (req, res) =>{
        const{id} = req.params
        const {first_name, last_name} = req.body


        if(!first_name || !last_name){
            console.log("hola")
           return res.status(httpCodes.BAD_REQUEST).send({
                statusCode: httpCodes.BAD_REQUEST,
                statusMessage: 'Param  is required',
                message :  'Actor param is needed',
                data: null
            })
        }
        
        try{
            
            const data= await actorService.modifyActor(first_name,last_name,id)
            

            res.status(data.affectedRows!== 0 ? httpCodes.OK: httpCodes.NOT_FOUND)
            res.send({
                statusCode: data.affectedRows!==0 ? httpCodes.OK : httpCodes.NOT_FOUND,
                statusMessage:data.affectedRows!==0 ? 'Ok' : 'Not found',
                message: data.affectedRows!==0 ? 'Successfully update data' : 'Error',
        })
        }catch(error){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message :  null,
                data: null
            })
        }
    }
    const deleteActor = async(req, res) =>{
        const {id} = req.params
        try{
            
            const data = await actorService.deleteActor(id)
            
            
            res.status(data.affectedRows!== 0 ? httpCodes.OK: httpCodes.NOT_FOUND)
            res.send({
                statusCode: data.affectedRows!==0 ? httpCodes.OK : httpCodes.NOT_FOUND,
                statusMessage:data.affectedRows!==0 ? 'Ok' : 'Not found',
                message: data.affectedRows!==0 ? 'Successfully delete data' : 'Error',
        })
        }catch(error){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message : null,
                data: null
            })
        }
}
    
   


export  default {
    getAllActors,
    getActorById,
    insertActor,
    modifyActor,
    deleteActor
   
}