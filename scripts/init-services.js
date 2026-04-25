const fs = require('fs');
const path = require('path');

const services = [
  'gateway',
  'match-service',
  'player-service',
  'ai-service',
  'user-service',
  'notification-service'
];

services.forEach(service => {
  const servicePath = path.join(__dirname, '..', 'services', service);
  const packageJson = {
    name: `@apex/${service}`,
    version: '1.0.0',
    main: 'src/index.js',
    private: true,
    scripts: {
      "dev": "nodemon src/index.js",
      "start": "node src/index.js"
    }
  };

  fs.writeFileSync(
    path.join(servicePath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  const srcPath = path.join(servicePath, 'src');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath);
  }

  fs.writeFileSync(
    path.join(srcPath, 'index.js'),
    `console.log('${service} starting...');`
  );
});

console.log('All services initialized.');
