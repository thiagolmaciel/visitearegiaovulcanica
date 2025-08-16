const fs = require('fs');
const path = require('path');

// Pastas que queremos ignorar
const ignoreFolders = ['api', '.next', 'lib', 'node_modules', '.git', '.env.local'];

function printTree(dir, prefix = '') {
  const items = fs.readdirSync(dir);

  items.forEach((item, index) => {
    // Ignora pastas da lista
    if (ignoreFolders.includes(item)) return;

    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const pointer = isLast ? '└─ ' : '├─ ';

    console.log(prefix + pointer + item);

    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? '   ' : '│  ');
      printTree(fullPath, newPrefix);
    }
  });
}

// Troque './' pela pasta que você quiser exibir
printTree('./');
