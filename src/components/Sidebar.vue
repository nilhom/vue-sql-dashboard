<template>
  <div class="sidebar">
    <h1 style="text-align: center; color: white">Tables</h1>
    <div class="sidebar-content">
      <div class="filler"></div>
      <div class="buttonContainer">
        <div v-for="(tableName, index) in tableNames" :key="tableName">
          <div class="button-wrapper">
            <div
                class="indicator"
                :class="{ 'show-indicator': index === selectedTableIndex }"
            ></div>
            <button
                class="button"
                :class="{ 'selected': index === selectedTableIndex }"
                @click="clickedOnTable(index)"
            >
              {{ tableName }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sidebar',
  data() {
    return {
      tableNames: [],
      selectedTableIndex: 0,
    };
  },
  mounted() {
    axios.post('http://localhost:3000/api/query', {
      sql: 'SELECT name FROM sqlite_master WHERE type="table" ',
    })
        .then(response => {
          var tables = []
          tables = response.data.data;
          tables = tables.map(tableName => tableName.name)
          tables = tables.filter(tableName => tableName !== 'log')
          this.tableNames = tables
          this.$emit('newTableSelected', this.tableNames[0]);
        })
        .catch(error => {
          console.error('Error fetching table names:', error);
        });
  },
  methods: {
    clickedOnTable(tableIndex) {
      this.selectedTableIndex = tableIndex;
      this.$emit('newTableSelected', this.tableNames[tableIndex]);
      //this.fetchData(this.selectedTable);
    },
    fetchData(tableName) {
      console.log('Fetching data for table:', tableName);
      // You can perform additional logic here to fetch data for the selected table
    },
  },
};
</script>


<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  bottom: -100px;
  width: 180px;
  background: #1d1f23;
  z-index: 98;
  left: 0;
}

.sidebar-content {
  left: 50px;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  z-index: 99;
}

.button {
  margin: 0;
  position: relative;
  display: flex;
  font-size: 17px;
  height: 40px;
  width: 190px;
  opacity: 0.25;
  color: white;
  text-align: center;
  background: rgb(29, 31, 35);
  border: 10px;
  cursor: pointer;
  line-height: 40px;

  &.selected {
    color: #fff;
    opacity: 1;
    background: #191a1e;
  }
}

.button:hover {
  color: #fff;
  opacity: 1;
  background: #191a1e;
}

.filler {
  height: 10px;
  visibility: hidden;
}

.buttonContainer {
  overflow: auto;
  max-height: 100vh;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.indicator {
  width: 3px;
  height: 35px;
  background-color: #2b8383;
  opacity: 0;

  &.show-indicator {
    opacity: 1;
  }
}

</style>
