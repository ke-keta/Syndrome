import { useState, useEffect } from 'react';
import { Fixed } from '../../components/Fixed/Fixed';
import './Home.css';
import { HomeContents } from '../../components/HomeContents/HomeContents';

export const Home = ({i, finalFilteredStores, userLocation, searchResults, distance, setDistance, storeData, handleSearch, tagsName, setTagsName }) => {
  const [fixedVisible, setFixedVisible] = useState(true);

  // スクロールイベントハンドラー
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setFixedVisible(scrollPosition < 50); // スクロール量が50px未満なら表示
  };

  useEffect(() => {
    // スクロールイベントを設定
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='home-back'>
      {/* クラス名を動的に切り替える */}
      <div className={fixedVisible ? 'fixed-visible' : 'fixed-hidden'}>
        <Fixed
          storeData={storeData}
          tagsName={tagsName}
          setTagsName={setTagsName}
          handleSearch={handleSearch}
        />
      </div>
      <div className='home-content'>
        <HomeContents
          storeData={storeData}
          searchResults={searchResults}
          finalFilteredStores={finalFilteredStores}
          distance={distance}
          i={i}
        />
      </div>
    </div>
  );
};
