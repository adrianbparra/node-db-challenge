
const db = require("../data/db-config.js");

function find() {

    return db("projects")

}

function addProject(projectBody) {

    return db("projects").insert(projectBody).then(ids =>{
        const id = ids[0]
        return findProjectId(id)
    })

}

function findProjectId(id) {

    return db("projects").where({id}).first()

}

function delProject(id){
    return db("projects").where({id}).del()
}

function findResources(id){
    return db("resources").where({project_id: id})
}

function addResources(id, resourcesBody){
    return db("resources").insert({...resourcesBody, project_id: id})
}


function findTasks(id){
    return db("tasks").where({project_id: id}).innerJoin("projects", "tasks.project_id", "projects.id")
        .select("projects.name as projectName","projects.description as projectDescription","tasks.id as taskId","tasks.description","tasks.notes","tasks.complete")

}

function addTasks(id, taskBody){
    return db("tasks").insert({...taskBody, project_id: id})
}

module.exports = {
    find,
    addProject,
    findProjectId,
    findResources,
    addResources,
    findTasks,
    addTasks,
    delProject,

}