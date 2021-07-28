import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64'

const $ = selector => document.querySelector(selector)

Split({
  columnGutters: [{
    track: 1,
    element: $('.vertical-gutter')
  }],
  rowGutters: [{
    track: 1,
    element: $('.horizontal-gutter')
  }]
})

console.log('main')

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

$html.addEventListener('input', update)
$js.addEventListener('input', update)
$css.addEventListener('input', update)

function init () {
  const { pathname } = window.location
  // rawHtml, rawCss, rawJs is coding base64
  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

  const html = decode(rawHtml)
  const css = decode(rawCss)
  const js = decode(rawJs)

  $html.value = html
  $css.value = css
  $js.value = js

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

function update () {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

const createHtml = ({ html, css, js }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>
        ${js}
      </script>
  </html>
  `
}

init()
