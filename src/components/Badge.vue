<template>
  <div class="badge">
    <span class="font-bold">{{ badge }}</span>
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    badge: Number
  }
};
</script>

<style scoped>
.badge {
  color: black;
  font-size: 16px;
  background-color: white;
  width: 23px;
  height: 23px;
  border-radius: 12px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
