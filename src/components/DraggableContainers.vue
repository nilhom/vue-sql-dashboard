<template>
  <div id="DraggableContainers">
    <!-- Add Item Button -->
    <div class="floating-button" @click="addItem">
      <span class="circle">+</span>
    </div>

    <!-- Edit Mode Button -->
    <div class="floating-button3" @click="changeEditMode">
      <span class="circle">Edit</span>
    </div>

    <!-- Debug Button -->
    <div style="opacity: 0" class="debug-button" @click="debug">
      <span class="circle">{}</span>
    </div>

    <!-- Dashboard and Layout Components -->
    <dashboard :id="'dashTest'" @currentBreakpointUpdated="updateCurrentBreakpoint">
      <Dash-Layout
          v-for="layout in layouts"
          :key="layout.breakpoint"
          v-bind="layout"
          :rowHeight="rowHeight"
          :colWidth="colWidth"
          :maxColWidth="maxColWidth"
          :minColWidth="minColWidth"
          :maxRowHeight="maxRowHeight"
          :minRowHeight="minRowHeight"
          :compact="compact"
          :margin="margin"
          :debug="true"
      >
        <!-- Dash-Item Components -->
        <Dash-Item
            v-for="item in layout.items"
            :id="item.id"
            v-model:id="item.id"
            :x="item.x"
            v-model:x="item.x"
            :y="item.y"
            v-model:y="item.y"
            :width="item.width"
            v-model:width="item.width"
            :height="item.height"
            v-model:height="item.height"
            :headerText="item.headerText"
            v-model:headerText="item.headerText"
            :sql_query="item.sql_query"
            v-model:sql_query="item.sql_query"
            :bar_type="item.bar_type"
            v-model:bar_type="item.bar_type"
            :newTableSelected="newTableSelected"
            :locked="item.locked"
            :key="item.id"
            :resizable="resizable"
            :draggable="draggable"
            :maxWidth="3"
            :moveHold="moveHold"
            :dragAllowFrom="allowFrom"
            :dragIgnoreFrom="ignoreFrom"
            @delete-container="deleteItem(item.id)"
        ></Dash-Item>
      </Dash-Layout>
    </dashboard>
  </div>
</template>

