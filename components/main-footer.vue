

<template>
  <div class="main-footer">
    <div class="links">
      <ul class="container d-flex flex-direction-row align-items-center justify-content-center h-100 mb-0">
        <li><a target="_blank" href="http://legal.touno.io/terms-use">Terms &amp; Policies</a></li>
        <li><a target="_blank" href="http://legal.touno.io/privacy">Legal Information</a></li>
        <li><a target="_blank" href="http://legal.touno.io/cookies">Cookie Policies</a></li>
      </ul>
    </div>
    <div class="licensed">
      <div class="container d-flex h-100 justify-content-end align-items-center">
        <b>TEAM TOUNO.io</b> by <a href="https://mr.touno.io/" target="_blank">Kananek T.</a> The source code is licensed MIT.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main-footer {
  > .links {
    > ul {
      list-style-type: none;
      column-gap: 3.5em;
      font-size: .8rem;
    }
  }
  > .licensed {
    border-top: 1px solid var(--border-navbar);
    > .container {
      column-gap: .2em;
    }
  }
}
</style>
