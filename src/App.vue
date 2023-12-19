<template>
  <div id="app">
    <Sidebar @newTableSelected="newTableSelectedUpdate"/>
    <div class="noSidebar">
      <DraggableContainers :newTableSelected="newTableSelected"/>
    </div>

  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Dashboard from "./components/Dashboard.vue";
import DashItem from "./components/DashItem.vue";
import DashLayout from "./components/DashLayout.vue";
import DraggableContainers from "./components/DraggableContainers.vue";

export default {
  name: "app",
  components: {
    DraggableContainers,
    DashItem,
    DashLayout,
    Dashboard,
    Sidebar
  },
  data() {
    return {
      newTableSelected: "",
      compact: true,
      draggable: true,
      resizable: true,
      allowFrom: null,
      ignoreFrom: null,
      moveHold: 0,
      margin: { x: 20, y: 20 },
      layouts: [
        {
          breakpoint: "xl",
          numberOfCols: 12,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
            { id: "4", x: 3, y: 0, width: 2, height: 2 },
            { id: "5", x: 5, y: 0, width: 1, height: 2 },
            { id: "6", x: 6, y: 0, width: 2, height: 1 },
            { id: "7", x: 7, y: 1, width: 5, height: 1 },
          ],
        },
        {
          breakpoint: "lg",
          breakpointWidth: 1200,
          numberOfCols: 10,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1, locked: true },
            { id: "4", x: 3, y: 0, width: 2, height: 2 },
            { id: "5", x: 5, y: 0, width: 1, height: 2 },
            { id: "6", x: 6, y: 0, width: 2, height: 1 },
            { id: "7", x: 7, y: 1, width: 3, height: 1 },
          ],
        },
        {
          breakpoint: "md",
          breakpointWidth: 996,
          numberOfCols: 8,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
            { id: "4", x: 3, y: 0, width: 2, height: 2 },
            { id: "5", x: 5, y: 0, width: 1, height: 2 },
            { id: "6", x: 6, y: 0, width: 2, height: 1 },
            { id: "7", x: 7, y: 1, width: 1, height: 1 },
          ],
        },
        {
          breakpoint: "sm",
          breakpointWidth: 768,
          numberOfCols: 4,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
            { id: "4", x: 3, y: 0, width: 1, height: 2 },
            { id: "5", x: 2, y: 1, width: 1, height: 1 },
          ],
        },
        {
          breakpoint: "xs",
          breakpointWidth: 480,
          numberOfCols: 2,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 1, y: 0, width: 1, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
          ],
        },
        {
          breakpoint: "xxs",
          breakpointWidth: 0,
          numberOfCols: 1,
          items: [
            {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            { id: "2", x: 0, y: 1, width: 1, height: 1 },
          ],
        },
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
      rowHeightInput: 200,
      enableStaticRowHeight: false,
      colWidthInput: 200,
      maxColWidthInput: 210,
      minColWidthInput: 190,
      maxRowHeightInput: 210,
      minRowHeightInput: 190,
      enableStaticColWidth: false,
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
    newTableSelectedUpdate(newTable) {
      this.newTableSelected = newTable;
    },
    toggleAllowFrom() {
      if (this.allowFrom) {
        this.allowFrom = null;
      } else {
        this.allowFrom = ".dragHandle";
      }
    },
    toggleIgnoreFrom() {
      if (this.ignoreFrom) {
        this.ignoreFrom = null;
      } else {
        this.ignoreFrom = ".dragHandle2";
      }
    },
    addItem() {
      for (let layout of this.layouts) {
        layout.items.push({
          id: (layout.items.length + 1).toString(),
          x: 1,
          y: 0,
          width: 2,
          height: 1,
        });
      }
    },
    removeItem() {
      for (let layout of this.layouts) {
        layout.items.splice(0, 1);
      }
    },
    updateCurrentBreakpoint(val) {
      this.currentBreakpoint = val;
    },
  },
};
</script>


<style>
#app {
  display: flex;
}

.noSidebar {
  position: absolute;
  top: 0;
  left: 175px;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

</style>

