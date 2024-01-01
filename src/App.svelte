<script lang="ts">
  import type { IScrollEvent } from "monaco-editor";
  import { writable } from "svelte/store";

  // import Frontmatter from "@/lib/frontmatter";
  import Editor from "@/components/Editor.svelte";
  import Markdown from "@/components/Markdown.svelte";

  let previewNode: HTMLElement

  const content = writable<string>("# Lorem ipsum \n\ndolor sit amet consectetur adipisicing elit. Vero id magni exercitationem harum. Possimus ut, vel hic tempora illo officia voluptates unde, reiciendis neque vitae eum molestias quam exercitationem voluptatem.\n ")
  // const frontmatter = writable<object>({})

  function syncScroll(ev: CustomEvent<IScrollEvent>, node: HTMLElement) {
    node.scrollTo(
      node.scrollLeft, 
      (node.scrollHeight / 100) * (ev.detail.scrollTop / (ev.detail.scrollHeight / 100))
    )
  }
</script>

<header class="h-9 bg-gray-100 flex gap-2 px-1.5">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M7 15V9l2 2l2-2v6"></path><path d="M14 13l2 2l2-2m-2 2V9"></path></g></svg>
</header>

<main
  class="max-h-[calc(100dvh-42px)] relative overflow-hidden flex gap-2 mt-1.5"
>
  <section
    class="resize-x !overflow-hidden border-r w-[50vw]"
    style="border-color: #dcdcdb; flex: 1 1 auto;"
  >
    <Editor
      content={$content}
      on:change={(ev) => content.set(ev.detail)}
      on:scroll={(ev) => syncScroll(ev, previewNode)}
    />
  </section>

  <section
    class="prose overflow-y-scroll overflow-x-hidden px-1 pb-[100vh] max-h-[calc(100dvh-42px)] border-r w-[50vw]"
    style="flex: 1 1 auto;"
    bind:this={previewNode}
  >
    <Markdown content={$content} />
  </section>
</main>