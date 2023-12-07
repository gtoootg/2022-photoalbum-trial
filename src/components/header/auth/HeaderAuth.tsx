import { CommonButton } from "../../button/CommonButton";
import classes from "../Header.module.scss";
import UploadIcon from "@mui/icons-material/Upload";
import React, { useCallback, useState } from "react";
import { t } from "i18next";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useRequestAuth } from "../../../api/auth/use-request-auth.hooks";

export const HeaderAuth = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: requestAuth } = useRequestAuth();
  const handleSubmit = () => {
    requestAuth({ username, password });
  };

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <CommonButton
        className={classes.header_container_navigation_element}
        variant={"text"}
        text={t("header.navigation.login")}
        onClick={handleOpen}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={{ padding: "24px" }} width={300}>
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
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Menu>
    </div>
  );
};
