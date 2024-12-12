<template>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ lesson.topic }}</h5>
          <p class="card-text">
            Location: {{ lesson.location }} <br />
            Price: ${{ lesson.price }} <br />
            Spaces: {{ lesson.spaces }}
          </p>
          <button
            class="btn btn-success"
            :disabled="lesson.spaces === 0"
            @click="addToCart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lesson: {
        type: Object,
        required: true,
      },
    },
    methods: {
      addToCart() {
        this.$emit("add-to-cart", this.lesson);
      },
    },
  };
  </script>
  