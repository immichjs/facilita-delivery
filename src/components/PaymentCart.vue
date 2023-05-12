<template>
  <section class="flex flex-col gap-6 justify-between w-120 border-l p-8 bg-white">
    <div class="flex justify-between items-center">
      <h1 class="text-left font-bold text-xl">Informações do <span class="font-extralight">Carrinho</span></h1>
      <button class="text-xs border p-1 px-3 rounded text-zinc-400 mr-4" @click="clearFullCart()">Limpar</button>
    </div>

    <ul class="flex flex-col gap-2 max-h-60 overflow-y-scroll font-mono" v-if="items.length">
      <li class="grid grid-cols-10 justify-between p-2 border-b first:border-t" v-for="(item, index) in items" :key="index">
        <div class="bg-amber-50 flex justify-center items-center rounded-xl border">
          <img src="../assets/cheeseburger.png" class="w-28">
        </div>
        <div class="flex flex-col justify-center items-start col-span-4 pl-4">
          <strong class="text-left text-sm w-32 truncate">{{ item.name }}</strong>
          <span class="text-violet-400 text-xs">{{ formatCurrency(item.price) }} un.</span>
        </div>
        
        <div class="flex gap-2 justify-between items-center col-span-2 text-xs">
          <button @click="decrementQuantity(index)" class="font-bold w-5 h-5 rounded border hover:bg-zinc-50 cursor-pointer" :class="{ 'border-red-200 bg-red-50': item.quantity === 1 }" :disabled="item.quantity === 1">-</button>
          <strong class="bg-transparent flex items-center justify-center outline-none border border-transparent focus:border-amber-400 text-center  font-extralight">{{ item.quantity }}</strong>
          <button @click="incrementQuantity(index)" class="font-bold w-5 h-5 rounded border" :class="{ 'border-red-200 bg-red-50': item.quantity === 15 }" :disabled="item.quantity === 15">+</button>
        </div>

        <span class="text-zinc-700 font-bold col-span-2 flex items-center justify-center text-xs">{{ formatCurrency(item.price * item.quantity) }}</span>
        
        <div class="flex items-center justify-center cursor-pointer rounded-xl text-zinc-500 hover:text-red-600" @click="removeItemFromOrder(index)">
          <i class="bx bx-x"></i>
        </div>
      </li>
    </ul>
    <strong v-else>Não possui nenhum item no seu carrinho.</strong>

    <div class="flex justify-between items-center px-4" v-if="!discount && items.length">
      <label for="discount" class="text-xs font-bold">Tem um cupom?</label>
      <div class="flex">
        <input type="text" id="discount" class="text-xs border py-0.5 rounded-tl rounded-bl outline-none focus:border-amber-400 px-2" maxlength="8" placeholder="Digite seu cupom" v-model="coupon">
        <button class="border border-l-0 py-1 px-2 text-xs font-mono font-bold rounded-tr rounded-br hover:bg-zinc-50" @click="applyCoupon()">OK</button>
      </div>
    </div>

    <div class="w-full flex flex-col items-start px-4 text-zinc-700" v-if="items.length">
      <h2 class="font-bold">Resumo de valores</h2>
      <section class="flex justify-between w-full mt-2">
        <div class="text-sm flex flex-col items-start gap-1">
          <strong>Sub total: </strong>
          <span>Taxa de entrega: </span>
          <span>Taxa de serviço: </span>
          <span class="text-green-500" v-if="discount">Desconto: </span>
          <strong>Total: </strong>
        </div>
        <div class="text-sm flex flex-col items-end gap-1">
          <span>{{ items.length ? formatCurrency(calculateSubTotal()) : formatCurrency(0) }}</span>
          <span>{{ formatCurrency(deliveryTax) }}</span>
          <span>{{ formatCurrency(serviceTax) }}</span>
          <span class="text-green-500" v-if="discount">{{ formatCurrency(-discount) }}</span>
          <strong class="font-bold text-base">{{ formatCurrency(calculateTotal) }}</strong>
        </div>
      </section>
    </div>

    <section class="flex flex-col gap-4 mt-auto">
      <button class="w-full bg-violet-700 hover:bg-violet-800 text-white text-xs py-4 rounded-md mt-auto font-bold" v-if="items.length">Escolher forma de pagamento</button>
    </section>

  </section>
</template>

<script>
import formatCurrency from '@/mixins/formatCurrency';
import { toast } from 'vue3-toastify';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      serviceTax: 1.0,
      deliveryTax: 5.0,
      discount: 0,
      coupon: ''
    }
  },
  mixins: [formatCurrency],
  computed: {
    ...mapGetters({ items: 'checkoutItems' }),
    calculateTotal() {
      return this.calculateSubTotal() + this.serviceTax + this.deliveryTax - this.discount 
    }
  },
  methods: {
    ...mapMutations(['removeItem', 'clearCart']),
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
      const confirm = window.confirm('Deseja remover esse item do seu pedido?')
      
      if (!confirm) {
        return
      }

      this.removeItem(index)
      toast.warn('Um item foi removido do seu carrinho', { autoClose: 2000, position: 'top-center', theme: 'colored' })
    },
    applyCoupon() {
      if (this.coupon === 'AB34E9AS') {
        this.discount = 20
        this.coupon = ''
        toast.success('Cupom aplicado com sucesso.', { autoClose: 2000, position: 'top-center', theme: 'colored' })
      } else {
        toast.error('Esse cupom não é válido.', { autoClose: 2000, position: 'top-center', theme: 'colored' })
      }
    },
    clearFullCart() {
      const confirm = window.confirm('Deseja limpar todo o carrinho?')

      if (!confirm) {
        return
      }

      this.clearCart()
      toast.success('Seu carrinho foi limpo.', { autoClose: 2000, position: 'top-center', theme: 'colored' })
    }
  }
}
</script>


