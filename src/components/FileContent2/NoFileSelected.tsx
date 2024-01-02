"use client";

import { Grid, Link, Typography } from "@mui/material";
import React from "react";

import styles from "./styles.module.css";

import { useLocalFiles } from "../../hooks/useLocalFiles";

type NoFileSelectedProps = {
  //
};

export const NoFileSelected: React.FC<NoFileSelectedProps> = () => {
  const { recentlyOpenedDirectories, dir, openRecentDir } = useLocalFiles();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const recents = [...recentlyOpenedDirectories.values()];

  return (
    <div className={styles.empty}>
      <Grid container justifyContent="center">
        {dir ? (
          <Grid item md={8}>
            <Typography variant="caption">No file selected</Typography>
          </Grid>
        ) : (
          <>
            <Grid item md={8} mb={2}>
              <Typography variant="h6">Projects:</Typography>
            </Grid>
            {recents.length > 0 && (
              <Grid item md={8} mb={2}>
                <Typography variant="caption">
                  {recents.map((recent) => (
                    <Link
                      key={recent.name}
                      onClick={() => openRecentDir(recent)}
                      className={styles.openedProject}
                    >
                      {recent.name}
                    </Link>
                  ))}
                </Typography>
              </Grid>
            )}

            <Grid item md={8}>
              <Typography variant="caption">
                Recently opened projects
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};
