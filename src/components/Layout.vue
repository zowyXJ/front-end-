<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">School Activities</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link active">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cart" class="nav-link">Cart</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Slot for content -->
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Layout",
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  </style>
  