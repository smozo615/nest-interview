import axios, { AxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
import useFetchAndLoad from './useFetchAndLoad';
import { AppStore } from '../redux/store';
import { loadAbort } from '../utilities';

export default function useFetch() {
  const controller = loadAbort();
  const authState = useSelector((state: AppStore) => state.authState);
  const { callEndpoint, loading } = useFetchAndLoad();

  const request = <T>(config: AxiosRequestConfig<any>) => {
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${authState.accessToken}`;

    axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;
    return callEndpoint<T>({
      call: axios<T>({ ...config }),
      controller,
    });
  };

  return { request, loading };
}
