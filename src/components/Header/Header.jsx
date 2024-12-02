import './Header.css'
import { IoPersonCircleOutline } from "react-icons/io5";

import { Link} from 'react-router-dom';
// import shishaHeader from '../../images/shishaRemove.png'

export const Header = () => {
  return (
    <div className='Header-Title'>
      {/* <img src={shishaHeader} alt='Shisha' className='shisha01' /> */}
      <div className='title-text'>
        Syndrome
      </div>


      <div className='header-icon'>
        <div className='person-icon' > 
          <Link to="/mypage" >
            <IoPersonCircleOutline />
          </Link>  
        </div>

        
      </div>
    </div>
  )
}