<script>
import DashItem from "./DashItem.vue";
import DashLayout from "./DashLayout.vue";
import Dashboard from "./Dashboard.vue";
import DataContainer from "./DataContainer.vue";
import {apiMixin} from "../apiMixin.js";
import {loadStateFromServer, saveStateToServer} from "../apiCall.js";
import * as apiCall from "../apiCall.js";
export default {
  props: {
    newTableSelected: String,
  },
  mixins: [apiMixin],
  name: "DraggableContainers",
  components: {
    DataContainer,
    DashItem,
    DashLayout,
    Dashboard,
  },
  data() {
    return {
      compact: true,
      draggable: true,
      resizable: true,
      allowFrom: null,
      ignoreFrom: null,
      moveHold: 0,
      margin: { x: 20, y: 15 },
      layouts: [
        {
          breakpoint: "xxs",
          breakpointWidth: 4,
          numberOfCols: 999,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 2,
              height: 1,
              headerText: "Header 1",
              sql_query: "",
              bar_type: "HorizontalChart",
            },
            {
              id: "2",
              x: 0,
              y: 1,
              width: 1,
              height: 1,
              headerText: "Header 2",
              sql_query: "",
              bar_type: "HorizontalChart",
            },
          ],
        }
      ],
      dlayouts: [
        {
          breakpoint: "xl",
          numberOfCols: 12,
          items: [
            { id: "1", x: 6, y: 3, width: 6, height: 3 },
            { id: "2", x: 9, y: 0, width: 3, height: 3 },
            { id: "3", x: 0, y: 0, width: 8, height: 3 },
          ],
        },
      ],
      currentBreakpoint: "",
      origLayout: [],
      testHelper: false,
      enableStaticColWidth: true,
      colWidthInput: 410,
      maxColWidthInput: 410,
      minColWidthInput: 410,
      enableStaticRowHeight: true,
      rowHeightInput: 133,
      maxRowHeightInput: 133,
      minRowHeightInput: 133,
      enableColWidthLimits: false,
      enableRowHeightLimits: false,
    };
  },
  computed: {
    rowHeight() {
      if (this.enableStaticRowHeight) {
        return this.rowHeightInput;
      }
      return this.enableStaticRowHeight;
    },
    colWidth() {
      if (this.enableStaticColWidth) {
        return this.colWidthInput;
      }
      return this.enableStaticColWidth;
    },
    maxColWidth() {
      if (this.enableColWidthLimits) {
        return this.maxColWidthInput;
      }
      return this.enableColWidthLimits;
    },
    minColWidth() {
      if (this.enableColWidthLimits) {
        return this.minColWidthInput;
      }
      return this.enableColWidthLimits;
    },
    maxRowHeight() {
      if (this.enableRowHeightLimits) {
        return this.maxRowHeightInput;
      }
      return this.enableRowHeightLimits;
    },
    minRowHeight() {
      if (this.enableRowHeightLimits) {
        return this.minRowHeightInput;
      }
      return this.enableRowHeightLimits;
    },
  },
  methods: {
    debug() {
      console.log(this.newTableSelected);
    },
    changeEditMode() {
      this.draggable = !this.draggable;
      this.resizable = !this.resizable;
    },
    addItem() {
      for (let layout of this.layouts) {
        let newId = 1;
        if(layout.items.length>0) {
          const sortedItems = [...layout.items].sort((a, b) => a.id - b.id);
          const highestId = sortedItems[sortedItems.length - 1].id;
          newId = parseInt(highestId) + 1;
        }

        let newItem = {
          id: newId,
          x: 1,
          y: 0,
          width: 2,
          height: 1,
          customData: {
            headerText: "Header 1",
            sql_query: "",
            bar_type: "",
          }
        };

        // Check for free space
        let foundSpace = false;
        while (!foundSpace) {
          let spaceOccupied = false;

          // Check if the space is occupied by any existing item in the layout
          for (let item of layout.items) {
            if (
                newItem.y <= item.y + item.height - 1 &&
                item.y <= newItem.y + newItem.height - 1 &&
                newItem.x <= item.x + item.width - 1 &&
                item.x <= newItem.x + newItem.width - 1
            ) {
              spaceOccupied = true;
              break;
            }
          }

          // If space is occupied, move to the next position
          if (spaceOccupied) {
            newItem.y++;
            if (newItem.y + newItem.height > layout.height) {
              newItem.y = 0;
              newItem.x++;
            }
          } else {
            // Found free space, exit the loop
            foundSpace = true;
          }
        }
        layout.items.push(newItem);
      }
    },
    deleteItem(itemId) {
      for (let layout of this.layouts) {
        const index = layout.items.findIndex(item => item.id === itemId);

        if (index !== -1) {
          layout.items.splice(index, 1);
        }
      }
    },
    updateCurrentBreakpoint(val) {
      this.currentBreakpoint = val;
    },
    saveStateToServer() {
      const stateToSave = this.layouts[0]
      apiCall.saveStateToServer(stateToSave);
    },
  },
  mounted() {
    //Load state from server file
    loadStateFromServer().then((response) => {
      this.layouts = [response]
    });
    this.changeEditMode();
  },
  watch: {
    layouts: {
      handler: "saveStateToServer",
      deep: true,
    }
  }
};

</script>

<style>

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.floating-button3 {
  position: fixed;
  bottom: 20px;
  right: 100px;
  background-color: #a2770c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.debug-button {
  position: fixed;
  bottom: 20px;
  right: 180px; /* Adjusted the position */
  background-color: #a2770c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.circle {
  line-height: 1;
}
</style>
