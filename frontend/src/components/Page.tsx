import React from 'react';
import { Helmet } from 'react-helmet';
import { COMMON } from '~/constants/common';

// -----------------------------
interface PageProps {
  title?: string;
  showAppName?: boolean;
  HelmetAdditional?: React.ReactNode;
  children: React.ReactNode;
}

// -----------------------------
function Page({ title, showAppName = false, HelmetAdditional, children }: PageProps) {
  return (
    <React.Fragment>
      <Helmet>
        {title && <title>{title + showAppName ? `| ${COMMON.APP_NAME}` : ''}</title>}

        {HelmetAdditional}
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default Page;
