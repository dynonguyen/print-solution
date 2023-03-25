import { PageResult } from '@cads-ui/core';
import { withPublic } from '~/utils/withStatic';

function ServerErrorPage() {
  return <PageResult variant="500" illustration={<img src={withPublic('img/internal-error.svg')} />} />;
}

export default ServerErrorPage;
