import express from 'express'
import cors from 'cors'

const app = express()
// convert the body of request and response into json so we dont have to do it manually on every request
app.use(express.json()) 
// security
app.use(cors())

app.get('/api/recipes/search', async(req, res) => {
    res.json({message: 'sucsess'})
})

app.listen(5000, () =>{
    console.log('server running on localhost:5000');
    
})