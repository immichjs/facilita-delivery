<template>
  <section class="flex justify-between bg-zinc-50">
    <NavBar></NavBar>
    <section class="flex-1">
      <CategoryHeader></CategoryHeader>
      <ChooseYourOrder></ChooseYourOrder>
    </section>
    <PaymentCart></PaymentCart>
  </section>
</template>

<script>
// @ is an alias to /src

import CategoryHeader from '@/components/CategoryHeader.vue';
import ChooseYourOrder from '@/components/ChooseYourOrder.vue';
import NavBar from '@/components/NavBar.vue';
import PaymentCart from '@/components/PaymentCart.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    PaymentCart,
    CategoryHeader,
    ChooseYourOrder
}
}
</script>
