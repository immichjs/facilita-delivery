<template>
  <section class="flex justify-between bg-zinc-50">
    <NavBar></NavBar>
    <CategoryHeader></CategoryHeader>
    <PaymentCart></PaymentCart>
  </section>
</template>

<script>
// @ is an alias to /src

import CategoryHeader from '@/components/CategoryHeader.vue';
import NavBar from '@/components/NavBar.vue';
import PaymentCart from '@/components/PaymentCart.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    PaymentCart,
    CategoryHeader
}
}
</script>
