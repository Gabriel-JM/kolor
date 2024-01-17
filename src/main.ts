import "@melloware/coloris/dist/coloris.css";
import { html, shell, signal } from 'lithen-fns'
import { ColorFormat, coloris, init } from '@melloware/coloris'
import { invoke } from '@tauri-apps/api'

init()

const colorsList = signal<Array<number[]>>([])

const colorisConfig = {
  el: '#colorPicker',
  alpha: true,
  format: 'rgb' as ColorFormat,
  inline: true,

  onChange(color: string) {
    console.log('chegou aqui')
    const [r, g, b] = color
      .replace(/[^\d,]+/g, '')
      .split(',')
      .map(Number)

    invoke<Array<number[]>>('generate_colors', {
      r,
      g,
      b,
      a: 1
    })
      .then(colors => colorsList.set(colors))
  }
}

coloris(colorisConfig)

function content() {
  return html`
    <div class="container">
      ${shell(colorsList, value => {
        return value.map(item => {
          const isDark = item.some(n => n <= 80)
          const fontColor = isDark && 'color: #ddd'

          return html`
            <div style="padding: 20px; background-color: rgb(${item.join(', ')}); ${fontColor}">
              RGB (${item.join(', ')})
            </div>
          `
        })
      })}
    </div>
  `
}

document.body.append(content())
