'use client';

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem"

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    rent: number;  
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id
}) => {

    const [properties, setProperties] = useState<PropertyType[]>([]);
    
    const markFavorite = (id: string, is_favorite: boolean) => {
        // Update local state immediately for better UX
        setProperties(prev =>
            prev.map(property =>
                property.id === id
                    ? { ...property, is_favorite: is_favorite }
                    : property
            )
        );

        console.log(
            is_favorite ? "Added to favorite" : "Removed from favorite"
        );
    };

    const getProperties = async () => {
        try {
            let url = '/api/properties/'

            if (landlord_id) {
                url += `?landlord_id=${landlord_id}`
            }

            const tmpProperties = await apiService.get(url)
            setProperties(tmpProperties.data)
        } catch (error) {
            console.error('Failed to fetch properties:', error);
        }
    }

    useEffect(() => {  
        getProperties();
    }, [landlord_id]);

    return (
        <>  
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}  
                        markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PropertyList