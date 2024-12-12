<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Layout>
    <!-- Welcome Section -->
    <div class="jumbotron text-center mt-4">
      <h1 class="display-4">Welcome to School Activities!</h1>
      <p class="lead">
        Browse and book after-school classes and activities for students and parents.
      </p>
      <router-link to="/cart" class="btn btn-primary btn-sm">View Cart</router-link>
    </div>

    <!-- Lesson List Component -->
    <LessonList />
  </Layout>
</template>

<script>
import LessonList from "../components/LessonList.vue";

export default {
  components: {
    LessonList,
  },
};
</script>

<style scoped>
.jumbotron {
  background-color: #f8f9fa;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
}
</style>
