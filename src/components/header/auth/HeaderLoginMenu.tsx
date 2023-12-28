import { MgButton } from "../../button/MgButton";
import React, { useCallback, useState } from "react";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import { useRequestAuth } from "../../../api/auth/use-request-auth.hooks";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { MgLink } from "../../link/MgLink";

export const HeaderLoginMenu = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: requestAuth } = useRequestAuth();
  const handleSubmit = async () => {
    await requestAuth({ username, password });
  };

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setUsername("");
    setPassword("");
    setAnchorEl(null);
  };

  return (
    <Box>
      <MgButton
        variant={"text"}
        text={t("header.navigation.login")}
        onClick={handleOpen}
        labelColor={"white"}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ padding: "24px" }} width={300}>
          <Typography variant={"h6"} fontWeight={"bold"}>
            {t("header.navigation.login")}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="User name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={!username || !password}
          >
            {t("header.navigation.login")}
          </Button>
          <MgLink href="/sign-up" color={"black"} onClick={handleClose}>
            {t("Don't have an account? Sign Up")}
          </MgLink>
        </Box>
      </Menu>
    </Box>
  );
};
