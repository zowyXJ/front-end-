<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-4">
    <h2>Shopping Cart</h2>

    <!-- Cart Items -->
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in cart" :key="item.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.topic }}</h5>
            <p class="card-text">
              <strong>Location:</strong> {{ item.location }} <br />
              <strong>Price:</strong> ${{ item.price }} <br />
              <strong>Spaces:</strong> {{ item.spaces }}
            </p>
            <button
              class="btn btn-danger btn-sm"
              @click="removeFromCart(item)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <button
      class="btn btn-primary mt-3"
      :disabled="cart.length === 0"
      data-bs-toggle="modal"
      data-bs-target="#checkoutModal"
    >
      Checkout
    </button>

    <!-- Checkout Modal -->
    <div class="modal fade" id="checkoutModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Checkout</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="buyerName" class="form-label">Name</label>
                <input
                  type="text"
                  id="buyerName"
                  class="form-control"
                  v-model="buyer.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="buyerPhone" class="form-label">Phone</label>
                <input
                  type="tel"
                  id="buyerPhone"
                  class="form-control"
                  v-model="buyer.phone"
                  required
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="isLoading"
              @click="processCheckout"
            >
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from "@/store/cartStore";

export default {
  data() {
    return {
      cart: cartStore.cart, // Shared cart store
      buyer: {
        name: "",
        phone: "",
      },
      isLoading: false, // Tracks loading state
    };
  },
  methods: {
    // Remove an item from the cart
    removeFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index > -1) this.cart.splice(index, 1);
      alert(`${item.topic} removed from the cart.`);
    },

    // Reset buyer and cart state
    resetState() {
      this.buyer.name = "";
      this.buyer.phone = "";
      cartStore.cart = [];
    },

    // Process checkout and send order
    async processCheckout() {
      if (!this.buyer.name || !this.buyer.phone) {
        alert("Please fill in all buyer details.");
        return;
      }

      const lessonIds = this.cart.map((item) => item.topic);

      const orderData = {
        name: this.buyer.name,
        phone: this.buyer.phone,
        lessonIds,
      };

      this.isLoading = true;

      try {
        const response = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData), // Encode data as JSON
        });

        if (response.ok) {
          alert("Order submitted successfully!");
          this.resetState();
          document.querySelector("#checkoutModal .btn-close").click();
        } else {
          const error = await response.json();
          alert(`Error: ${error.message || "Unable to process your order."}`);
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.spinner-border {
  margin-right: 5px;
}
</style>
