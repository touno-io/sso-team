const elemKeydown = ($elem: any, settings: { enterKey: any }, event: { which: number; shiftKey: any; preventDefault: () => void }) => {
  const isTab = event.which == 9
  const isRevTab = isTab && event.shiftKey
  const isEnter = event.which == 13
  const isIgnore = false // $fld.is(".enter-ignore")
  const isKeyOff = false // $fld.is(".tab-keyoff")
  if (isTab && isKeyOff) return
  if (isTab || (settings.enterKey && isEnter && !isIgnore)) {
    event.preventDefault()
    if (isRevTab) focusPrev($elem); else focusNext($elem)
  }
}

const focusPrev = (pool: any) => {
  if (pool.length < 1) return
  let a = document.activeElement
  if (!a || pool.indexOf(a) == -1) {
    pool[0].focus()
    return
  }
  let i = pool.indexOf(a)
  pool[i > 0 ? (i - 1) : (pool.length - 1)].focus()
}
const focusNext = (pool: any) => {
  let a = document.activeElement
  if (!a || pool.indexOf(a) == -1) {
    pool[0].focus()
    return
  }

  let i = pool.indexOf(a)
  pool[i < pool.length - 1 ? i + 1 : 0].focus()
}

const elementFind = (el: { getElementsByTagName: (arg0: any) => any; $elem: any[] }, tagname: string) => {
  for (const e of el.getElementsByTagName(tagname)) {
    if (e.hasAttribute('tabindex')) el.$elem.push(e)
  }
}


export default {
  install(app) {
    app.directive('focus', {
      mounted: (el) => el.focus()
    })

    app.directive('tabindex', {
      mounted (el, binding) {
        el.$elem = []
        const settings = { enterKey: !!binding.modifiers.enter } // v-if="!activate || !enabled" 
        elementFind(el, 'input')
        elementFind(el, 'button')
        el.$elem.sort((a: { tabIndex: number }, b: { tabIndex: number }) => { return a.tabIndex > b.tabIndex ? 1 : -1 })
    
        for (const element of el.$elem) {
          element.addEventListener('keydown', (e: any) => elemKeydown.bind(this, el.$elem, settings, e).apply())
        }
      },
      unmounted (el) {
        for (const element of el.$elem) {
          element.removeEventListener('keydown', (e: any) => elemKeydown.bind(this, el.$elem, {}, e).apply())
        }
      },
    })
  }
}
