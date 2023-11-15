import { Recipe } from "../types"
// import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";



interface Props {
    recipe: Recipe
}

const RecipeCard = ({recipe}: Props) => {
  return (
    <div className="flex flex-col items-start p-2 shadow-md">
        <img src={recipe.image} alt="recipe image" className="w-full" />
        <div className="flex gap-2 items-center py-4">
            <FaRegHeart/>
            <h3 className="font-extrabold">{recipe.title}</h3>
        </div>

    </div>
  )
}
export default RecipeCard