import {
  Drawer,
  List,
  ListItemButton,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import LogoutOutLinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import memoApi from "../../api/memoApi";
import setMemo from "../../redux/features/memoSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res);
        dispatch(setMemo(res));
        console.log(memos);
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutLinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
            <IconButton></IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }}>
          <Typography>📝借りおきのメモ</Typography>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }}>
          <Typography>📝借りおきのメモ</Typography>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }}>
          <Typography>📝借りおきのメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
