import { SHOW_DIALOG, HIDE_DIALOG } from './constants';

export const showDialog = (dialogType, dialogProps) => {
  return {
    type: SHOW_DIALOG,
    payload: {
      dialogType,
      dialogProps,
    },
  };
};

export const hideDialog = () => {
  return {
    type: HIDE_DIALOG,
  };
};
