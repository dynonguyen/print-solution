import React from 'react';
import { Helmet } from 'react-helmet';
import { COMMONS } from '~/constants/common';
import { withStatic } from '~/utils/withStatic';

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
        {title && <title>{title + (showAppName ? ` | ${COMMONS.APP_NAME}` : '')}</title>}
        <link rel="icon" type="image/png" href={withStatic('img/favicon.png')} />
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default Page;
