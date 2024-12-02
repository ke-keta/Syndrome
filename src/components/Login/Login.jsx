import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onClose }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ログイン処理
  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate('/'); // ログイン成功後にホーム画面へ遷移
      if (onClose) onClose(); // モーダルを閉じる
    } catch (error) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
    }
  };

  // 新規登録処理
  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      navigate('/'); // 登録成功後にホーム画面へ遷移
      if (onClose) onClose(); // モーダルを閉じる
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      {/* モーダルヘッダー */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">ログイン・新規登録</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* エラーメッセージ */}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {/* ログインフォーム */}
      <Typography variant="subtitle1" mb={1}>
        ログイン
      </Typography>
      <TextField
        label="メールアドレス"
        type="email"
        fullWidth
        margin="normal"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <TextField
        label="パスワード"
        type="password"
        fullWidth
        margin="normal"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        ログイン
      </Button>

      {/* 新規登録フォーム */}
      <Typography variant="subtitle1" mt={4} mb={1}>
        新規登録
      </Typography>
      <TextField
        label="メールアドレス"
        type="email"
        fullWidth
        margin="normal"
        value={signUpEmail}
        onChange={(e) => setSignUpEmail(e.target.value)}
      />
      <TextField
        label="パスワード"
        type="password"
        fullWidth
        margin="normal"
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
      />
      <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleSignUp}>
        新規登録
      </Button>
    </Box>
  );
};
