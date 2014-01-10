module.exports = function (environments, env) {
  return environments[env] || environments.development
}