<template>
    <div class="row mb-3">
      <div class="col-md-6">
        <input
          type="text"
          v-model="localQuery"
          class="form-control"
          placeholder="Search lessons by topic, location, or price..."
          @input="updateQuery"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      query: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localQuery: this.query, // Initialize local state with the prop value
      };
    },
    methods: {
      updateQuery() {
        this.$emit("update:query", this.localQuery); // Emit the updated query to the parent
      },
    },
  };
  </script>
  