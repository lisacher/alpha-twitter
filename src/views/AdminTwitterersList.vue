<template>
  <div class="container main-container">
    <div class="row main-row">
      <SideNavBar class="col-3" :isAdmin="true"/>
      <div class="col-9 p-0 border main-component">
        <TopNavBar msg="使用者列表" :show="false" />
        <div class="container twitterers-container overflow-scroll">
          <div class="row row-cols-4 gx-3 my-2">
           <AdminTwitterersCard 
           v-for="user in users"
           :key="user.id"
           :user="user"
           />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import TopNavBar from './../components/TopNavBar.vue'
import AdminTwitterersCard from './../components/AdminTwitterersCard.vue'

const dummyUser = [
  {
		id: 1,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 17,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 2,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 10,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 3,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 8,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 4,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 26,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},{
		id: 5,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 128,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 6,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 73,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 7,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 160,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 8,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 88,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 9,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 12,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},{
		id: 10,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 12,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 11,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 12,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 12,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 12,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
  {
		id: 13,
		name: 'Teddy',
		account: 'teddy0323',
		avatar: '',
		cover: '',
		tweetsCount: 12,
		beLikedCount: 23,
		followersCount: 33,
		followingsCount: 44
	},
]


export default {
  name: 'AdminTwitterersList',
  components: {
    SideNavBar,
    TopNavBar,
    AdminTwitterersCard
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.users = [
        ...this.users,
        ...dummyUser
      ]

			this.users.sort((a, b) => {
				return b.tweetsCount - a.tweetsCount
			})
    }
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  position: relative;
}

.main-component {
  height: 100%;
}

.twitterers-container {
  height: calc(100% - 55px);
}

.main-row {
  height: 100%;
}



</style>