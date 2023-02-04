import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setpasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setpasswordErrText("");
    setConfirmErrText("");

    //入力欄の文字列を取得
    //trim関数で空白を除去している
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力して下さい");
    }
    if (password === "") {
      error = true;
      setpasswordErrText("パスワードを入力して下さい");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("確認用パスワードを入力して下さい");
    }

    if (password !== confirmPassword) {
      setConfirmErrText("パスワードと確認用パスワードが異なります。");
    }

    if (error) return;

    setLoading(true);

    //新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規登録完了");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setpasswordErrText(err.msg);
        }
        if (err.param === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
        />
        <TextField
          fullWidth
          id="comfirmPassword"
          label="パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        既にアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
