<template>
  <section class="flex flex-col gap-8 justify-between w-120 border-l p-8">
    <h1 class="text-left font-bold text-2xl">Informações do <span class="font-extralight">Pedido</span></h1>

    <ul class="flex flex-col gap-8 max-h-144 overflow-y-scroll">
      <li class="grid grid-cols-8 justify-between h-12" v-for="(item, index) in items" :key="index">
        <div class="bg-amber-50 flex justify-center items-center rounded-xl">
          <img src="../assets/cheeseburger.png" class="w-28">
        </div>
        <div class="flex flex-col justify-center items-start col-span-4 pl-4">
          <strong class="text-md">{{ item.name }}</strong>
          <span class="text-zinc-500">{{ currencyToBRL(item.price) }} un.</span>
        </div>
        <input type="number" class="flex items-center justify-center outline-none border border-transparent focus:border-amber-400 text-center" v-model="items[index].quantity">
        <span class="text-zinc-500 font-bold col-span-2 flex items-center justify-center">{{ currencyToBRL(item.price * item.quantity) }}</span>
      </li>
    </ul>
    <div class="w-full flex flex-col items-end px-4 text-zinc-500">
      <h2 class="text-lg font-bold">Resumo de valores</h2>
      <span >Sub total: {{ currencyToBRL(calculateSubTotal()) }}</span>
      <span >Taxa de entrega: {{ currencyToBRL(deliveryTax) }}</span>
      <span >Taxa de serviço: {{ currencyToBRL(serviceTax) }}</span>
      <span class="text-amber-500">Total: <strong class="font-extrabold">{{ currencyToBRL(calculateTotal) }}</strong></span>
    </div>
    
    <button class="w-full bg-emerald-700 text-white text-lg py-4 rounded-md mt-auto font-bold">Pagar</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Cheeseburger',
          quantity: 1,
          price: 29.90
        },
        {
          id: 1,
          name: 'Cheeseburger',
          quantity: 1,
          price: 29.90
        },
      ],
      serviceTax: 1.0,
      deliveryTax: 5.0
    }
  },
  computed: {
    calculateTotal() {
      return this.calculateSubTotal() + this.serviceTax + this.deliveryTax
    }
  },  
  methods: {
    calculateSubTotal() {
      return this.items.reduce((acc, next) => (acc.price * acc.quantity) + (next.price * next.quantity))
    },
    currencyToBRL(price) {
      return `R$ ${price.toFixed(2)}`.replace('.', ',')
    },
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d1d1;
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b1b1b1;
}
</style>