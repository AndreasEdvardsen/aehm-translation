<template>
  <table>
    <thead>
      <tr>
        <th
          :id="idPrefix + '-entry-th-1'"
          @click="sortByKey = !sortByKey"
          :class="{ sortBy: sortByKey }"
        >
          Key <span v-if="sortByKey">*</span>
        </th>
        <th
          :id="idPrefix + '-entry-th-2'"
          @click="sortByValue = !sortByValue"
          :class="{ sortBy: sortByValue }"
        >
          Value <span v-if="sortByValue">*</span>
        </th>
        <th :id="idPrefix + '-entry-th-3'">Translations</th>
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
            {{ languageNameToPrefix(language as string)
            }}{{ value.length > 0 ? " ✓" : " " }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Entry } from "~/utils/globals";
import type { PropType } from "vue";

const sortByKey = ref(false);
const sortByValue = ref(false);
const props = defineProps({
  entries: {
    type: Array as PropType<Entry[]>,
    required: false,
  },
  searchString: {
    type: String,
    required: false,
    default: "",
  },
  idPrefix: {
    type: String,
    required: false,
    default: "",
  },
});
const sortedKeysAndValues = computed(() => {
  if (!props.entries) return [];
  const kv = [...props.entries];
  let filteredElements = props.entries;

  if (sortByKey.value) filteredElements = sortEntriesByKey(kv);
  else if (sortByValue.value) filteredElements = sortByTextValue(kv);
  if (props.searchString.length > 0)
    filteredElements = sortEntriesByString(
      filteredElements,
      props.searchString,
    );

  return filteredElements;
});

function sortByTextValue(entries: Entry[]) {
  return entries.sort((a, b) => {
    if (a.texts.english < b.texts.english) {
      return -1;
    }
    if (a.texts.english > b.texts.english) {
      return 1;
    }
    return 0;
  });
}

function sortEntriesByKey(entries: Entry[]) {
  return entries.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  });
}

function sortEntriesByString(entries: Entry[], string: string) {
  return entries.filter((k) => {
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

function languageNameToPrefix(languageName: string) {
  switch (languageName) {
    case "english":
      return "ENG";
    case "norwegian":
      return "NO";
    default:
      return "not supported";
  }
}
</script>

<style scoped lang="scss">
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
