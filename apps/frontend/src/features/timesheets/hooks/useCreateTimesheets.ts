import useFetch from '@ocmi/frontend/hooks/useFetch';
import { ITimesheets } from '../models/Timesheets.type';
import { URL_API_TIMESHEETS } from '@ocmi/frontend/constants/url-apis.constants';

export default function useCreateTimesheets() {
  const { request, loading } = useFetch();

  const createTimesheets = (data: Partial<ITimesheets>) => {
    return request({ method: 'POST', url: URL_API_TIMESHEETS, data });
  };

  return {
    createTimesheets,
    loading,
  };
}
