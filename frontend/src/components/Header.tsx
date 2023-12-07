

const Header = () => {
  return (
    <div className='relative mb-10 w-full'>
        <img 
        className='opacity-50  w-full  h-[500px] object-cover object-center rounded-lg '
        src="/recipe.png" alt="recipe" />
        <h1 className='text-6xl font-extrabold absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-black/80 text-white py-2 px-4'>RECIPE APP</h1>
  </div>
  )
}
export default Header