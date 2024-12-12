<template>
  <div class="container mt-4">
    <h2>Available Lessons</h2>

    <div class="row">
      <!-- Filters Section -->
      <div class="col-md-3">
        <div class="card p-3">
          <h5>Sort Lessons</h5>
          <div class="form-group mb-3">
            <label for="sortAttribute">Sort By</label>
            <select
              id="sortAttribute"
              class="form-control"
              v-model="sortAttribute"
            >
              <option value="subject">Subject</option>
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="spaces">Spaces</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label>Order</label>
            <div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  id="ascending"
                  class="form-check-input"
                  value="asc"
                  v-model="sortOrder"
                />
                <label for="ascending" class="form-check-label">Ascending</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  id="descending"
                  class="form-check-input"
                  value="desc"
                  v-model="sortOrder"
                />
                <label for="descending" class="form-check-label">Descending</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lessons Section -->
      <div class="col-md-9">
        <SearchBar v-model:query="searchQuery" />

        <div class="row">
          <LessonCard
            v-for="lesson in sortedAndFilteredLessons"
            :key="lesson.id"
            :lesson="lesson"
            @add-to-cart="addToCart"
          />
        </div>

        <div v-if="sortedAndFilteredLessons.length === 0" class="text-center mt-4">
          <p>No lessons match your search criteria.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from "./SearchBar.vue";
import LessonCard from "./LessonCard.vue";
import { cartStore } from "@/store/cartStore";

export default {
  components: {
    SearchBar,
    LessonCard,
  },
  data() {
    return {
      lessons: [],
      searchQuery: "",
      sortAttribute: "subject", // Default sorting attribute
      sortOrder: "asc", // Default sorting order
    };
  },
  computed: {
    sortedAndFilteredLessons() {
      let filtered = this.lessons.filter((lesson) => {
        const query = this.searchQuery.toLowerCase();
        const topic = lesson.topic ? lesson.topic.toLowerCase() : "";
        const location = lesson.location ? lesson.location.toLowerCase() : "";
        const price = lesson.price ? lesson.price.toString() : "";

        return (
          topic.includes(query) ||
          location.includes(query) ||
          price.includes(query)
        );
      });

      return filtered.sort((a, b) => {
        let valA = a[this.sortAttribute] || "";
        let valB = b[this.sortAttribute] || "";

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (this.sortOrder === "asc") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
    },
  },
  methods: {
    async fetchLessons() {
      try {
        const response = await fetch("http://localhost:3000/lessons");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        this.lessons = data;
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    },
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        cartStore.cart.push(lesson);
        lesson.spaces--;
        alert(`${lesson.topic} added to cart.`);
      }
    },
  },
  created() {
    this.fetchLessons();
  },
};
</script>
