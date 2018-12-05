import WidgetUser from './WidgetUser.vue'
import WidgetUserList from './WidgetUserList.vue'
import VcARole from './VcARole.vue'
import VueI18n from 'vue-i18n'
import en from './lang/en.json'
import de from './lang/de.json'

function getLang(Vue, options) {

  function exists(options) {
    return (typeof options !== "undefined") && options.hasOwnProperty("i18n") && (typeof options.i18n !== "undefined") && options.i18n !== null
  }

  if(!exists(options)) {
    Vue.use(VueI18n)

    const i18n = new VueI18n({
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      messages: {'en-US': en, 'de-DE': de}
    })

    Vue.prototype.$vcaI18n = i18n
  } else {
    options.i18n.mergeLocaleMessage('de-DE', de)
    options.i18n.mergeLocaleMessage('en-US', en)
    Vue.prototype.$vcaI18n = options.i18n
  }
  return Vue
}

VcARole.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.component('vca-role', VcARole)
}

WidgetUser.install = function (Vue, options) {
  Vue = getLang(Vue, options)

  if (options != null && typeof options === 'object' && options.hasOwnProperty('uuid')) {
    Vue.prototype.$widgetUserDefaultUUID = options.uuid
  } else {
    Vue.prototype.$widgetUserDefaultUUID = null
  }
  if (options != null && typeof options === 'object' && options.hasOwnProperty('type')) {
    Vue.prototype.$widgetUserDefaultType = options.type
  } else {
    Vue.prototype.$widgetUserDefaultType = null
  }
  Vue.component('widget-user', WidgetUser)
}

WidgetUserList.install = function (Vue, options) {
  Vue = getLang(Vue, options)
  Vue.use(VcARole, options)
  Vue.use(WidgetUser, options)
  Vue.component('widget-user-list', WidgetUserList)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VcARole)
  window.Vue.use(WidgetUser)
  window.Vue.use(WidgetUserList)
}

export default WidgetUserList
const version = '__VERSION__'
// Export all components too
export {
  VcARole,
  WidgetUser,
  WidgetUserList,
  version
}
