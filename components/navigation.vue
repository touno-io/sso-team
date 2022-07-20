<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <b>TEAM</b> <small>TOUNO.io</small>
  </a>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
  <!-- <b-navbar class="border-bottom mb-3">
    <client-only>
      <vue-loading :active="fullscreen" :is-full-screen="true" />
    </client-only>
    <b-container>
      <b-navbar-brand to="/">
        <fa icon="calendar-check" /> <b>TEAM</b> <small>TOUNO.io</small>
      </b-navbar-brand>
      <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto ">
        <b-nav-item-dropdown class="nav-menu" size="sm" no-caret right>
          <template slot="button-content">
            <fa icon="bars" />
          </template>
          <b-dropdown-item to="/todo/new">New Todo</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item to="/todo/task">Tasks</b-dropdown-item>
          <b-dropdown-item to="/todo/project">Project</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item to="/setting" exact><fa icon="cog" /> Setting</b-dropdown-item>
          <b-dropdown-item to="/setting/profile"><fa icon="user" /> Profile</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click.prevent="onSignOut"><fa icon="sign-out-alt" /> Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar> -->
</template>
<script>
export default {
  data: () => ({
    fullscreen: false
  }),
  methods: {
    async onSignOut () {
      this.fullscreen = true;
      await this.$auth.logout()
      this.fullscreen = false;
    }
  }
}
</script>

<style lang="scss">
.navbar {
  padding: 0rem 1rem;
  font-family: 'Segoe UI';
  .navbar-brand {
    color: #ee5151 !important;
    small {
      color: #3f3f3f;
      font-weight: bold;
      font-size: .9rem;
    }
    .svg-inline--fa {
      color: #ee5151;
      margin-top: 3px;
      vertical-align: top;
      font-size:1.4rem;
    }
  }
  .item-todo > a {
    padding: 0.25rem .5rem 0.25rem 1.5rem
  }
  .dropdown-item, .nav-item {
    font-size: 0.85rem;
    cursor: pointer;
  }
}

</style>
