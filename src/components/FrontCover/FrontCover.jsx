import { Link } from 'react-router-dom';
import './FrontCover.css';
import { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { Login } from '../Login/Login'; // Login コンポーネントをインポート

export const FrontCover = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false); // モーダルの状態管理

  useEffect(() => {
    setShowTitle(true);
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 800);
    return () => clearTimeout(buttonTimer);
  }, []);

  // モーダル開閉関数
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <div className="frontMain">
      <h1 className={`cover-title ${showTitle ? 'show' : ''}`}>Syndrome</h1>
      <div className={`cover-buttons ${showButton ? 'show' : ''}`}>
        <div>
          {/* ログインボタン */}
          <Button
  onClick={handleOpenLoginModal}
  className="cover-btn1"
  sx={{
    fontFamily: 'Zen Antique Soft, serif',
    // marginLeft: '50px', 
    padding: '15px 85px', // 値を文字列で指定
    fontSize: '2rem',
    // fontWeight: 'bold',
    // background: 'linear-gradient(to right, #f99150, #fcfdb2)', // コメントもJavaScript形式に
    color: 'rgb(0, 0, 0)',
    textDecoration: 'none',
    borderRadius: '80px',
    transition: 'color 0.3s ease', // プロパティ名もキャメルケース
  }}
>
  ログイン
</Button>

        </div>
        <div>
          <Link to="/home" className="cover-btn2">
            検索を始める
          </Link>
        </div>
      </div>

      {/* モーダル */}
      <Modal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // height:100,
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Login コンポーネントを呼び出し */}
          <Login onClose={handleCloseLoginModal} />
        </Box>
      </Modal>
    </div>
  );
};
