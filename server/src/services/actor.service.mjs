
import db from '../config/db.mjs'



const getAllActors = async () =>{

    const sql = 'SELECT * FROM actor'
    const [results] = await db.query(sql)

    return results

}

const getLastActor = async (leter) =>{
    const sql  = 'SELECT * FROM actor WHERE first_name LIKE ?'
    leter += '%'
    console.log(leter)
    const[results] = await db.query(sql, [leter])

    return results
}

const getActorById = async (id) => {
    console.log(id)
    const sql = 'SELECT * FROM actor WHERE actor_id = ?'
    const [results] = await db.query(sql, [id])

    return results[0]
} 

const insertActor = async (first_name,last_name)=>{
    
    const[results] = await db.query('INSERT INTO actor(first_name, last_name) VALUE (?, ?);',[first_name, last_name])

    return results
}

const modifyActor = async (first_name,last_name,id) =>{
    const[results] = await db.query('UPDATE actor  SET first_name= ?, last_name= ? WHERE actor_id = ?;',[first_name, last_name, id])

    return results
}

const deleteActor = async (id) =>{
    const[results] = await db.query('DELETE FROM actor WHERE actor_id = ?;', [id])

    return results
}

export default {
    getActorById,
    getAllActors,
    insertActor,
    getLastActor,
    modifyActor,
    deleteActor
}