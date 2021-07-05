<template>
	<section>
		<b-loading :is-full-page="false" :active.sync="loading" :canCancel="false"></b-loading>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username}},</h1>
					<h2 class="subtitle">Gestion des équipes par ligues</h2>
				</div>
				<button
					v-if="activeTab==1"
					@click="createAllTeams()"
					class="button is-success"
				>Créer toutes les équipes</button>
			</div>
		</section>
		<br />
		<div class="container">
			<b-tabs v-model="activeTab" type="is-boxed" expanded>
				<b-tab-item>
					<template slot="header">
						<strong>Contest DB</strong>
					</template>
				</b-tab-item>
				<b-tab-item>
					<template slot="header">
						<strong>SportsMonk</strong>
					</template>
				</b-tab-item>
			</b-tabs>
		</div>
		<div v-if="activeTab==0">
			<section class="info-tiles">
				<div class="tile is-ancestor has-text-centered">
					<div class="pointer tile is-parent">
						<article class="tile is-child box teamNameLogo">
							<img loading="lazy" class :src="teams.image_path" :alt="teams.name" />
							<p class="title">{{ teams.name }}</p>
						</article>
					</div>
				</div>
			</section>
			<br />
			<b-table
				v-if="insidersTeams.length > 0"
				:data="insidersTeams"
				:paginated="isPaginated"
				:per-page="perPage"
				:pagination-simple="isPaginationSimple"
				:total="total"
				:hoverable="true"
				:striped="true"
				:mobile-cards="false"
				default-sort-direction="asc"
				default-sort="name"
			>
				<template slot-scope="props">
					<b-table-column centered field="id_sportmonks" label="id_sportmonks" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{props.row.id_sportmonks}}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="name" label="Nom" sortable>
						<div class="teamNameLogo">
							<img loading="lazy" class :src="props.row.teamImg" :alt="props.row.name" />
							<strong class="teamNameStrong">{{ props.row.name }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="isActive" label="isActive" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.isActive }}</strong>
						</div>
					</b-table-column>

					<b-table-column centered field="searchName" label="searchName" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.searchName }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="shortName" label="shortName" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.shortName }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="frenchName" label="frenchName" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.frenchName }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="founded" label="founded" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.founded }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="forme" label="forme" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.forme }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="uefaranking" label="uefaranking" sortable>
						<div class="teamNameLogo">
							<strong
								class="teamNameStrong"
							>{{ props.row.uefaranking? props.row.uefaranking.data.position:"" }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="fifaranking" label="fifaranking" sortable>
						<div class="teamNameLogo">
							<strong
								class="teamNameStrong"
							>{{ props.row.fifaranking? props.row.fifaranking.data.position:"" }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="anthem" label="anthem" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.anthem }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="coach.coachDetail" label="Coach" sortable>
						<div v-if="props.row.coach.coachDetail " class="teamNameLogo">
							<img
								class
								:src="props.row.coach.coachDetail.image_path"
								:alt="props.row.coach.coachDetail.common_name"
							/>
							<strong class="teamNameStrong">{{ props.row.coach.coachDetail.common_name }}</strong>
						</div>
					</b-table-column>

					<b-table-column centered field=" " label=" " sortable>
						<div>
							<button class="button" @click="goTeamDb(props.row)">Modifier l'équipe</button>
							<button class="button" @click="updateTeam(props.row)">Update l'équipe</button>
						</div>
					</b-table-column>
				</template>
				<template slot="empty">
					<div class="content has-text-grey has-text-centered">
						<p>...</p>
					</div>
				</template>
			</b-table>
		</div>
		<div v-if="activeTab==1">
			<section class="info-tiles">
				<div class="tile is-ancestor has-text-centered">
					<div class="pointer tile is-parent">
						<article class="tile is-child box teamNameLogo">
							<img loading="lazy" class :src="teams.image_path" :alt="teams.name" />
							<p class="title">{{ teams.name }}</p>
						</article>
					</div>
				</div>
			</section>
			<br />
			<b-table
				v-if="detail.length > 0"
				:data="detail"
				:paginated="isPaginated"
				:per-page="perPage"
				:pagination-simple="isPaginationSimple"
				:total="total"
				:hoverable="true"
				:striped="true"
				:mobile-cards="false"
				default-sort-direction="asc"
				default-sort="name"
			>
				<template slot-scope="props">
					<b-table-column centered field="id" label="id " sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{props.row.id}}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="name" label="Nom " sortable>
						<div class="teamNameLogo">
							<img loading="lazy" class :src="props.row.logo_path" :alt="props.row.name" />
							<strong class="teamNameStrong">{{ props.row.name }} - {{props.row.short_code}}</strong>
						</div>
					</b-table-column>

					<b-table-column centered field="  " label="  " sortable>
						<button
							v-if="!props.row.existInInsider"
							@click="GoCreateTeam(props.row)"
							class="button"
						>Créer l'équipe</button>

						<button v-else class="button" @click="goTeam(props.row)">Voir l'équipe</button>
					</b-table-column>
				</template>
				<template slot="empty">
					<div class="content has-text-grey has-text-centered">
						<p>...</p>
					</div>
				</template>
			</b-table>
		</div>

		<b-modal
			v-if="displayTeam"
			class="modifiermissionModalWrapper"
			:active.sync="modalTeam"
			has-modal-card
		>
			<div class="modal-card" style="width: auto">
				<header class="modal-card-head">
					<div class="modal-card-title">
						<span>{{displayTeam.name}}</span>
					</div>
				</header>
				<section class="modal-card-body">
					<b-field label="Nom">
						<b-input v-model="displayTeam.name"></b-input>
					</b-field>
					<b-field label="searchName">
						<b-input v-model="displayTeam.searchName"></b-input>
					</b-field>
					<b-field label="shortName">
						<b-input v-model="displayTeam.shortName"></b-input>
					</b-field>
					<b-field label="frenchName">
						<b-input v-model="displayTeam.frenchName"></b-input>
					</b-field>
					<b-field label="anthem">
						<b-input v-model="displayTeam.anthem"></b-input>
					</b-field>
					<b-field label="isActive">
						<b-select v-model="displayTeam.isActive">
							<option value="true">true</option>
							<option value="false">false</option>
						</b-select>
					</b-field>
				</section>
				<footer class="modal-card-foot">
					<div class="displayFlex">
						<button @click="closeModalTeam" class="button is-danger">X</button>
						<button @click="saveTeamChange" class="button is-success">Save</button>
					</div>
				</footer>
			</div>
		</b-modal>
	</section>
