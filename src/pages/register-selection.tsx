// External import
import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Components
import LeftBarRegisterSelection from "../components/LeftBarRegisterSelection";
import RightBarRegisterAccountType from "../components/RightBarRegisterAccountType";
import RightBarRegisterPersonalDetail from "../components/RightBarRegisterPersonalDetail";
import RightBarRegisterSetPassword from "../components/RightBarRegisterSetPassword";
import RightBarRegisterWorkingLocation from "../components/RightBarRegisterWorkingLocation";
import RightBarRegisterWorkStyle from "../components/RightBarRegisterWorkStyle";

import colors from "../palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      padding: 0,
    },
    leftBarContainer: {
      [theme.breakpoints.down("sm")]: {
        height: "70px",
      },
    },
    fullHeightContainer: {
      height: "100%",
    },
    relativeContainer: {
      position: "relative",
    },
    formWrapper: {
      position: "relative",
      height: "100%",
    },
    formInput: {
      margin: "10px 0",
    },
    rightContainer: {
      height: "100%",
      padding: "50px 65px",
      backgroundColor: colors.lightGrey,
      [theme.breakpoints.down("sm")]: {
        padding: "50px 22px",
      },
    },
    title: {
      fontWeight: "bold",
      marginLeft: "10px",
    },
    resetPasswordButton: {
      marginTop: "15px",
    },
    image: {
      width: "70%",
      height: "auto",
    },
    iconButton: {
      marginLeft: "-12px", // Adjust margin instead of padding to prevent affecting to hover circle shape
    },
    backButton: {
      color: colors.black,
    },
  }),
);

export default function RegisterSelection() {
  const classes = useStyles();
  const router = useRouter();

  const [step, setStep] = useState(0);

  const goToPage = (url: string) => {
    router.replace(url);
  };

  useEffect(() => {
    // setStep(2);
  }, []);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid
          container
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          alignItems={"center"}
          justify={"center"}
          className={clsx(classes.relativeContainer, classes.leftBarContainer)}
        >
          <LeftBarRegisterSelection step={step} />
        </Grid>

        <Grid item lg={9} md={9} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          {step === 0 && (
            <RightBarRegisterAccountType
              onNext={() => {
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <RightBarRegisterPersonalDetail
              onNext={() => {
                setStep(2);
              }}
              onPreviousStep={() => {
                setStep(0);
              }}
            />
          )}
          {step === 2 && (
            <RightBarRegisterSetPassword
              onNext={() => {
                setStep(3);
              }}
              onPreviousStep={() => {
                setStep(1);
              }}
            />
          )}
          {step === 3 && (
            <RightBarRegisterWorkingLocation
              onNext={() => {
                setStep(4);
              }}
              onPreviousStep={() => {
                setStep(2);
              }}
            />
          )}
          {step === 4 && (
            <RightBarRegisterWorkStyle
              onNext={() => {
                goToPage("/artists");
              }}
              onSkip={() => {
                setStep(4);
              }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
