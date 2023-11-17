import { ChangeEvent, FormEvent} from "react"
import { IoSearch } from "react-icons/io5"

interface Props {
  
  onSubmitForm: (e: FormEvent) => void,
  searchTerm: string,
  onChange: (e:  ChangeEvent<HTMLInputElement>) => void
}

const SearchComponent = ({onSubmitForm, onChange, searchTerm}: Props) => {


  const handleOnChange = (e:  ChangeEvent<HTMLInputElement>) => {
    onChange(e)     
  }
  
  const handleOnSubmit = (e: FormEvent) => {
      onSubmitForm(e)
  }


  return (
    
  <form 
      className='w-full flex items-center h-full border border-1 border-gray-200 mb-5'
      onSubmit={handleOnSubmit}>
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
  )
}
export default SearchComponent



