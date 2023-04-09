// Reference: https://www.npmjs.com/package/cz-customizable

const TYPES = {
  feat: '✨ feat',
  fix: '🐞 fix',
  debug: '🔴 debug',
  hotfix: '🔥 hotfix',
  style: '🌈 style',
  wip: '🚧 wip',
  docs: '📝 docs',
  build: '🔨 build',
  test: '🧪 test',
  setup: '⚙️ setup',
  deploy: '🚀 deploy',
  docker: '🐳 docker',
  perf: '⚡️ perf',
  init: '🎉 init'
};

const DIVIDER = '';

module.exports = {
  types: [
    { value: TYPES.feat, name: `${TYPES.feat}: Add a new feature` },
    { value: TYPES.fix, name: `${TYPES.fix}: Fix a bug` },
    { value: TYPES.debug, name: `${TYPES.debug}: Debugging` },
    { value: TYPES.hotfix, name: `${TYPES.hotfix}: Hotfix a bug` },
    { value: TYPES.style, name: `${TYPES.style}: Custom CSS, UI Style` },
    { value: TYPES.wip, name: `${TYPES.wip}: Work in progress` },
    { value: TYPES.setup, name: `${TYPES.setup}: Add project configuration` },
    { value: TYPES.docs, name: `${TYPES.docs}: Add or update documentation, README.md` },
    { value: TYPES.build, name: `${TYPES.build}: Add or update regards to build process` },
    { value: TYPES.test, name: `${TYPES.test}: Add tests` },
    { value: TYPES.deploy, name: `${TYPES.deploy}: Deploying stuff` },
    { value: TYPES.docker, name: `${TYPES.docker}: Docker, container configuration` },
    { value: TYPES.perf, name: `${TYPES.perf}: A code change that improves performance` },
    { value: TYPES.init, name: `${TYPES.init}: Initial commit` }
  ],
  scopes: [
    { name: 'frontend' },
    { name: 'account-service' },
    { name: 'docs-service' },
    { name: 'payment-service' },
    { name: 'order-service' },
    { name: 'shipping-service' },
    { name: 'catalog-service' },
    { name: 'chat-service' },
    { name: 'notification-service' }
  ],
  messages: {
    type: `${DIVIDER} Select the type of change that you're committing ${DIVIDER}`,
    scope: `\n${DIVIDER} Denote the SCOPE of this change (optional) ${DIVIDER}`,
    customScope: `${DIVIDER} Denote the SCOPE of this change ${DIVIDER}`,
    subject: `${DIVIDER} Write a SHORT, IMPERATIVE tense description of the change ${DIVIDER}\n`,
    body: `${DIVIDER} Provide a LONGER description of the change (optional). Use "|" to break new line ${DIVIDER}\n`,
    breaking: `${DIVIDER} List any BREAKING CHANGES (optional) ${DIVIDER}\n`,
    confirmCommit: `${DIVIDER} Are you sure you want to proceed with the commit above? ${DIVIDER}`
  },
  allowBreakingChanges: [TYPES.fix, TYPES.hotfix],
  allowCustomScopes: true,
  skipEmptyScopes: true,
  scopeOverrides: {},
  subjectLimit: 100,
  typePrefix: '',
  typeSuffix: '',
  skipQuestions: ['footer']
};
