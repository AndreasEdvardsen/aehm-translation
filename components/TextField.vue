<template>
  <div class="text-field" :class="{ invalid: !isValid }">
    <label v-if="label?.length > 0" :for="id"
      >{{ label.charAt(0).toUpperCase() + label.slice(1) }}
      <span v-if="required"> *</span></label
    >
    <input
      :id="id"
      :type="type"
      v-model="localValue"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
});
const emit = defineEmits(["update:modelValue"]);
const id = "text-field-" + Math.random().toString(36).substr(2, 9);
const localValue = ref(props.modelValue);
const isValid = ref(!(props.required && localValue.value.length === 0));

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  },
);

watch(localValue, (newValue) => {
  isValid.value = !(props.required && newValue.length === 0);
  emit("update:modelValue", newValue);
});
</script>

<style lang="scss">
@import "../assets/variables.scss";

.text-field {
  label {
    display: block;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    background-color: $primary-color;
    padding: 0.5rem;
    font-size: 1rem;

    border: none;
    border-radius: $border-radius;
  }

  input:focus {
    outline: 2px solid white;
  }

  &.invalid {
    color: $error-color;

    input {
      outline: 2px solid $error-color;
    }

    input:focus {
      outline: 3px solid $error-color;
    }
  }
}
</style>
