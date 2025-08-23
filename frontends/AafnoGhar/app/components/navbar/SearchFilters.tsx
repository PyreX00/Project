const SearchFilter = () =>{
    return(

<div className="h-[48px] lg:h-[64px] flex items-center justify-between lg:border rounded-full px- 2 lg:px-1">
  <div className="flex items-center space-x-2 ">
    <div className="hidden flex w-auto p-3 px-8 flex-col justify-center rounded-full hover:scale-110 transition duration-300 hidden  hover:bg-gray-100 transition-colors duration-200 lg:block">
      <p className="text-xs font-semibold">Room</p>
      <p className="text-sm">What type of room</p>
    </div>

    <div className="hidden flex w-auto p-3 px-8 flex-col justify-center rounded-full hover:scale-110 transition duration-300 hover:bg-gray-100 transition-colors duration-200 hidden lg:block">
      <p className="text-xs font-semibold">Where</p>
      <p className="text-sm">Preferred location</p>
    </div>


    <div className="pl-">
      <div className="p-3 lg:p-5 bg-airbnb rounded-full text-white transform hover:scale-110 transition duration-300 hover:bg-airbnb-dark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 stroke-current">
          <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
        </svg>
      </div>
    </div>
  </div>
</div>
    )
}

export default SearchFilter;