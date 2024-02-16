import LoginForm from "../features/login/components/LoginForm";
import { Container, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AxiosError, isAxiosError } from "axios";
import { ROUTER_LINK_TIMESHEETS } from "../constants/routes-link.constants";
import MainLayout from "../features/commons/main-layout/MainLayout";
import LoginFormHeader from "../features/login/components/LoginFormHeader";
import { LoginResponse, LoginFormState } from "../features/login/models/login.type";
import { doLogin } from "../features/login/services/login.service";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { AuthSession } from "../models";
import { setCredentials } from "../redux/slices/auth.slice";
import ToastsManager from "../utilities/toasts.manager";

export default function LoginPage() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatcher = useDispatch();
  const router = useRouter();

  const setSesion = (newSession: LoginResponse) => {
    const newCredentials: AuthSession = {
      accessToken: newSession.accessToken,
      user: {
        email: newSession.email,
        role: newSession.role,
      },
    };

    dispatcher(setCredentials(newCredentials));
    router.push(ROUTER_LINK_TIMESHEETS);
  };

  const onSubmit = async (data: LoginFormState) => {
    try {
      const response = await callEndpoint<LoginResponse>(doLogin(data));

      setSesion(response.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ message: string }>;

        if (err.response) {
          if (err.response.status === 400) {
            ToastsManager.showToast("error", err.response.data.message);
          } else {
            ToastsManager.showToast(
              "error",
              "Ocurrió un error, contacte con soporte"
            );
          }
        } else if (err.request) {
          ToastsManager.showToast(
            "error",
            "Error al conectar con el servidor."
          );
        } else {
          ToastsManager.showToast("error", err.message);
        }
      } else {
        ToastsManager.showToast("error", error?.message);
      }
    }
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <Box my={4}>
          <LoginFormHeader />
        </Box>
        <LoginForm onSubmit={onSubmit} loading={loading} />
      </Container>
    </MainLayout>
  );
}
