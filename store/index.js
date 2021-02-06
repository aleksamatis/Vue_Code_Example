export const state = () => ({
  savedRecords: null
});

export const getters = {
  savedCount(state) {
    if (state.savedRecords) {
      return state.savedRecords.length;
    }
    return 0;
  }
};

export const mutations = {
  removeSavedRecord(state, id) {
    state.savedRecords = state.savedRecords.filter(record => record.id != id);
  },
  setSaved(state, saved) {
    state.savedRecords = saved;
  },
};

export const actions = {
  fetchSavedRecords({
    commit,
  }) {
    return this.$axios
      .get("/api/saved")
      .then((res) => {
        return res.data;
      }).then(savedRecords => {
        return this.$axios.get("/api/blog.json").then(result => {
          const allRecords = result.data.records;
          const filteredRecords = allRecords.filter(record => savedRecords.content.indexOf(record.id) != -1);
          commit('setSaved', filteredRecords);
        })
      }).catch(err => {
        console.log(err);
        return {
          content: []
        };
      });
  },
  removeSavedRecord({commit}, {id}) {
    return this.$axios.delete('/api/saved/' + id).then(result => {
      commit('removeSavedRecord', id);
    })
  },
  addSavedRecord({commit, dispatch}, {id}) {
    return this.$axios.post('/api/saved/' + id).then(result => {
      return dispatch('fetchSavedRecords');
    })
  },
};
