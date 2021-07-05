<template>
	<section>
		<b-loading :is-full-page="false" :active.sync="loading" :canCancel="false"></b-loading>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username}},</h1>
					<h2 class="subtitle">Gestion des saisons par ligues</h2>
				</div>
			</div>
		</section>
		<div v-if="seasons.length>0">
			<section class="info-tiles">
				<div class="tile is-ancestor has-text-centered">
					<div class="pointer tile is-parent">
						<article class="tile is-child box teamNameLogo">
							<strong class="displayFlex is-size-3">
								Toutes les saisons de
								<figure class="image">
									<img
										loading="lazy"
										class="logoligue1"
										:src="'/logoLigue/'+seasons[0].league_id+'.png'"
										alt="logoLigue"
									/>
								</figure>
							</strong>
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
				default-sort-direction="desc"
				default-sort="name"
			>
				<template slot-scope="props">
					<b-table-column centered field="id" label="id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.id
								}}
							</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="name" label="Nom" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.name }}</strong>
						</div>
					</b-table-column>

					<b-table-column centered field="is_current_season" label="Saison en cours" sortable>
						<div v-if="props.row.is_current_season" class="has-text-success">
							<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
						</div>
					</b-table-column>

					<b-table-column centered field="current_round_id" label="current_round_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.current_round_id
								}}
							</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="current_stage_id" label="current_stage_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.current_stage_id
								}}
							</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="league_id" label="league_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.league_id
								}}
							</strong>
						</div>
					</b-table-column>

					<b-table-column centered field=" " label=" " sortable>
						<button
							v-if="!props.row.existInInsider"
							@click="GoCreateSeason(props.row)"
							class="button"
						>Créer la saison</button>
						<button v-else class="button" @click="goSeason(props.row)">Voir les équipes</button>

						<button class="button" @click="goMatchs(props.row)">Voir les matchs</button>
						<button class="button" @click="goClassement(props.row)">Voir le classement</button>
					</b-table-column>
				</template>
				<template slot="empty">
					<div class="content has-text-grey has-text-centered">
						<p>...</p>
					</div>
				</template>
			</b-table>
		</div>
	</section>
</template>

<script>
import {
	createSeasonForInsiders,
	getSeasonFromSportsMonk,
	getSeasonByLeagueFromInsiders,
} from "@/server/admin";
export default {
	data() {
		return {
			seasons: [],
			insidersSeasons: [],
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
		};
	},
	computed: {
		connectedUser() {
			if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
				return this.$store.state.auth.user;
			} else {
				return "unconnected";
			}
		},
	},
	mounted() {
		if (this.connectedUser.role != "admin") {
			this.$router.push(`/`);
		} else {
			this.fetchData();
		}
	},
	methods: {
		goClassement(event) {
			this.$router.push(`/admin/classement/${event.id}`);
		},
		goMatchs(event) {
			this.$router.push(`/admin/matches/${event.id}`);
		},
		fetchData() {
			this.loading = true;
			getSeasonFromSportsMonk(this.$route.params.id).then((seasons) => {
				this.seasons = seasons;
				this.loading = false;

				getSeasonByLeagueFromInsiders(this.$route.params.id).then(
					(insidersSeasons) => {
						this.insidersSeasons = insidersSeasons;
						this.loading = false;

						this.detail = this.seasons.map((el) => {
							let existInInsider;
							let obj = el;
							el.existInInsider = true
								? insidersSeasons
										.map((l) => l.id_sportmonks)
										.includes(el.id.toString())
								: false;
							return obj;
						});
					}
				);
			});
		},
		GoCreateSeason(event) {
			let season = {
				id_sportmonks: event.id,
				name: event.name,
				league_id: event.league_id,
				is_current_season: event.is_current_season,
				current_round_id: event.current_round_id,
				current_stage_id: event.current_stage_id,
				stage: event.stage,
				round: event.round,
				stats: event.stats,
				league: this.$route.params.insidersId,
			};
			createSeasonForInsiders(season).then((resp) => {
				this.$buefy.toast.open({
					message: "La saison a éte créée",
					type: "is-success",
				});
				this.fetchData();
			});
		},
		goSeason(event) {
			this.$router.push(`/admin/teams/${event.id}`);
		},
	},
};
</script>

<style scoped>
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
.is-size-3 {
	justify-content: center;
	align-items: center;
}
article > strong > figure > img {
	margin: 0;
	margin-left: 20px;
	height: 90px;
	width: auto;
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
