<template>
	<div class>
		<div v-if="$auth.user&&$auth.user._id" class="box">
			<p v-if="langSelected==='EN'">
				<span class="title is-5">next match picks</span>
			</p>
			<p v-else>
				<span class="title is-5">pronos du prochain match</span>
			</p>
			<hr />
			<div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns mainwrapper">
				<div class="picss column is-12 is-marginless">
					<div class="media-left">
						<figure class="image is-48x48 is-circle">
							<nuxt-link :to="'/dashboard/'+recentPosition.userId._id" class>
								<img loading="lazy" class="imgProfile" :src="recentPosition.userId.picProfile" alt="Image" />
							</nuxt-link>
						</figure>
					</div>

					<div>
						<nuxt-link :to="'/dashboard/'+recentPosition.userId._id">
							<strong>&commat;{{recentPosition.userId.username}}</strong>
						</nuxt-link>
						<br />
						<div class="pronoPlayer">
							<div class="control">
								<nuxt-link :to="'/teams/'+recentPosition.match.homeTeamId.shortName.toLowerCase()">
									<b-taglist attached>
										<b-tag class="is-greyLit" size="is-big">{{recentPosition.match.homeTeamId.shortName}}</b-tag>
										<b-tag
											:class="{'is-green' : recentPosition.position[0]>recentPosition.position[1] , 'is-red' : recentPosition.position[0]<recentPosition.position[1] , 'is-info': recentPosition.position[0]==recentPosition.position[1]}"
											size="is-big"
										>{{recentPosition.position[0]}}</b-tag>
									</b-taglist>
								</nuxt-link>
							</div>
							<strong class="separatorScore">-</strong>
							<div class="control">
								<nuxt-link :to="'/teams/'+recentPosition.match.awayTeamId.shortName.toLowerCase()">
									<b-taglist attached>
										<b-tag class="is-greyLit" size="is-big">{{recentPosition.match.awayTeamId.shortName}}</b-tag>
										<b-tag
											:class="{'is-green' : recentPosition.position[0]<recentPosition.position[1] , 'is-red' : recentPosition.position[0]>recentPosition.position[1] , 'is-info': recentPosition.position[0]==recentPosition.position[1]}"
											size="is-big"
										>{{recentPosition.position[1]}}</b-tag>
									</b-taglist>
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		langSelected() {
			return this.$store.state.var.langSelected;
		},
		connectedUser() {
			return this.$store.state.auth.user;
		},
	},
	props: {
		recentPositions: null,
	},
};
</script>

<style scoped>
.separatorScore {
	font-weight: 1000;
	font-size: 1rem;
	margin: 0rem 0.5rem;
}
.media-left {
	align-self: center;
}
.mainwrapper {
	width: 110% !important;
}
.is-green {
	background-color: #2da94f;
	color: #eef1f7;
}
.is-greyLit {
	background-color: #778899;
	color: #eef1f7;
}
.is-blue {
	background-color: #192b41;
	color: #eef1f7;
}
.is-red {
	background-color: #eb412d;
	color: #eef1f7;
}
.control {
	margin-bottom: 1px;
	font-weight: bolder;
}
.pronoPlayer {
	display: flex;
	width: 102%;
}
.is-9 {
	margin-left: 5%;
}
.picss {
	display: flex;
	margin-bottom: 10px !important;
}
a {
	color: #192b41 !important;
}
.seeDash {
	color: #b5b5b5 !important;
}
</style>
