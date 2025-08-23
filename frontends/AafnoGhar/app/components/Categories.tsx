
import { useState } from 'react';

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState('Single');
    
    const categories = ['Single', 'Double', '1BK', '1BHK', '2BK', '2BHK', '3BK', '3BHK'];
    
    return (
        <div className="pt-6 pb-8 px-4 bg-white">
            {/* Desktop View */}
            <div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            relative pb-4 px-6 flex flex-col items-center justify-center
                            cursor-pointer transition-all duration-300 ease-in-out
                            border-b-3 min-w-[80px] group rounded-t-lg
                            ${activeCategory === category 
                                ? 'border-indigo-600 text-indigo-700 shadow-sm' 
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                            }
                        `}
                    >
                        <span className={`
                            font-semibold text-sm lg:text-base tracking-wide
                            transition-all duration-300 ease-in-out
                            ${activeCategory === category 
                                ? 'text-indigo-700 transform scale-105' 
                                : 'text-gray-700 group-hover:text-gray-900'
                            }
                        `}>
                            {category}
                        </span>
                        
                        {/* Animated underline */}
                        <div className={`
                            absolute bottom-0 left-1/2 transform -translate-x-1/2
                            h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full
                            transition-all duration-300 ease-in-out
                            ${activeCategory === category 
                                ? 'w-full opacity-100' 
                                : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60'
                            }
                        `} />
                        
                        {/* Subtle background highlight */}
                        <div className={`
                            absolute inset-0 rounded-lg transition-all duration-300 ease-in-out -z-10
                            ${activeCategory === category 
                                ? 'bg-gradient-to-b from-indigo-50 to-purple-50 border border-indigo-100' 
                                : 'bg-transparent group-hover:bg-gray-50 group-hover:border group-hover:border-gray-100'
                            }
                        `} />
                    </div>
                ))}
            </div>
            
            {/* Mobile View - Scrollable */}
            <div className="md:hidden">
                <div className="flex items-center space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((category) => (
                        <div
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                relative pb-3 px-4 flex flex-col items-center justify-center
                                cursor-pointer transition-all duration-300 ease-in-out
                                border-b-2 min-w-[60px] whitespace-nowrap rounded-t-md
                                ${activeCategory === category 
                                    ? 'border-indigo-600 text-indigo-700 bg-gradient-to-b from-indigo-50 to-purple-50' 
                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }
                            `}
                        >
                            <span className={`
                                font-medium text-sm transition-all duration-300 ease-in-out
                                ${activeCategory === category 
                                    ? 'text-indigo-700 font-semibold' 
                                    : 'text-gray-700 hover:text-gray-900'
                                }
                            `}>
                                {category}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;