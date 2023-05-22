import { Select } from '@cads-ui/core';
import { SelectOption } from '@cads-ui/core/components/select/SelectProps';
import React from 'react';
import { useCategoryForSelectQuery } from '~/graphql/catalog/generated/graphql';
import { withCatalogApolloProvider } from '~/libs/apollo/catalog';

// -----------------------------
const CategorySelect = withCatalogApolloProvider<React.ComponentProps<typeof Select>>((props) => {
  const { data, loading } = useCategoryForSelectQuery({ variables: { page: 1, pageSize: 1000, sort: 'name' } });

  const options: SelectOption[] =
    loading || !data?.catagories.docs.length
      ? []
      : data?.catagories.docs.map((cat) => ({ label: cat.name, value: cat._id }));

  return <Select options={options} fullWidth {...props} />;
});

export default CategorySelect;
