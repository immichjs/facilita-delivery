<template>
  <section class="flex flex-col gap-6 justify-between w-144 border-l p-8 bg-white">
    <h1 class="text-left font-bold text-2xl">Informações do <span class="font-extralight">Carrinho</span></h1>

    <ul class="flex flex-col gap-2 max-h-144 overflow-y-scroll" v-if="items.length">
      <li class="grid grid-cols-10 justify-between p-2 border-b first:border-t" v-for="(item, index) in items" :key="index">
        <div class="bg-zinc-50 flex justify-center items-center rounded-xl border">
          <img src="../assets/cheeseburger.png" class="w-28">
        </div>
        <div class="flex flex-col justify-center items-start col-span-4 pl-4">
          <strong class="text-md">{{ item.name }}</strong>
          <span class="text-zinc-500 text-sm">{{ formatCurrency(item.price) }} un.</span>
        </div>
        
        <div class="flex gap-2 justify-between items-center col-span-2">
          <button @click="decrementQuantity(index)" class="font-bold w-6 h-6 rounded-lg border hover:bg-zinc-50 cursor-pointer" :class="{ 'border-red-200 bg-red-50': item.quantity === 1 }" :disabled="item.quantity === 1">-</button>
          <strong class="bg-transparent flex items-center justify-center outline-none border border-transparent focus:border-amber-400 text-center">{{ item.quantity }}</strong>
          <button @click="incrementQuantity(index)" class="font-bold w-6 h-6 rounded-lg border" :class="{ 'border-red-200 bg-red-50': item.quantity === 15 }" :disabled="item.quantity === 15">+</button>
        </div>

        <span class="text-zinc-700 font-bold col-span-2 flex items-center justify-center">{{ formatCurrency(item.price * item.quantity) }}</span>
        
        <div class="flex items-center justify-center text-xl cursor-pointer hover:bg-zinc-50 border rounded-xl text-zinc-500 hover:text-red-600" @click="removeItemFromOrder(index)">
          <i class="bx bx-trash"></i>
        </div>
      </li>
    </ul>
    <strong v-else>Não possui nenhum item no seu carrinho.</strong>

    <div class="flex justify-between items-center px-4" v-if="!discount && items.length">
      <label for="discount" class="text-sm font-bold tracking-wide">Tem um cupom?</label>
      <div class="flex">
        <input type="text" id="discount" class="border py-1 rounded-tl-lg rounded-bl-lg outline-none focus:border-amber-400 px-2" maxlength="8" placeholder="Digite seu cupom" v-model="coupon">
        <button class="border border-l-0 p-2 text-sm font-bold rounded-tr-lg rounded-br-lg hover:bg-zinc-50" @click="applyCoupon()">Aplicar</button>
      </div>
    </div>

    <div class="w-full flex flex-col items-start  px-4 text-zinc-700" v-if="items.length">
      <h2 class="text-lg font-bold">Resumo de valores</h2>
      <section class="flex justify-between w-full mt-2">
        <div class="flex flex-col items-start gap-1">
          <strong>Sub total: </strong>
          <span>Taxa de entrega: </span>
          <span>Taxa de serviço: </span>
          <span class="text-green-500" v-if="discount">Desconto: </span>
          <strong>Total: </strong>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span>{{ items.length ? formatCurrency(calculateSubTotal()) : formatCurrency(0) }}</span>
          <span>{{ formatCurrency(deliveryTax) }}</span>
          <span>{{ formatCurrency(serviceTax) }}</span>
          <span class="text-green-500" v-if="discount">{{ formatCurrency(-discount) }}</span>
          <strong class="font-bold text-xl">{{ formatCurrency(calculateTotal) }}</strong>
        </div>
      </section>
    </div>

    <section class="flex flex-col gap-4 mt-auto">
      <button class="w-full bg-emerald-700 text-white text-lg py-4 rounded-md mt-auto font-bold" v-if="items.length">Escolher forma de pagamento</button>
    </section>

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
      deliveryTax: 5.0,
      discount: 0,
      coupon: ''
    }
  },
  computed: {
    calculateTotal() {
      return this.calculateSubTotal() + this.serviceTax + this.deliveryTax - this.discount 
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    incrementQuantity(index) {
      if (this.items[index].quantity >= 15) {
        alert('Limite máximo excedido.')
        return
      }
      this.items[index].quantity++
    },
    decrementQuantity(index) {
      if (this.items[index].quantity === 1) {
        alert('Não é possível reduzir a quantidade do pedido para 0.')
        return
      }
      this.items[index].quantity--
    },
    calculateSubTotal() {
      if (!this.items.length) {
        return
      }

      const subTotal = this.items.reduce((acc, next) => {
        return acc + (next.price * next.quantity)
      }, 0)

      return subTotal
    },
    removeItemFromOrder(index) {
      this.items.splice(index, 1)
    },
    applyCoupon() {
      if (this.coupon === 'AB34E9AS') {
        this.discount = 20
        this.coupon = ''
        alert('Cupom aplicado com sucesso.')
      } else {
        alert('Esse cupom não é válido.')
      }
    }
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
