import {FormEvent, ChangeEvent, useRef, useState, useEffect} from 'react'
import './App.css'
import * as api from './api'
import { Recipe } from './types'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import TabsComponent from './components/TabsComponent'
import SearchComponent from './components/SearchComponent'

type Tabs = "search" | "favourites"
const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined)
  const [selectedTab, setSelectedTab] = useState<Tabs>("search")
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([])

  const pageNumber = useRef<number>(1)

  useEffect(() => {
    const fetchFavouriteRecipes = async() => {
      try {
        const favouriteRecipes = await  api.getFavouriteRecipes()
        setFavouriteRecipes(favouriteRecipes.results)   
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavouriteRecipes()
  }, [])
  

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
      console.log(recipes);
      
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

  const addFavouriteRecipe = async(recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe)
      setFavouriteRecipes([...favouriteRecipes,  recipe])
    } catch (error) {
      console.log(error);   
    }
  }

  const removeFavouriteRecipe = async(recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe)
      const updatedµRecipes = favouriteRecipes.filter((favRecipe) => recipe.id !== favRecipe.id)
      setFavouriteRecipes(updatedµRecipes)   
    } catch (error) {
      console.log(error);   
    }
  }

  return (
    //TODO  Create Skeleton when fetching data
    //TODO Disable scrolling when Modal
    <div className={`w-full flex flex-col gap-2 items-center justify-center h-full ${selectedRecipe ? 'overflow-hidden' : ''}`}>
      <div className='relative mb-10 w-full'>
        <img 
        className='opacity-50  w-full  h-[500px] object-cover object-center rounded-lg '
        src="/recipe.png" alt="recipe" />
        <h1 className='text-6xl font-extrabold absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-black/80 text-white py-2 px-4'>RECIPE APP</h1>
      </div>

      <TabsComponent selectTab={(selectedTab) => setSelectedTab(selectedTab)}/>
      {
        selectedTab==="search"? (
          <>
       
            <SearchComponent  
              searchTerm={searchTerm}
              onChange={(e) =>handleOnChange(e) }
              onSubmitForm={(e) => handleSearchSubmit(e)}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10'>
              {recipes?.map((recipe) => 
                {
                  const isFavourite = favouriteRecipes.some((favRecipe)=>  recipe.id === favRecipe.id)
                  
                  return (<div
                    key={recipe.id}>
                    <RecipeCard
                      recipe={recipe} 
                      onClick={() => setSelectedRecipe(recipe)}
                      onFavouriteButtonClick={isFavourite? removeFavouriteRecipe: addFavouriteRecipe} 
                      isFavourite= {isFavourite}
                    />
                  </div>)
                })
              }

            </div>
              {/* // Show the button View More */}
              {
                recipes?.length>0 &&
                <button onClick={handleViewMore}>View more</button>
              }
              
          </>
        ):
        (  
        <div className='grid grid-cols-2 gap-8 pb-10'>
          {
            favouriteRecipes.map((recipe) => 
              (<div 
                key={recipe.id}>
                <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} isFavourite onFavouriteButtonClick={removeFavouriteRecipe}/>
              </div>
              )
            )
          }
        </div>
        )
      }

      {/* Show Modal */}
      {
        selectedRecipe?
          <RecipeModal 
            recipeId={(selectedRecipe.id.toString())} 
            onClose={() => setSelectedRecipe(undefined)} 
          />: null
      }
      
    </div>
  )
  
}
export default App