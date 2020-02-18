import { createSelector } from 'reselect';

const getUI = state => {
  return state.ui;
};

export const getDrawer = createSelector([getUI], ui => ui.drawer);

export const getIsDrawerOpen = createSelector(
  [getDrawer],
  drawer => drawer.open,
);
