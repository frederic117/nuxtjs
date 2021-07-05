<template>
  <div v-if="$auth.user && $auth.user._id">
    <section v-if="connectedUser.role === 'admin'" class="main">
      <h1 class="title">List of sources (RSS,...)</h1>
      <nuxt-link to="/admin/news">Go to News list</nuxt-link>
      <br />
      <button type="button" @click="addNewSource()" name="button">
        Add a source
      </button>
      <br />
      <table>
        <tr>
          <th>SOURCE TYPE</th>
          <th>CATEGORY</th>
          <th>URL</th>
          <th>LANG</th>
          <th>DELETE</th>
        </tr>
        <tr v-for="(source, index) in sources" :key="index">
          <td>
            <span data-replace="Symbol">
              <strong>{{ source.sourceType }}</strong>
            </span>
          </td>
          <td>{{ source.category }}</td>
          <td>{{ source.url }}</td>
          <td>{{ source.lang }}</td>
          <td>
            <button
              type="button"
              @click="deleteASource(source._id)"
              name="button"
            >
              Delete
            </button>
          </td>
        </tr>
      </table>
      <b-modal :active.sync="isSourceCreatingActive">
        <div class="mediaModal">
          <h1 class="modalTitle">Create a new source !</h1>

          <div class="card profile-card">
            <div class="card-content column is-6 is-center" id="ActionCard">
              <div>
                <span>sourceType:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="sourceModal.sourceType"
                />
                <br />
                <hr />
                <span>category:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="sourceModal.category"
                />
                <br />
                <hr />
                <span>url:</span>
                <br />
                <input class="location" type="text" v-model="sourceModal.url" />
                <br />
                <hr />
                <span>lang:</span>
                <br />
                <input
                  class="location"
                  type="text"
                  v-model="sourceModal.lang"
                />
                <br />
                <hr />

                <div class="centerButton">
                  <button
                    id="adWL"
                    class="button is-small is-outlined is-primary"
                    @click="saveCreate()"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import { getAllSources, deleteSource, createSource } from "@/server/apiAdmin";

export default {
  components: {
    //// none
  },
  data() {
    return {
      sources: {},
      isSourceCreatingActive: false,
      sourceModal: {},
    };
  },
  mounted() {
    if (this.connectedUser.role != "admin") {
      this.$router.push(`/`);
    } else {
      getAllSources().then((sources) => {
        if (sources === "unauthorized") {
          this.$router.push("/404");
        } else {
          this.sources = sources;
        }
      });
    }
    //.catch(next);
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
  methods: {
    deleteASource: function (sourceId) {
      deleteSource(sourceId).then((data) => {
        getAllSources().then((sources) => {
          this.sources = sources;
        });
        //.catch(next);
      });
    },
    addNewSource() {
      this.isSourceCreatingActive = true;
    },
    saveCreate() {
      createSource(this.sourceModal).then((data) => {
        getAllSources().then((sources) => {
          if (sources === "unauthorized") {
            this.$router.push("/404");
          } else {
            this.sources = sources;
            this.isSourceCreatingActive = false;
          }
        });
      });
      //.catch(next);
    },
  },
};
</script>

<style scoped>
tr {
  margin: 25px;
  padding: 10px 30px;
}

.btn-red {
  margin: 30px;
  padding-left: 30px;
  padding-right: 30px;
  color: #fff !important;
  background-color: #eb412d !important;
  box-shadow: 0 0 0 0.125em#eb412d !important;
  border-color: #eb412d !important;
  font-weight: bolder;
  font-size: 1.2rem;
}

th {
  margin: 25px 10px 25px 60px;
  padding: 10px;
  background-color: #bdbdbd;
}

.title {
  font-size: 100%;
  font-weight: bold;
  font-style: ITALIC;
}
.insider {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
a {
  color: #192b41;
}
#no {
  text-align: CENTER;
  margin-top: 5%;
  font-weight: bold;
  color: #192b41;
}
.main {
  background-color: #eef1f7 !important;
  padding: 7rem 1.5rem;
}
.container {
  display: flex;
}

.navbar.is-dark {
  background-color: #192b41 !important;
  color: #eef1f7 !important;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #eef1f7 !important;
  border-bottom-style: solid !important;
  border-bottom-width: 3px !important;
  color: #eef1f7 !important;
  padding-bottom: calc(0.5rem - 3px) !important;
}
.babblesMenu {
  display: flex;
  overflow: auto;
}

.image {
  margin-right: 20px !important;
}

@media (max-width: 1047px) {
  .main {
    padding-top: 0.5rem !important;
  }
  .icon {
    height: 1.5em !important;
    width: 1.5em !important;
  }
  .control {
    height: 30px !important;
  }
  .navbar.is-dark {
    margin-bottom: 3% !important;
  }
}
</style>
