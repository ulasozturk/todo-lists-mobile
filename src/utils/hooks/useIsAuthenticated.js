import { useSelector } from 'react-redux';
import { getRefreshToken } from '../../redux/reducers/authentication';

export function useIsAuthenticated() {
  const refreshToken = useSelector(getRefreshToken);
  return !!refreshToken;
}
