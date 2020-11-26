import { createAction } from '@reduxjs/toolkit';

// WHY NOT SLICE???
// Because slices should include reducers!

export const apiCallBegan = createAction('api/apiCallBegan');
export const apiCallSuccess = createAction('api/apiCallSuccess');
export const apiCallFailed = createAction('api/apiCallFailed');
