<template>
  <section class="column is-9">
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>

    <div class="centerButton">
      <button @click="postBabble" class="button is-outlined buttonBet">
        <i class="mdi mdi-telegram mdi-36px"></i>
      </button>
    </div>
  </section>
</template>

<script>
import { sendForumReply } from "@/server/api";
export default {
  components: {},
  data() {
    return {
      postPost: false,
      babble: "",
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],

            [
              {
                header: [1, 2, 3, false],
              },
            ],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["image", "video"],
          ],
          imageResize: true,
        },
        placeholder: "...",
      },
    };
  },
  props: {
    forum: "",
  },
  computed: {
    langSelected() {
      return this.$store.state.var.langSelected;
    },
    connectedUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
  methods: {
    postBabble(babbleReply) {
      if (this.$store.state.auth.user && this.$store.state.auth.user._id) {
        this.babbleText = this.content;
        if (this.postPost === true) {
        } else {
          this.postPost = true;
          this.babbleUrl = this.uploadImage;
          sendForumReply(
            this.babbleText,
            this.forum._id,
            this.babbleUrl,
            this.babbleVideo
          ).then(() => {
            this.postPost = false;
            this.content = "";
            this.babbleText = "";
            this.uploadImage = "";
            this.babbleUrl = "";
            this.babbleVideo = "";
            this.$emit("changeBabbles");
          });
        }
      } else {
        this.$router.push(`/login`);
      }
      //.catch(next);
    },

    onEditorChange({ editor, html, text }) {
      if (html) {
        this.content = html;
        this.meta = text;
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.column {
  margin: auto;
}
div {
  background-color: #fff;
}
.field {
  margin-top: 0.75rem;
  background-color: #eef1f7;
}
.button {
  background-color: #192b41 !important;
  color: #fff !important;
  box-shadow: 0 0 0 0.125em #192b41 !important;
  border-color: #192b41 !important;
}
.button:hover,
.button:focus {
  background-color: #fff !important;
  border-color: #192b41 !important;
  color: #192b41 !important;
}
.centerButton {
  background-color: #eef1f7;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
}
section {
  padding: 0.1rem;
}
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
}
.quill-editor {
  max-height: fit-content;
  overflow-y: initial;
}
.level {
  background-color: #eef1f7 !important;
  padding-bottom: 0.5rem;
}
.level-left {
  display: flex;
  justify-content: FLEX-END;
  background-color: #eef1f7 !important;
}
@media (max-width: 1047px) {
  .column {
    padding: 0rem !important;
    padding-top: 0rem !important;
  }
  .level-left {
    display: flex;
    justify-content: FLEX-END;
    margin-top: 0px !important;
    margin-right: 5px;
  }
  .chartIcon {
    justify-content: baseline !important;
  }
  .fa {
    font-size: 1.5rem;
  }
  .uploadWrap {
    margin-top: 0.5rem !important;
  }
}
</style>

