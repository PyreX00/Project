interface CategoriesProps {
    dataCategory: string;
    setCategory: (category : string ) => void;
}

const Categories: React.FC<CategoriesProps> =({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className=" pt-3 cursor-pointer pb-6 flex item-center space-x-12">
             <div 
                onClick={() => setCategory('single')}
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'single' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">Single</span>
            </div>
            <div 
                onClick={() => setCategory('double')}
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'double' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
               <span className="t">Double</span>
            </div>
            <div
                onClick={() => setCategory('1BK')} 
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '1BK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">1BK</span>
            </div>
            <div
                onClick={() => setCategory('1BHK')} 
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '1BHK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">1BHK</span>
            </div>
            <div
                onClick={() => setCategory('2BK')} 
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '2BK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">2BK</span>
            </div>
            <div
                onClick={() => setCategory('2BHK')} 
               className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '2BHK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">2BHK</span>
            </div>
            <div
                onClick={() => setCategory('3BK')} 
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '3BK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">3BK</span>
            </div>
            <div
                onClick={() => setCategory('3BHL  ')} 
                className ={`pb-4 pl-4 pr-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == '3BHK' ? 'border-gray-800': 'border-white'} hover:border-gray-200 opacity-60 hover:opacity-100 `}>
                <span className="t">3BHK</span>
            </div>
            </div>
        </>
    )
}

export default Categories