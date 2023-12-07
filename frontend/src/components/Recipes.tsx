
import { Recipe } from '../types'
// import RecipeCard from './RecipeCard'

interface Props {
    recipes: Recipe[],
    

}

const Recipes = ({recipes}:Props) => {

  return (
    <div className='grid grid-cols-2 gap-8 pb-10'>
    {
      recipes.map((recipe:Recipe) => 
        (<div 
            key={recipe.id}>
            {/* <RecipeCard  recipe={recipe}/> */}
        </div>)
      )
      }
  </div>
  
  )
}
export default Recipes