import { Box, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import { ImageTransition } from "../../../components/image-transition/ImageTransition";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Regex } from "../../../helper/regex/use-regex";
import { useTranslation } from "next-i18next";
import { MgButton } from "../../../components/button/MgButton";
import {
  checkRegexForSignUp,
  useHandleSignUp,
} from "./hooks/use-sign-up.hooks";

export const SignUpBody = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const { registerUser, isLoading } = useHandleSignUp();

  return (
    <Grid container maxWidth={"xl"} spacing={5}>
      <Grid item xs={8}>
        <ImageTransition
          images={[
            "https://live.staticflickr.com/65535/51973839886_56f413f231_h.jpg",
            "https://live.staticflickr.com/65535/49802283783_5ab06de39c_k.jpg",
            "https://live.staticflickr.com/593/33022311841_93724faf1f_k.jpg",
          ]}
        />
      </Grid>
      <Grid item xs={4}>
        <Box mb={3} mt={3} display={"flex"}>
          <Box mr={1}>
            <PersonAddIcon sx={{ width: "40px", height: "40px" }} />
          </Box>
          <Typography variant={"h4"}>Sign up</Typography>
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          label={t("sign-up.username", { ns: "sign-up" })}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label={
            !isEmailError
              ? t("sign-up.email", { ns: "sign-up" })
              : t("sign-up.email-error", { ns: "sign-up" })
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            checkRegexForSignUp(email, Regex.EMAIL, setIsEmailError)
          }
          error={isEmailError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label={
            !isPasswordError
              ? t("sign-up.password", { ns: "sign-up" })
              : t("sign-up.password-error", { ns: "sign-up" })
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() =>
            checkRegexForSignUp(password, Regex.PASSWORD, setIsPasswordError)
          }
          error={isPasswordError}
        />
        <Box mt={3} display={"flex"} justifyContent={"flex-end"}>
          <MgButton
            disabled={!username || !password || !email || isLoading}
            variant={"contained"}
            text={t("sign-up.confirm", { ns: "sign-up" })}
            onClick={() => registerUser({ username, email, password })}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
