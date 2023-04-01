import { useSearchParams } from 'react-router-dom';
import { DEFAULTS } from '~/constants/default';
import { toNumber } from '~/utils/helper';

// -----------------------------
const useQueryPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = toNumber(searchParams.get('page'), 1, { allowNegative: false, allowNull: false, allowZero: false });
  const pageSize = toNumber(searchParams.get('pageSize'), DEFAULTS.PAGE_SIZE, {
    allowNegative: false,
    allowNull: false,
    allowZero: false
  });
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');

  const setParams = (params: Array<{ key: string; value: string | number }>) => {
    params.forEach(({ key, value }) => searchParams.set(key, `${value}`));
    searchParams.delete('state');
    searchParams.delete('session_state');
    searchParams.delete('code');
    setSearchParams(searchParams);
  };

  const deleteParams = (params: string[]) => {
    params.forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);
  };

  return { page, pageSize, sort, search, setParams, deleteParams };
};

export default useQueryPagination;
