import { PageResult, PageResultProps } from '@cads-ui/core';
import React from 'react';
import { withStatic } from '~/utils/withStatic';

// -----------------------------
const NoDataFound: React.FC<PageResultProps> = (props) => {
  return (
    <PageResult
      variant="no-data"
      title="Không tìm thấy dữ liệu"
      action={<></>}
      illustration={<img src={withStatic('img/no-data.svg')} />}
      {...props}
    />
  );
};

export default NoDataFound;
