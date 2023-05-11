<template>
  <nav class="h-screen p-0 bg-white border-r">
    <section class="flex flex-col gap-2 justify-between items-center h-full">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-center">
          <img src="../assets/facilita-delivery.png" class="max-w-none w-24">
        </div>
        <router-link :to="item.ref" class="flex text-sm flex-col justify-center items-center gap-1 rounded-3xl border-2 border-transparent py-4" exact-active-class="bg-red-500 text-white" v-for="item in items" :key="item">
          <i :class="item.icons" class="text-2xl"></i>
          <span class="text-xs tracking-wider font-bold">{{ item.name }}</span>
        </router-link>
      </div>
      <router-link to="/login" class="flex flex-col justify-center items-center w-32 h-32">
         <i class="bx bx-log-out-circle text-2xl"></i>
         <span class="tracking-wider text-xs font-bold">Sair</span>
      </router-link>
    </section>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      items: [
        { name: 'Cardápio', icons: 'bx bx-food-menu', ref: '/' },
        { name: 'Pedidos', icons: 'bx bx-clipboard', ref: '/orders'},
        { name: 'Mensagens', icons: 'bx bx-message-square-dots', ref: '/messages' },
      ]
    }
  }
}
</script>
