<template>
  <div class="video">
    <div class="video__partner">
      <video
        :src="remoteVideo"
        id="remoteVideo"
        class="video__spinner"
        controls
        autoplay
        playsinline
        muted="false"
        volume="0"
      ></video>
    </div>
    <video
      :src="myVideo"
      id="myVideo"
      class="video__myself"
      controls
      autoplay
      playsinline
      muted="true"
      volume="0"
    ></video>
  </div>
</template>


<script>
const servers = {
  iceServers: [
    { url: "stun:stun.services.mozilla.com" },
    { url: "stun:stun.skyway.io:3478" },
    { url: "stun:stun.stunprotocol.org" },
    { url: "stun:stun01.sipphone.com" },
    { url: "stun:stun.ekiga.net" },
    { url: "stun:stun.fwdnet.net" },
    { url: "stun:stun.ideasip.com" },
    { url: "stun:stun.iptel.org" },
    { url: "stun:stun.rixtelecom.se" },
    { url: "stun:stun.schlund.de" },
    { url: "stun:stun.l.google.com:19302" },
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun3.l.google.com:19302" },
    { url: "stun:stun4.l.google.com:19302" },
    { url: "stun:stunserver.org" },
    { url: "stun:stun.softjoys.com" },
    { url: "stun:stun.voiparound.com" },
    { url: "stun:stun.voipbuster.com" },
    { url: "stun:stun.voipstunt.com" },
    { url: "stun:stun.voxgratia.org" },
    { url: "stun:stun.xten.com" },
    {
      url: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
    {
      url: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
    {
      url: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
  ],
};

export default {
  name: "VideoArea",

  computed: {
    userTospeak() {
      return this.$store.state.var.userTospeak;
    },
  },
  data: () => ({
    call: "",
    peer: "",
    // videos
    videoAnswer: {
      video: undefined,
      remoteDesc: undefined,
      candidate: undefined,
      close: false,
    },
    myVideo: {},
    remoteVideo: {},
    // Media config
    constraints: {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
      video: {
        width: 450,
        height: 348,
      },
    },
    // local & remote video stream

    username: "",
  }),
  watch: {
    peer: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        if (this.peer) {
        }
      },
    },

    videoAnswer: function (newVal, oldVal) {
      const desc = newVal.remoteDesc;
      const candidate = newVal.candidate;
      const close = newVal.close;
      this.onAddStream();
      if (desc !== undefined && desc !== oldVal.remoteDesc) {
        this.setRemoteDescription(desc);
      }
      if (candidate !== undefined && candidate !== oldVal.candidate) {
        this.addCandidate(candidate);
      }
      if (close && close !== oldVal.close) {
        this.resetConnection();
      }
    },
  },
  async created() {},
  mounted() {
    this.myVideo = document.getElementById("myVideo");
    this.remoteVideo = document.getElementById("remoteVideo");
    this.peer = new Peer([this.$auth.user._id], [{ secure: true }]);
    this.peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    this.getUserMedia();
  },
  methods: {
    callFriend() {
      this.createOffer();
    },
    async handleAnser() {
      await this.setRemoteDescription(this.videoAnswer.remoteDesc);
      this.createAnswer();
    },
    async getUserMedia() {
      if ("mediaDevices" in navigator) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(
            this.constraints
          );
          this.myVideo.srcObject = stream;
          this.localStream = stream;
          this.call = this.peer.call(this.userTospeak._id, this.localStream);
          this.peer.on("call", function (call) {
            // Answer the call, providing our mediaStream
            call.answer(this.localStream);
            console.log("call", call);
          });
          this.call.on("stream", function (stream) {
            console.log("stream", stream);
            this.remoteVideo.srcObject = stream;
            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML video/canvas element.
          });
        } catch (error) {}
      }
    },
    getAudioVideo() {
      const video = this.localStream.getVideoTracks();
      const audio = this.localStream.getAudioTracks();
    },
    createPeerConnection() {
      this.pc = new RTCPeerConnection(this.configuration);
    },
    async createOffer() {
      try {
        const offer = await this.pc.createOffer(this.offerOptions);

        await this.pc.setLocalDescription(offer);

        this.sendSignalingMessage(this.pc.localDescription, true);
      } catch (error) {}
    },
    async createAnswer() {
      try {
        const answer = await this.pc.createAnswer();

        await this.pc.setLocalDescription(answer);

        this.sendSignalingMessage(this.pc.localDescription, false);
      } catch (error) {}
    },
    sendSignalingMessage(desc, offer) {
      const isOffer = offer ? "offer" : "answer";

      // send the offer to the other peer
      this.$socket.emit("privateMessagePCSignaling", {
        desc: desc,
        to: this.userTospeak._id,
        from: this.$auth.user._id,
      });
    },
    async setRemoteDescription(remoteDesc) {
      try {
        await this.pc.setRemoteDescription(remoteDesc);
      } catch (error) {}
    },
    onIceCandidates() {
      // send any ice candidates to the other peer
      this.pc.onicecandidate = ({ candidate }) => {
        this.$socket.emit("privateMessagePCSignaling", {
          candidate,
          to: this.userTospeak._id,
          from: this.$auth.user._id,
        });
      };
    },
    async addCandidate(candidate) {
      try {
        await this.pc.addIceCandidate(candidate);
      } catch (error) {}
    },

    onAddStream() {
      this.pc.onaddstream = (event) => {
        if (!this.remoteVideo.srcObject && event.stream) {
          this.remoteStream = event.stream;
          this.remoteVideo.srcObject = this.remoteStream;
        }
      };
    },
    addLocalStream() {
      this.pc.addStream(this.localStream);
    },
    resetConnection() {
      this.pc.close();
      this.pc = null;
      this.localStream.getTracks().forEach((track) => track.stop());
    },
    closeChat() {
      if (this.videoCall) this.resetVideoAnswer();
      this.videoCall = false;
      this.privateMessage = "";
    },
    openChat(description, from) {
      //open videochat (maybe ask before?)
      this.videoAnswer = {
        ...this.videoAnser,
        video: true,
        remoteDesc: description,
        from,
      };
      this.videoCall = true;
    },
    sendPrivateMessage(msg) {
      // Do not send empty messages
      if (
        typeof msg !== "object" &&
        this.privateMessage.replace(/\s/g, "").length === 0
      )
        return;

      this.$socket.emit("streamvideo", {
        privateMessage: msg,
        to: this.userTospeak._id,
        from: this.$auth.user._id,
      });
      this.privateMessage = "";
    },
    video(value) {
      this.videoCall = value;
      value
        ? (this.videoAnswer = { ...this.videoAnswer, video: !value })
        : this.resetVideoAnswer();
    },
    resetVideoAnswer() {
      this.videoAnswer = {
        ...this.videoAnswer,
        video: undefined,
        remoteDesc: undefined,
        candidate: undefined,
        close: false,
      };
      this.sendPrivateMessage({
        msg: `${this.$auth.user._id} has closed the video`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  position: relative;
  height: 100%;
  &__partner {
    height: 100%;
  }
  &__myself {
    top: 0;
    position: absolute;
    float: right;
    width: 130px;
    right: 0;
    height: 100px;
    z-index: 2;
  }
  &__spinner {
    width: 100% !important;
    height: 100% !important;
  }
}
#remoteVideo {
  border: 1px solid #192b41 !important;
}
</style>



















