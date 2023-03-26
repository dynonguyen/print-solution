import 'dotenv/config';

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.GATEWAY_PATH}/api/catalog`,
  documents: './**/*.graphql',
  generates: {
    'src/graphql/catalog/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
};

export default config;
