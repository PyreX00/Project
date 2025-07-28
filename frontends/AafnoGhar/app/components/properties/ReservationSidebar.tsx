
const ReservationSidebar = () =>{
    return(

       <aside className = " mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className ="mb-5 text-2xl">16000 per month</h2>

            <div className = "mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold test-xs m b-2 "> No of people</label>
                <select className = "w-full -ml-1 text-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>

            <div className = "mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="block test-xs m b-2 "> Profession</label>
            </div>

            <div className="w-full mb-6 py-6 text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark">
                Book an appointment
            </div>
       </aside>
    )
}
  
export default ReservationSidebar; 