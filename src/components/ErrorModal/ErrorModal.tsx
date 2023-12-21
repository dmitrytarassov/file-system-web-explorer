"use client";

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

import { useLocalFiles } from "../../hooks/useLocalFiles";

type ErrorModalProps = {
  //
};

export const ErrorModal: React.FC<ErrorModalProps> = () => {
  const { error, discardError } = useLocalFiles();

  return (
    <Dialog maxWidth="md" open={!!error} onClose={discardError}>
      {error && (
        <>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>{error}</DialogContent>
          <DialogActions>
            <ButtonGroup>
              <Button onClick={discardError}>Close</Button>
            </ButtonGroup>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
