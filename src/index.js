const config = require('config')
const Koop = require('koop')
const routes = require('./routes')
const plugins = require('./plugins')
const FeatureServer = require('koop-output-geoservices')

// initiate a koop app
const koop = new Koop()

// register koop plugins
plugins.forEach((plugin) => {
  koop.register(plugin.instance, plugin.options)
})
koop.register(FeatureServer)

// add additional routes
routes.forEach((route) => koop.server[route.method.toLowerCase()](route.path, route.controller))

// start the server
koop.server.listen(config.port, () => koop.log.info(`Koop server listening at ${config.port}`))
