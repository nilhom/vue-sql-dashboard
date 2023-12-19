<template>
  <div class="DataContainer">
    <div class="containerHeader">
      <div class="header">
        <h1 v-if="!isEditing" class="headerText" @click="startEditing">{{ this.headerText }}</h1>
        <input v-if="isEditing" v-model="editableHeaderText" @blur="stopEditing" @keyup.enter="stopEditing" class="headerInput" />
        <button @click="editSQL" class="headerButton">Edit SQL</button>
        <select v-model="selectedBarComponent" class="headerButton">
          <option value="VerticalChart">Vertical Chart</option>
          <option value="HorizontalChart">Horizontal Chart</option>
        </select>
        <button @click="deleteContainer" class="deleteButton headerButton">Delete</button>
      </div>
      <textarea
          v-if="isEditingSQL"
          v-model="editableSQL"
          @keyup.enter="saveSQL"
          @keyup.esc="cancelSQL"
          @blur="saveSQL"
          class="sqlInput"
      ></textarea>
    </div>
    <div class="containerContent">
      <component :is=this.selectedBarComponent :sql_query=this.currentSQLQuery  style="width: 100%; height: 100%"/>
    </div>
  </div>
</template>


<script>
import HorizontalChart from "./HorizontalChart.vue";
import VerticalChart from "./VerticalChart.vue";

export default {
  data() {
    return {
      isEditing: false,
      editableHeaderText: "",
      headerText: "click to set name",
      isEditingSQL: false,
      editableSQL: "",
      currentSQLQuery: "",
      originalSQL: "",
      selectedBarComponent: "HorizontalChart"
    };
  },
  props: {
    containerId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    HorizontalChart,
    VerticalChart
  },
  methods: {
    editSQL() {
      this.isEditingSQL = true;
      this.originalSQL = this.sql_query;
      this.editableSQL = this.currentSQLQuery
    },
    saveSQL() {
      this.isEditingSQL = false;
      this.currentSQLQuery = this.editableSQL
    },
    cancelSQL() {
      this.isEditingSQL = false;
      this.currentSQLQuery = this.originalSQL;
    },
    deleteContainer() {
      this.$emit("delete-container", this.containerId);
    },
    startEditing() {
      this.isEditing = true;
      this.editableHeaderText = this.headerText;
    },
    stopEditing() {
      this.isEditing = false;
      this.headerText = this.editableHeaderText;
    },
    saveState() {
      return {
        isEditing: this.isEditing,
        editableHeaderText: this.editableHeaderText,
        headerText: this.headerText,
        isEditingSQL: this.isEditingSQL,
        editableSQL: this.editableSQL,
        currentSQLQuery: this.currentSQLQuery,
        originalSQL: this.originalSQL,
        selectedBarComponent: this.selectedBarComponent,
      };
    },
    loadState(state) {
      Object.assign(this.$data, state);
    }
  }
};
</script>

<style scoped>
.DataContainer {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 10px;
  border-radius: 20px;
  height: 100%;
  width: 100%;
}

.containerHeader {
  margin: 10px;
}

.containerContent {
  width: 100%;
  height: 100%;
}

.headerText {
  font-family: 'Candara', sans-serif;
  color: #f8f8f8;
  font-weight: bold;
}

.header {
  display: flex;
  align-items: center;
}

.headerButton {
  margin-left: auto;
  margin-right: 10px;
  opacity: 0;
}

.deleteButton {
  background-color: red;
  color: white;
}

.DataContainer:hover .headerButton {
  opacity: 1;
}

.headerInput {
  font-family: 'Candara', sans-serif;
  color: #ffffff; /* Set the text color to black */
  font-weight: bold;
  font-size: 2em; /* Set the font size to match h1 */
  border: none; /* Remove the border for a cleaner look */
  outline: none; /* Remove the default input outline */
  background-color: transparent; /* Make the background transparent */
  width: auto; /* Allow the input to expand based on content */
}

.sqlInput {
  width: 100%;
  height: 100px; /* Adjust the height based on your design */
  margin-top: 10px;
}

</style>
