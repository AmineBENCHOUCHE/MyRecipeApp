
import { useState } from "react"

type  Tabs= "search" |"favourites"

interface Props  {
  selectTab: (tab:Tabs) => void
}


const TabsComponent = ({selectTab}: Props) => {
  const [showSelectedTab, setShowSelectedTab] = useState<Tabs>("search")

  const handleSelectTab = (tab:Tabs) => {
    selectTab(tab)
    setShowSelectedTab(tab)
    console.log(showSelectedTab);
  }

  return (
    <div className="self-start mb-5">
      <ul className="flex  gap-4">
        <div className="flex flex-col items-start">
          <li
           onClick={() => handleSelectTab("search")}
          >Recipe Search</li>
          {showSelectedTab === "search" && 
            <span className="w-full h-1 bg-yellow-500"></span>
          }
        </div>
        <div className="flex flex-col items-start">
            <li
             onClick={() => handleSelectTab("favourites")}
            >Favourites</li>
               {showSelectedTab === "favourites" && 
            <span className="w-full h-1 bg-yellow-500"></span>
          }
          </div>
      </ul>
    </div>
  )
}
export default TabsComponent