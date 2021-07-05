<template>
  <div v-if="loading">
    <b-loading
      :is-full-page="false"
      :active.sync="loading"
      :canCancel="false"
    ></b-loading>
  </div>
  <section
    v-else-if="
      contest &&
      $store.state.auth.user &&
      $store.state.auth.user._id &&
      loading === false
    "
    class="section"
  >
    <div class="NameContest">
      <img
        v-if="contest.contest && contest.contest.image"
        class="imgCProfile"
        :src="contest.contest.image"
        alt="contest-image"
      />
      <img
        v-else
        class="imgCProfile"
        src="https://www.footfoot.co/miseLogo.png"
        alt="contest"
      />
      <h1 class="has-text-blue">
        <strong>
          {{ contest.contest.name.toUpperCase() }}
          {{
            langSelected === "EN"
              ? ": Sign up for the new round"
              : " : Inscris toi au nouveau round"
          }}
        </strong>
        <p>
          {{ langSelected === "EN" ? "organized by" : "organisé par" }}

          {{
            contest.isPublic
              ? "footfoot"
              : contest.contest.adminOfContest
              ? contest.contest.adminOfContest.username
              : ""
          }}
        </p>
      </h1>
    </div>
    <div class="mainContent">
      <article class="message is-warning">
        <div class="message-header">
          <p>
            {{ langSelected === "EN" ? "predict on" : "pronostique sur" }}
            {{ contest.scope ? contest.scope.length : "" }}
            {{ langSelected === "EN" ? "matches:" : "matchs :" }}
          </p>
        </div>
        <div class="message-body tableauMatch">
          <div
            v-if="contest.scope && contest.scope[0].status"
            class="matchlist tableauMatch"
          >
            <b-table
              class="tableauMatch NextMatchTable"
              :data="contest.scope"
              :loading="loading"
              :paginated="isPaginated"
              :per-page="perPage"
              :pagination-simple="isPaginationSimple"
              :total="total"
              :mobile-cards="true"
              :striped="true"
              default-sort-direction="desc"
              default-sort="date"
            >
              <template slot-scope="props">
                <b-table-column class="NextMatchWrapper" centered>
                  <div class="journee">
                    <figure width="80" class="image dayChampion">
                      <img
                        :class="{
                          invertOk:
                            Number(props.row.codeCompetitionApi) == 2 ||
                            Number(props.row.codeCompetitionApi) == 5,
                        }"
                        class="logoligue"
                        :src="
                          '/logoLigue/' + props.row.codeCompetitionApi + '.png'
                        "
                        alt="logoLigue"
                      />&nbsp
                      <div v-if="props.row.matchday">
                        <span
                          v-if="props.row.matchday === '8th Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            8
                            <sup>th</sup> round
                          </strong>
                          <strong v-else>
                            8
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === '16th Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            16
                            <sup>th</sup> round
                          </strong>
                          <strong v-else>
                            16
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === '32nd Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            32
                            <sup>nd</sup> round
                          </strong>
                          <strong v-else>
                            32
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === 'Quarter-finals'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN"
                              ? "Quarter final"
                              : "Quart de finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === 'Semi-finals'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN" ? "Semi final" : "Demi-finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === 'bronze'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            match for 3
                            <sup>rd</sup> place
                          </strong>
                          <strong v-else>
                            match pour la 3
                            <sup>ème</sup> place
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday === 'Final'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN" ? "Final" : "Finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday == 'Group Stage'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN"
                              ? props.row.matchday
                              : "phase de groupe"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday.includes('Round')"
                          class="journéeSpan"
                        >
                          <strong>{{ props.row.matchday }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.matchday.includes('Play-offs')"
                          class="journéeSpan"
                        >
                          <strong>{{ props.row.matchday }}</strong>
                        </span>
                        <span
                          v-else-if="langSelected === 'EN'"
                          class="journéeSpan"
                        >
                          <strong
                            v-if="
                              props.row.matchday == '1' ||
                              props.row.matchday == '21' ||
                              props.row.matchday == '31'
                            "
                          >
                            {{ props.row.matchday }}
                            <sup>st</sup> day
                          </strong>
                          <strong
                            v-else-if="
                              props.row.matchday == '2' ||
                              props.row.matchday == '22' ||
                              props.row.matchday == '32'
                            "
                          >
                            {{ props.row.matchday }}
                            <sup>nd</sup> day
                          </strong>
                          <strong
                            v-else-if="
                              props.row.matchday == '3' ||
                              props.row.matchday == '23' ||
                              props.row.matchday == '33'
                            "
                          >
                            {{ props.row.matchday }}
                            <sup>rd</sup> day
                          </strong>
                          <strong v-else>
                            {{ props.row.matchday }}
                            <sup>th</sup> day
                          </strong>
                        </span>
                        <span v-else class="journéeSpan">
                          <strong v-if="props.row.matchday == '1'">
                            {{ props.row.matchday }}
                            <sup>ère</sup> journée
                          </strong>
                          <strong v-else>
                            {{ props.row.matchday }}
                            <sup>ème</sup> journée
                          </strong>
                        </span>
                      </div>
                      <div v-if="props.row.stage && !props.row.matchday">
                        <span
                          v-if="props.row.stage === '16th Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            16
                            <sup>th</sup> round
                          </strong>
                          <strong v-else>
                            16
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === '32nd Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            32
                            <sup>nd</sup> round
                          </strong>
                          <strong v-else>
                            32
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === '8th Finals'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            8
                            <sup>th</sup> round
                          </strong>
                          <strong v-else>
                            8
                            <sup>ème</sup> de finale
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === 'Quarter-finals'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN"
                              ? "Quarter final"
                              : "Quart de finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === 'Semi-finals'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN" ? "Semi final" : "Demi-finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === 'bronze'"
                          class="journéeSpan"
                        >
                          <strong v-if="langSelected === 'EN'">
                            match for 3
                            <sup>rd</sup> place
                          </strong>
                          <strong v-else>
                            match pour la 3
                            <sup>ème</sup> place
                          </strong>
                        </span>
                        <span
                          v-else-if="props.row.stage === 'Final'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN" ? "Final" : "Finale"
                          }}</strong>
                        </span>
                        <span
                          v-else-if="props.row.stage == 'Group Stage'"
                          class="journéeSpan"
                        >
                          <strong>{{
                            langSelected === "EN"
                              ? props.row.stage
                              : "phase de groupe"
                          }}</strong>
                        </span>
                        <span v-else class="journéeSpan">
                          <strong>{{ props.row.stage }}</strong>
                        </span>
                      </div>
                    </figure>
                    <div v-if="props.row.status" class="mobileOnly">
                      <strong
                        v-if="
                          props.row.status.toUpperCase() === 'FT' ||
                          props.row.status.toUpperCase() === 'AET' ||
                          props.row.status.toUpperCase() === 'FT_PEN'
                        "
                        class="is-wc"
                        >{{
                          langSelected === "EN" ? "game over" : "match terminé"
                        }}</strong
                      >
                      <strong
                        v-if="
                          props.row.status.toUpperCase() != 'AET' &&
                          props.row.status.toUpperCase() != 'FT_PEN' &&
                          props.row.status.toUpperCase() != 'NOT STARTED' &&
                          props.row.status.toUpperCase() != 'NS' &&
                          props.row.status.toUpperCase() != 'TBA' &&
                          props.row.status.toUpperCase() != 'FT' &&
                          props.row.status.toUpperCase() != 'POSTP' &&
                          props.row.status.toUpperCase() != 'CANCL'
                        "
                        class="is-wc"
                        >{{
                          langSelected === "EN"
                            ? "game in progress"
                            : "match en cours"
                        }}</strong
                      >
                      <strong
                        v-if="props.row.status.toUpperCase() === 'TBA'"
                        class="is-wc"
                        >{{
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
                        }}</strong
                      >
                      <strong
                        v-if="
                          props.row.status.toUpperCase() === 'NS' ||
                          props.row.status.toUpperCase() === 'NOT STARTED'
                        "
                        class="is-wc"
                        >{{
                          moment(props.row.date)
                            .local()
                            .locale(langSelected.toLowerCase())
                            .calendar()
                        }}</strong
                      >
                      <strong class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>

                <b-table-column class="NextMatchWrapper" centered>
                  <div class="matchProno">
                    <div class="teamNameLogo">
                      <img
                        loading="lazy"
                        :class="{
                          invertOk: props.row.homeTeamId.name
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                        :src="props.row.homeTeamId.teamImg"
                        :alt="props.row.homeTeamId.name"
                      />
                      <strong
                        class="teamNameStrong"
                        v-if="props.row.homeTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.homeTeamName
                            : props.row.homeTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.homeTeamId.shortName
                      }}</strong>
                    </div>
                    <figure class="versusFigure1">
                      <img
                        loading="lazy"
                        class="vs"
                        src="~assets/images/versus.png"
                        alt="versus"
                      />
                    </figure>
                    <div class="teamNameLogo">
                      <img
                        loading="lazy"
                        :class="{
                          invertOk: props.row.awayTeamId.name
                            .toUpperCase()
                            .includes('JUVE'),
                        }"
                        :src="props.row.awayTeamId.teamImg"
                        :alt="props.row.awayTeamId.name"
                      />
                      <strong
                        class="teamNameStrong"
                        v-if="props.row.awayTeamId.name"
                        >{{
                          langSelected === "EN"
                            ? props.row.awayTeamName
                            : props.row.awayTeamId.name
                        }}</strong
                      >
                      <strong class="teamNameStrong" v-else>{{
                        props.row.awayTeamId.shortName
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>
                <b-table-column
                  class="NextMatchWrapper desktopOnly"
                  width="200"
                  centered
                >
                  <div class="journee">
                    <div class>
                      <strong
                        v-if="
                          props.row.status.toUpperCase() === 'FT' ||
                          props.row.status.toUpperCase() === 'AET' ||
                          props.row.status.toUpperCase() === 'FT_PEN'
                        "
                        class="is-wc"
                        >{{
                          langSelected === "EN" ? "game over" : "match terminé"
                        }}</strong
                      >
                      <strong
                        v-if="
                          props.row.status.toUpperCase() != 'AET' &&
                          props.row.status.toUpperCase() != 'FT_PEN' &&
                          props.row.status.toUpperCase() != 'NOT STARTED' &&
                          props.row.status.toUpperCase() != 'NS' &&
                          props.row.status.toUpperCase() != 'TBA' &&
                          props.row.status.toUpperCase() != 'FT' &&
                          props.row.status.toUpperCase() != 'POSTP' &&
                          props.row.status.toUpperCase() != 'CANCL'
                        "
                        class="is-wc"
                        >{{
                          langSelected === "EN"
                            ? "game in progress"
                            : "match en cours"
                        }}</strong
                      >
                      <strong
                        v-if="props.row.status.toUpperCase() === 'TBA'"
                        class="is-wc"
                        >{{
                          moment(props.row.date).local().format("DD-MM") +
                          " (horaire non fixé)"
                        }}</strong
                      >
                      <strong
                        v-if="
                          props.row.status.toUpperCase() === 'NS' ||
                          props.row.status.toUpperCase() === 'NOT STARTED'
                        "
                        class="is-wc"
                        >{{
                          moment(props.row.date)
                            .local()
                            .locale(langSelected.toLowerCase())
                            .calendar()
                        }}</strong
                      >
                      <br />
                      <strong
                        v-if="
                          props.row.stadium && props.row.stadium.length > 25
                        "
                        class="has-text-yellow"
                        >{{
                          props.row.stadium.substring(0, 25) + "..."
                        }}</strong
                      >
                      <strong v-else class="has-text-yellow">{{
                        props.row.stadium && props.row.stadium.name
                          ? props.row.stadium.name
                          : ""
                      }}</strong>
                    </div>
                  </div>
                </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon
                        icon="sentiment_very_satisfied"
                        size="is-large"
                      ></b-icon>
                    </p>
                    <p>...loading</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>
        </div>
      </article>

      <article v-if="contest.betValue > 0" class="message is-warning">
        <div class="message-header">
          <p class="colorWhite">
            {{
              langSelected === "EN"
                ? "a contribution of"
                : "une participation de"
            }}

            <strong class="is-bold">{{ contest.betValue }} FootCoins</strong>
            <sup>
              <i
                @click="detailFootcoin"
                class="pointer fa fa-info-circle"
                aria-hidden="true"
              ></i> </sup
            >&nbsp
            {{
              langSelected === "EN"
                ? "is required to register for this contest."
                : "est demandée pour s'inscrire à ce contest."
            }}
          </p>
        </div>
        <div class="message-body tableauMatch">
          <repartition-gain
            :contest="contest"
            :footcoinPlayed="contest.betValue"
            :nbrePlayers="
              contest.nbPlayersTarget ? contest.nbPlayersTarget : 50
            "
            @closeRepartitiongain="closeRepartitiongain"
            class="repFootCoinModal"
          ></repartition-gain>
        </div>
      </article>

      <div class="field loggiin">
        <b-switch :value="false" type="is-success" v-model="isSwitched">
          {{ langSelected === "EN" ? "I accept the" : "J’accepte les" }}
          <strong class="pointer" @click="disclamerModal"
            >{{
              langSelected === "EN"
                ? "terms and conditions of the game."
                : "conditions générales du jeu."
            }}
          </strong>
        </b-switch>
      </div>
      <br />

      <div v-if="isSwitched === true" class="loggiin">
        <p class="button is-large buttonLogin" type="button" @click="jouer">
          {{ langSelected === "EN" ? "PLAY!" : "JOUER !" }}
        </p>
      </div>
    </div>

    <b-modal :active.sync="isDisclamerModalActive" :width="900">
      <div class="bullbearPos2">
        <div class="section1 has-text-centered">
          <img
            loading="lazy"
            class="logo-insiders"
            src="~assets/images/logo.png"
            alt="Insiders logo"
            width="350px"
          />
        </div>
        <div>
          <h1 class="has-text-centered">
            <strong
              >{{
                langSelected === "EN"
                  ? "GENERAL CONDITIONS OF USE OF footfoot.co"
                  : "CONDITIONS GENERALES D’UTILISATION DU SITE footfoot.co"
              }}
            </strong>
          </h1>
          <h3 class="has-text-centered">
            {{
              langSelected === "EN"
                ? "Date of the general conditions: 30/05/2020"
                : "Date des conditions générales : 30/05/2020"
            }}
          </h3>
          <br />

          <p>
            <strong
              >{{
                langSelected === "EN"
                  ? "General conditions of use of the site and the services offered."
                  : "Conditions générales d’utilisation du site et des services proposés."
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "The use of the footfoot.co website implies the full acceptance of the general conditions of use described below. These conditions of use may be modified or completed at any time, so users of the footfoot.co site are invited to consult them regularly. This site is normally accessible to users at all times. However, footfoot.co may decide to interrupt the site for technical maintenance purposes, without necessarily informing users of the dates and times of the intervention beforehand. The footfoot.co website is updated regularly. In the same way, the legal mentions can be modified at any time: they are nevertheless imposed to the user who is invited to refer to them as often as possible in order to read them."
                : "L’utilisation du site footfoot.co implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site footfoot.co sont donc invités à les consulter de manière régulière. Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par footfoot.co, sans qu'il ne soit nécessairement communiqué préalablement aux utilisateurs les dates et heures de l’intervention. Le site footfoot.co est mis à jour régulièrement. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance."
            }}
          </p>
          <br />
          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "Description of the services provided"
                  : "Description des services fournis"
              }}</strong
            >
            <br />
            {{
              langSelected === "EN"
                ? "The Site www.footfoot.co (hereinafter 'the Site') is an independent information site for soccer enthusiasts, providing Users (hereinafter 'the User') with a free discussion space and a tool to organize predictions between friends."
                : "Le Site www.footfoot.co (ci-après « le Site ») est un site d'information indépendant sur s’adressant aux passionnés de football, mettant gratuitement à disposition des Utilisateurs (Ci-après Internaute ou Utilisateur) un espace de discussion et leur fourni un outil permettant d’organiser des pronostics entre amis."
            }}

            <br />
            <br />

            <span class="has-text-red">
              {{
                langSelected === "EN"
                  ? "Under no circumstances shall the Site be considered an online gaming operator within the meaning of Law No. 2010-476 of May 12, 2010 relating to the opening up to competition and the regulation of the online gambling sector."
                  : "En aucun cas le Site ne saurait être assimilé à un opérateur de jeux en ligne au sens de la loi n° 2010-476 du 12 mai 2010 relative à l’ouverture à la concurrence et à la régulation du secteur des jeux d’argent et de hasard en ligne."
              }}
            </span>
            <br />
            <br />
            {{
              langSelected === "EN"
                ? "footfoot.co strives to provide on the Site information as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies and deficiencies in the update, whether they are of its own making or of the making of third party partners who provide it with this information. All the information indicated on the footfoot.co site is given as an indication, and is likely to evolve. Moreover, the information on the Site is not exhaustive. They are given under reserve of modifications having been made since their setting on line."
                : "footfoot.co s’efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Tous les informations indiquées sur le site footfoot.co sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le Site ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne."
            }}
          </p>
          <br />
          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "Contractual limitations on technical data"
                  : "Limitations contractuelles sur les données techniques"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "The website cannot be held responsible for material damages related to the use of the site. Moreover, the user of the site undertakes to access the site using recent equipment, free of viruses and with a last generation updated browser."
                : "Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour."
            }}
          </p>
          <br />

          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "A contract of trust between us"
                  : "Un contrat de confiance entre nous"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "To use footfoot.co, you must be at least 16 years old. By using the Site, Users agree to:"
                : "Pour utiliser footfoot.co, vous devez avoir au moins 16 ans. En utilisant le Site, les Utilisateurs s’engagent :"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- not to commit any action that may constitute an offence, as provided for in the Act,"
                : "- à ne commettre aucune action pouvant constituer une infraction, telle que prévue par la Loi,"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- not to extract or collect personal data from Users of the Site by any means whatsoever, nor to attempt to do so,"
                : "- à ne pas extraire ou collecter des données personnelles d’Utilisateurs du Site par quelque procédé que ce soit, ni à tenter de le faire,s"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- to extract, record or exploit, in any way whatsoever, for any purpose other than the sole purpose of displaying during navigation on this Site, the contents of third parties subject to intellectual property rights, relating to privacy, or relating to their personal data or their right to image."
                : "- d’extraire, d’enregistrer ou d’exploiter, de quelque manière que ce soit, à d’autres fins que l’unique affichage lors de la navigation sur le présent Site, les contenus de tiers soumis à des droits de propriété intellectuelle, relatifs à la vie privée, ou relatifs à leurs données personnelles ou leur droit à l’image."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- to store, distribute or publish any content that is illegal, harmful, defamatory, violent, racist, anti-Semitic, revisionist, inciting to hatred, contrary to good morals, infringing on the privacy or private rights of third parties"
                : "- de stocker, de diffuser ou publier tout contenu illégal, préjudiciable, diffamatoire, violent, raciste, antisémite, révisionniste, incitant à la haine, contraire aux bonnes mœurs, portant atteinte à la vie privée ou aux droits privatifs de tiers."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- impersonate any third party and/or publish any personal information of a third party"
                : "- d’usurper l’identité d’un tiers et/ou publier toute information personnelle d’un tiers"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- not to disclose to third parties their connection identifiers or any other element allowing access to the Site. In case of fraudulent connection by a third party not registered with the identifiers of a member, any damage caused by this third party will be deemed, except in cases of force majeure, to have been committed by the said member."
                : "- à ne pas divulguer à des tiers leurs identifiants de connexion ou tout autre élément permettant l’accès au Site. En cas de connexion frauduleuse par un tiers non inscrit avec les identifiants d’un membre, tout dommage causé par ce tiers sera réputé, sauf cas de force majeure, avoir été commis par ledit membre."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "Users are solely responsible for the content they publish on the site."
                : "Les Utilisateurs sont seuls responsables des contenus qu’ils publient sur le site."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "By publishing on the Site, Users acknowledge that they have all the necessary rights and authorizations to carry out their publications and accept that the latter become public and freely accessible on the Site."
                : "En publiant sur le site, les Utilisateurs reconnaissent posséder l’ensemble des droits et autorisations nécessaires pour effectuer leurs publications et acceptent que ces dernières deviennent publiques et librement accessibles sur le Site."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "In the event that a User violates these terms and conditions, footfoot.co reserves the right to delete any publication of a User on the Site, or even, in the case of particularly serious or repeated violations, to delete the account of the User responsible."
                : "Dans le cas où il enfreindrait les présentes conditions générales, la société footfoot.co se réserve le droit de supprimer toute publication d’un Utilisateur sur le Site, voire, en cas d’infractions d’une particulière gravité ou répétées, de supprimer le compte de l’Utilisateur responsable."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "A message contrary to the charter may be modified. The modification can concern a part or the totality of the message. In addition to that, the user posting a message contrary to the present charter exposes himself to a temporary banishment of the Site. During the duration of this ban the user will not be able to post any more contributions in case of simple ban, and in case of complete ban he will not be able to access the Site."
                : "Un message contraire à la charte pourra être modifié. La modification peut concerner une partie ou la totalité du message. Outre cela, l’utilisateur postant un message contraire à la présente charte s’expose à un bannissement temporaire du Site. Durant la durée de ce bannissement l’utilisateur ne pourra plus poster de contributions en cas de bannissement simple, et en cas de bannissement complet il ne pourra plus accéder au Site."
            }}

            <br />
            {{
              langSelected === "EN"
                ? "The Site constitutes a private place open to the public under the responsibility of footfoot.co which freely determines the modalities of functioning and use and which can thus take the necessary initiatives for the good functioning of the discussion forum."
                : "Le Site constitue un lieu privé ouvert au public sous la responsabilité de footfoot.co qui en détermine librement les modalités de fonctionnement et d'utilisation et qui peut donc prendre les initiatives nécessaires au bon fonctionnement du forum de discussion."
            }}
          </p>
          <br />

          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "Intellectual property and counterfeiting"
                  : "Propriété intellectuelle et contrefaçons"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "footfoot.co does not claim any ownership rights in the information you submit to fill out your account or through our Services. You must have the necessary rights in the information you submit to fill out your footfoot.co account or through our Services and the necessary authorization to grant the rights and licenses set forth in our Terms. Rights of footfoot.co. We own all copyrights, trademarks, domains, logos, trade dress, trade secrets, patents and other intellectual property rights associated with our Services. You may not use any of our copyrights, trademarks, domain names, logos, trade dress, patents or other intellectual property rights unless you have our express permission."
                : "footfoot.co ne revendique aucun droit de propriété sur les informations que vous envoyez pour renseigner votre compte ou par l'intermédiaire de nos Services. Vous devez disposer des droits nécessaires sur les informations que vous envoyez pour renseigner votre compte footfoot.co ou par l'intermédiaire de nos Services et de l'autorisation requise pour octroyer les droits et licences mentionnés dans nos Conditions. Droits d’footfoot.co. Nous possédons l'ensemble des droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation, aux secrets commerciaux, aux brevets et autres droits de propriété intellectuelle associés à nos Services. Vous ne pouvez pas utiliser nos droits d'auteur et droits relatifs aux marques, aux domaines, aux logos, à la présentation et aux brevets ou nos autres droits de propriété intellectuelle, sauf si vous disposez de notre autorisation expresse."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "In order for us to operate and provide our Services, you grant footfoot.co a worldwide, non-exclusive, royalty-free, sublicensable, and assignable license to use, reproduce, distribute, display, and exploit information (including content) that you upload, submit, store, send or receive on or through our Services, and to create derivative works therefrom. The rights you grant under this license are for the limited purpose of operating and providing our Services (e.g., to allow us to display your profile picture and status message, transmit your messages, store your messages on our servers)."
                : "Afin que nous puissions exploiter et proposer nos Services, vous octroyez à footfoot.co une licence internationale, non exclusive, exempte de redevance, permettant l'octroi d'une sous-licence et cessible, nous autorisant à utiliser, reproduire, distribuer, afficher et exploiter les informations (y compris le contenu) que vous téléchargez, soumettez, stockez, envoyez ou recevez sur nos Services ou par leur intermédiaire, ainsi qu'à en créer des œuvres dérivées. Les droits que vous octroyez en vertu de cette licence sont destinés aux fins limitées qui sont d'exploiter et de fournir de nos Services (par exemple, pour nous permettre d'afficher votre photo de profil et votre message de statut, transmettre vos messages, stocker vos messages sur nos serveurs)."
            }}
          </p>
          <br />

          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "Limitations of liability"
                  : "Limitations de responsabilité"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "Acting as a mere host, the Company footfoot.co is not responsible for the conduct of the contest. The Company footfoot.co declines any responsibility for the damage which would result from the organization of a private contest on line and the information which they contain."
                : "N’agissant qu’en tant que simple hébergeur, la Société footfoot.co n’est pas responsable du déroulement du contest. La  Société footfoot.co décline toute responsabilité pour les dommages qui résulteraient de l’organisation d’un contest privé en ligne et des informations qu’ils contiennent."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "The company footfoot.co is not responsible for bets, contracts, transactions concluded between users of the site."
                : "La société footfoot.co n’est pas responsable des paris, contrats, transactions conclus entre les utilisateurs du site."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "In the same way, footfoot.co cannot be held responsible in case of failure to deliver a prize won by a User during a private contest organized by one of the users of the site."
                : "De la même façon, footfoot.co ne pourra être tenue pour responsable en cas de défaillance dans la remise d’un lot gagné par un Utilisateur au cours d’un contest privé organisé par l’un des utilisateurs du site."
            }}
            <br />
            {{
              langSelected === "EN"
                ? "In any hypothesis, the Company footfoot.co cannot be held responsible for any direct/indirect damage that they are foreseeable or not, of any loss of profits, loss of income, loss of chance, loss of data, economic or commercial loss that it is the nature undergone by a User of the Site and of the occurrence of an event of major force."
                : "En toute hypothèse, la Société footfoot.co ne pourra être tenue pour responsable de tous dommages directs/ indirects qu’ils soient prévisibles ou non, de toutes pertes de profits, perte de revenus, perte de chance, perte de données, perte économique ou commerciale qu’elle qu’en soit la nature subie par un Utilisateur du Site et de la survenance d’un évènement de force majeur."
            }}

            <br />
            <br />
            {{
              langSelected === "EN"
                ? "The Company footfoot.co does not guarantee in any case the accuracy, the exhaustiveness or the topicality of the contents of the Site (information, forecasts, advice,?), the whole of the data proposed by the Site being purely indicative. Therefore, the Company footfoot.co is not responsible for any omissions, alterations, errors or delays in updating this information and their possible consequences."
                : "La Société footfoot.co ne garantit en aucun cas l’exactitude, l’exhaustivité ou l’actualité du contenu du Site (informations, pronostics, conseils, …), l’ensemble des données proposées par le Site revêtant un caractère purement indicatif. Par conséquent, la Société footfoot.co n’est pas responsable des éventuelles omissions, altérations, erreurs ou délais de mise à jour de ces informations et de leurs éventuelles conséquences."
            }}

            <br />
            <br />
            {{
              langSelected === "EN"
                ? "In any case the Company footfoot.co could not be held responsible:"
                : "En aucun cas la Société footfoot.co ne saurait être tenue pour responsable :"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- any damage resulting from computer and technical malfunction of the User, loss of access to the site caused by the failure of the electronic communication network or the access provider of the User, by maintenance operations or updates,"
                : "- de tout dommage résultant d’un dysfonctionnement informatique et technique de l’Utilisateur, de la perte d’accès au site provoquée par la panne du réseau de communication électronique ou du fournisseur d’accès de l’Utilisateur, par des opérations de maintenance ou des mises à jour,"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- the loss of any data, possible fraudulent modifications of data or contributions published on the Site,"
                : "- de la perte de toute donnée, des éventuelles modifications frauduleuses des données ou contributions publiées sur le Site,"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- the possible transmission of viruses or the possible risks of bugs that may occur during navigation on the Site,"
                : "- de l’éventuelle transmission de virus ou des éventuels risques de bug pouvant survenir lors de la navigation sur le Site,"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- the misuse of the site by the User, any fault, omission, negligence or default of the User,"
                : "- de la mauvaise utilisation du site par l’Utilisateur, de toute faute, omission, négligence ou défaillance de l’Utilisateur,"
            }}
            <br />
            {{
              langSelected === "EN"
                ? "- the disclosure or unlawful use of a password given in confidence to the User,"
                : "- de la divulgation ou de l’utilisation illicite d’un mot de passe remis de manière confidentielle à l’Utilisateur,"
            }}
          </p>
          <br />

          <div>
            <strong
              >{{
                langSelected === "EN"
                  ? "Personal data collection"
                  : "Collecte des données personnelles"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "Under the General Data Protection Regulation, you are asked to give your explicit consent to the collection and processing of your personal data when using this platform."
                : "Dans le cadre du Règlement Général sur la Protection des Données, il vous est demandé de donner votre consentement explicite à la collecte et au traitement de vos données personnelles dans le cadre de l'utilisation de cette plateforme."
            }}

            <br />
            {{
              langSelected === "EN"
                ? "The personal data collected and their use are described below:"
                : "Les données personnelles collectées et leur utilisation sont décrites ci-après :"
            }}
            <br />
            <ul>
              <li>
                {{
                  langSelected === "EN"
                    ? "User ID: this user ID is free and you can choose not to match it to your real identity. In any case, this identifier can be displayed in the site or the application and is potentially visible to any other user of the platform. No specific processing is done."
                    : "Identifiant : cet identifiant est libre et vous pouvez choisir de ne pas le faire correspondre à votre identité réelle. Dans tous les cas, cet identifiant peut-être affiché dans le site ou l'application et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé."
                }}
              </li>
              <li>
                {{
                  langSelected === "EN"
                    ? "Email address: your email address is used to communicate directly with you: information on the platform, password reset procedure and sending reminders of games to predict. A confirmed email address is required to use certain functions of the site or application. This information is not shared with other users of the site or with other organizations."
                    : "Adresse Mail : votre adresse mail est utilisée pour communiquer directement avec vous : informations sur la plateforme, procédure de réinitialisation de mot de passe et envoi de rappels de matchs à pronostiquer. Une adresse mail confirmée est nécessaire pour l'utilisation de certaines fonctions du site ou application. Cette information n'est en aucun cas partagée aux autres utilisateurs du site ou avec d'autres organisations."
                }}
              </li>
              <li>
                {{
                  langSelected === "EN"
                    ? "Profile image: this image is free and you can choose not to reflect your real identity. In any case, this image is displayed in the platform and is potentially visible to any other user of the platform. No specific processing is done."
                    : "Image de profil : cette image est libre et vous pouvez choisir de ne pas refléter votre identité réelle. Dans tous les cas, cette image est affichée dans la plateforme et est potentiellement visible de tout autre utilisateur de la plateforme. Aucun traitement spécifique n'est réalisé."
                }}
              </li>
              <li>
                {{
                  langSelected === "EN"
                    ? "Cell phone identifier (in the case of mobile applications): this identifier is unique and cannot be used by any other application and is therefore never communicated. It is used to send you notifications related to the use of the platform: information, prediction reminders, interactions on the discussion forums."
                    : " Identifiant de téléphone portable (dans le cas de l'utilisation des applications mobiles) : cet identifiant est unique et ne peut être utilisé par aucune autre application et n'est donc jamais communiqué. Il est utilisé pour vous envoyer des notifications liées à l'utilisation de la plateforme : informations, rappels de pronostics, interactions sur les forums de discussion."
                }}
              </li>
              <li>
                {{
                  langSelected === "EN"
                    ? "IP address, 'cookies' or local storage space of your browser used for :"
                    : "Adresse IP, 'cookies' ou espace de stockage local de votre navigateur utilisés à des fins :"
                }}
              </li>
              <ul>
                <li>
                  {{
                    langSelected === "EN"
                      ? "automatic login statistics to your account"
                      : "statistiques de connexion automatique à votre compte"
                  }}
                </li>
              </ul>
            </ul>
          </div>
          <br />
          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "footfoot.co in companies"
                  : "footfoot.co en entreprise"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "The use of the footfoot.co platform does not commit footfoot.co and the people working on the site to the success of your contest, especially in relation to the availability of the platform. The responsibility of footfoot.co and the people working on the site can in no way be engaged if the site was unavailable during the course of a contest."
                : "L’utilisation de la plateforme footfoot.co n’engage en rien le site footfoot.co et les personnes qui travaillent sur le site sur la réussite de votre concours notamment par rapport à la disponibilité de la plateforme. La responsabilité de footfoot.co et des personnes travaillant sur le site ne pourra en aucun cas être engagée notamment si le site venait à être indisponible pendant le déroulement d’un contest."
            }}
          </p>
          <br />
          <p>
            <strong>
              {{
                langSelected === "EN"
                  ? "Applicable law and jurisdiction"
                  : "Droit applicable et attribution de juridiction"
              }}
            </strong>
            <br />
            {{
              langSelected === "EN"
                ? "Any dispute in connection with the use of the site footfoot.co is subject to French law. The competent courts of Paris have exclusive jurisdiction."
                : "Tout litige en relation avec l’utilisation du site footfoot.co est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris."
            }}
          </p>
          <br />
          <p>
            <strong>{{
              langSelected === "EN" ? "Glossary" : "Lexique"
            }}</strong>
            <br />
            {{
              langSelected === "EN"
                ? "User: Internet user connecting, using the above-mentioned site. Personal information: « information that allows, in any form whatsoever, directly or not, the identification of individuals to whom they apply » (Article 4 of Law No. 78-17 of 6 January 1978)."
                : "Utilisateur : Internaute se connectant, utilisant le site susnommé. Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978)."
            }}
          </p>
          <br />
        </div>
      </div>
    </b-modal>

    <b-modal :active.sync="detailFootcoinModal">
      <detail-footcoin
        @closedetailFootcoinModal="closedetailFootcoinModal"
      ></detail-footcoin>
    </b-modal>
    <b-modal :active.sync="iwantFootcoinModal">
      <achat-footcoin
        :betValue="contest.betValue"
        @closeAchat="closeAchat"
        class="buyFootCoinModal"
      ></achat-footcoin>
    </b-modal>
    <b-modal :active.sync="repartitiongainModal">
      <repartition-gain
        :contest="contest.contest"
        :footcoinPlayed="contest.betValue"
        :nbrePlayers="contest.numberPlayers"
        @closeRepartitiongain="closeRepartitiongain"
        class="repFootCoinModal"
      ></repartition-gain>
    </b-modal>
  </section>
  <section
    v-else-if="
      (!$store.state.auth.user ||
        ($store.state.auth.user && !$store.state.auth.user._id)) &&
      loading === false
    "
  >
    <div class="column is-12 sideRecent mainSCI">
      <div class="sentimentLandText">
        <img
          loading="lazy"
          class="img-player"
          src="~assets/images/ronaldoPop.png"
          alt="Bull"
        />
        <div class="columndir">
          <h1 class="accrocheH1" v-if="langSelected === 'EN'">
            You need to be connected to join this contest.
          </h1>
          <h1 class="accrocheH1" v-else>
            Tu dois te connecter pour rejoindre ce contest.
          </h1>
          <div class="loggiin">
            <p
              v-if="langSelected === 'EN'"
              class="button is-large buttonLLLogin"
              type="button"
              @click="LoginModal"
            >
              Login
            </p>
            <p
              v-else
              class="button is-large buttonLLLogin"
              type="button"
              @click="LoginModal"
            >
              connexion
            </p>
            <p
              v-if="langSelected === 'EN'"
              class="button is-large buttonSSSignin"
              type="button"
              @click="SignupModal"
            >
              Join
            </p>
            <p
              v-else
              class="button is-large buttonSSSignin"
              type="button"
              @click="SignupModal"
            >
              rejoindre
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          class="img-player"
          src="~assets/images/zlatanPop.jpg"
          alt="Bear"
        />
      </div>
    </div>
  </section>
