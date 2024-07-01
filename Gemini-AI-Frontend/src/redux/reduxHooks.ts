import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ReduxAppDispatch, ReduxRootState} from './ReduxStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ReduxAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;
