import React from 'react';
import { Helmet } from 'react-helmet';
import { COMMON } from '~/constants/common';
import { withPublic } from '~/utils/withStatic';

// -----------------------------
interface PageProps {
  title?: string;
  showAppName?: boolean;
  children: React.ReactNode;
}

// -----------------------------
function Page({ title, showAppName = true, children }: PageProps) {
  return (
    <React.Fragment>
      <Helmet>
        {title && <title>{title + (showAppName ? ` | ${COMMON.APP_NAME}` : '')}</title>}
        <link rel="icon" type="image/png" href={withPublic('favicon.png')} />
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default Page;
