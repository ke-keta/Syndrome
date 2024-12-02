import './App.css';
import { Login } from './components/Login/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Love } from './Pages/Love/Love';
import { Search } from './Pages/Search/Search';
import { Navi } from './components/Navi/Navi.jsx';
import { StoreDetail } from './components/StoreDetail/StoreDetail.jsx';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // 認証状態の監視
import { Mypage } from './components/MyPage/Mypage.jsx';
import { FrontCover } from './components/FrontCover/FrontCover.jsx';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [tagsName, setTagsName] = useState([]); 
  const [storeData, setStoreData] = useState([]); // Firebaseから取得した店舗データ
  const [searchResults, setSearchResults] = useState([]); // 検索結果のステート
  const [filterDistance, setFilterDistance] = useState(1);
  const [i, setI] = useState(0);
  const [user, setUser] = useState(null); // ユーザー情報の状態

  const handleSearch = (distance) => {
    setFilterDistance(distance); //選択した距離を随時保存
    setI(prev => prev + 1);
  };

  useEffect(() => {
    const auth = getAuth();
    // ユーザーの認証状態を監視
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // ログインしている場合、ユーザー情報をセット
      } else {
        setUser(null); // ログアウトしている場合、ユーザー情報をクリア
      }
    });
  }, []);

  // GPSによる現在地の取得
  useEffect(() => {
    if (i > 0){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log("現在地取得成功:", { latitude, longitude });
        },
        (error) => {
          console.error("現在地の取得に失敗しました:", error);
        }
      );
    }
  }, [i]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 地球の半径（km）
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 距離（km）
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        console.log("Fetched Data:", data);
        setStoreData(data);
        setSearchResults(data); // 最初はすべてのデータを表示
      } catch (error) {
        console.error("データ取得エラー：", error);
      }
    };
    getData();
  }, []);

  // タグによるフィルタリング
  useEffect(() => {
    if (storeData.length > 0) {
      const filteredData = storeData.filter((store) => {
        return (
          tagsName.length === 0 || 
          tagsName.some((tagName) => store.tags.includes(tagName))
        );
      });
      setSearchResults(filteredData); // フィルタ結果を更新
    }
  }, [i]);

  // 現在地が取得できていないときには、すべての店舗を表示
  const filteredStores = userLocation ? storeData.filter(store => {
    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, store.latitude, store.longitude);
    return distance <= filterDistance;  // 選択した距離以内の店舗のみ
  }) : storeData;

  // 最終的にフィルタリングされた店舗
  const finalFilteredStores = searchResults.filter(store => {
    if (!userLocation) return true; // 現在地が取得できない場合はすべて表示
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      store.latitude,
      store.longitude
    );
    return distance <= filterDistance;
  });


  return (
    <div className='app-content'>
      <Router basename="/Syndrome">
        <Routes>
          {/* 最初の表紙ページ（FrontCover） */}
          <Route path="/" element={<FrontCover />} />
          
          {/* 他のルートに遷移した後はNaviを表示 */}
          <Route
            path="/home"
            element={
              <>
                <Navi
                  user={user}
                  searchResults={searchResults}
                  handleSearch={handleSearch} // 検索実行関数をNaviに渡す
                  tagsName={tagsName}
                  setTagsName={setTagsName}
                  userLocation={userLocation}
                  finalFilteredStores={finalFilteredStores}
                  setI={setI}
                />
                <Home 
                  searchResults={searchResults} 
                  finalFilteredStores={finalFilteredStores}
                  tagsName={tagsName} 
                  setTagsName={setTagsName} 
                  handleSearch={handleSearch}
                  userLocation={userLocation}
                  storeData={filteredStores}
                  distance={filterDistance}
                  i={i}
                />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/love" element={<Love tagsName={tagsName} setTagsName={setTagsName} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/store-detail" element={<StoreDetail 
            finalFilteredStores={finalFilteredStores} 
            searchResults={searchResults} 
            storeData={filteredStores} 
            handleSearch={handleSearch} 
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
