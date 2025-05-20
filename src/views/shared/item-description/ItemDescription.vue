<template>
  <div class="description scrollbar scrollbar_white">
    <template v-for="item in items">
      <div class="col" v-if="columnNames.includes(item.title.toLowerCase())">
        <span class="title">{{ item.title }}</span>
        <span class="desc" v-html="item.description"></span>
      </div>
      <div class="row" v-else>
        <span class="title">{{ item.title }}</span>
        <span class="desc" v-html="item.description"></span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: { id: string; title: string; description: string }[]
}>()
const columnNames = ['описание']
</script>

<style scoped lang="scss">
.description {
  max-height: 1580px;
}

.row {
  display: grid;
  grid-template-columns: 882px 1fr;

  .desc,
  .title {
    border-bottom: 2px solid rgba(153, 153, 153, 1);
  }
}

.col {
  display: grid;
  grid-template-rows: auto auto;
}

.title {
  font-weight: 700;
  font-size: 48px;
  color: #fff;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
}

.desc {
  font-size: 48px;
  color: #fff;
  padding-top: 24px;
  padding-bottom: 24px;
}
</style>
