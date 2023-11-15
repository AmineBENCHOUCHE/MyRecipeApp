import {FormEvent, ChangeEvent, useRef, useState} from 'react'
import './App.css'
import * as api from './api'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'
import { IoSearch } from "react-icons/io5";



const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const pageNumber = useRef<number>(1)

  const handleOnChange = (e:  ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results)
      pageNumber.current = 1
            
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleViewMore = async () => {
    const nextPage = pageNumber.current+1
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage )
      setRecipes([...recipes, ...nextRecipes.results])
      pageNumber.current = nextPage
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form 
        className='w-full flex items-center h-full border border-1 border-gray-200'
        onSubmit={(event) => handleSearchSubmit(event)}>
        <input 
          className='w-full p-2 '
          value={searchTerm || ''}
          onChange = {handleOnChange} 
          type="text"  
          required 
          placeholder='Enter a search term ...'>
        </input>
        <IoSearch className="w-10 h-10 p-1"/>

      </form>
      <div className='grid grid-cols-2 gap-8 pb-10'>
        {recipes.map(recipe => 
          (<div 
          className=''
          key={recipe.id}>
          <RecipeCard recipe={recipe}/>
          </div>))
          }

      </div>
          <button
          onClick={handleViewMore}
          >View more</button>

    </div>
  )
  
}
export default App