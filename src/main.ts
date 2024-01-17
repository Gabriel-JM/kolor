import { invoke } from "@tauri-apps/api/tauri";
import { html, ref, signal } from 'lithen-fns'

// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;

// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     greetMsgEl.textContent = await invoke("greet", {
//       name: greetInputEl.value,
//     });
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   greetInputEl = document.querySelector("#greet-input");
//   greetMsgEl = document.querySelector("#greet-msg");
//   document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
//     e.preventDefault();
//     greet();
//   });
// });

function content() {
  const greetMsg = signal('')
  const inputRef = ref<HTMLInputElement>()

  async function greet() {
    const inputValue = inputRef.el?.value

    if (inputValue) {
      const greeting = await invoke<string>('greet', {
        name: inputValue
      })

      greetMsg.set(greeting)
    }
  }

  function onSubmit(e: Event) {
    e.preventDefault()
    greet()
  }

  return html`
    <div class="container">
      <h1>Welcome to Tauri!</h1>

      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/src/assets/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img
            src="/src/assets/tauri.svg"
            class="logo tauri"
            alt="Tauri logo"
          />
        </a>
        <a href="https://www.typescriptlang.org/docs" target="_blank">
          <img
            src="/src/assets/typescript.svg"
            class="logo typescript"
            alt="typescript logo"
          />
        </a>
      </div>

      <p>Click on the Tauri logo to learn more about the framework</p>

      <form class="row" on-submit=${onSubmit}>
        <input ref=${inputRef} placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>

      <p>${greetMsg}</p>
    </div>
  `
}

document.body.append(content())
