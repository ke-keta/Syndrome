import { FaBookmark } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Love = () => {

  return (
    
    <Link to="/love">
        <FaBookmark />
        <span>お気に入り</span>
    </Link>
  )
}
