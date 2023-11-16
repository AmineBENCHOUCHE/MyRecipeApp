import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { RecipeSummary } from "../types"
import * as RecipeAPI from "../api"

interface Props  {
    recipeId: string, 
    onClose: () => void
}

const RecipeModal = ({recipeId, onClose}: Props) => {
    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>()
    useEffect(() => {
        const fetchRecipeSummary = async() => {
            try {
                const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId)
                setRecipeSummary(summaryRecipe)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecipeSummary()
    }, [recipeId])
 
    if(!recipeSummary){
        return <></>
    }

    return (
        <div 
        onClick={onClose} 
        className=" fixed  top-0 left-0 z-1  bg-black/80 flex justify-center items-center h-screen w-full">
            <div className="bg-white rounded-md  py-10  text-gray-500 shadow-md z-2 w-[50%] h-[50%] px-5 ">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="font-extrabold text-left">{recipeSummary?.title}</h2>
                    <IoMdClose onClick={onClose} className="h-8 w-8"/>  
                </div>
                <div className="py-5 ">
                    <h3 className="text-left pb-2 font-bold">Summary</h3>
                    <div className="mb-5 py-2 border-red-600 border-2 overflow-hidden">
                        <p
                        className="text-left text-sm md:text-lg h-full overflow-auto"
                        dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeModal