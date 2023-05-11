<template>
  <div class="flex flex-col items-start gap-4 flex-1 p-8">
    <h1 class="text-3xl font-bold text-zinc-700">Menu de <span class="font-extralight">Categorias</span></h1>

    <ul class="flex items-center gap-4 w-full">
      <li class="flex flex-col justify-center items-center gap-2 flex-1 border rounded-xl py-4 bg-white cursor-pointer hover:bg-zinc-50" v-for="item in items" :key="item">
         <div class="flex items-center justify-center border w-12 h-12 rounded-xl">
          <i class='bx bx-bowl-hot text-2xl'></i>
         </div>
         <span class="font-bold text-sm">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: 'Novidades' },
        { name: 'Salgados' },
        { name: 'Doces' },
        { name: 'Bebidas' },
        { name: 'Sorvetes' },
        { name: 'Saladas' },
      ]
    }
  }
}
</script>
