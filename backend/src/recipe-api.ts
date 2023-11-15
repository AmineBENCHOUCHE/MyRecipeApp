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

