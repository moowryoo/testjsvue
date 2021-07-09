<template>
  <div>
    <div class="mx-auto" style="max-width: 600px">
      <div v-if="loading" class="text-center pt-15">
        <v-progress-circular
          size="70"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else>
        <div class="pt-4 text-center">
          <v-btn
            @click="activeFilter('income')"
            color="green"
            large
            :outlined="active != 'income'"
            :dark="active == 'income'"
          >
            Income
          </v-btn>
          <v-btn @click="showAddDialog" class="mx-2" icon x-large outlined>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            :outlined="active != 'expense'"
            :dark="active == 'expense'"
            @click="activeFilter('expense')"
            color="red"
            large
          >
            Expense
          </v-btn>
        </div>

        <div class="text-right">
          คงเหลือ
          <span v-if="sumData < 0" style="color: red">{{ sumData }}</span>
          <span v-else style="color: green">{{ sumData }}</span>
        </div>
        <div v-if="data.length" class="pt-4 px-14">
          <v-card class="mb-3" v-for="(item, k) in filteredData" :key="k">
            <div style="position: relative" class="pa-3">
              <div
                style="
                  color: grey;
                  font-size: small;
                  position: absolute;
                  right: 6px;
                  top: 0px;
                "
              >
                {{ moment(item.created_at).format("DD/MM/YYYY HH:mm") }}
              </div>
              <div>
                {{ item.description }}
              </div>
              <div class="text-right">
                <span
                  :style="{ color: item.type == 'income' ? 'green' : 'red' }"
                  style="font-size: 22px; font-weight: 500"
                >
                  <v-icon color="green" v-if="item.type == 'income'"
                    >mdi-plus</v-icon
                  >
                  <v-icon color="red" v-else>mdi-minus</v-icon>
                  {{ numberFormat(item.amount) }}</span
                >
              </div>
            </div>
          </v-card>
        </div>
        <div v-else class="mt-15 text-center">
          <span style="color: darkgrey; font-size: 20px; font-weight: 400"
            >ไม่พบข้อมูล</span
          >
        </div>
      </div>
    </div>
    <v-dialog v-model="addDialog" width="500px" persistent>
      <v-card v-if="addDialog">
        <AddData @onsave="onSave" @close="addDialog = false"></AddData>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import AddData from "./AddData.vue";
import moment from "moment";
export default {
  data() {
    return {
      data: [],
      active: "",
      addDialog: false,
      total: 0,
      loading: false,
    };
  },
  components: {
    AddData,
  },
  computed: {
    filteredData() {
      if (this.active) {
        return this.data.filter((el) => el.type == this.active);
      } else {
        return this.data;
      }
    },
    sumData() {
      var result = this.filteredData;
      return result.reduce((acc, cur) => {
        if (cur.type == "income") {
          return acc + cur.amount;
        } else {
          return acc - cur.amount;
        }
      }, 0);
    },
    moment() {
      return moment;
    },
    serverUrl() {
      return this.$store.state.serverUrl;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    activeFilter(item) {
      if (this.active && this.active == item) {
        this.active = "";
      } else {
        this.active = item;
      }
    },
    onSave(payload) {
      this.data.unshift(payload);
      this.addDialog = false;
    },
    showAddDialog() {
      this.addDialog = true;
    },
    numberFormat(val) {
      return new Intl.NumberFormat().format(val);
    },
    getData() {
      this.loading = true;
      axios.get(this.serverUrl + "transaction").then((response) => {
        this.loading = false;
        this.data = response.data.result;
        this.total = response.data.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
