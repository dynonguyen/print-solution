import 'dotenv/config';

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.GATEWAY_PATH}/api/notification`,
  documents: './**/*.graphql',
  generates: {
    'src/graphql/notification/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
};

export default config;