</template>

<script>
import {
	getTeamsBySeasonFromSportsMonk,
	getTeamsBySeasonFromInsiders,
	createTeamForInsiders,
	patchTeamForInsiders,
} from "@/server/admin";
export default {
	data() {
		return {
			teams: [],
			insidersTeams: [],
			detail: [],
			loading: false,
			total: 0,
			loading: false,
			defaultSortField: "",
			defaultSortOrder: "asc",
			page: 1,
			perPage: 50,
			isPaginated: true,
			isPaginationSimple: false,
			defaultSortDirection: "asc",
			modalTeam: false,
			displayTeam: "",
			activeTab: 0,
		};
	},
	mounted() {
		if (this.connectedUser.role != "admin") {
			this.$router.push(`/`);
		} else {
			this.fetchData();
		}
	},
	computed: {
		connectedUser() {
			return this.$store.state.auth.user;
		},
	},
	methods: {
		createAllTeams() {
			let teamToCreate = this.detail.filter((t) => !t.existInInsider);
			this.loading = true;
			if (teamToCreate.length == 0) {
				this.$buefy.dialog.alert("Toutes les équipes ont été crées");
			} else {
				this.$buefy.toast.open({
					message: `${teamToCreate.length} équipes à créer`,
					type: "is-success",
				});
				for (let i = 0; i < teamToCreate.length; i++) {
					if (i == teamToCreate.length - 1) {
						let team = { coach: {} };
						team.coach.coachDetail = teamToCreate[i].coach
							? teamToCreate[i].coach.data
							: {};
						team.id_sportmonks = teamToCreate[i].id;
						team.name = teamToCreate[i].name;
						team.searchName = teamToCreate[i].name;
						team.isNationalTeam = teamToCreate[i].national_team;
						team.shortName = teamToCreate[i].name
							.replace(/\s+/g, "")
							.toLowerCase();
						team.teamImg = teamToCreate[i].logo_path;
						team.squad = teamToCreate[i].squad;
						team.stats = teamToCreate[i].stats;
						team.transfers = teamToCreate[i].transfers;
						team.stadium = teamToCreate[i].venue_id;
						team.founded = teamToCreate[i].founded;

						if (teamToCreate[i].fifaranking) {
							team.fifaranking = teamToCreate[i].fifaranking;
						}
						if (teamToCreate[i].uefaranking) {
							team.uefaranking = teamToCreate[i].uefaranking;
						}
						createTeamForInsiders(team).then((resp) => {
							this.fetchData();
							this.$buefy.toast.open({
								message: "Les équipes ont éte crées",
								type: "is-success",
							});
						});
					} else {
						let team = { coach: {} };
						team.coach.coachDetail = teamToCreate[i].coach
							? teamToCreate[i].coach.data
							: {};
						team.id_sportmonks = teamToCreate[i].id;
						team.name = teamToCreate[i].name;
						team.searchName = teamToCreate[i].name;
						team.isNationalTeam = teamToCreate[i].national_team;
						team.shortName = teamToCreate[i].name
							.replace(/\s+/g, "")
							.toLowerCase();
						team.teamImg = teamToCreate[i].logo_path;
						team.squad = teamToCreate[i].squad;
						team.stats = teamToCreate[i].stats;
						team.transfers = teamToCreate[i].transfers;
						team.stadium = teamToCreate[i].venue_id;
						team.founded = teamToCreate[i].founded;

						if (teamToCreate[i].fifaranking) {
							team.fifaranking = teamToCreate[i].fifaranking;
						}
						if (teamToCreate[i].uefaranking) {
							team.uefaranking = teamToCreate[i].uefaranking;
						}
						createTeamForInsiders(team).then((resp) => {});
					}
				}
			}
		},
		closeModalTeam() {
			this.displayTeam = "";
			this.modalTeam = false;
		},
		saveTeamChange() {
			this.displayTeam.isActive =
				this.displayTeam.isActive == "true" ? true : false;
			patchTeamForInsiders(this.displayTeam._id, this.displayTeam).then(
				(resp) => {
					this.$buefy.toast.open({
						message: "L'équipe a éte modifiée",
						type: "is-success",
					});
					this.displayTeam = "";
					this.modalTeam = false;
					this.fetchData();
				}
			);
		},
		fetchData() {
			this.loading = true;
			getTeamsBySeasonFromSportsMonk(this.$route.params.id).then((teams) => {
				this.teams = teams.data;
				this.loading = false;
				let ids = teams.data.map((t) => t.id);
				getTeamsBySeasonFromInsiders(ids).then((insidersTeams) => {
					if (insidersTeams != "no team") {
						this.insidersTeams = insidersTeams;
						this.loading = false;
						this.detail = this.teams.map((el) => {
							let existInInsider;
							let obj = el;
							el.existInInsider = true
								? insidersTeams
										.map((l) => l.id_sportmonks)
										.includes(el.id.toString())
								: false;
							return obj;
						});
					} else {
						this.detail = this.teams;
					}
				});
			});
		},
		updateTeam(event) {
			let teamSportsMonkToUpdate = this.teams.filter(
				(t) => t.id == event.id_sportmonks
			)[0];
			let team = { coach: {} };
			team.coach.coachDetail = teamSportsMonkToUpdate.coach.data;
			team.teamImg = teamSportsMonkToUpdate.logo_path;
			team.squad = teamSportsMonkToUpdate.squad;
			team.stats = teamSportsMonkToUpdate.stats;
			team.transfers = teamSportsMonkToUpdate.transfers;
			team.uefaranking = teamSportsMonkToUpdate.uefaranking;
			team.stadium = teamSportsMonkToUpdate.venue_id;
			team.founded = teamSportsMonkToUpdate.founded;
			if (teamSportsMonkToUpdate.fifaranking) {
				team.fifaranking = teamSportsMonkToUpdate.fifaranking;
			}
			if (teamSportsMonkToUpdate.uefaranking) {
				team.uefaranking = teamSportsMonkToUpdate.uefaranking;
			}
			patchTeamForInsiders(event._id, team).then((resp) => {
				this.$buefy.toast.open({
					message: "L'équipe a éte updatée",
					type: "is-success",
				});
				this.fetchData();
			});
		},
		GoCreateTeam(event) {
			let team = { coach: {} };
			team.coach.coachDetail = event.coach ? event.coach.data : {};
			team.id_sportmonks = event.id;
			team.name = event.name;
			team.searchName = event.name;
			team.isNationalTeam = event.national_team;
			team.shortName = event.name.replace(/\s+/g, "").toLowerCase();
			team.teamImg = event.logo_path;
			team.squad = event.squad;
			team.stats = event.stats;
			team.transfers = event.transfers;
			team.stadium = event.venue_id;
			team.founded = event.founded;

			if (event.fifaranking) {
				team.fifaranking = event.fifaranking;
			}
			if (event.uefaranking) {
				team.uefaranking = event.uefaranking;
			}
			createTeamForInsiders(team).then((resp) => {
				this.$buefy.toast.open({
					message: "L'équipe a éte créée",
					type: "is-success",
				});
				let ids = this.teams.map((t) => t.id);
				getTeamsBySeasonFromInsiders(ids).then((insidersTeams) => {
					if (insidersTeams != "no team") {
						this.insidersTeams = insidersTeams;
						this.loading = false;
						this.detail = this.teams.map((el) => {
							let existInInsider;
							let obj = el;
							el.existInInsider = true
								? insidersTeams
										.map((l) => l.id_sportmonks)
										.includes(el.id.toString())
								: false;
							return obj;
						});
					} else {
						this.detail = this.teams;
					}
				});
			});
		},
		goTeam(event) {
			getTeamsBySeasonFromInsiders([event.id]).then((resp) => {
				this.displayTeam = resp[0];
				this.modalTeam = true;
			});
		},
		goTeamDb(event) {
			this.displayTeam = event;
			this.modalTeam = true;
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 100%;
}
.is-success {
	border: 1px solid #23d160 !important;
}

.teamNameStrong {
	font-size: 1.2rem;
}

.hero {
	align-items: stretch;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 15px;
	background: linear-gradient(90deg, #192b41, #296084);
	margin-top: -1rem;
}

.hero.welcome .title,
.hero.welcome .subtitle {
	color: hsl(192, 17%, 99%);
}

.helloText {
	text-align: left !important;
}

.hero.is-small .hero-body {
	padding-bottom: 1.5rem;
	padding-top: 1.5rem;
}

.hero-body {
	flex-grow: 1;
	flex-shrink: 0;
	padding: 3rem 1rem;
}

.tile.is-ancestor:last-child {
	margin-bottom: -0.75rem;
}

.tile.is-ancestor {
	margin-left: -0.75rem;
	margin-right: -0.75rem;
	margin-top: -0.75rem;
}

.tile {
	align-items: stretch;
	display: block;
	flex-basis: 0;
	flex-grow: 1;
	flex-shrink: 1;
	min-height: -webkit-min-content;
	min-height: -moz-min-content;
	min-height: min-content;
}

h1 {
	font-weight: bold !important;
	text-align: center;
}

.teamNameLogo {
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: auto;
}

.teamNameLogo > img {
	max-height: 64px !important;
	width: auto;
	margin: auto;
	padding: 1px;
}

@media (max-width: 1047px) {
	.teamNameStrong {
		font-size: 1rem;
	}

	.title {
		font-size: 1.2rem;
	}

	.hero {
		margin-top: 0rem;
	}

	.teamNameLogo > img {
		max-height: 45px !important;
		width: auto;
		margin: auto;
		padding: 1px;
	}
}
</style>
