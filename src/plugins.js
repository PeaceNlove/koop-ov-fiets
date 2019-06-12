const ovFiets = require('./ov-fiets');
const outputs = [];
const auths = [];
const caches = [];
const plugins = [{
  instance: ovFiets
}];
module.exports = [...outputs, ...auths, ...caches, ...plugins];