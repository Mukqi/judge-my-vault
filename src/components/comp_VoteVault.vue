<template>
  <div class="comp_Vault">
      <div>Vote Vault Page</div>
    <h1>{{ vault_name }}</h1>
    <div> Something here: {{ $route.params.id }} </div>
    <b-alert
        v-model="showUpload"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        variant="primary"
    >
        Vault has been changed. Save changes?
        <b-button @click="saveChanges" variant="success"> Save </b-button>
    </b-alert>
    <b-table 
        striped 
        bordered 
        :items="items" 
        :fields="fields"
        :tbody-tr-class="rowClass"
    >
        <template #cell(name)="data">
            <b class="text-info">{{ data.value.toUpperCase() }}</b>
            <!-- <DynamicImage :hash="data.item['Hash'].toString()"></DynamicImage> -->
        </template>
        <template #cell(Slots)="data">
            <div v-html="genGunPerkTable(data.item)"></div>
        </template>
        <template #cell(Vote)="data">
            {{ data.item.Vote }}
            <div>
                <b-button @click="voteKeep(data.item)" :variant="data.item.Vote=='Keep' ? 'success' : 'outline-success'">
                    <b-icon icon="box-arrow-in-down-right"></b-icon> 
                    Keep
                </b-button>
            </div>
            <div>
                <b-button @click="voteJunk(data.item)" :variant="data.item.Vote=='Junk' ? 'danger' : 'outline-danger'">
                    <b-icon icon="trash"></b-icon>
                    Junk
                </b-button>
            </div>
            <div>
                <b-link @click="voteClear(data.item)">Clear</b-link>
            </div>
            <!--<b-form-group v-slot="{ ariaDescribedby }">
                
                 <div>
                    <b-form-radio 
                        button 
                        button-variant="outline-success"
                        v-model="data.item.Vote" 
                        :aria-describedby="ariaDescribedby" 
                        name="vote-radios" 
                        value="Keep"
                    >Keep</b-form-radio>
                </div>
                <div>
                    <b-form-radio 
                    button 
                    button-variant="outline-danger"
                    v-model="data.item.Vote" 
                    :aria-describedby="ariaDescribedby" 
                    name="vote-radios" 
                    value="Junk"
                >Junk</b-form-radio>
                </div> 
            </b-form-group>-->
        </template>
    </b-table>
    <br v-if="showUpload" />
  </div>
</template>

<script>

// import DynamicImage from '@/components/DynamicImage.vue'
import PerksJSON from '@/assets/Perks.json'
import tableJSON from '@/test_resources/smol.json'

var Papa = require('papaparse');
var fs = require('fs');
var axios = require('axios');

export default {
  name: 'comp_CreateVault',
  props: {
    vault_name: String
  },
  components: {
    //   DynamicImage
  },
  created() {
      tableJSON.forEach(item => {item["Vote"] = "none"});
      this.items = JSON.parse(JSON.stringify(tableJSON));
  },
  data() {
      return {
            showUpload: false,
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
            items: tableJSON
      }
  },
  methods: {
      voteKeep(item) {
          if (item.Vote != 'Keep'){
            item.Vote = 'Keep';
            this.showUpload = true;
          }
      },
      voteJunk(item) {
          if (item.Vote != 'Junk'){
            item.Vote = 'Junk';
            this.showUpload = true;
          }
      },
      voteClear(item) {
          if (item.Vote != 'none'){
            item.Vote = 'none';
            this.showUpload = true;
          }
      },
        saveChanges() {
            // axios stuff to upload new data to server
            this.showUpload = false;
        },
        rowClass(item, type) {
            if (!item || type !== 'row') return
            if (item.Vote === 'Junk') return 'table-danger'
            else if (item.Vote === 'Keep') return 'table-success'
        },
        genGunPerkTable(item) {
            var perks = [];
            //   perks.push(item["Perks 0"]);  This is manually added to start the table
            perks.push(item["Perks 1"]);
            perks.push(item["Perks 2"]);
            perks.push(item["Perks 3"]);
            perks.push(item["Perks 4"]);
            perks.push(item["Perks 5"]);
            perks.push(item["Perks 6"]);
            perks.push(item["Perks 7"]);
            perks.push(item["Perks 8"]);
            perks.push(item["Perks 9"]);
            perks.push(item["Perks 10"]);
            perks.push(item["Perks 11"]);
            perks.push(item["Perks 12"]);
            var perk_obj1 = this.perks[item["Perks 0"].replace("*", '')];
            var desc = perk_obj1.printouts.Description[0];
            var table = "<table class='slots-table'><tr><td class='selected-perk' v-b-tooltip.hover title='" + desc + "'>" + item["Perks 0"] + "</td>"
            var perk1 = this.perks[item["Perks 0"].replace("*", '')];
            var prevType = perk1.printouts.Type[0]['fulltext'];
            //   console.log("Perks", perks);
            perks.forEach(perk => {
                if (perk != null) {
                    // console.log("Perk: ", perk);
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
                                // console.log("STAR!");
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
      
  },
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
