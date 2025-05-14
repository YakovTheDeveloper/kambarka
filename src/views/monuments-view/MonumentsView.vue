<template>
  <div class="container-bg container-padding">
    <Header title="Памятники природы"></Header>
    <div class="bg-alpha content">
      <Tabs :tabs="tabs" />
      <CardList>
        <Card v-for="card in 30" img="" title="asdasd"></Card>
      </CardList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/card/Card.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import CardList from '@/components/card/CardList.vue'
import Header from '@/views/shared/header/Header.vue'

const currentTab = ref('')

const tabs = [
  { value: 'Религиозные сооружения' },
  { value: 'Объекты музейного показа' },
  { value: 'Природные места' },
]
</script>

<style scoped lang="scss">
.content {
  padding: 40px;
  border-radius: 60px;
  display: flex;
  flex-direction: column;

  gap: 24px;
}
</style>
