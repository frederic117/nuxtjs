<template>
	<section>
		<b-loading :is-full-page="false" :active.sync="loading" :canCancel="false"></b-loading>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username }},</h1>
					<h2 class="subtitle">Gestion des plans SportsMonk</h2>
				</div>
			</div>
		</section>
		<div>
			<section class="info-tiles">
				<div class="tile is-ancestor has-text-centered">
					<div v-for="(pays, index) in plan" :key="index" class="pointer tile is-parent">
						<article
							:class="{ 'is-success': detailClick.name === pays.name }"
							@click="seeDetail(pays)"
							class="tile is-child box teamNameLogo"
						>
							<button class="button" v-if="!countriesNameCreated.includes(pays.name)">Créer</button>
							<img loading="lazy" class="pointer" :src="pays.image_path" :alt="pays.name" />
							<p class="title">{{ pays.name }}</p>
						</article>
					</div>
				</div>
			</section>
			<br />
			<b-table
				v-if="detail.length > 0"
				:data="detail"
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
							<strong class="teamNameStrong">{{ props.row.id }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="name" label="Nom" sortable>
						<div class="teamNameLogo">
							<img loading="lazy" class :src="props.row.logo_path" :alt="props.row.name" />
							<strong class="teamNameStrong">{{ props.row.name }}</strong>
						</div>
					</b-table-column>

					<b-table-column centered field="country_id" label="country_id" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.country_id }}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="is_cup" label="is_cup" sortable>
						<div class="teamNameLogo">
							<div v-if="props.row.is_cup" class="has-text-success">
								<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
							</div>
						</div>
					</b-table-column>
					<b-table-column centered field="live_standings" label="live_standings" sortable>
						<div v-if="props.row.live_standings" class="has-text-success">
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
						<button
							v-if="props.row.existInInsider === false"
							class="button"
							@click="GoCreateLeague(props.row)"
						>Créer la ligue</button>
						<div v-else class="has-text-success">
							<i class="has-text-success mdi mdi-check-circle mdi-24px">&nbsp;</i>
							Ligue créée
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
	</section>
</template>

<script>
import {
	getCountryAndLeaguesFromSportsMonk,
	getCountryFromInsiders,
	createCountryForInsiders,
	getLeaguesFromSportsMonk,
	getLeaguesFromInsiders,
	createLeagueForInsiders,
} from "@/server/admin";
export default {
	data() {
		return {
			detailClick: "",
			countries: [],
			countriesNameCreated: [],
			detail: [],
			leagueFromInsiders: [],
			plan: [],
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
		GoCreateLeague(event) {
			if (
				!this.countries.filter((c) => c.id_sportmonks == event.country_id)[0]
			) {
				this.$buefy.dialog.alert(
					"Vous devez d'abord créer le pays dans Insiders"
				);
			} else {
				let league = {
					id_sportmonks: event.id,
					country_id: event.country_id,
					logo_path: event.logo_path,
					name: event.name,
					is_cup: event.is_cup,
					current_season_id: event.current_season_id,
					current_round_id: event.current_round_id,
					current_stage_id: event.current_stage_id,
					live_standings: event.live_standings,
					coverage: event.coverage,
					country: this.countries.filter(
						(c) => c.id_sportmonks == event.country_id
					)[0]._id,
				};
				createLeagueForInsiders(league).then((resp) => {
					this.$buefy.toast.open({
						message: "La ligue a éte créé",
						type: "is-success",
					});
					this.fetchData();
				});
			}
		},
		fetchData() {
			this.loading = true;
			getCountryFromInsiders().then((countries) => {
				this.countries = countries;
				this.countriesNameCreated = countries.map((c) => c.name);
			});
			getCountryAndLeaguesFromSportsMonk().then((plan) => {
				this.plan =
					plan &&
					plan.filter(
						(p) => p.leagues && p.leagues.data && p.leagues.data.length > 0
					);
				this.detail = this.plan.map((d) => d.leagues && d.leagues.data).flat();
				getLeaguesFromInsiders().then((leagueFromInsiders) => {
					this.leagueFromInsiders = leagueFromInsiders;
					let existInInsider;
					this.detail.map((el) => {
						let obj = el;
						el.existInInsider = true
							? leagueFromInsiders
									.map((l) => l.id_sportmonks)
									.includes(el.id.toString())
							: false;
						return obj;
					});
					this.loading = false;
				});
			});
		},
		seeDetail(event) {
			if (!this.countriesNameCreated.includes(event.name)) {
				let country = {};
				country.id_sportmonks = event.id;
				country.logo_path = event.logo_path;
				country.name = event.name;
				country.type = event.extra ? "country" : "continent";
				createCountryForInsiders(country).then((plan) => {
					this.$buefy.toast.open({
						message: "Le pays a éte créé",
						type: "is-success",
					});
					getCountryFromInsiders().then((countries) => {
						this.countries = countries;
						this.countriesNameCreated = countries.map((c) => c.name);
					});
				});
			} else {
				this.$router.push(`/admin/country/${event.id}`);
			}
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
.has-text-success {
	display: flex;
	justify-content: center;
	align-items: center;
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
.title {
	font-size: 1.8rem;
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
