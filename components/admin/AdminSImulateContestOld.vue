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
						<input v-model="pourcentageWinner" type="number" min="1" placeholder="10" class="input" />
					</div>
				</b-field>
				<b-field class="label" label="Influenceur Rem/joueur">
					<div class="control is-clearfix">
						<input
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
						<input v-model="tauxTva" type="number" min="1" step="0.01" placeholder="10" class="input" />
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
		</div>

		<div>
			<b-table
				class="simulateWrapper"
				v-if="remByPlayer.ArrayToPush.length > 0"
				:data="remByPlayer.ArrayToPush"
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
			pourcentageWinner: 30
		};
	},
	computed: {
		connectedUser() {
			return this.$store.state.auth.user;
		},
		costOfPlaceNextContest: function() {
			return (
				Number(this.coutStripe) / Number(this.nbrePlayers) +
				Number(this.montantTVA) / Number(this.nbrePlayers)
			);
		},
		montantCollecter: function() {
			return Number(this.nbrePlayers) * Number(this.AmountPlayByPlayer);
		},

		numberWinner: function() {
			if (this.remByPlayer.ArrayToPush) {
				return this.remByPlayer.ArrayToPush.map(item =>
					Number(item.qty)
				).reduce((prev, next) => prev + next, 0);
			}
		},
		coutStripe: function() {
			let stripeAmount =
				((this.AmountPlayByPlayer * 1.4) / 100 + 0.25) *
				Number(this.nbrePlayers);
			return stripeAmount.toFixed(2);
		},
		montantTVA: function() {
			return (
				(this.AmountPlayByPlayer / (100 + Number(this.tauxTva))) *
				Number(this.tauxTva) *
				this.nbrePlayers
			).toFixed(2);
		},
		margeInsiders: function() {
			return (
				this.montantCollecter -
				this.totalRedistributedAmountReel -
				this.coutStripe -
				this.montantTVA -
				this.remInfluenceur
			).toFixed(2);
		},

		tauxDeMargeInsiders: function() {
			return ((this.margeInsiders * 100) / this.montantCollecter).toFixed(2);
		},

		remInfluenceur: function() {
			if (Number(this.nbrePlayers) <= 999) {
				return 0;
			} else if (1000 <= Number(this.nbrePlayers)) {
				return this.nbrePlayers * this.RemByInfluenceur;
			}
		},
		montantCagnotte: function() {
			if (this.nbrePlayers && this.AmountPlayByPlayer) {
				return (
					(Number(this.nbrePlayers) *
						Number(this.AmountPlayByPlayer) *
						this.pourcentageRedistribue) /
					100
				);
			}
		},
		totalRedistributedAmount: function() {
			if (this.montantCollecter && this.pourcentageRedistribue) {
				return (
					(Number(this.pourcentageRedistribue) *
						Number(this.montantCollecter)) /
					100
				);
			}
		},
		nbWinner: function() {
			if (this.nbrePlayers && this.pourcentageWinner) {
				return Math.ceil(
					Number(
						(Number(this.nbrePlayers) * Number(this.pourcentageWinner)) / 100
					)
				);
			}
		},
		totalRedistributedAmountReel: function() {
			if (this.remByPlayer.ArrayToPush.length > 0) {
				return this.remByPlayer.ArrayToPush.map(
					rem => rem.win * rem.qty
				).reduce((prev, next) => prev + next, 0);
			}
		},

		remByPlayer: function() {
			let ArrayToPush;
			if (this.nbWinner == 1) {
				let amountToWin;
				amountToWin = this.totalRedistributedAmount;
				ArrayToPush = [
					{
						range: 1,
						win:
							amountToWin < 2 * this.costOfPlaceNextContest
								? this.costOfPlaceNextContest
								: 2 * this.costOfPlaceNextContest,
						qty: 1
					}
				];
				return { ArrayToPush };
			} else if (this.nbWinner == 2) {
				ArrayToPush = [
					{
						range: 1,
						win: Math.ceil((this.totalRedistributedAmount * 70) / 100),
						qty: 1
					},
					{
						range: 2,
						win: Math.ceil((this.totalRedistributedAmount * 30) / 100),
						qty: 1
					}
				];
				return { ArrayToPush };
			} else if (this.nbWinner == 3) {
				ArrayToPush = [
					{
						range: 1,
						win: Math.ceil((this.totalRedistributedAmount * 60) / 100),
						qty: 1
					},
					{
						range: 2,
						win: Math.ceil((this.totalRedistributedAmount * 25) / 100),
						qty: 1
					},
					{
						range: 3,
						win: Math.ceil((this.totalRedistributedAmount * 15) / 100),
						qty: 1
					}
				];
				return { ArrayToPush };
			} else if (this.nbWinner == 4) {
				ArrayToPush = [
					{
						range: 1,
						win: Math.ceil((this.totalRedistributedAmount * 50) / 100),
						qty: 1
					},
					{
						range: 2,
						win: Math.ceil((this.totalRedistributedAmount * 25) / 100),
						qty: 1
					},
					{
						range: 3,
						win: Math.ceil((this.totalRedistributedAmount * 15) / 100),
						qty: 1
					},
					{
						range: 4,
						win: Math.ceil((this.totalRedistributedAmount * 10) / 100),
						qty: 1
					}
				];
				return { ArrayToPush };
			} else if (this.nbWinner == 5) {
				ArrayToPush = [
					{
						range: 1,
						win: Math.ceil((this.totalRedistributedAmount * 50) / 100),
						qty: 1
					},
					{
						range: 2,
						win: Math.ceil((this.totalRedistributedAmount * 20) / 100),
						qty: 1
					},
					{
						range: 3,
						win: Math.ceil((this.totalRedistributedAmount * 15) / 100),
						qty: 1
					},
					{
						range: 4,
						win: Math.ceil((this.totalRedistributedAmount * 10) / 100),
						qty: 1
					},
					{
						range: 5,
						win: Math.ceil((this.totalRedistributedAmount * 5) / 100),
						qty: 1
					}
				];
				return { ArrayToPush };
			} else {
				let range;
				let win;
				let qty;
				let AmountRestToWin;
				let winnerGain;

				let amountForWinners = Math.ceil(this.totalRedistributedAmount);
				win = [
					this.costOfPlaceNextContest,
					2 * this.costOfPlaceNextContest,
					20
				];

				let soldeToRedistributed =
					amountForWinners -
					(win[0] * ((this.nbrePlayers * 20) / 100) +
						win[1] * ((this.nbrePlayers * 4) / 100) +
						win[2]);
				let otherPaidPlayers = (this.nbrePlayers * 1) / 100 - 1;
				let palier =
					((soldeToRedistributed - 20 * otherPaidPlayers) * 2) /
					(otherPaidPlayers * (otherPaidPlayers + 1));
				range = [
					Math.ceil((this.nbrePlayers * 1) / 100 + 2),
					Math.ceil((this.nbrePlayers * 1) / 100 + 1),
					Math.ceil((this.nbrePlayers * 1) / 100)
				];
				qty = [
					Math.ceil((this.nbrePlayers * 20) / 100),
					Math.ceil((this.nbrePlayers * 4) / 100),
					1
				];

				ArrayToPush = [
					{
						win: win[0],
						qty: qty[0],
						range: range[0]
					},
					{
						win: win[1],
						qty: qty[1],
						range: range[1]
					},
					{
						win: win[2],
						qty: qty[2],
						range: range[2]
					}
				];

				for (let i = 1; i < (this.nbrePlayers * 1) / 100; i++) {
					let objToPush = {};
					if (i < (this.nbrePlayers * 1) / 100 - 3) {
						let rangeToPush = (this.nbrePlayers * 1) / 100 - i;
						let winToPush = Number(win[win.length - 1]) + Number(palier);
						range.push(rangeToPush);
						win.push(winToPush);
						objToPush = {
							win: Math.floor(winToPush),
							qty: 1,
							range: Math.ceil(rangeToPush)
						};
						otherPaidPlayers--;
						soldeToRedistributed = Math.abs(soldeToRedistributed - winToPush);
					} else if (i == Math.floor((this.nbrePlayers * 1) / 100 - 2)) {
						let winToPush = Math.ceil(win[win.length - 1] * (1 + 10 / 100));
						win.push(winToPush);
						objToPush = {
							win: Math.floor(winToPush),
							qty: 1,
							range: 3
						};
					} else if (i == Math.floor((this.nbrePlayers * 1) / 100 - 1)) {
						let winToPush = Math.ceil(win[win.length - 1] * (1 + 20 / 100));
						win.push(winToPush);
						objToPush = {
							win: Math.floor(winToPush),
							qty: 1,
							range: 2
						};
					} else {
						let winToPush = Math.ceil(win[win.length - 1] * (1 + 30 / 100));
						win.push(winToPush);
						objToPush = {
							win: Math.floor(winToPush),
							qty: 1,
							range: 1
						};
					}
					ArrayToPush.push(objToPush);
				}
				return { ArrayToPush };
			}
		},
		remByPlayerA: function() {
			let range;
			let win;
			let qty;
			let AmountRestToWin;
			let winnerGain;
			let ArrayToPush;
			let amountForWinners = Math.ceil(this.totalRedistributedAmount);
			win = [this.costOfPlaceNextContest, 2 * this.costOfPlaceNextContest, 20];

			let soldeToRedistributed =
				amountForWinners -
				(win[0] * ((this.nbrePlayers * 20) / 100) +
					win[1] * ((this.nbrePlayers * 4) / 100) +
					win[2]);
			let otherPaidPlayers = (this.nbrePlayers * 1) / 100 - 1;
			let palier =
				((soldeToRedistributed - 20 * otherPaidPlayers) * 2) /
				(otherPaidPlayers * (otherPaidPlayers + 1));
			range = [
				Math.ceil((this.nbrePlayers * 1) / 100 + 2),
				Math.ceil((this.nbrePlayers * 1) / 100 + 1),
				Math.ceil((this.nbrePlayers * 1) / 100)
			];
			qty = [
				Math.ceil((this.nbrePlayers * 20) / 100),
				Math.ceil((this.nbrePlayers * 4) / 100),
				1
			];

			ArrayToPush = [
				{
					win: win[0],
					qty: qty[0],
					range: range[0]
				},
				{
					win: win[1],
					qty: qty[1],
					range: range[1]
				},
				{
					win: win[2],
					qty: qty[2],
					range: range[2]
				}
			];

			for (let i = 1; i < (this.nbrePlayers * 1) / 100; i++) {
				let objToPush = {};
				if (i < (this.nbrePlayers * 1) / 100 - 3) {
					let rangeToPush = (this.nbrePlayers * 1) / 100 - i;
					let winToPush = Number(win[win.length - 1]) + Number(palier);
					range.push(rangeToPush);
					win.push(winToPush);
					objToPush = {
						win: Math.floor(winToPush),
						qty: 1,
						range: Math.ceil(rangeToPush)
					};
					otherPaidPlayers--;
					soldeToRedistributed = Math.abs(soldeToRedistributed - winToPush);
				} else if (i == Math.floor((this.nbrePlayers * 1) / 100 - 2)) {
					let winToPush = Math.ceil(win[win.length - 1] * (1 + 10 / 100));
					win.push(winToPush);
					objToPush = {
						win: Math.floor(winToPush),
						qty: 1,
						range: 3
					};
				} else if (i == Math.floor((this.nbrePlayers * 1) / 100 - 1)) {
					let winToPush = Math.ceil(win[win.length - 1] * (1 + 20 / 100));
					win.push(winToPush);
					objToPush = {
						win: Math.floor(winToPush),
						qty: 1,
						range: 2
					};
				} else {
					let winToPush = Math.ceil(win[win.length - 1] * (1 + 30 / 100));
					win.push(winToPush);
					objToPush = {
						win: Math.floor(winToPush),
						qty: 1,
						range: 1
					};
				}
				ArrayToPush.push(objToPush);
			}
			return { ArrayToPush };
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
	methods: {}
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
