<template>
  <section class="flex justify-between bg-zinc-50">
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
