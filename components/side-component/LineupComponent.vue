<template>
  <section>
    <div class="static">
      <h1 ref="jsheading" class="js-heading">FOOTBALL LEAGUE</h1>
      <p ref="jssubheading" class="js-subheading">
        Experimental team line-up and football field using CSS 3D transforms.
      </p>
      <div ref="jsswitcher" class="js-switcher switcher">
        <a href="#" ref="jsswitch" class="js-switch disabled switch-btn"
          >HOME</a
        >
        <a href="#" ref="jsswitch" class="js-switch switch-btn">AWAY</a>
      </div>
    </div>
    <div ref="jsstage" class="js-stage stage texture">
      <div ref="jsworld" class="js-world world">
        <div ref="jsteam" class="team js-team">
          <!-- Team cards / icons goes here -->
        </div>
        <div ref="jsterrain" class="terrain js-terrain">
          <div class="field field--alt"></div>
          <div class="field ground">
            <div class="field__texture field__texture--gradient"></div>
            <div class="field__texture field__texture--gradient-b"></div>
            <div class="field__texture field__texture--grass"></div>
            <div class="field__line field__line--goal"></div>
            <div
              class="field__line field__line--goal field__line--goal--far"
            ></div>
            <div class="field__line field__line--outline"></div>
            <div class="field__line field__line--penalty"></div>
            <div class="field__line field__line--penalty-arc"></div>
            <div
              class="field__line field__line--penalty-arc field__line--penalty-arc--far"
            ></div>
            <div class="field__line field__line--mid"></div>
            <div class="field__line field__line--circle"></div>
            <div
              class="field__line field__line--penalty field__line--penalty--far"
            ></div>
          </div>
          <div class="field__side field__side--front"></div>
          <div class="field__side field__side--left"></div>
          <div class="field__side field__side--right"></div>
          <div class="field__side field__side--back"></div>
        </div>
      </div>
      <div class="loading js-loading">PLEASE WAIT...</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stage: "",
      world: "",
      terrain: "",
      team: "",
      teamListHome: "",

      players: "",

      playersHome: "", ////Subset of players

      playersAway: "", ////Subset of players

      switchBtn: "",

      loadBtn: "",

      closeBtn: "",

      heading: "",

      subHeading: "",

      loading: "",

      switcher: "",
      pos: {
        world: {
          baseX: 0,
          baseY: 0,
          baseZ: -200,
        },
        state: {
          home: true,
          disabHover: false,
        },

        def: {
          goalie: [0, -50],
        },
      },

      players: {
        home: [
          {
            name: "Pizarro",
            asset: "bm-pizarro.jpg",
            origin: "Peru",
            height: "1.84m",
            shirt: "14",
            pos: "Forward",
            dob: "36",
            goals: 1,
            games: 16,
            x: 110,
            y: -190,
          },

          {
            name: "Robben",
            asset: "bm-robben.png",
            origin: "Holland",
            height: "1.80m",
            shirt: "10",
            pos: "Forward",
            dob: "32",
            goals: 19,
            games: 30,
            x: -110,
            y: -190,
          },

          {
            name: "Rilbery",
            asset: "bm-rilbery.jpg",
            origin: "France",
            height: "1.70m",
            shirt: "7",
            pos: "Midfield",
            dob: "32",
            goals: 9,
            games: 22,
            x: 150,
            y: 50,
          },

          {
            name: "Schweinsteiger",
            asset: "bm-schweinsteiger.jpg",
            origin: "Germany",
            height: "1.87m",
            shirt: "24",
            pos: "Forward",
            dob: "31",
            goals: 21,
            games: 3,
            x: 0,
            y: 100,
          },

          {
            name: "Martinez",
            asset: "bm-martinez.jpg",
            origin: "Spain",
            height: "1.90m",
            shirt: "8",
            pos: "Midfield",
            dob: "28",
            goals: 0,
            games: 2,
            x: -150,
            y: 50,
          },

          {
            name: "Alaba",
            asset: "bm-alaba.jpg",
            origin: "Austria",
            height: "1.80m",
            shirt: "27",
            pos: "Defence",
            dob: "24",
            goals: 5,
            games: 27,
            x: -200,
            y: 180,
          },

          {
            name: "Lahm",
            asset: "bm-lahm.jpg",
            origin: "Germany",
            height: "1.70",
            shirt: "21",
            pos: "Defence",
            dob: "32",
            goals: 2,
            games: 25,
            x: 200,
            y: 180,
          },

          {
            name: "Benatia",
            asset: "bm-benatia.jpg",
            origin: "France",
            height: "1.87m",
            shirt: "5",
            pos: "Defence",
            dob: "31",
            goals: 21,
            games: 1,
            x: 100,
            y: 300,
          },

          {
            name: "Dante",
            asset: "bm-dante.jpg",
            origin: "Brazil",
            height: "1.87m",
            shirt: "4",
            pos: "Defence",
            dob: "32",
            goals: 0,
            games: 34,
            x: -100,
            y: 300,
          },

          {
            name: "Neuer",
            asset: "bm-neuer.jpg",
            origin: "Germany",
            height: "1.93m",
            shirt: "1",
            pos: "Goalie",
            dob: "29",
            goals: 0,
            games: 48,
            x: 0,
            y: 410,
          },
        ],

        away: [
          {
            name: "Benzema",
            asset: "rm-benzema.jpg",
            origin: "France",
            height: "1.87m",
            shirt: "9",
            pos: "Forward",
            dob: "36",
            goals: 1,
            games: 16,
            x: 110,
            y: -190,
          },

          {
            name: "Bale",
            asset: "rm-bale.jpg",
            origin: "Wales",
            height: "1.83m",
            shirt: "11",
            pos: "Midfield",
            dob: "26",
            goals: 19,
            games: 30,
            x: -110,
            y: -190,
          },

          {
            name: "carvajal",
            asset: "rm-carvajal.jpg",
            origin: "Spain",
            height: "1.70m",
            shirt: "15",
            pos: "Defender",
            dob: "32",
            goals: 9,
            games: 22,
            x: 150,
            y: 50,
          },

          {
            name: "Silva",
            asset: "rm-silva.jpg",
            origin: "Brazil",
            height: "1.87m",
            shirt: "16",
            pos: "Forward",
            dob: "22",
            goals: 21,
            games: 3,
            x: 0,
            y: 100,
          },

          {
            name: "Kroos",
            asset: "rm-kroos.jpg",
            origin: "Germany",
            height: "1.82",
            shirt: "8",
            pos: "Midfield",
            dob: "25",
            goals: 0,
            games: 2,
            x: -150,
            y: 50,
          },

          {
            name: "Modric",
            asset: "rm-modric.jpg",
            origin: "Croatia",
            height: "1.74m",
            shirt: "19",
            pos: "Midfield",
            dob: "30",
            goals: 5,
            games: 27,
            x: -200,
            y: 180,
          },

          {
            name: "Nacho",
            asset: "rm-nacho.jpg",
            origin: "Germany",
            height: "1.79",
            shirt: "18",
            pos: "Defence",
            dob: "25",
            goals: 2,
            games: 25,
            x: 200,
            y: 180,
          },

          {
            name: "Ramos",
            asset: "rm-ramos.jpg",
            origin: "Spain",
            height: "1.83m",
            shirt: "4",
            pos: "Defence",
            dob: "31",
            goals: 21,
            games: 1,
            x: 100,
            y: 300,
          },

          {
            name: "Pepe",
            asset: "rm-pepe.jpg",
            origin: "Brazil",
            height: "1.88m",
            shirt: "3",
            pos: "Defence",
            dob: "32",
            goals: 0,
            games: 34,
            x: -100,
            y: 300,
          },

          {
            name: "Casillas",
            asset: "rm-casillas.jpg",
            origin: "Spain",
            height: "1.85m",
            shirt: "1",
            pos: "Goalie",
            dob: "34",
            goals: 0,
            games: 48,
            x: 0,
            y: 410,
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.stage.mount(this.$refs.jsstage);
      this.world.mount(this.$refs.jsworld);
      this.switchBtn.mount(this.$refs.jsswitch);
      this.loadBtn.mount(this.$refs.jsload);
      this.heading.mount(this.$refs.jsheading);
      this.switcher.mount(this.$refs.jsswitcher);
      this.closeBtn.mount(this.$refs.jsclose);
      this.subHeading.mount(this.$refs.jssubheading);
      this.terrain.mount(this.$refs.jsterrain);
      this.team.mount(this.$refs.jsteam);
      //this.teamListHome.mount(this.$refs.jsteamhome);
      this.loading.mount(this.$refs.jsloading);
      this.dom.addPlayers("home");
      this.dom.addPlayers("away");
      this.scenes.preLoad();
      this.scenes.arrangePlayers();
      return this.scenes.startLoading();
    },

    swapSides: function () {
      if (this.home) {
        return (this.home = false);
      } else {
        return (this.home = true);
      }
    },
    curSide: function () {
      if (this.home) {
        return "home";
      } else {
        return "away";
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 62.5%;
  padding: 0;
  margin: 0;
}

.velocity-animating {
  -webkit-transition: none !important;
  transition: none !important;
}

body {
  background-image: -webkit-radial-gradient(ellipse, #2a437c 0, #10203b 100%);
  font-family: "Open Sans", helvetica, arial, sans-serif;
}

main {
  opacity: 0;
}

.static {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 0;
  z-index: 3;
}

.static h1 {
  margin: 50px 0 15px;
  font-size: 50px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 42px;
  letter-spacing: -3px;
  font-family: montserrat;
}

.static p {
  font-weight: 300;
  opacity: 0.4;
  margin: 0 0 20px;
  font-size: 16px;
  color: #7f98d3;
}

.loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 16px;
  line-height: 16px;
  color: #fff;
  font-family: "montserrat";
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -1px;
  text-align: center;
  opacity: 0;
}

.team-list {
  position: absolute;
  left: 40px;
  top: 100px;
  list-style: none;
  display: none;
}

.team-list li:first-child {
  color: #fff;
  font-weight: bold;
}

.team-list li {
  font-size: 1.4rem;
  margin: 0 0 10px;
  color: #7f98d3;
}

.stage {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  -webkit-perspective-origin: 50% -200px;
  perspective-origin: 50% -200px;
  -webkit-perspective: 1100px;
  perspective: 1100px;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.world {
  position: absolute;
  top: 130px;
  left: 50%;
  margin-left: -336px;
  width: 672px;
  height: 840px;
  -webkit-transform: translateZ(-210px);
  transform: translateZ(-210px);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.world.flipped {
  -webkit-transform: translateZ(-210px) rotateY(180deg);
  transform: translateZ(-210px) rotateY(180deg);
}

.world.switched {
  -webkit-transform: translateZ(250px) rotateY(30deg) translateX(60px)
    translateY(-200px);
  transform: translateZ(250px) rotateY(30deg) translateX(60px)
    translateY(-200px);
}

.switch-btn {
  display: inline-block;
  padding: 6px 15px;
  border: solid 1px #7f98d3;
  border-radius: 5px;
  text-align: center;
  color: #7f98d3;
  text-decoration: none;
  opacity: 1;
  font-size: 12px;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}

.switch-btn.disabled {
  background: #7f98d3;
  color: #2a437c;
  cursor: default;
}

.switch-btn.disabled:hover {
  color: #2a437c;
}

.switch-btn:hover {
  color: #fff;
}

.switch-btn:first-child {
  border-radius: 10px 0 0 10px;
  border-right: none;
}

.switch-btn:last-child {
  border-radius: 0 10px 10px 0;
}

.team {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.terrain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transform-style: inherit;
  transform-style: inherit;
}

.field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eee;
  z-index: 2;
  -webkit-transform: rotateX(90deg) translateZ(0);
  transform: rotateX(90deg) translateZ(0);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  box-sizing: content-box;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.field--alt {
  display: block;
  width: 80%;
  left: 10%;
  -webkit-transform: rotateX(90deg) translateZ(-10px);
  transform: rotateX(90deg) translateZ(-10px);
  background: #000;
  opacity: 0.3;
  box-shadow: 0 0 40px 30px #000;
}

.field__texture {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
}

.field__texture.field__texture--gradient {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(rgba(0, 0, 0, 0.2)),
    to(transparent)
  );
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  z-index: 4;
}

.flipped .field__texture.field__texture--gradient {
  opacity: 0;
}

.field__texture.field__texture--gradient-b {
  opacity: 0;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0.2)),
    to(transparent)
  );
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent);
  z-index: 4;
}

.flipped .field__texture.field__texture--gradient-b {
  opacity: 1;
}

.texture .field__texture.field__texture--grass {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/grass2.png");
  background-repeat: repeat;
  background-size: 75px 75px;
  background-position: -20px -20px;
}

.field__side {
  position: absolute;
  top: 420px;
  left: 0;
  width: 100%;
  height: 8px;
  -webkit-transform: rotateX(180deg) translateZ(-420px);
  transform: rotateX(180deg) translateZ(-420px);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  background-color: #eef1f7;
  z-index: 9;
}

.texture .field__side {
  background-color: #000;
}

.texture .field__side:after {
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  opacity: 0.55;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/mud.png");
  background-repeat: repeat;
  background-size: 75px 75px;
  background-position: -20px -20px;
}

.field__side.field__side--left,
.field__side.field__side--right {
  top: 0;
  left: -8px;
  height: 100%;
  width: 8px;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
  -webkit-transform: rotateX(90deg) rotateY(-90deg) translateZ(0);
  transform: rotateX(90deg) rotateY(-90deg) translateZ(0);
}

.field__side.field__side--right {
  left: auto;
  right: 0;
}

.field__side.field__side--back {
  -webkit-transform: rotateX(180deg) translateZ(420px);
  transform: rotateX(180deg) translateZ(420px);
}

.field__line {
  position: absolute;
  width: 100%;
  height: 3px;
  z-index: 4;
}

.field__line--goal {
  width: 16%;
  height: 6%;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-bottom: none;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 4%;
}

.field__line--goal--far {
  top: 4%;
  bottom: auto;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-top: none;
}

.field__line--penalty-arc {
  width: 20%;
  height: 20%;
  overflow: hidden;
  bottom: 20%;
  left: 0;
  right: 0;
  margin: auto;
}

.field__line--penalty-arc:after {
  position: absolute;
  top: 75%;
  width: 100%;
  height: 100%;
  left: 0;
  content: " ";
  display: block;
  border-radius: 50% 50% 0 0;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-bottom: none;
  box-sizing: border-box;
}

.field__line--penalty-arc--far {
  bottom: auto;
  top: 20%;
}

.field__line--penalty-arc--far:after {
  bottom: 75%;
  top: auto;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-top: none;
  border-radius: 0 0 50% 50%;
}

.field__line--penalty {
  width: 44%;
  height: 16%;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-bottom: none;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 4%;
}

.field__line--penalty--far {
  top: 4%;
  bottom: auto;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-top: none;
}

.field__line--outline {
  width: 92%;
  height: 92%;
  top: 4%;
  left: 4%;
  border: solid 3px rgba(255, 255, 255, 0.5);
}

