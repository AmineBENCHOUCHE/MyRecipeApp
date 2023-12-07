import { URLSearchParams } from "url"
require('dotenv').config();

const apiKey  = process.env.API_KEY

export const searchRecipes = async (searchTerm: string, page: number) => {
    if(!apiKey){
        throw new Error('API KEY not found ')
    }
    const url = new URL('https://api.spoonacular.com/recipes/complexSearch')
    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset : (page*10).toString()
    }
    // we concatenate to the url all the query params
    url.search = new URLSearchParams(queryParams).toString()
    //console.log(url.search);
    

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()
        return resultsJson
    } catch (error) {
        console.log(error);   
    }
}

export const getRecipeSummary = async (recipeId: string) => {
    //check if apikey is undefined because we cant send a query param undefined
    if(!apiKey){
        throw new Error('API KEY not found ')
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)
    const params = {
        apiKey        
    }
    url.search = new URLSearchParams(params).toString()
    
    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const json = await response.json()

    return json
}


export const getFavouriteRecipesByIDs = async (ids: String[]) => {
    if(!apiKey){
        throw new Error('API KEY not found ')
    }

    const url = new URL('https://api.spoonacular.com/recipes/informationBulk')
    const params = {
        apiKey,
        ids: ids.join(',')
    }
    url.search=new URLSearchParams(params).toString()
    const response = await fetch(url)
    const json = await response.json()

    return {results: json}

}

// SEARCH RECIPE BY INGREDIENTS

export const getRecipesByIngredients = async(ingredients: String[] /*, number:number ,ranking: number, ignorePantry:boolean*/) => {
    if(!apiKey){
        throw new Error('API KEY not found ')
    }

    const url = new URL( "https://api.spoonacular.com/recipes/findByIngredients")
    const params = {
        apiKey,
        ingredients: ingredients.join(','),
        //number: "10",
        // ranking: "1", //Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
        // ignorePantry: "true" //Whether to ignore typical pantry items, such as water, salt, flour, etc.
    }

    url.search = new URLSearchParams(params).toString()
    const response = await fetch(url)
    const json = await response.json()

    return {results:json}
}