<template>
  <div id="app">
    <!-- Header Section -->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
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
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cart" class="nav-link">Cart</router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link to="/checkout" class="nav-link">Checkout</router-link>
              </li> -->
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="mt-4">
      <router-view />
    </main>

    <!-- Footer Section -->
    <footer class="text-center bg-light py-3 mt-4">
      <p>&copy; 2024 School Activities. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global styles for the app */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

header {
  margin-bottom: 1rem;
}

footer {
  background-color: #e9ecef;
  color: #6c757d;
}
</style>
