import { URL_API_TIMESHEETS } from '@ocmi/frontend/constants/url-apis.constants';
import useFetch from '@ocmi/frontend/hooks/useFetch';

export default function useUpdateStatusTimesheets() {
  const { request, loading } = useFetch();

  const updateTimesheets = (data: { id: string; status: string }) => {
    return request({
      method: 'PUT',
      url: `${URL_API_TIMESHEETS}/${data.id}/status`,
      data: { status: data.status },
    });
  };

  return {
    updateTimesheets,
    loading,
  };
}
