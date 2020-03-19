import { getAds } from '../model/ads.mjs'

export default {
  method: 'GET',
  path: '/ads',
  options: {},
  handler: (request, h) => {
    return await getAds()
  }
}
