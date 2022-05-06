<script>
  import { mapActions } from "pinia"
  import axios from "axios"
  import { useUserStore } from "../stores/user"

  export default {
      data() {
          return {
            name: "",
            age: 0,
            job: "",
            salary: 0
          }
      },

      async created() {
        let user = await axios.get("/api/get/user")

        this.setUser(user.data)

        const userStore = useUserStore()
        
        this.name = userStore.user.name
        this.age = userStore.user.age
        this.job = userStore.user.job
        this.salary = userStore.user.salary
      },

      methods: {
        ...mapActions(useUserStore, ["setUser"]),

        async updateUser() {
            let updateMsg = await axios.put("/api/update/user", { updatedUser: { name: this.name, age: this.age, job: this.job, salary: this.salary } })

            let user = await axios.get("/api/get/user")

            this.setUser(user.data)

            alert(updateMsg.data)

            this.$router.push("/")
        }
      }
  }
</script>

<template>
    <div class="change-user">
        <h1>Update User Info</h1>
        <div class="user-form">
            <div class="input-container">
                <h2>Name:</h2>
                <input type="text" v-model="name">
            </div>
            <div class="input-container">
                <h2>Age:</h2>
                <input type="number" v-model="age">
            </div>
            <div class="input-container">
                <h2>Job:</h2>
                <input type="text" v-model="job">
            </div>
            <div class="input-container">
                <h2>Salary</h2>
                <input type="number" v-model="salary">
            </div>
            <button @click="updateUser">Change User</button>
        </div>
    </div>
</template>

<style>
  .change-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .change-user h1 {
    margin-bottom: 10px;
  }

  .user-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 335px;
  }

  .input-container input {
    width: 250px;
  }

  .user-form button {
    background-color: #40B280;
    width: 75px;
    text-align: center;
    padding: 10px 0 10px 0;
    border-radius: 10px;
    text-decoration: none;
    color: black;
    border: none;
    width: 100px;
    margin-top: 10px;
  }

  .user-form button:hover {
    background-color: #126440;
    cursor: pointer;
  }
</style>