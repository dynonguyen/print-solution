import { useSearchParams } from 'react-router-dom';
import { DEFAULTS } from '~/constants/default';
import { toNumber } from '~/utils/helper';

// -----------------------------
interface UseQueryPaginationProps {
  defaultValues?: {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    searchBy?: string;
  };
}

export type SetQueryParams = Array<{ key: string; value: string | number }>;

// -----------------------------
const useQueryPagination = ({ defaultValues }: UseQueryPaginationProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = toNumber(searchParams.get('page'), defaultValues?.page || 1, {
    allowNegative: false,
    allowNull: false,
    allowZero: false
  });
  const pageSize = toNumber(searchParams.get('pageSize'), defaultValues?.pageSize || DEFAULTS.PAGE_SIZE, {
    allowNegative: false,
    allowNull: false,
    allowZero: false
  });
  const sort = searchParams.get('sort') || defaultValues?.sort;
  const search = searchParams.get('search') || defaultValues?.search;
  const searchBy = searchParams.get('searchBy') || defaultValues?.searchBy;

  const setParams = (params: SetQueryParams) => {
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

  return { page, pageSize, sort, search, searchBy, setParams, deleteParams };
};

export default useQueryPagination;
