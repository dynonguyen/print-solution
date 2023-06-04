import React from 'react';
import QuotationDetail from './pages/Detail';

// -----------------------------
interface QuotationPageProps {}

// -----------------------------
const QuotationPage: React.FC<QuotationPageProps> = (props) => {
  return (
    <React.Fragment>
      <QuotationDetail />
    </React.Fragment>
  );
};

export default QuotationPage;
