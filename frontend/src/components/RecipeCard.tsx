import { Recipe } from "../types"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";



interface Props {
    recipe: Recipe, 
    onClick : () => void,
    onFavouriteButtonClick: (recipe: Recipe) => void,
    isFavourite: boolean
}

const RecipeCard = ({recipe, onClick, onFavouriteButtonClick, isFavourite}: Props) => {

  

  return (
    <div 
    className="flex flex-col items-start p-2 shadow-md"
    onClick={onClick}
    >
        <img src={recipe.image} alt="recipe image" className="w-full" />
        <div className="flex gap-2 items-center py-4">
          <span
               onClick={(event) => {
                event.stopPropagation()
                onFavouriteButtonClick(recipe)}
              }
          >
         
            {isFavourite? <FaHeart className="text-red-500"/> :  <FaRegHeart />}
          </span>
          
          <h3 className="font-extrabold">{recipe.title}</h3>
        </div>

    </div>
  )
}
export default RecipeCard