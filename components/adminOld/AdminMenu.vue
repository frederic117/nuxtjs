<template>
	<div v-if="$auth.user&&$auth.user._id">
		<section v-if="connectedUser.role==='admin'" class>
			<div class="column is-6" id="ActionCard">
				<div id="cardAction" class="card profile-card">
					<div class="card-content">
						<div class="media" id="teamInfo">
							<div class="media-left">
								<h1 class="title">Menu administration.</h1>
								<ul>
									<li>
										<nuxt-link :to="'/admin/users'">
											<strong>Users management</strong> (add, modify, delete)
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/teams'">
											<strong>Teams management</strong> (add, modify, delete)
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/matchs'">
											<strong>Matchs management</strong> (modify & simulate end match)
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/players'">
											<strong>Players management</strong> (add, modify, delete)
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/news'">
											<strong>News management</strong> Activate twitter
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/forum'">
											<strong>Forum management</strong> create topic
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/fansong'">
											<strong>Fan song management</strong> create post
										</nuxt-link>
									</li>
									<li>
										<nuxt-link :to="'/admin/contest'">
											<strong>Contests management</strong> (see)
										</nuxt-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import {
	getAllTeams,
	teamUpdate,
	teamDelete,
	teamCreate,
	scoreUpdate
} from "@/server/apiAdmin";
import moment from "moment";

export default {
	mounted() {
		if (this.connectedUser.role != "admin") {
			this.$router.push(`/`);
		}
	},
	computed: {
		connectedUser() {
			if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
				return this.$store.state.auth.user;
			} else {
				return "unconnected";
			}
		}
	}
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
tr {
	margin: 25px;
	padding: 10px 30px;
}

.btn-red {
	margin: 30px;
	padding-left: 30px;
	padding-right: 30px;
	color: #fff !important;
	background-color: #eb412d !important;
	box-shadow: 0 0 0 0.125em#eb412d !important;
	border-color: #eb412d !important;
	font-weight: bolder;
	font-size: 1.2rem;
}

th {
	margin: 25px 10px 25px 60px;
	padding: 10px;
	background-color: #bdbdbd;
}

.title {
	font-size: 100%;
	font-weight: bold;
	font-style: ITALIC;
}
.insider {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
a {
	color: #192b41;
}
#no {
	text-align: CENTER;
	margin-top: 5%;
	font-weight: bold;
	color: #192b41;
}
.main {
	background-color: #eef1f7 !important;
	padding: 7rem 1.5rem;
}
.container {
	display: flex;
}

.navbar.is-dark {
	background-color: #192b41 !important;
	color: #eef1f7 !important;
}

.navbar-item.is-tab.is-active {
	background-color: transparent;
	border-bottom-color: #eef1f7 !important;
	border-bottom-style: solid !important;
	border-bottom-width: 3px !important;
	color: #eef1f7 !important;
	padding-bottom: calc(0.5rem - 3px) !important;
}
.babblesMenu {
	display: flex;
	overflow: auto;
}

.image {
	margin-right: 20px !important;
}

@media (max-width: 1047px) {
	.main {
		padding-top: 0.5rem !important;
	}
	.icon {
		height: 1.5em !important;
		width: 1.5em !important;
	}
	.control {
		height: 30px !important;
	}
	.navbar.is-dark {
		margin-bottom: 3% !important;
	}
}
</style>
