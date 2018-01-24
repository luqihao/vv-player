import player from './vv-player.vue'

const vPlayer = {}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(player)
}

export default vPlayer.install = (Vue, options) => {
  Vue.component('player', player)
}
