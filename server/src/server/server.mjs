import express from "express";
import {createServer} from 'http'
import cors from "cors";
import helmet from "helmet";

import actorRouter from '../routes/actor.router.mjs'

import { SERVER_PORT } from "../config/config.mjs"

const app = express();

app.disable('x-powered-by')
app.disable('etag')

app.use(helmet())
app.use(express.json())

//Middleware
// Protege de vulmerabilidades web
app.use(helmet())
// reconoce el objeto de solicitud (PUT, POSR) como matrices
app.use(express.urlencoded({extended: true}))
// permite usar recursos en el propio servidor
app.use(cors())
//establece la carpeta publica en el servidor NO USADO EN EL EJERCICIO
//app.use(express.static(path.join(process.cwd(),'public')))

app.get('/api/v1' , (req, res) =>{
    return res.send({
        error: false,
        message: 'welcome to build restfull no me da tiempo',
        writen_by: 'Acceso a datos',
        published_on:'http://accesodatos.dev'
    })

})


app.use('/api/v1' ,actorRouter)


// crear server
const server = createServer(app)

const runServer = () =>{

    server.listen(SERVER_PORT, ()=>{
        console.log('server started on port  htpp://localhost:' +server.address().port)
    })

}

const stopServer = () =>{
    console.log('\n Closin server..')
    server.close()
    
    
}

export {runServer, stopServer}