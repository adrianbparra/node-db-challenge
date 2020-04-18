const express = require("express")

const Projects = require("./projects-model.js");


const router = express.Router()


router.get("/", (req,res) => {


    Projects.find()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to get Projects"}))
})

router.get("/:id", (req,res) =>{

    const {id} = req.params;

    const {tasks, resources} = req.query;
    // res.status(200).json({task,resources})
    

    Projects.findProjectId(id)
        .then(project => {

            if(tasks && resources){

                Projects.findTasks(id).then(tasks =>{
        
                    Projects.findResources(id)
                    
                })
                
            }
            if(resources && tasks){

                Projects.findResources(id).then(resources =>{
                
                    res.status(200).json({...project, "resources":resources})
                })
            }
            
        })

    

})


router.post("/", (req,res) => {

    const projectBody = req.body;

    Projects.addProject(projectBody)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to add Project"}))
})

router.delete("/:id", (req,res) =>{
    const {id} = req.params;

    Projects.delProject(id)
        .then(data =>{


            if(data > 0){
                res.status(200).json({message:"Project Deleted"})
            } else {
                res.status(404).json({message:"Unable to find Project Id"})
            }
            
        })
        .catch(err=> res.status(500).json({errorMessage: "Unable to delete project"}))
})


router.get("/:id/resources", (req,res) => {
    const {id} = req.params;

    //id is the project id

    Projects.findResources(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => res.status(500).json({errorMessage: "Unable to get Resources"}))
})


router.post("/:id/resources",(req,res)=>{
    const {id} = req.params;
    const resourcesBody = req.body;


    Projects.addResources(id,resourcesBody)
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err => res.status(500).json({errorMessage:"Unable to add resources or find Project ID"}))
})


router.get("/:id/tasks", (req,res) =>{
    const {id} = req.params;

    Projects.findTasks(id)
        .then(data=> {
            res.status(200).json(data)
        })
        .catch(err => res.status(500).json({errorMessage:"Unable to add Tasks or find Project ID"}))
})


router.post("/:id/tasks",(req,res)=>{
    const {id} = req.params;
    const taskBody = req.body;


    Projects.addTasks(id,taskBody)
        .then(ids =>{
            const id = ids[0]
            res.status(201).json({id, ...taskBody})
        })
        .catch(err => res.status(500).json({errorMessage:"Unable to add resources or find Project ID"}))
})


router.post("/:id")



module.exports = router