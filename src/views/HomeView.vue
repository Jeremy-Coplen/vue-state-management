<script>
  import { mapState, mapActions } from "pinia"
  import axios from "axios"
  import { useUserStore } from "../stores/user"

  export default {
    methods: {
      ...mapActions(useUserStore, ['setUser']),

      reset() {
        const userStore = useUserStore()

        userStore.$reset()
      }
    },
    computed: {
      ...mapState(useUserStore, ["user"])
    },
    async created() {
      let user = await axios.get("/api/get/user")

      this.setUser(user.data)
    }
  }
</script>

<template>
  <div class="home">
    <h1>Current User</h1>
    <div class="user-container">
      <h2>{{ this.user.name }}</h2>
      <h2>{{ this.user.age }}</h2>
      <h2>{{ this.user.job }}</h2>
      <h2>{{ this.user.salary }}</h2>
    </div>
  </div>
</template>

<style>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .home h1 {
    margin-bottom: 10px;
  }
</style>