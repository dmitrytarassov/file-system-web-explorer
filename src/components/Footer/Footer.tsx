"use client";

import { GitHub, Web } from "@mui/icons-material";
import { Container, Grid, Link } from "@mui/material";
import React from "react";

type FooterProps = {
  //
};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Container fixed>
      <Grid container spacing={4}>
        <Grid item>
          <Link
            href="https://github.com/dmitrytarassov/file-system-web-explorer"
            target="_blank"
          >
            <Grid container spacing={1}>
              <Grid item>
                <GitHub />
              </Grid>
              <Grid item>Github</Grid>
            </Grid>
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://file-system-web-explorer.vercel.app"
            target="_blank"
          >
            <Grid container spacing={1}>
              <Grid item>
                <Web />
              </Grid>
              <Grid item>Vercel</Grid>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
