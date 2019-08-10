import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {localRead} from '@/utils/modules/tools'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'

import zhCnLocale from 'element-ui/lib/locale/lang/zh-CN'
import enUsLocale from 'element-ui/lib/locale/lang/en'
import zhTwLocale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = localLang || localRead('lang') || 'zh-CN'

console.log(customZhCn)
debugger;
// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  /*'zh-CN': Object.assign(zhCnLocale, customZhCn),
  'zh-TW': Object.assign(zhTwLocale, customZhTw),
  'en-US': Object.assign(enUsLocale, customEnUs)*/
    'zh-CN': Object.assign({}, customZhCn),
    'zh-TW': Object.assign({}, customZhTw),
    'en-US': Object.assign({}, customEnUs)
}

const i18n = new VueI18n({
  locale: lang,
  messages
})


export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
