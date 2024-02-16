import { URL_API_TIMESHEETS } from '@ocmi/frontend/constants/url-apis.constants';
import useFetch from '@ocmi/frontend/hooks/useFetch';
import { Root } from '../models/Timesheets.type';

export default function useGetTimesheets() {
  const { request, loading } = useFetch();

  const getTimesheets = () => {
    return request<Root>({ url: URL_API_TIMESHEETS });
  };

  return {
    getTimesheets,
    loading,
  };
}
