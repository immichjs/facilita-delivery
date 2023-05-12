<template>
  <div class="flex flex-col items-start gap-4 flex-1 px-8 pt-8 pb-6">
    <h1 class="text-3xl font-bold text-zinc-700">Menu de <span class="font-extralight">Categorias</span></h1>

    <ul class="flex items-center gap-2 w-full">
      <li class="flex flex-col justify-center items-center gap-2 flex-1 border rounded-xl py-3 bg-white cursor-pointer hover:bg-zinc-50" v-for="item in items" :key="item">
         <span class="font-bold text-xs">{{ item.name }}</span>
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
