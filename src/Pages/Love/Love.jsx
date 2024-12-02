import { ClassNames } from '@emotion/react'
import { Fixed } from '../../components/Fixed/Fixed'
import './Love.css'
import React, { useEffect } from 'react'

export const Love = ({tagsName,setTagsName}) => {

  return (
    <div>
      <Fixed />
      <div className='loveContent'>
      近日公開！！！
      </div>
    </div>
  )
}
