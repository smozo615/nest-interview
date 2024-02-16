import { URL_API_BASE } from '@ocmi/frontend/constants/url-apis.constants';
import { loadAbort } from '@ocmi/frontend/utilities';
import { LoginFormState, LoginResponse } from '../models/login.type';
import axios from 'axios';

export const loginUrl = `${URL_API_BASE}/auth/login`;

export const doLogin = (data: LoginFormState) => {
  const controller = loadAbort();
  return {
    call: axios.post<LoginResponse>(
      loginUrl,
      {
        email: data.email,
        password: data.password,
      },
      {
        signal: controller.signal,
      },
    ),
    controller,
  };
};
