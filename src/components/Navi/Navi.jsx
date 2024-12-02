import React, { useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark, FaSearch } from 'react-icons/fa';
import { LuBookOpenCheck } from 'react-icons/lu';
import './Navi.css';
import { Box, Button, Modal, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, Checkbox, OutlinedInput, ListItemText } from '@mui/material'; 
import { IoMdClose } from 'react-icons/io'; 
import Slider from '@mui/material/Slider';  
import { IoHome } from "react-icons/io5";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'BAR・カフェ利用',
  'カップルシートあり',
  '個室あり',
  '持ち込みOK',
  'デリバリー注文可能',
  '多人数OK',
  'カウンターのみ',
  'テーブル席あり',
  '玩具貸し出しあり',
  '飲み放題あり',
  'お一人様OK'
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 460,
  bgcolor: 'white',
  border: '2px solid gray',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export const Navi = ({ storeData,handleSearch,tagsName,setTagsName}) => {  

  const [open, setOpen] = useState(false);
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate (); // useNavigateを呼び出して、遷移機能を使用
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    handleSearch(distance);
    handleClose()
    // navigate('/store-detail');
  }
  
  const handleClearTags = () => {
    setTagsName([])
  };

  const handleMultipleChange = (event) => {
    const { target: { value } } = event;
    setTagsName(typeof value === 'string' ? value.split(',') : value); // 配列に変換
  };

  const handleSliderChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handleReset = () =>{
    setI(0)
  }

  return (
    
    <div className='Navi-content'>
      <div >
      <Link to="/home" onClick={handleReset}>
        <IoHome />
        <span>　ホーム　</span>
      </Link>
      </div>
      <Link to="/home" onClick={handleOpen}>
        <FaSearch />
        <span>店舗検索</span>
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        }}
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'gray',
            }}
          >
            <IoMdClose size={24} />
          </IconButton>

          <Typography 
            id="modal-modal-title" 
            variant="h6" 
            component="h2" 
            sx={{
              backgroundColor: 'white',
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: '"Zen Antique Soft", serif', 
              display: "flex",
              justifyContent: "center",
            }}
          >
            店舗の検索
          </Typography>

          <Typography 
            sx={{
              mt: 3, 
              fontFamily: '"Zen Antique Soft", serif', 
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            条件の絞り込み
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              multiple
              value={tagsName}
              onChange={handleMultipleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={tagsName?.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleClearTags} sx={{ mt: 1 }}>
            タグをクリア
          </Button>

          <Typography 
            sx={{
              mt: 3, 
              fontFamily: '"Zen Antique Soft", serif', 
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            
            距離の選択
          </Typography>
          <Slider
              value={distance}
              onChange={handleSliderChange}
              aria-labelledby="distance-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value * 500} m`}  // 表示形式を500m単位に変更
              min={1}  // 最小値を0に設定
              max={20}  // 最大値を20に設定（10km = 10000mで20ステップ）
              step={1}  // 1ステップごとに500m
              defaultValue={0} // 明示的に初期値を指定
            />

          <Button  onClick={handleClick}
            sx={{
              mt: 5,
              ml: 8,
              fontFamily: '"Zen Antique Soft", serif',
              fontSize: 25,
              border: '2px solid blue',
              borderRadius: 2, 
              padding: '5px 26px', 
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}>検索</Button>
        </Box>
      </Modal>

      <Link to="/love">
        <FaBookmark />
        <span>お気に入り</span>
      </Link>
    </div>
  );
};
