import { runServer, stopServer } from "./server/server.mjs"
import cors from 'cors'
const startApplication = () =>{
    runServer()
}
const stopAplication = () =>{
    console.log('\nRecived kill signal, shutting down ..');
    stopServer
    process.exit(0)
}

process.on('SGINT',() => stopAplication())
process.on('SIGTERM', () => stopAplication())
process.on('exit', () => console.log('Exitin Express Server'))

startApplication()