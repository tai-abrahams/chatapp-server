const express = require('express')
const credCtrl = require('../controllers/credentials-ctrl')

const router = express.Router()


router.post('/cred-create', credCtrl.createUser) 
router.put('/cred-upd/:id', credCtrl.updateUser) //:id used to be able to store the id from the client in the request line
router.delete('/cred-del/:id', credCtrl.deleteUser)
router.post('/loginCred', credCtrl.getUserByUser)


module.exports = router;