.field__line--mid {
  top: 50%;
  width: 92%;
  left: 4%;
  background-color: rgba(255, 255, 255, 0.5);
}

.field__line--circle {
  width: 20%;
  height: 20%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: solid 3px rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.debug-btn {
  position: absolute;
  right: 40px;
  top: 40px;
  border: solid 1px #fff;
  border-radius: 10px;
  height: 20px;
  padding: 0 10px;
  color: #fff;
  text-decoration: none;
  line-height: 20px;
}

.debug-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
}

.debug-btn.debug-btn--load {
  top: 80px;
}

.player {
  position: absolute;
  height: 88px;
  width: 65px;
  padding-bottom: 23px;
  z-index: 9;
  left: 50%;
  margin-left: -32.5px;
  bottom: 50%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  cursor: pointer;
}

.player .player__placeholder {
  position: absolute;
  opacity: 0;
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
  height: 30px;
  width: 30px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.player.active .player__placeholder {
  opacity: 1;
}

.player .player__card {
  position: absolute;
  bottom: 26px;
  left: -82.5px;
  height: 260px;
  background-color: #eef1f7;
  opacity: 0;
  width: 230px;
  padding: 0;
  font-size: 18px;
  color: #333;
  border-radius: 4px;
  z-index: 2;
}

.player .player__card:after {
  position: absolute;
  display: block;
  content: "";
  height: 1px;
  width: 1px;
  border: solid 10px transparent;
  border-top: solid 10px #eee;
  bottom: -21px;
  left: 0;
  right: 0;
  margin: auto;
  top: auto;
  z-index: 3;
}

.player .player__card i {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px 15px;
  font-size: 24px;
  line-height: 20px;
  color: #fff;
  opacity: 0.3;
  cursor: pointer;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}

.player .player__card i:hover {
  opacity: 0.6;
}

.player .player__card h3 {
  text-align: center;
  font-weight: normal;
  text-transform: uppercase;
  font-family: montserrat;
  font-size: 19px;
  line-height: 27px;
  color: #333;
  color: #fff;
  padding: 15px 30px 40px;
  margin: 0 0 30px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  background-color: #192642;
}

.player .player__card h3 span:first-child {
  display: inline-block;
  height: 27px;
  width: 27px;
  border-radius: 50%;
  border: solid 1px #fff;
  line-height: 27px;
  opacity: 0.4;
  font-size: 18px;
}

.player .player__card h3 span:last-child {
  font-size: 14px;
  opacity: 0.4;
}

.player .player__card p {
  color: #777;
  font-style: italic;
  text-align: center;
}

.player .player__card .player__card__list {
  padding: 10px 0;
  font-size: 14px;
  color: #777;
  overflow: auto;
  text-align: center;
}

.player .player__card .player__card__list li {
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 15px;
  padding-left: 20px;
  color: #333;
}

.player .player__card .player__card__list li span {
  font-size: 12px;
  text-transform: uppercase;
  color: #aaa;
}

.player .player__card .player__card__list li:first-child {
  padding-left: 0;
  border-left: none;
}

.player .player__card .player__card__list--last {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #eee;
  margin: 0;
  padding: 0;
  border-top: solid 1px #ddd;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
}

.player .player__card .player__card__list--last li {
  width: 50%;
  padding: 10px 0 20px 0;
  color: #a40028;
  font-size: 28px;
  line-height: 22px;
}

.player .player__card .player__card__list--last li:last-child {
  border-left: solid 1px #ddd;
}

.player * {
  pointer-events: none;
}

.player .player__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 65px;
  height: 65px;
  z-index: 4;
  overflow: hidden;
  border-radius: 32.5px;
  background-color: #000;
  border: solid 1px #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.player .player__img img {
  width: 100%;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  display: block;
}

.player .player__label {
  position: absolute;
  height: 20px;
  display: inline-block;
  width: auto;
  overflow: visible;
  white-space: nowrap;
  left: -100%;
  right: -100%;
  margin: auto;
  padding: 0 10px;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  bottom: 0;
  opacity: 0;
  text-transform: upppercase;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  z-index: 2;
  pointer-events: none;
}

.player .player__label span {
  background-color: rgba(16, 20, 30, 0.9);
  color: #fff;
  font-size: 11px;
  padding: 3px 10px 2px 10px;
  border-radius: 10px;
  text-transform: upppercase;
}

.player:hover .player__img {
  opacity: 1;
}

.player:hover .player__label {
  opacity: 1;
}

.texture .player {
  background-size: 100% auto;
}
</style>
