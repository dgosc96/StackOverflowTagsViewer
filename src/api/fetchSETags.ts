import { SE_tag, SE_TagsFetchParams } from '../types/SE_api';

type fetchSETagsResponseType = {
  items: SE_tag[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  total: number;
};

export const fetchSETags = async ({
  page = 1,
  pagesize = 30,
  order = 'desc',
  sort = 'popular',
}: SE_TagsFetchParams): Promise<fetchSETagsResponseType> => {
  const baseURL = 'https://api.stackexchange.com';
  const params = `/2.3/tags?page=${page}&order=${order}&sort=${sort}&pagesize=${pagesize}&site=stackoverflow&filter=!4--Q8mMl8rw6M*Y(E`;
  console.log('SE_TAGS_PARAMS: ', params);

  const response = await fetch(baseURL + params);

  if (!response.ok) {
    throw new Error(
      `API problem: Error ${response.status}, ${response.statusText}`
    );
  }

  const parsedBody = await response.json();
  if (parsedBody.backoff || parsedBody.error_id) {
    throw new Error(
      `From API: Backoff ${parsedBody.backoff}, Error: ${parsedBody.error_id}, ${parsedBody.error_message}, ${parsedBody.error_name}`
    );
  }
  console.log('quota_max: ', parsedBody.quota_max);
  console.log('quota_remaining: ', parsedBody.quota_remaining);

  return parsedBody as fetchSETagsResponseType;
};
