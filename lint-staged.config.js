module.exports = {
  // Type check TypeScript files
  // Lint then format TypeScript and JavaScript files
  '**/*.ts': (filenames) => [
    `pnpm exec eslint --fix ${filenames.join(' ')}`,
    `pnpm exec prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `pnpm exec prettier --write ${filenames.join(' ')}`,
};
