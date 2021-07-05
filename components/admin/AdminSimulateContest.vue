<template>
	<section>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username}},</h1>
					<h2 class="subtitle">Combien rapporte le contest ?</h2>
				</div>
			</div>
		</section>
		<div class="hero-body">
			<div class="displayFlex">
				<b-field class="label" label="Nombre de joueurs">
					<div class="control is-clearfix">
						<input v-model="nbrePlayers" type="number" min="1" placeholder="10" class="input" />
					</div>
				</b-field>

				<b-field class="label" label="Montant joué/joueur">
					<div class="control is-clearfix">
						<input
							v-model="AmountPlayByPlayer"
							type="number"
							min="1"
							step="0.5"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>

				<b-field class="label" label="% redistribué">
					<div class="control is-clearfix">
						<input
							disabled
							v-model="pourcentageRedistribue"
							type="number"
							min="1"
							step="0.5"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="% de gagnants">
					<div class="control is-clearfix">
						<input
							disabled
							v-model="pourcentageWinner"
							type="number"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Influenceur Rem/joueur">
					<div class="control is-clearfix">
						<input
							disabled
							v-model="RemByInfluenceur"
							type="number"
							min="0"
							step="0.5"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Taux de TVA">
					<div class="control is-clearfix">
						<input
							disabled
							v-model="tauxTva"
							type="number"
							min="1"
							step="0.01"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
			</div>
			<div class="displayFlex">
				<b-field class="label" label="Montant collecté">
					<div class="control is-clearfix">
						<input
							v-model="montantCollecter"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Montant redistribué réel">
					<div class="control is-clearfix">
						<input
							v-model="totalRedistributedAmountReel"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Nbre gagnants réels">
					<div class="control is-clearfix">
						<input
							v-model="numberWinner"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>

				<b-field class="label" label="Coût Stripe">
					<div class="control is-clearfix">
						<input
							v-model="coutStripe"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Montant TVA">
					<div class="control is-clearfix">
						<input
							v-model="montantTVA"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Com. influenceur">
					<div class="control is-clearfix">
						<input
							v-model="remInfluenceur"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="Marge Insiders">
					<div class="control is-clearfix">
						<input
							v-model="margeInsiders"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
				<b-field class="label" label="% Marge Insiders">
					<div class="control is-clearfix">
						<input
							v-model="tauxDeMargeInsiders"
							disabled
							type="number"
							step="0.01"
							min="1"
							placeholder="10"
							class="input"
						/>
					</div>
				</b-field>
			</div>
			<button @click="sendTestSimulate" class="button is-fullwidth is-contest">Simulate contest price</button>
		</div>

		<div>
			<b-table
				class="simulateWrapper"
				v-if="dataForTab.length > 0"
				:data="dataForTab"
				:hoverable="true"
				:striped="true"
				:mobile-cards="false"
				default-sort-direction="asc"
				default-sort="range"
				:paginated="true"
				:per-page="50"
				:pagination-simple="false"
			>
				<template slot-scope="props">
					<b-table-column centered field="range" label="Rang" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{props.row.range}}</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="win" label="Montant gagné" meta="mg" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.win }} €</strong>
						</div>
					</b-table-column>
					<b-table-column centered field="qty" label="Nombre de gagnant" meta="ng" sortable>
						<div class="teamNameLogo">
							<strong class="teamNameStrong">{{ props.row.qty }}</strong>
						</div>
					</b-table-column>
				</template>
				<template slot-scope="props" slot="header">
					<b-tooltip
						:active="!!props.column.meta"
						:label="props.column.label=='Montant gagné'?totalRedistributedAmountReel.toString()+' €':numberWinner.toString()"
						always
						type="is-info"
					>{{ props.column.label }}</b-tooltip>
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
import { testSimulatePriceCOntest } from "@/server/apiAdmin";

export default {
	data() {
		return {
			RemByInfluenceur: 0.5,
			AmountPlayByPlayer: 5,
			RedistributedAmount: 3,
			tauxTva: 20,
			nbrePlayers: 1000,
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
			pourcentageRedistribue: 50,
			pourcentageWinner: 30,
			montantCollecter: "",
			numberWinner: "",
			montantTVA: "",
			remInfluenceur: "",
			coutStripe: "",
			totalRedistributedAmountReel: "",
			margeInsiders: "",
			nbWinner: "",
			dataForTab: []
		};
	},
	computed: {
		connectedUser() {
			return this.$store.state.auth.user;
		},
		tauxDeMargeInsiders: function() {
			return ((this.margeInsiders * 100) / this.montantCollecter).toFixed(2);
		}
	},

	mounted() {
		if (
			this.$store.state.auth.user &&
			this.$store.state.auth.user.role == "admin"
		) {
		} else {
			this.$router.push("/");
		}
	},
	methods: {
		sendTestSimulate() {
			this.dataForTab = [];
			testSimulatePriceCOntest(this.nbrePlayers, this.AmountPlayByPlayer).then(
				resp => {
					console.log("testSimulatePriceCOntest", resp);
					this.montantCollecter = resp.totalValue;
					this.numberWinner = resp.nbOfWWinners;
					this.montantTVA = resp.vat;
					this.remInfluenceur = resp.commissionInfluencer;
					this.coutStripe = resp.stripeCosts;
					this.totalRedistributedAmountReel = resp.finalDistributionTotal;
					this.margeInsiders = resp.finalMargin;
					this.nbWinner = resp.finalNumberOfWinners;

					let nbOfusersPerRank = resp.nbOfusersPerRank;
					let priceDistribution = [...new Set([...resp.priceDistribution])];

					for (let i = 0; i < nbOfusersPerRank.length; i++) {
						let objToPush = {};
						objToPush = {
							win: priceDistribution[i],
							qty: nbOfusersPerRank[i],
							range: i + 1
						};
						this.dataForTab.push(objToPush);
					}
				}
			);
		}
	}
};
</script>

<style scoped>
.displayFlex {
	justify-content: space-between;
}

.displayFlex > .label {
	margin-right: 5px;
}

.displayFlex > .label:last-child {
	margin-right: 0px;
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
