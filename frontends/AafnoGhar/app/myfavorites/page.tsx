import PropertyList  from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";

export const dynamic = 'force-dynamic';

const MyFavoritesPage = async () => {
    const userId =  await getUserId ();

    if ( !userId){
        return (
            <main className=" max-w-[1500px] mx-auto px-6 py-12">
                <p> You need to be authenticated.... </p>
            </main>
        )
    }

    return(
        <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6 space-y-4">
            
            <h1 className="mt-6 mb-2 text-3xl pb-4 mb-6">My Favorites</h1>

            <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
                <PropertyList
                    favorites={true}
                />
            </div>

            </main>
    )
}


export default MyFavoritesPage;