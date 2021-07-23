module.exports = {
  redirect_uris: [
    'https://localhost:3000/oadaauth/redirect.html',
    'https://aultac.github.io/points_on_a_map/oadaauth/redirect.html'
  ],
  token_endpoint_auth_method:
    'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  grant_types: ['authorization_code'],
  response_types: [
    'token',
    'code',
    'id_token',
    'id_token token',
    'code id_token',
    'code token',
    'code id_token token'
  ],
  client_name: 'Points On a Map',
  client_uri: 'https://github.com/aultac/points_on_a_map',
  contacts: ['Aaron Ault <aultac@purdue.edu>'],
  jwks: {
    keys: [
{"kty":"RSA","kid":"42ff49bbe167474480a1bc0e9ceea582","e":"AQAB","n":"tZR0a8eEO4Y7B5O91BPRszyoeTLRWXg47Nit6YRMRIBHkqBeWG9HyXI_zhWgYFSSVKepVYx4IT8EYOgflpCrE83cSqEYuBUMX76Caffnk12o_mhzPNu989AhZ9j_sk1qCmoMoXGsAsfd5qdnpwywNKntMoUOBnu6ufMetVwbK4Gc1lRNcUlm85JIcCFnbvPh3OSaI2tUwHcesaylutMSyU8a6bWRK6p9IhdykQxzZLfxQcNhF8YqwWBgWMB2OaeoUl3dNXnzCD16o2_bKO_8ZOH7EnntQUHKHRwFNC_1gnBbFFdjzD2rGhnf7THearVuP-XGAYrvbmZ3IYhcLL8isQ"}
    ]
  }
}
