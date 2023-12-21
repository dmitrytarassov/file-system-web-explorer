"use client";
import { Context, useContext } from "react";

export const useContextBase = <T>(_context: Context<T>, name: string) => {
  const context = useContext(_context);

  if (!context) {
    throw new Error(`Can not find context ${name}`);
  }

  return context;
};
