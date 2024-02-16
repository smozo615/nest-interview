import useFetch from '@ocmi/frontend/hooks/useFetch';
import { ITimesheets } from '../models/Timesheets.type';
import { URL_API_TIMESHEETS } from '@ocmi/frontend/constants/url-apis.constants';

export default function useUpdateTimesheets() {
  const { request, loading } = useFetch();

  const updateTimesheets = (data: ITimesheets) => {
    return request({
      method: 'PUT',
      url: URL_API_TIMESHEETS + '/' + data.id,
      data,
    });
  };

  return {
    updateTimesheets,
    loading,
  };
}
