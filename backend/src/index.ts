import express from 'express'
import cors from 'cors'
import * as RecipeAPI from "./recipe-api"

const app = express()
// convert the body of request and response into json so we dont have to do it manually on every request
app.use(express.json()) 
// security
app.use(cors())

app.get('/api/recipes/search', async(req, res) => {
    // res.json({message: 'sucsess'})
    // GET http://localhost:500/pi/recipes/search?searchTerm=burgers
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const results = await RecipeAPI.searchRecipes(searchTerm, page)

    return res.json(results)
})

app.listen(5000, () =>{
    console.log('server running on localhost:5000');
    
})