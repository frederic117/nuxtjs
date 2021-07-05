<template>
	<section>
		<b-loading :is-full-page="false" :active.sync="loading" :canCancel="false"></b-loading>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username}},</h1>
					<h2 class="subtitle">Gestion des ligues par pays</h2>
				</div>
			</div>
		</section>
		<div v-if="leagues.length>0">
			<section class="info-tiles">
				<div class="tile is-ancestor has-text-centered">
					<div class="pointer tile is-parent">
						<article class="tile is-child box teamNameLogo">
							<strong class="displayFlex is-size-3">Toutes les ligues de {{leagues[0].country.name}}</strong>
						</article>
					</div>
				</div>
			</section>
			<br />
			<b-table
				v-if="leagues.length > 0"
				:data="leagues"
				:loading="loading"
				:paginated="isPaginated"
				:per-page="perPage"
				:pagination-simple="isPaginationSimple"
				:total="total"
				:hoverable="true"
				:striped="true"
				:mobile-cards="false"
				default-sort-direction="asc"
				default-sort="nbMiseEnPlace"
			>
				<template slot-scope="props">
					<b-table-column centered field="id" label="id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.id_sportmonks
								}}
							</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="name" label="Nom" sortable>
						<div class="teamNameLogo">
							<img loading="lazy" class :src="props.row.logo_path" :alt="props.row.name" />
							<strong class="teamNameStrong">{{ props.row.name }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="isActive" label="isActive" sortable>
						<div v-if="props.row.isActive" class="has-text-success">
							<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
						</div>
					</b-table-column>
					<b-table-column centered field="is_cup" label="is_cup" sortable>
						<div v-if="props.row.is_cup" class="has-text-success">
							<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
						</div>
					</b-table-column>
					<b-table-column centered field="live_standings" label="Classement en direct" sortable>
						<div v-if="props.row.live_standings" class="has-text-success">
							<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
						</div>
					</b-table-column>
					<b-table-column centered field="country_id" label="country_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.country_id }}</strong>
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
					<b-table-column centered field="current_season_id" label="current_season_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">
								{{
								props.row.current_season_id
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
					<b-table-column centered field=" " label=" " sortable>
						<button class="button" @click="goSeason(props.row)">Voir la saison</button>
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
import { getLeagueFromInsidersByCountryId } from "@/server/admin";
export default {
	data() {
		return {
			leagues: [],
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
			this.loading = true;
			getLeagueFromInsidersByCountryId(this.$route.params.id).then(
				(leagues) => {
					this.leagues = leagues;
					this.loading = false;
				}
			);
		}
	},
	methods: {
		goSeason(event) {
			this.$router.push(`/admin/season/${event.id_sportmonks}/${event._id}`);
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
.is-size-3 {
	justify-content: center;
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
