<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container mt-4">
      <h2>Checkout</h2>
      <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control"
            placeholder="Enter your name"
            required
          />
          <div v-if="nameError" class="text-danger">{{ nameError }}</div>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone Number</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            class="form-control"
            placeholder="Enter your phone number"
            required
          />
          <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
        </div>
        <button type="submit" class="btn btn-success" :disabled="!isFormValid">
          Submit Order
        </button>
      </form>
      <div v-if="orderConfirmed" class="alert alert-success mt-3">
        Order submitted successfully!
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        phone: "",
        nameError: null,
        phoneError: null,
        orderConfirmed: false,
      };
    },
    computed: {
      isFormValid() {
        return this.name && this.phone && !this.nameError && !this.phoneError;
      },
    },
    methods: {
      validateName() {
        const nameRegex = /^[A-Za-z\s]+$/;
        this.nameError = nameRegex.test(this.name)
          ? null
          : "Name should only contain letters and spaces.";
      },
      validatePhone() {
        const phoneRegex = /^[0-9]+$/;
        this.phoneError = phoneRegex.test(this.phone)
          ? null
          : "Phone number should only contain numbers.";
      },
      handleSubmit() {
        this.validateName();
        this.validatePhone();
        if (this.isFormValid) {
          // Submit the order (e.g., call an API)
          console.log("Order submitted:", { name: this.name, phone: this.phone });
          this.orderConfirmed = true;
          // Clear the form
          this.name = "";
          this.phone = "";
        }
      },
    },
    watch: {
      name() {
        this.validateName();
      },
      phone() {
        this.validatePhone();
      },
    },
  };
  </script>
  
  <style scoped>
  .text-danger {
    font-size: 0.875rem;
  }
  </style>
  