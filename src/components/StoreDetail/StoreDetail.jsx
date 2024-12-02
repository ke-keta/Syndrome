import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { GiPositionMarker } from "react-icons/gi";
import { IoTimeSharp } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";

const Img = styled('img')({
  width: '100%',    // 親要素の幅に合わせる
  maxWidth: '200px', // 最大幅を200pxに制限
  height: 'auto',   // 高さは自動で調整
  objectFit: 'cover', // 画像の比率を保ちながらトリミング
});

export const StoreDetail = ({image, name, address, open, close, tags,index,totalStores,isLast, }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const displayedTags = showAllTags ? tags : tags.slice(0, 3); // 最初の3つのタグを表示

  return (
    <Paper sx={{ 
      p: 2, 
      mb: isLast ? 12 : 6, // 最後の店舗にだけ大きなマージン 
      width: '100%',
      maxWidth:'700px', 
      flexGrow: 1,
      backgroundColor: '#ffd3a0',
      color: '#000000',
      borderRadius: 3,
      '@media (min-width: 1024px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    }}>
      <Grid container spacing={2}>
        {/* 左側: 画像 */}
        <Grid item  xs={6}>
          <ButtonBase sx={{
             width: '100%', 
             height: '100%', 
             borderRadius: '8px', // Paperの角丸に合わせます
             overflow: 'hidden', // 画像がButtonBaseからはみ出ないようにします
          }}>
            {image ? (
              <Img alt="store" src={image} />
            ) : (
              <Typography 
                sx={{   
                  width: 128, 
                  height: 128, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#555',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                画像がありません
              </Typography>
            )}
          </ButtonBase>
        </Grid>

        {/* 中央: 基本情報 */}
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography 
                sx={{ fontSize: 21, fontWeight: 'bold' }} 
                gutterBottom 
                variant="subtitle1"
              >
                {name}
              </Typography>
              <Typography sx={{ fontSize: 14 ,fontWeight:'bold'}} variant="body2" gutterBottom>
                <GiPositionMarker style={{ marginRight: 4 }} /> {address}
              </Typography>
              <Typography variant="body2" sx={{fontWeight:'bold'}}>
                <IoTimeSharp style={{ marginRight: 4 ,}} /> {open}時から{close}時まで
              </Typography>
              {/* タグ表示 */}
              <Typography variant="body2">
                <IoIosPricetags style={{ marginRight: 4, marginTop: 7 }} /> 
              </Typography>
              <Typography variant="body2" sx={{ml:3, mt:-2.5,fontWeight:'bold'}}>
                 {displayedTags.join(', ')}
              </Typography>
              {/* 全て表示ボタン */}
              {tags.length > 3 && (
                <Button 
                  onClick={() => setShowAllTags(!showAllTags)}
                  sx={{ mt: 1,ml: 9.1,color:"#4169E1" }}
                >
                  {showAllTags ? '閉じる' : '全て表示'}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
