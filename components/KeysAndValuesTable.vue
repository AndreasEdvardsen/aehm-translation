<template>
  <table>
    <thead>
      <tr>
        <th @click="sortByKey = !sortByKey" :class="{ sortBy: sortByKey }">
          Key <span v-if="sortByKey">*</span>
        </th>
        <th
          @click="sortByValue = !sortByValue"
          :class="{ sortBy: sortByValue }"
        >
          Value <span v-if="sortByValue">*</span>
        </th>
        <th>Translations</th>
        <th>Assignees</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="keyAndValue in sortedKeysAndValues"
        @click="navigateTo(`/keys-and-values/${keyAndValue.id}`)"
        :class="{ selected: keyAndValue.id === $route.params.id }"
      >
        <td>
          {{ keyAndValue.key }}
        </td>
        <td>
          {{ keyAndValue.texts.english }}
        </td>
        <td class="translations">
          <span
            v-for="(value, language) in keyAndValue.texts"
            :key="language"
            :class="{ translated: value.length > 0 }"
          >
            {{ language }}{{ value.length > 0 ? " ✓" : " " }}
          </span>
        </td>
        <td>
          <span v-for="(user, index) in keyAndValue.assignees" :key="user.name">
            {{ user.name
            }}{{ index < keyAndValue.assignees.length - 1 ? ", " : "" }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
const { data } = await useFetch("/api/keysAndValues");
const keysAndValues = useState("keysAndValues", () => ref(data));
const props = defineProps({
  searchString: {
    type: String,
    default: "",
  },
});
const sortByKey = ref(false);
const sortByValue = ref(false);
const sortedKeysAndValues = computed(() => {
  const kv = [...keysAndValues.value];
  let filteredElements = keysAndValues.value;
  if (sortByKey.value) {
    filteredElements = kv.sort((a, b) => {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
  } else if (sortByValue.value) {
    filteredElements = kv.sort((a, b) => {
      if (a.texts.english < b.texts.english) {
        return -1;
      }
      if (a.texts.english > b.texts.english) {
        return 1;
      }
      return 0;
    });
  }
  if (props.searchString.length > 0) {
    // filter by search string on key, assignees and texts
    filteredElements = filteredElements.filter((k) => {
      return (
        k.key.toLowerCase().includes(props.searchString.toLowerCase()) ||
        k.assignees
          .map((a) => a.name)
          .join(" ")
          .toLowerCase()
          .includes(props.searchString.toLowerCase()) ||
        Object.values(k.texts)
          .join(" ")
          .toLowerCase()
          .includes(props.searchString.toLowerCase())
      );
    });
  }
  return filteredElements;
});
</script>
<style lang="scss">
@import "../assets/variables.scss";

table {
  width: 100%;
  background-color: $background-color;
  border-radius: 4px;
  border: 2px solid $primary-color;
  border-collapse: collapse;

  thead {
    background-color: $primary-color;
    color: $background-color;
  }

  tr {
    td,
    th {
      text-align: left;
      padding: 0.5rem;
      font-weight: normal;
    }

    .sortBy {
      cursor: pointer;
      font-weight: bolder;
    }

    .translations {
      span {
        display: inline-block;
        margin-right: 1rem;
        font-weight: lighter;
        font-style: italic;

        &.translated {
          font-weight: bold;
          font-style: normal;
        }
      }
    }
  }

  .selected {
    background-color: $primary-color;
    color: $background-color;
  }

  tr:hover {
    background-color: $primary-color;
    color: $background-color;
    cursor: pointer;
  }
}
</style>