</template>

<script>
import {
  getContestMain,
  registerContest,
  getIntentPaiement,
  getuserfootCoins,
} from "@/server/apiContest";
import moment, { lang } from "moment";
import { sendServerForPay } from "@/server/apiContest";

export default {
  auth: false,
  head() {
    return {
      script: [{ src: "https://js.stripe.com/v3/" }],
      title:
        this.langSelected == "EN"
          ? "Win footcoins by making the best football predictions - For the love of football"
          : "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
      meta: [
        {
          hid: `description`,
          name: "description",
          content:
            this.langSelected == "EN"
              ? "The best predictor will win fame, respect and footballcoins"
              : "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `keywords`,
          name: "keywords",
          keywords:
            this.langSelected == "EN"
              ? "football, bets, forecast, Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - For the love of football"
              : "football, pronos, paris, Ligue 1, Liga, Série A, Bundesliga, Champion's league, Europa league - Pour l'amour du foot",
        },
        {
          hid: `og:title`,
          property: "og:title",
          content:
            this.langSelected == "EN"
              ? "Win footcoins by making the best football predictions - For the love of football"
              : "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: `https://www.footfoot.co"${this.$route.fullPath}`,
        },

        {
          hid: `og:image`,
          property: `og:image`,
          content: "https://www.footfoot.co/miseLogo.png",
        },

        {
          hid: `og:description`,
          property: "og:description",
          content:
            this.langSelected == "EN"
              ? "The best predictor will win fame, respect and footballcoins"
              : "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `twitter:card`,
          name: `twitter:card`,
          property: "twitter:card",
          content: "summary_large_image",
        },

        {
          hid: `twitter:site`,
          name: `twitter:site`,
          property: "twitter:site",
          content: "@footfoot.co",
        },
        {
          hid: `twitter:creator`,
          name: `twitter:creator`,
          property: "twitter:creator",
          content: "@InsidersFoot",
        },
        {
          hid: `twitter:title`,
          name: `twitter:title`,
          property: "twitter:title",
          content:
            this.langSelected == "EN"
              ? "Win footcoins by making the best football predictions - For the love of football"
              : "Gagne des footcoins en faisant les meilleurs pronos de football - Pour l'amour du foot",
        },
        {
          hid: `twitter:description`,
          name: `twitter:description`,
          property: "twitter:description",
          content:
            this.langSelected == "EN"
              ? "The best predictor will win fame, respect and footballcoins"
              : "Le meilleur pronostiqueur remportera gloire, respect et footcoins",
        },
        {
          hid: `twitter:image`,
          name: `twitter:image`,
          property: "twitter:image",
          content: "https://www.footfoot.co/miseLogo.png",
        },
      ],
    };
  },
  data() {
    return {
      total: 0,
      loading: false,
      isDisclamerModalActive: false,
      defaultSortField: "",
      defaultSortOrder: "asc",
      page: 1,
      perPage: 100,
      isPaginated: false,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      exemplePointModal: false,
      isSwitched: false,
      isClosed: false,
      alreadyRegister: false,
      contest: "",
      detailFootcoinModal: false,
      iwantFootcoinModal: false,
      repartitiongainModal: false,
    };
  },
  components: {
    repartitionGain: () => import("@/components/modal/repartitionGain"),
    detailFootcoin: () => import("@/components/modal/detailFootcoin"),
    achatFootcoin: () => import("@/components/modal/achatFootcoin"),
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    iwantFootcoin() {
      this.iwantFootcoinModal = true;
    },
    closeRepartitiongain() {
      this.repartitiongainModal = false;
    },
    openRepartitiongain() {
      this.repartitiongainModal = true;
    },
    closeAchat() {
      this.iwantFootcoinModal = false;
    },
    closedetailFootcoinModal() {
      this.detailFootcoinModal = false;
    },
    detailFootcoin() {
      this.detailFootcoinModal = true;
    },
    disclamerModal() {
      this.isDisclamerModalActive = true;
    },

    moment: function (time) {
      return moment(time);
    },
    seeExemple() {
      this.exemplePointModal = true;
    },
    jouer() {
      if (this.isClosed === true) {
        this.$buefy.dialog.alert(
          this.langSelected == "EN"
            ? "Sorry, the registration for the round is closed. Please register for the next one."
            : "Désolé l'inscription au round est fermée. Inscris toi au suivant."
        );
      } else if (this.isSwitched === false) {
        this.$buefy.dialog.alert(
          this.langSelected == "EN"
            ? "You must accept the terms and conditions to participate in the contest"
            : "Tu dois accepter les conditions générales pour participer au contest"
        );
      } else {
        if (this.alreadyRegister === true) {
          this.$buefy.dialog.alert(
            this.langSelected == "EN"
              ? "Registration is in progress"
              : "Inscription est en cours"
          );
        } else {
          getContestMain(this.$route.params.contestId).then((contest) => {
            if (contest.betValue) {
              getuserfootCoins(this.$store.state.auth.user._id).then(
                (footCoins) => {
                  if (footCoins >= Number(contest.betValue)) {
                    this.alreadyRegister = true;
                    registerContest(this.$route.params.contestId).then(
                      (resp) => {
                        this.alreadyRegister = false;

                        this.$buefy.dialog.alert(
                          this.langSelected == "EN"
                            ? "Congratulations, you are in the contest"
                            : `Félicitations, tu participes au contest !<br> BONS PRONOS`
                        );

                        this.$nuxt.$emit("joinContest", contest);
                        this.$router.push(
                          "/contest/" + this.$route.params.contestId
                        );
                      }
                    );
                  } else {
                    this.$buefy.dialog.confirm({
                      message:
                        this.langSelected == "EN"
                          ? "You don't have enough FootCoin to join this contest!"
                          : "Tu n'as pas assez de FootCoin pour rejoindre ce contest !",
                      confirmText:
                        this.langSelected == "EN"
                          ? "Buy FootCoins"
                          : "Acheter des FootCoin",
                      cancelText:
                        this.langSelected == "EN" ? "Cancel" : "Annuler",
                      type: "is-success",
                      onConfirm: () => (this.iwantFootcoinModal = true),
                    });
                  }
                }
              );
            } else {
              this.alreadyRegister = true;

              registerContest(this.$route.params.contestId).then((resp) => {
                this.alreadyRegister = false;

                this.$buefy.dialog.alert(
                  this.langSelected == "EN"
                    ? "Congratulations, you are in the contest"
                    : `Félicitations, tu participes au contest !<br> BONS PRONOS`
                );
                this.$nuxt.$emit("joinContest", contest);
                this.$router.push("/contest/" + this.$route.params.contestId);
              });
            }
          });
        }
      }
    },
    SignupModal() {
      this.$store.commit(
        "var/contestInscription",
        this.$route.params.contestId
      );
      this.$router.push("/signup");
    },
    LoginModal() {
      this.$store.commit(
        "var/contestInscription",
        this.$route.params.contestId
      );
      this.$router.push("/login");
    },

    signup() {
      this.$store.commit(
        "var/contestInscription",
        this.$route.params.contestId
      );
      this.$router.push("/signup");
    },
  },

  mounted() {
    this.$store.commit("var/contestInscription", this.$route.params.contestId);
    this.$auth.fetchUser();

    if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
      this.loading = true;
      if (this.$auth.user && this.$auth.user._id) {
        getContestMain(this.$route.params.contestId).then((contest) => {
          this.loading = false;
          if (!contest || contest == "err") {
            this.$router.push("/");
          } else if (contest === "no contest") {
            this.$router.push("/contest");
          } else if (
            contest.participants &&
            contest.participants.includes(this.$store.state.auth.user._id)
          ) {
            this.$router.push("/contest/" + contest._id);
          } else if (contest.isRegistrationOpen === false) {
            this.$buefy.dialog.alert(
              "Les inscriptions de ce contest sont fermées..."
            );
            this.$router.push("/contest");
          } else {
            this.contest = contest;
          }
        });
      } else {
        this.$auth.logout();
        this.$router.push("/");
      }
    }
  },

  destroyed() {
    this.$auth.fetchUser();
  },
};
</script>
<style scoped>
.competValidate {
  padding: 5px;
}

.matchSelectionOK {
  width: 90%;
  margin: AUTO;
  display: FLEX;
}

.picContestModal {
  background-color: #eef1f7;
  border-radius: 5px;
}

.picContestModal > .button {
  font-size: 1.2rem !important;
}

.see-selection {
  margin: auto;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.bullbearPos2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  justify-content: space-evenly;
  background-color: #eef1f7;
  padding: 1rem;
}
.stripeButton {
  display: FLEX;
  justify-content: CENTER;
  margin-top: 1rem;
}
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.stripeWrap {
  display: none;
  flex-direction: column;
  width: 50%;
  margin: AUTO;
}
.loggiin {
  justify-content: center;
  display: flex;
  padding-bottom: 0.5rem;
}
.visibleStripe {
  display: flex !important;
}

.displayStripe {
  height: 5rem;
  width: 50%;
  background-color: #fff;
}

.section1 {
  padding-top: 0rem !important;
  margin-bottom: 1rem;
}

.matchRandom {
  display: FLEX;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.contestPerso {
  width: 40%;
  display: FLEX;
  flex-direction: column;
  justify-content: center;
}

.is-checked {
  background-color: #ff7d00;
}

.imgCProfile {
  max-height: 100px !important;
  width: 100px;
  align-self: center;
  margin: 15px;
  border-radius: 10% !important;
  border: 2px solid #ff7d00 !important;
}

.checkBoxLeague {
  display: flex;
  width: 1.25em;
  height: 1.25em;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 3px;
  border: 2px solid #7a7a7a;
  -webkit-transition: background 150ms ease-out;
  transition: background 150ms ease-out;
  margin: auto;
  margin-top: 5px;
}

.check {
  background: #ff7d00;
  border-color: #ff7d00;
}

.versusFigure1 {
  display: flex;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 0px;
  outline: auto 0px;
  outline-color: #ff7d00;
}

.competValidate {
  display: flex;
  flex-direction: column;
}

.validateCompet {
  width: fit-content;
  height: 2rem;
  align-self: center;
}

textarea {
  width: 100%;
  height: 20vh;
}

.matcheschoice {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.bRadio {
  margin-left: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.NameContest {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
}

.contestPic {
  margin: auto;
}

.field:not(:last-child) {
  margin-bottom: 0rem;
}

.inputCore {
  margin: auto;
  font-size: 1rem;
  color: black;
  width: 50%;
}

.buttonMatchSelection {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #fff !important;
  color: #ff7d00 !important;
}

.buttonMatchSelection:focus,
.buttonMatchSelection:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #fff !important;
}

.buttonLogin {
  min-width: 25%;
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #ff7d00 !important;
  color: #eef1f7 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
  font-weight: bolder !important;
  box-shadow: 0 0 0 0.125em #ff7d00 !important;
  border-color: #ff7d00 !important;
  background-color: #eef1f7 !important;
  color: #ff7d00 !important;
}

.main {
  background-color: #eef1f7;
}

.content {
  display: flex;
  flex-direction: column;
}

.is-italic {
  font-style: italic;
}

.mainContent {
  margin: 1rem 5%;
}

.message-header > p {
  font-weight: bold;
}

.message.is-warning .message-header {
  background-color: #ff7d00;
  color: #eef1f7;
}

.message.is-warning .message-body {
  border-color: #ff7d00;
  color: #192b41;
}

.modal-content {
  background-color: #fff;
  padding: 0%;
  margin: 1%;
  border-radius: 5px;
  border: solid, #192b41;
}

strong {
  color: #ff7d00;
}

li {
  list-style-type: disc;
}

.seeExemple {
  cursor: pointer;
}

.ligue-img {
  width: auto;
  max-height: 90px !important;
}

.trendingWrapper {
  padding-top: 0rem;
}

div {
  font-size: 1.2rem !important;
}

h1 {
  font-size: 2.2rem !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  align-self: center;
}

img {
  max-height: 64px !important;
}

.has-text-centered {
  font-size: 1rem !important;
  vertical-align: middle !important;
}

.container {
  margin-bottom: 2rem !important;
}

.flag {
  justify-content: space-between;
  display: flex;
}

.tableauMatch {
  margin: 0px !important;
  padding: 0px !important;
}

.checkcompetValidate {
  display: flex;
  flex-direction: column;
}

.checkcompetValidate > .checkbox {
  margin: auto;
  margin-top: 5px;
}

.vs {
  height: 48px !important;
  align-self: center;
}

.bullsAndBearsPicVs {
  display: flex;
  justify-content: center;
  align-self: center;
}

.bullsAndBearsPicVsName {
  display: flex;
  justify-content: center;
  align-self: center;
}

.teamNameStrong {
  align-self: center;
}

td > span {
  display: flex;
  justify-content: center;
}

.matchProno {
  display: flex;
  justify-content: space-between;
}

.logoligue {
  width: 40px;
  height: auto !important;
  max-height: auto !important;
}

.dayChampion {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: 0;
}

.mobileOnly {
  display: none;
}

.teamNameLogo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 40%;
}

.teamNameLogo > img {
  height: 45px !important;
  max-height: 45px !important;
  width: auto;
  margin: auto;
}

.picContestDiv {
  display: flex;
  flex-direction: column;
}

.picContestDiv > div {
  font-size: 1rem !important;
  margin: auto;
  padding: 10px;
}

.picContestModal {
  display: flex;
  flex-direction: column;
}

.croppaContest {
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
}
.contest-logo {
  margin-right: 10px;
}
.sentimentLandText {
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
.mainSCI {
  display: flex;
  flex-direction: column;
}

.img-player {
  width: 10rem;
  max-height: 10rem !important;
  border-radius: 50%;
}

.accrocheH1 {
  font-size: 2rem;
  color: #192b41;
  padding: 3%;
  text-align: center;
}

.loggiin {
  display: flex;
  justify-content: center;
  align-self: center;
}
.mainSCI > .loggiin {
  padding: 1.5rem;
  width: 20%;
}
.buttonSSSignin {
  margin-left: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}

.buttonLLLogin {
  margin-right: 2.5%;
  min-width: 20%;
  border-color: #192b41 !important;
  background-color: #fff !important;
  color: #192b41 !important;
}

.buttonLLLogin:focus,
.buttonLLLogin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}

.buttonSSSignin:focus,
.buttonSSSignin:hover {
  font-weight: bolder !important;
  color: #eef1f7 !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #eef1f7 !important;
  background-color: #192b41 !important;
}
.sentimentLandText > img {
  margin-top: 1.5rem;
}
@media (max-width: 1047px) {
  .loggiin {
    padding-top: 0.5rem;
  }
  .sentimentLandText {
    flex-direction: column;
    margin-top: 0rem;
  }

  .sentimentLandText > img {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0rem !important;
  }
  .stripeWrap {
    width: 100%;
  }
  .desktopOnly {
    display: none !important;
  }

  .NextMatchWrapper {
    padding: 5px;
  }

  .message-body {
    padding: 5px;
  }

  .see-selection {
    margin: auto;
    font-size: 1rem;
  }

  .imgCProfile {
    max-height: 70px !important;
    width: 70px;
    margin: 5px;
  }

  .contestPerso {
    width: 50%;
  }

  .competValidate {
    padding: 0;
    padding-top: 0.5em;
  }

  .inputCore {
    width: 100%;
  }

  .NameContestPic {
    justify-content: space-around !important;
  }

  .teamNameLogo > img {
    height: 35px !important;
    max-height: 35px !important;
    width: 35px;
    margin: auto;
  }

  .teamNameStrong {
    width: auto;
  }

  .journee {
    display: flex;
    justify-content: space-between;
  }

  .mobileOnly {
    display: flex;
    flex-direction: column;
  }

  .mobileOnly > strong {
    text-align: right;
  }

  .NextMatchWrapper:before {
    margin-right: 0 !important;
    padding-right: 0em !important;
    width: 0% !important;
  }

  .NextMatchWrapper {
    width: 100% !important;
  }

  .NextMatchWrapper > span {
    width: 100% !important;
  }

  .logoligue {
    width: 25px !important;
    height: auto !important;
  }

  h1 {
    font-size: 1.2rem !important;
  }

  td {
    height: auto !important;
  }

  .vs {
    align-self: center;
    max-height: 45px !important;
  }

  .teamName {
    align-self: center;
    min-width: auto !important;
  }

  .is-large {
    font-size: 1rem !important;
  }

  .matchProno {
    max-width: 100% !important;
  }

  .displayFlex {
    display: flex;
    flex-direction: column;
  }

  .bullsAndBearsPicVs {
    width: 100%;
  }

  .is-hidden-tablet {
    display: none !important;
  }

  .ligue-img {
    max-height: 35px !important;
  }

  .container {
    margin-bottom: 1rem !important;
  }

  .trendingWrapper {
    padding-top: 0rem;
  }

  div {
    font-size: 0.8rem !important;
  }

  .has-text-centered {
    font-size: 0.8rem !important;
  }

  .button .icon.is-small {
    height: 1.5em !important;
    width: 1.5em !important;
  }

  .navbar.is-dark {
    margin-bottom: 3% !important;
  }

  .main {
    padding: 1rem 1rem;
  }

  .mainContent {
    margin: 0.1rem 0.1rem 2rem;
  }
}
</style>
