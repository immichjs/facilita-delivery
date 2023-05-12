<template>
  <section class="flex-1 flex flex-col gap-4 items-start px-8">
    <h1 class="text-zinc-800 text-2xl font-bold">Escolha seu <span class="font-extralight">Pedido</span></h1>

    <ul class="grid grid-cols-4 gap-2 gap-y-6 w-full max-h-108 overflow-auto">
      <li class="flex-1 flex-col gap-2 bg-white rounded-xl border p-2 cursor-pointer" v-for="(item, index) in items" :key="item" @click="addNewItem(item, index)">
        <div class="flex items-center justify-center bg-amber-50 border rounded-xl py-4">
          <img :src="item.image" width="70">
        </div>
        <div class="flex flex-col items-center text-xs mt-2 relative gap-1">
          <span class="font-bold">{{ item.name }}</span>
          <strong class="text-sm font-bold font-mono bg-purple-700 text-white rounded-full px-2">{{ formatCurrency(item.price) }}</strong>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import formatCurrency from '@/mixins/formatCurrency';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cheeseburger.png/1024px-Cheeseburger.png',
          name: 'Cheeseburger',
          ingredients: ['90g Hamburger', 'Queijo', 'Alface'],
          quantity: 1,
          price: 29.90
        },
        {
          id: 2,
          image: 'https://yata.s3-object.locaweb.com.br/8864d477074e316293156eda62063a3e83b5fc7c844469c6e068f694509e4b22',
          name: 'Salad',
          ingredients: ['90g Hamburger', 'Queijo', 'Alface', 'Cebola', 'Tomate', 'Picles', 'Ketchup', 'Mostarda'],
          quantity: 1,
          price: 24.90
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['checkoutItems']),
  },
  mixins: [formatCurrency],
  methods: {
    ...mapMutations(['addItem']),
    addNewItem(item, index) {
      toast.clearAll()
      index
      
      this.addItem({ ...item })
    }
  }
}
</script>
