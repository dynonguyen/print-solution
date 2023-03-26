import { Button, PageResult } from '@cads-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '~/constants/path';
import { withPublic } from '~/utils/withStatic';

const NotFoundPage: React.FC = (props) => {
  return (
    <PageResult
      variant="404"
      title="Không tìm thấy trang"
      subTitle="Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã nhập sai URL? Hãy chắc chắn kiểm tra chính tả của bạn."
      action={
        <Link to={PATH.HOME}>
          <Button>Về trang chủ</Button>
        </Link>
      }
      illustration={<img src={withPublic('img/not-found.svg')} />}
    />
  );
};

export default NotFoundPage;
