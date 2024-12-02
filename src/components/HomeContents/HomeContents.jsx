import React, { useState, useEffect } from 'react';
import './HomeContents.css';
import { StoreDetail } from '../StoreDetail/StoreDetail';

export const HomeContents = ({ distance, finalFilteredStores, i }) => {
  const [shouldDisplayTitle, setShouldDisplayTitle] = useState(false); // タイトル表示管理
  const [displayDistance, setDisplayDistance] = useState(0); // 表示する距離

  useEffect(() => {
    // `i` が更新されたときのみ "周辺の店舗" を表示
    if (i > 0) {
      setShouldDisplayTitle(true);
      const calculatedDistance = Number(distance) * 500; // 距離計算
      setDisplayDistance(calculatedDistance);
    } else {
      setShouldDisplayTitle(false);
    }
  }, [i, distance]);

  return (
    <div className='home-contents-detail'>
      {shouldDisplayTitle && ( // 表示フラグがtrueの場合にのみタイトルを表示
        <p className='homeContentTitle'>{displayDistance}m 周辺の店舗</p>
      )}

      <div className='totalStore'>
        {finalFilteredStores?.length > 0
          ? `${finalFilteredStores.length} 件見つかりました`
          : "店舗情報がありません。"}
      </div>
      <div className='top-div'></div>

      {/* 店舗情報のリスト */}
      <div className='storeDetail-content'>
        {finalFilteredStores?.length > 0 ? (
          finalFilteredStores.map((store, index) => (
            <StoreDetail
              key={store.id || index}
              name={store.name}
              address={store.address}
              open={store.open}
              close={store.close}
              image={store.image}
              tags={store.tags}
              index={index + 1} // 店舗番号（1から始まる）
              totalStores={finalFilteredStores.length} // 総店舗数
              isLast={index === finalFilteredStores.length - 1} // 最後の店舗かどうか
            />
          ))
        ) : (
          <p>店舗情報がありません。</p>
        )}
      </div>

      <div className='bottom-div'></div>
    </div>
  );
};
