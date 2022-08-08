import Vue from 'vue'

function elemKeydown($elem, settings, event) {
  const isTab = event.which === 9
  const isRevTab = isTab && event.shiftKey
  const isEnter = event.which === 13
  const isIgnore = false // $fld.is(".enter-ignore")
  const isKeyOff = false // $fld.is(".tab-keyoff")
  if (isTab && isKeyOff)
    return
  if (isTab || (settings.enterKey && isEnter && !isIgnore)) {
    event.preventDefault()
    if (isRevTab)
      focusPrev($elem)
    else
      focusNext($elem)
  }
}

function focusPrev(pool) {
  if (pool.length < 1)
    return
  const a = document.activeElement
  if (!a || !pool.includes(a)) {
    pool[0].focus()
    return
  }
  const i = pool.indexOf(a)
  pool[i > 0 ? i - 1 : pool.length - 1].focus()
}

function focusNext(pool) {
  const a = document.activeElement

  if (!a || !pool.includes(a)) {
    pool[0].focus()
    return
  }

  const i = pool.indexOf(a)
  pool[i < pool.length - 1 ? i + 1 : 0].focus()
}

function elementFind(el, tagname) {
  for (const e of el.getElementsByTagName(tagname)) {
    if (e.hasAttribute('tabindex'))
      el.$elem.push(e)
  }
}

Vue.directive('focus', {
  bind: (el) => el.focus()
})

Vue.directive('tabindex', {
  bind(el, binding) {
    el.$elem = []
    const settings = { enterKey: !!binding.modifiers.enter } // v-if="!activate || !enabled"
    elementFind(el, 'input')
    elementFind(el, 'button')
    el.$elem.sort((a, b) => a.tabIndex > b.tabIndex ? 1 : -1)

    for (const element of el.$elem) {
      element.addEventListener('keydown', (e) =>
        elemKeydown.bind(this, el.$elem, settings, e).apply()
      )
    }
  },
  unbind(el) {
    for (const element of el.$elem) {
      element.removeEventListener('keydown', (e) =>
        elemKeydown.bind(this, el.$elem, {}, e).apply()
      )
    }
  },
})
