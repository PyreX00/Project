const Categories = () =>{
    return (
        <div className = 'pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">Single</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
               <span className="t">Double</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">1BK</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">1BHK</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">2BK</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">2BHK</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">3BK</span>
            </div>
            <div className ='pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-gray-200 opacity-60 hover:opacity-100  '>
                <span className="t">3BHK</span>
            </div>
        
         </div>
    )
}

export default Categories;