<template>
  <div>
    <div class="text-right">
      <v-btn @click="$emit('close')" icon><v-icon>mdi-close</v-icon></v-btn>
    </div>
    <div class="px-4 pb-3">
      <ValidationObserver ref="observer">
        <div>ประเภท</div>
        <ValidationProvider rules="required" name="ประเภท" v-slot="{ errors }">
          <v-radio-group :error-messages="errors" row v-model="input.type">
            <v-radio value="income" label="Income"></v-radio>
            <v-radio value="expense" label="Expense"></v-radio>
          </v-radio-group>
        </ValidationProvider>
        <div>จำนวน</div>
        <ValidationProvider rules="required" name="จำนวน" v-slot="{ errors }">
          <v-text-field
            :error-messages="errors"
            dense
            outlined
            v-model="input.amount"
            type="number"
          ></v-text-field>
        </ValidationProvider>
        <div>
          <div>รายละเอียด</div>
          <v-textarea dense outlined v-model="input.description"></v-textarea>
        </div>
        <div class="text-right">
          <v-btn :loading="loading" @click="saveData" large>บันทึก</v-btn>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      input: {
        description: "",
        type: "",
        amount: 0,
      },
    };
  },
  methods: {
    async saveData() {
      if (await this.$refs.observer.validate()) {
        this.loading = true;
        axios
          .post(this.$store.state.serverUrl + "transaction", this.input)
          .then(async (response) => {
            this.loading = false;
            await this.$swal.fire({
              text: "สำเร็จ",
              icon: "success",
            });
            this.$emit("onsave", { ...this.input, id: response.data.insertId });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>