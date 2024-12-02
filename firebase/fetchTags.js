import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // firebase.js で設定したものをインポート

const fetchTags = async () => {
  const querySnapshot = await getDocs(collection(db, "tags"));
  const tagsList = querySnapshot.docs.map(doc => doc.data());
  console.log(tagsList); // 取得したデータを確認
};
