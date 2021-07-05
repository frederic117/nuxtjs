<template>
	<section>
		<section class="hero welcome is-small">
			<div class="hero-body">
				<div class>
					<h1 class="title helloText">Bonjour {{$auth.user.username}},</h1>
					<h2 class="subtitle">Gestion des mails</h2>
				</div>
			</div>
		</section>
		<a href="https://rabbitmq-server.caprover.footfoot.co/" target="_blank">
			<button class="button is-fullwidth is-success is-outlined">Accès rabbitMQ</button>
		</a>
		<br />
	</section>
</template>
<script>
export default {
	auth: true,
	data() {
		return {};
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
</style>