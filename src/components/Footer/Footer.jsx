
import { Navi } from "../Navi/Navi"


export const Footer = ({storeData, handleSearch,tagsName,setTagsName,distance,setDistance }) => {
  return (
    <div>
    <Navi storeData={storeData} tagsName={tagsName} setTagsName={setTagsName} distance={distance} setDistance={setDistance} handleSearch={handleSearch}/>
    </div>
  )
}
