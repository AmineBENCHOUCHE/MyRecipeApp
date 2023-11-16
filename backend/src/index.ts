import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import * as RecipeAPI from "./recipe-api"


const app = express()
const prismaClient = new PrismaClient()
// convert the body of request and response into json so we dont have to do it manually on every request
app.use(express.json()) 
// security
app.use(cors())

//SEARCH API
app.get('/api/recipes/search', async(req, res) => {
    // res.json({message: 'sucsess'})
    // GET http://localhost:500/pi/recipes/search?searchTerm=burgers
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const results = await RecipeAPI.searchRecipes(searchTerm, page)

    return res.json(results)
})

//SUMMARY RECIPE
app.get("/api/recipes/:recipeId/summary", async(req, res) => {
    const recipeId = req.params.recipeId
    const results = await RecipeAPI.getRecipeSummary(recipeId)
    return res.json(results)
})

//ADD FAVOURITE API endpoints

app.get('/api/recipes/favourite', async (req, res) => {
   
try {
    const recipes = await prismaClient.favouriteRecipes.findMany()
    const recipeIds = recipes.map((recipe) => recipe.id.toString())
    const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds)
    return res.json(favourites)

    //call of recipe api in bulk

} catch (error) {
    console.log(error);
    return res.status(500).json({error:"Oops, something went wrong"})
    
}
    
} )
app.post('/api/recipes/favourite', async(req, res) => {
    const recipeId = req.body.recipeId
    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create(
           {
            data:{
                recipeId: recipeId
            }
           } 
        )
        return res.status(201).json(favouriteRecipe)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Oops, something went wrong"})
    }

} )

app.delete('/api/recipes/favourite', async(req, res) =>{
    const recipeId = req.body.recipeId
    try {
        const favouriteRecipeToDelete = await prismaClient.favouriteRecipes.delete( {
            where: {recipeId}
        } )

        return res.status(204).send()
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"Oops, something went wrong"})
    }
})

app.listen(5000, () =>{
    console.log('server running on localhost:5000'); 
})