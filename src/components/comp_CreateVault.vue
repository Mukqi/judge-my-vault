<template>
  <div class="comp_Vault">
    <h1>{{ vault_name }}</h1>
    <b-table striped bordered :items="items" :fields="fields">
        <template #cell(name)="data">
            <b class="text-info">{{ data.value.toUpperCase() }}</b>
            <!-- <b-button v-on:click="genGunPerkTable(data.item)">TEST</b-button> -->
            <DynamicImage :hash="data.item['Hash'].toString()"></DynamicImage>
        </template>
        <template #cell(Slots)="data">
            <div v-html="genGunPerkTable(data.item)"></div>
        </template>
    </b-table>

    <b-form-file v-model="file" class="mt-3" plain></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

    <b-button v-on:click="convertCSV">CSV->JSON</b-button>
  </div>
</template>

<script>

import DynamicImage from '@/components/DynamicImage.vue'
import PerksJSON from '@/assets/Perks.json'

var Papa = require('papaparse');
var fs = require('fs');
var axios = require('axios');

export default {
  name: 'comp_CreateVault',
  props: {
    vault_name: String
  },
  components: {
      DynamicImage
  },
  data() {
      return {
            file: null,
            csv: null,
            perks: PerksJSON.results,
            fields: [
                "Power",
                {
                    key: "Name",
                    sortable: true
                },
                "Type",
                "Category",
                "Element",
                "Masterwork Type",
                "Slots",
                "Power Limit",
                "Vote"
            ],
            items: [
          ]
      }
  },
  methods: {
      convertCSV() {
          console.log("Parsing...");
          var _this = this;
          if (this.file != null){
            Papa.parse(this.file, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    console.log(results);
                    _this.items = results.data;
                }
            });
            }else{
                console.log("File is empty");
            }
          console.log("DONE");
          
      },
      genGunPerkTable(item) {
          var perks = [];
        //   perks.push(item["Perks 0"]);  This is manually added to start the table
          perks.push(item["Perks 1"]);
          perks.push(item["Perks 2"]);
          perks.push(item["Perks 3"]);
          perks.push(item["Perks 4"]);
          perks.push(item["Perks 5"]);
        //   perks.push(item["Perks 6"]);
        //   perks.push(item["Perks 7"]);
        //   perks.push(item["Perks 8"]);
        //   perks.push(item["Perks 9"]);
        //   perks.push(item["Perks 10"]);
        //   perks.push(item["Perks 11"]);
        //   perks.push(item["Perks 12"]);
          var perk_obj1 = this.perks[item["Perks 0"].replace("*", '')];
          var desc = perk_obj1.printouts.Description[0];
          var table = "<table class='slots-table'><tr><td class='selected-perk' v-b-tooltip.hover title='" + desc + "'>" + item["Perks 0"] + "</td>"
          var perk1 = this.perks[item["Perks 0"].replace("*", '')];
          var prevType = perk1.printouts.Type[0]['fulltext'];
          console.log("Perks", perks);
          perks.forEach(perk => {
              if (perk != null) {
                console.log("Perk: ", perk);
                // Find the perk in the list and get the type from it
                var perk_obj = this.perks[perk.replace("*", '')];
                if (perk_obj != undefined){
                    // if the perk is the same type as the last perk 
                    // just add another <td>
                    var type = perk_obj.printouts.Type[0]['fulltext'];
                    var description = perk_obj.printouts.Description[0];
                    if (type == prevType) {
                        if (perk.charAt(perk.length-1) == '*')
                            table = table + "<td class='selected-perk' v-b-tooltip.hover title='" + description + "'>" + perk + "</td>";
                        else 
                            table = table + "<td v-b-tooltip.hover title='" + description + "'>" + perk + "</td>";
                    }
                    //otherwise close the current <td> and
                    // add another <td> and perk row <tr>
                    else {
                        prevType = type;
                        if (perk.charAt(perk.length-1) =='*'){
                            console.log("STAR!");
                            table = table + "</tr><tr><td class='selected-perk' v-b-tooltip.hover title='" + description + "'>"+perk+"</td>";
                        }else
                            table = table + "</tr><tr><td v-b-tooltip.hover title='" + description + "'>"+perk+"</td>";
                    }
                } else {
                    console.log("Perk undefined: " + perk)
                }
              }
          })


          // complete the table
          table += "</tr></table>";
          return table;
      },
      testfunction() {
            return "https://upload.wikimedia.org/wikipedia/commons/0/05/Lengthy_body_Kanni.jpg"
      }
  },
  computed: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .slots-table {
        width: 100%;
    }
    .selected-perk {
        font-weight: bold;
    }
</style>
