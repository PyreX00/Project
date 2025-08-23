'use client'
import { useState } from 'react';

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    
    const categories = ['Single', 'Double', '1BHK', '2BK', '2BHK', '3BK'];
    
    return (
        <div className="pt-6 pb-8 px-4 bg-white">

            <div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
                {categories.map((category) => (
                    <div
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            relative pb-4 px-6 flex flex-col items-center justify-center
                            cursor-pointer transition-all duration-300 ease-in-out
                            min-w-[80px] group rounded-t-lg
                            ${activeCategory === category 
                                ? 'text-airbnb shadow-sm' 
                                : 'text-gray-600 hover:text-gray-900'
                            }
                        `}
                    >
                        <span className={`
                            font-semibold text-sm lg:text-base tracking-wide
                            transition-all duration-300 ease-in-out
                            ${activeCategory === category 
                                ? 'text-airbnb transform scale-105' 
                                : 'text-gray-700 group-hover:text-gray-900'
                            }
                        `}>
                            {category}
                        </span>
                        
                    
                        <div className={`
                            absolute bottom-0 left-1/2 transform -translate-x-1/2
                            h-1 bg-airbnb rounded-full
                            transition-all duration-300 ease-in-out
                            ${activeCategory === category 
                                ? 'w-full opacity-100' 
                                : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60'
                            }
                        `} />
                        
                        {/* Mobile underline */}
                        <div className={`
                            md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2
                            h-0.5 bg-airbnb rounded-full
                            transition-all duration-300 ease-in-out
                            ${activeCategory === category 
                                ? 'w-full opacity-100' 
                                : 'w-0 opacity-0'
                            }
                        `} />
                        
                       
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
        </div>
    );
};

export default Categories;