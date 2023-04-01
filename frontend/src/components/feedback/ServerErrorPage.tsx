import { PageResult } from '@cads-ui/core';
import { withStatic } from '~/utils/withStatic';

function ServerErrorPage() {
  return <PageResult variant="500" illustration={<img src={withStatic('img/internal-error.svg')} />} />;
}

export default ServerErrorPage;
