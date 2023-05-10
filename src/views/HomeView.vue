<template>
  <section class="flex justify-between">
    <NavBar></NavBar>
    <PaymentCart></PaymentCart>
  </section>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue';
import PaymentCart from '@/components/PaymentCart.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    PaymentCart
  }
}
</script>
