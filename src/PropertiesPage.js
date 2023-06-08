import { useState, useEffect } from "react"
import SharebnbApi from "./api";
import PropertiesList from "./PropertiesList"

function PropertiesPage() {
  const [propertiesList, setPropertiesList] = useState({data:[], isLoading:true})

  useEffect(function getProperties() {

    async function getProps() {
      const properties = await SharebnbApi.getProperties();
      setPropertiesList({data:properties, isLoading:false});
    }

    getProps();
  }, []);

  if (propertiesList.isLoading) return (<h1>Loading...</h1>);

  return (
    <PropertiesList properties={propertiesList.data} />
  )
}

export default PropertiesPage