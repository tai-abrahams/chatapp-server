const User = require('../models/credentials-model.js')
const bcrypt = require('bcrypt')


createUser = (req, res)=>{
   const body = req.body;

   //check body/request exists
   if(!body){
    res.status('400').json({
        success: 'false',
        error: 'Credentials missing'
    })
}

//enter credentials into Credentials class !! class/object google it

 const Usr = new User(body)
 //to-do: send creds to io to be sent to client redux
console.log(Usr)
 //check that body matches the types of data allowed

 if(!Usr){
     res.status('400').json({
         success: false,
         error: err
     })
 }
    req.session.userId = Usr._id
    console.log(req.session.userId)

 Usr.save().then(()=>{
     
         //response status
         return res.status(201).json({
             success: true,
             id: Usr._id,
             message: 'credentials saved'
         })
        }).catch((error)=>{
             return res.status('400').json({
                 success: false,
                 error
             })

         })
 
}


updateUser = async (req, res)=>{

    const body = req.body

    if(!body){
        res.status(400).json({
            success: false,
            error: 'Provide data to be updated'
        })
    }

    
    //find using the credential model
    await User.findOne({_id: req.params.id}, (err, usr)=>{
        if(err){
            //communicate result to client
            return res.status(400).json({
                success:false,
                err //err: err
            })
        }

        usr.firstname= body.first_name,
        usr.last_name= body.last_name,
        usr.email= body.email,
        usr.password= body.password,
        usr.save.then(()=>{
            return res.status(200).json({
                success: true,
                message: "Successfully updated.",
                id: usr._id
            })
        })
        .catch(err=>{
            return res.status(404).json({
                err,
                message: 'Credentials not updated'
            })
        })
    })
}




deleteUser = async (req, res)=>{
 

    await User.findOneAndDelete({_id: req.params.id}, (err, usr)=>{ 

        if(err){
            return res.status(400).json({
                success: false,
                error: err,
                message: 'Something went wrong.'
            })
        }

        if(!usr){
            return res.status(404).json({
                success: false,
                error: 'Credentials not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: usr
        })  

    }).catch(err => console.log(err))
}




getUserByUser = async (req, res)=>{
    
    await User.findOne({username: req.body.username}, {_id: 1, username:1, password:1}, (err, usr)=>{

        if(err){
            res.status(404).json({
                success: false,
                message: 'Something went wrong.',
                errMessage: err
            })
            }

            if(usr === null){
                res.status(404).json({
                    user:{
                        success: false,
                        name:null,
                        errMessage: 'Incorrect username'
                        },
                        logged: false
                        })
                        }


              
                    const passwordCompared = async ()=>{
                        const passwordCompare = await new Promise((resolve, reject)=>{
                            bcrypt.compare(req.body.password, usr.password, (err, result)=>{
                                if(err){
                                    return reject(console.log(err))
                                    }
                                
                                if(result === true){
                                     return resolve(
                                         res.status(200).json({
                                             
                                                 user:{
                                                id: usr._id,
                                                username: usr.username,
                                                success: true
                                                },
                                                 password:{
                                                    success: result
                                                 },
                                                 logged: true
                                         })
                                     )
                                    }else{
                                        return res.status(404).json({
                                            user: {success: true},
                                            password:{ success: result, errMessage: 'Incorrect password'},
                                            logged: false
                                        
                                        })
                                            }
                                })
                                
                                // .catch((err)=>{
                                //     return res.status(404).json({
                                //         errMessage: err
                                //     })
                                // })
                            })
                            
                        }
              if(usr){
                   return passwordCompared()
                   }       



        }).catch((err)=>{
            console.log("the error" + err)
                            })
    }

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserByUser
}
