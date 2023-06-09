import { useState, useEffect, useContext } from "react"
import SharebnbApi from "./api";
import PropertiesList from "./PropertiesList"
import userContext from './userContext';

/**
 * Component for rendering Bookings Page
 *
 * State:
 * - propertiesList : object like {data, isLoading}
 *
 * RouteList -> PropertiesPage -> PropertiesList
 */
function PropertiesPage() {
  const [propertiesList, setPropertiesList] = useState({data:[], isLoading:true})
  const { currUser } = useContext(userContext);

  useEffect(function getProperties() {

    async function getProps() {
      const properties = await SharebnbApi.getProperties();
      const filteredProperties = currUser
                                    ? properties.filter(p => p.owner !== currUser.username)
                                    : properties;
      setPropertiesList({data:filteredProperties, isLoading:false});
    }

    getProps();
  }, []);

  if (propertiesList.isLoading) return (<h1>Loading...</h1>);

  return (
    <PropertiesList properties={propertiesList.data} />
  )
}

export default PropertiesPage