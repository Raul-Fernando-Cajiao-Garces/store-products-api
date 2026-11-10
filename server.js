// Entry point for compatibility with external test runners and standard node commands
let app;
try {
  const imported = require('./dist/app');
  app = imported.default || imported.app;
} catch {
  // Fallback for execution before building dist
  const { execSync } = require('child_process');
  execSync('npm run build', { stdio: 'inherit' });
  const imported = require('./dist/app');
  app = imported.default || imported.app;
}

module.exports = app;
