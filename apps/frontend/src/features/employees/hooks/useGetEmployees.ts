import { URL_API_EMPLOYEES } from '@ocmi/frontend/constants/url-apis.constants';
import { IEmployees } from '../models/Groups.type';
import useFetch from '@ocmi/frontend/hooks/useFetch';

export default function useGetEmployees() {
  const { request, loading } = useFetch();

  const getEmployees = () => {
    return request<{ employees: IEmployees[] }>({ url: URL_API_EMPLOYEES });
  };

  return {
    getEmployees,
    loading,
  };
}
