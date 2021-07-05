<template>
	<div>
		<div class="columns">
			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Technique</header>
				<section class="fifaStat">
					<p class="is-wc">
						Contrôles
						<b-tag
							v-if="caracteristiques.technique.controles<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.technique.controles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.controles>50&&caracteristiques.technique.controles<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.technique.controles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.controles>69&&caracteristiques.technique.controles<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.technique.controles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.controles>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.technique.controles}}</b-tag>
					</p>

					<p class="is-wc">
						Dribbles
						<b-tag
							v-if="caracteristiques.technique.dribbles<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.technique.dribbles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.dribbles>50&&caracteristiques.technique.dribbles<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.technique.dribbles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.dribbles>69&&caracteristiques.technique.dribbles<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.technique.dribbles}}</b-tag>
						<b-tag
							v-if="caracteristiques.technique.dribbles>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.technique.dribbles}}</b-tag>
					</p>
				</section>
			</div>

			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Mental</header>
				<section class="fifaStat">
					<p class="is-wc">
						Engagement
						<b-tag
							v-if="caracteristiques.mental.engagement<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.engagement}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.engagement>50&&caracteristiques.mental.engagement<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.engagement}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.engagement>69&&caracteristiques.mental.engagement<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.engagement}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.engagement>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.engagement}}</b-tag>
					</p>

					<p class="is-wc">
						Réactivité
						<b-tag
							v-if="caracteristiques.mental.reactivite<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.reactivite}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.reactivite>50&&caracteristiques.mental.reactivite<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.reactivite}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.reactivite>69&&caracteristiques.mental.reactivite<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.reactivite}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.reactivite>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.reactivite}}</b-tag>
					</p>
					<p class="is-wc">
						Placement off.
						<b-tag
							v-if="caracteristiques.mental.placementOff<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.placementOff}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.placementOff>50&&caracteristiques.mental.placementOff<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.placementOff}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.placementOff>69&&caracteristiques.mental.placementOff<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.placementOff}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.placementOff>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.placementOff}}</b-tag>
					</p>
					<p class="is-wc">
						Interception
						<b-tag
							v-if="caracteristiques.mental.interception<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.interception}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.interception>50&&caracteristiques.mental.interception<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.interception}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.interception>69&&caracteristiques.mental.interception<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.interception}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.interception>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.interception}}</b-tag>
					</p>

					<p class="is-wc">
						Vista
						<b-tag
							v-if="caracteristiques.mental.vista<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.vista}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.vista>50&&caracteristiques.mental.vista<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.vista}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.vista>69&&caracteristiques.mental.vista<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.vista}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.vista>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.vista}}</b-tag>
					</p>
					<p class="is-wc">
						Discipline
						<b-tag
							v-if="caracteristiques.mental.discipline<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.mental.discipline}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.discipline>50&&caracteristiques.mental.discipline<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.mental.discipline}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.discipline>69&&caracteristiques.mental.discipline<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.discipline}}</b-tag>
						<b-tag
							v-if="caracteristiques.mental.discipline>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.mental.discipline}}</b-tag>
					</p>
				</section>
			</div>
			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Physique</header>
				<section class="fifaStat">
					<p class="is-wc">
						Acceleration
						<b-tag
							v-if="caracteristiques.physique.acceleration<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.acceleration}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.acceleration>50&&caracteristiques.physique.acceleration<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.acceleration}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.acceleration>69&&caracteristiques.physique.acceleration<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.acceleration}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.acceleration>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.acceleration}}</b-tag>
					</p>

					<p class="is-wc">
						Endurance
						<b-tag
							v-if="caracteristiques.physique.endurance<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.endurance}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.endurance>50&&caracteristiques.physique.endurance<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.endurance}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.endurance>69&&caracteristiques.physique.endurance<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.endurance}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.endurance>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.endurance}}</b-tag>
					</p>
					<p class="is-wc">
						Force
						<b-tag
							v-if="caracteristiques.physique.force<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.force}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.force>50&&caracteristiques.physique.force<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.force}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.force>69&&caracteristiques.physique.force<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.force}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.force>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.force}}</b-tag>
					</p>
					<p class="is-wc">
						Equilibre
						<b-tag
							v-if="caracteristiques.physique.equilibre<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.equilibre}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.equilibre>50&&caracteristiques.physique.equilibre<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.equilibre}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.equilibre>69&&caracteristiques.physique.equilibre<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.equilibre}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.equilibre>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.equilibre}}</b-tag>
					</p>

					<p class="is-wc">
						Vitesse
						<b-tag
							v-if="caracteristiques.physique.vitesse<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.vitesse}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.vitesse>50&&caracteristiques.physique.vitesse<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.vitesse}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.vitesse>69&&caracteristiques.physique.vitesse<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.vitesse}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.vitesse>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.vitesse}}</b-tag>
					</p>
					<p class="is-wc">
						Agilité
						<b-tag
							v-if="caracteristiques.physique.agilite<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.agilite}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.agilite>50&&caracteristiques.physique.agilite<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.agilite}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.agilite>69&&caracteristiques.physique.agilite<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.agilite}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.agilite>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.agilite}}</b-tag>
					</p>
					<p class="is-wc">
						Détente
						<b-tag
							v-if="caracteristiques.physique.detente<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.physique.detente}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.detente>50&&caracteristiques.physique.detente<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.physique.detente}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.detente>69&&caracteristiques.physique.detente<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.detente}}</b-tag>
						<b-tag
							v-if="caracteristiques.physique.detente>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.physique.detente}}</b-tag>
					</p>
				</section>
			</div>
		</div>
		<div class="columns">
			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Tirs</header>
				<section class="fifaStat">
					<p class="is-wc">
						Tête
						<b-tag
							v-if="caracteristiques.tirs.tete<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.tete}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tete>50&&caracteristiques.tirs.tete<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.tete}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tete>69&&caracteristiques.tirs.tete<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.tete}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tete>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.tete}}</b-tag>
					</p>

					<p class="is-wc">
						Puissance frappe
						<b-tag
							v-if="caracteristiques.tirs.puissanceFrappe<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.puissanceFrappe}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.puissanceFrappe>50&&caracteristiques.tirs.puissanceFrappe<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.puissanceFrappe}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.puissanceFrappe>69&&caracteristiques.tirs.puissanceFrappe<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.puissanceFrappe}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.puissanceFrappe>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.puissanceFrappe}}</b-tag>
					</p>
					<p class="is-wc">
						Finition
						<b-tag
							v-if="caracteristiques.tirs.finition<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.finition}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.finition>50&&caracteristiques.tirs.finition<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.finition}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.finition>69&&caracteristiques.tirs.finition<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.finition}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.finition>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.finition}}</b-tag>
					</p>
					<p class="is-wc">
						Tir loin
						<b-tag
							v-if="caracteristiques.tirs.tirLoin<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.tirLoin}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tirLoin>50&&caracteristiques.tirs.tirLoin<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.tirLoin}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tirLoin>69&&caracteristiques.tirs.tirLoin<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.tirLoin}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.tirLoin>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.tirLoin}}</b-tag>
					</p>

					<p class="is-wc">
						Effet
						<b-tag
							v-if="caracteristiques.tirs.effet<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.effet}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.effet>50&&caracteristiques.tirs.effet<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.effet}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.effet>69&&caracteristiques.tirs.effet<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.effet}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.effet>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.effet}}</b-tag>
					</p>
					<p class="is-wc">
						Précision CF
						<b-tag
							v-if="caracteristiques.tirs.precisionCF<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.precisionCF}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.precisionCF>50&&caracteristiques.tirs.precisionCF<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.precisionCF}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.precisionCF>69&&caracteristiques.tirs.precisionCF<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.precisionCF}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.precisionCF>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.precisionCF}}</b-tag>
					</p>
					<p class="is-wc">
						Pénalty
						<b-tag
							v-if="caracteristiques.tirs.penalty<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.penalty}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.penalty>50&&caracteristiques.tirs.penalty<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.penalty}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.penalty>69&&caracteristiques.tirs.penalty<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.penalty}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.penalty>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.penalty}}</b-tag>
					</p>
					<p class="is-wc">
						Volée
						<b-tag
							v-if="caracteristiques.tirs.volee<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.tirs.volee}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.volee>50&&caracteristiques.tirs.volee<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.tirs.volee}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.volee>69&&caracteristiques.tirs.volee<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.volee}}</b-tag>
						<b-tag
							v-if="caracteristiques.tirs.volee>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.tirs.volee}}</b-tag>
					</p>
				</section>
			</div>
			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Passes</header>
				<section class="fifaStat">
					<p class="is-wc">
						Centre
						<b-tag
							v-if="caracteristiques.passes.centre<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.passes.centre}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.centre>50&&caracteristiques.passes.centre<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.passes.centre}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.centre>69&&caracteristiques.passes.centre<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.centre}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.centre>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.centre}}</b-tag>
					</p>

					<p class="is-wc">
						Passe courte
						<b-tag
							v-if="caracteristiques.passes.passeCourte<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.passes.passeCourte}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeCourte>50&&caracteristiques.passes.passeCourte<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.passes.passeCourte}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeCourte>69&&caracteristiques.passes.passeCourte<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.passeCourte}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeCourte>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.passeCourte}}</b-tag>
					</p>
					<p class="is-wc">
						Passe longue
						<b-tag
							v-if="caracteristiques.passes.passeLongue<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.passes.passeLongue}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeLongue>50&&caracteristiques.passes.passeLongue<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.passes.passeLongue}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeLongue>69&&caracteristiques.passes.passeLongue<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.passeLongue}}</b-tag>
						<b-tag
							v-if="caracteristiques.passes.passeLongue>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.passes.passeLongue}}</b-tag>
					</p>
				</section>
			</div>
		</div>
		<div class="columns">
			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Défense</header>
				<section class="fifaStat">
					<p class="is-wc">
						Marquage
						<b-tag
							v-if="caracteristiques.defense.marquage<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.defense.marquage}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.marquage>50&&caracteristiques.defense.marquage<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.defense.marquage}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.marquage>69&&caracteristiques.defense.marquage<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.marquage}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.marquage>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.marquage}}</b-tag>
					</p>

					<p class="is-wc">
						Tacle glissé
						<b-tag
							v-if="caracteristiques.defense.tacleGlisse<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.defense.tacleGlisse}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleGlisse>50&&caracteristiques.defense.tacleGlisse<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.defense.tacleGlisse}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleGlisse>69&&caracteristiques.defense.tacleGlisse<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.tacleGlisse}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleGlisse>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.tacleGlisse}}</b-tag>
					</p>
					<p class="is-wc">
						Tacle debout
						<b-tag
							v-if="caracteristiques.defense.tacleDebout<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.defense.tacleDebout}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleDebout>50&&caracteristiques.defense.tacleDebout<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.defense.tacleDebout}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleDebout>69&&caracteristiques.defense.tacleDebout<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.tacleDebout}}</b-tag>
						<b-tag
							v-if="caracteristiques.defense.tacleDebout>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.defense.tacleDebout}}</b-tag>
					</p>
				</section>
			</div>

			<div class="box column" id="fifaBox">
				<header class="modal-card-head is-wc">Gardien</header>
				<section class="fifaStat">
					<p class="is-wc">
						Placement
						<b-tag
							v-if="caracteristiques.gardien.placement<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.gardien.placement}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.placement>50&&caracteristiques.gardien.placement<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.gardien.placement}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.placement>69&&caracteristiques.gardien.placement<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.placement}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.placement>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.placement}}</b-tag>
					</p>

					<p class="is-wc">
						Plongeon
						<b-tag
							v-if="caracteristiques.gardien.plongeon<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.gardien.plongeon}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.plongeon>50&&caracteristiques.gardien.plongeon<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.gardien.plongeon}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.plongeon>69&&caracteristiques.gardien.plongeon<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.plongeon}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.plongeon>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.plongeon}}</b-tag>
					</p>
					<p class="is-wc">
						Jeu de main
						<b-tag
							v-if="caracteristiques.gardien.jeuDeMain<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.gardien.jeuDeMain}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuDeMain>50&&caracteristiques.gardien.jeuDeMain<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.gardien.jeuDeMain}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuDeMain>69&&caracteristiques.gardien.jeuDeMain<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.jeuDeMain}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuDeMain>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.jeuDeMain}}</b-tag>
					</p>
					<p class="is-wc">
						Jeu au pied
						<b-tag
							v-if="caracteristiques.gardien.jeuAuPied<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.gardien.jeuAuPied}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuAuPied>50&&caracteristiques.gardien.jeuAuPied<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.gardien.jeuAuPied}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuAuPied>69&&caracteristiques.gardien.jeuAuPied<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.jeuAuPied}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.jeuAuPied>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.jeuAuPied}}</b-tag>
					</p>

					<p class="is-wc">
						Réflexes
						<b-tag
							v-if="caracteristiques.gardien.reflexes<51"
							type="is-danger"
							size="is-medium"
						>{{caracteristiques.gardien.reflexes}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.reflexes>50&&caracteristiques.gardien.reflexes<70"
							type="is-warning"
							class="is-contest"
							size="is-medium"
						>{{caracteristiques.gardien.reflexes}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.reflexes>69&&caracteristiques.gardien.reflexes<90"
							class="is-ultraGreen"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.reflexes}}</b-tag>
						<b-tag
							v-if="caracteristiques.gardien.reflexes>89"
							type="is-success"
							size="is-medium"
						>{{caracteristiques.gardien.reflexes}}</b-tag>
					</p>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		caracteristiques: ""
	}
};
</script>
<style scoped>
.columns {
	margin: 0 !important;
}
.column {
	margin-right: 5px !important;
}
.column:last-child {
	margin-right: 0px !important;
}
.modal-card-head {
	font-weight: bold !important;
	display: flex;
	justify-content: center;
}
#fifaBox {
	padding: 0 !important;
}
.fifaStat {
	background-color: white;
	padding: 10px;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}
.fifaStat > p {
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
}
.fifaStat > p:last-child {
	margin-bottom: 0px;
}
.is-ultraGreen {
	background-color: #23d160 !important;
}
.is-contest {
	background-color: #ff7d00 !important;
	color: white !important;
}
@media (max-width: 769px) {
	.column {
		margin-right: 0px !important;
	}
}
</style> 