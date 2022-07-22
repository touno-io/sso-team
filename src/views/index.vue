
<script lang='ts' setup>
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import mermaid from 'markdown-it-mermaid-plugin'
const markDownIt = new MarkdownIt({ html: true })
  .use(emoji).use(mermaid)

const postHtml = markDownIt.render(`
# Testing embeded YouTube with Markdown

This would be a first paragraph with some video introduction. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Can look cool if it works

Nunc sed id semper risus in hendrerit gravida rutrum quisque. Euismod nisi porta lorem mollis aliquam. Sit amet massa vitae tortor condimentum lacinia quis vel eros. Mauris sit amet massa vitae tortor condimentum lacinia quis vel. Quisque sagittis purus sit amet volutpat consequat mauris nunc.

Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Feugiat in fermentum posuere urna nec. Sed cras ornare arcu dui. Eleifend mi in nulla posuere sollicitudin aliquam. Sed adipiscing diam donec adipiscing.
`)
// Patch page title
const title = `# Testing embeded YouTube with Markdown`
</script>

<template>
  <div class="container my-4 my-md-5">
    <span class="markdown-body" v-html="postHtml" />
  </div>
</template>