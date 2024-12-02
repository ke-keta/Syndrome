import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import './Fixed.css'


export const Fixed = ({storeData, handleSearch,tagsName,setTagsName,distance,setDistance }) => {
  return (
    <div>
        <Header />

        <Footer storeData={storeData} tagsName={tagsName} setTagsName={setTagsName} distance={distance} setDistance={setDistance} handleSearch={handleSearch}/>
    </div>
  )
}
