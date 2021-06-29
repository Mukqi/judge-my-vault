<template>
  <div class="comp_Vault">
      <div>Vote Vault Page</div>
      <!-- {{ user.name }} -->
    <h1>{{ vault_name }}</h1>
    <div> Something here: {{ $route.params.id }} </div>
    <b-alert
        v-model="showUpload"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        variant="primary"
    >
        Vault has been changed. Save changes?
        <b-button @click="uploadTable" variant="success"> Save </b-button>
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
import tableJSON from '@/test_resources/smolv2.json'
// import { table } from 'console';

const { v4: uuidv4 } = require('uuid')
import { API } from 'aws-amplify';

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
        // take the imported file and extract the things from it
        this.owner = tableJSON["owner"]
        this.title = tableJSON["title"]
        this.description = tableJSON["description"]
        this.items = tableJSON["items"]
        this.vaultId = tableJSON["Id"]
  },
  data() {
      return {
            showUpload: false,
            perks: PerksJSON.results,
            title: "",
            description: "",
            owner: "",
            vaultId: "",
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
            items: []
      }
  },
  methods: {
    callGet() {
        API.get('jmvApi2', '/vaults/34a123', {}).then(result => {
            console.log(JSON.parse(JSON.stringify(result[0])));
            var item = JSON.parse(JSON.stringify(result[0]));
            this.title = item["title"]
            // this.description = item["description"]
            
            // this.items = JSON.stringify(result[0]).;
            }).catch(err => {
            console.log(err);
        })
    },
      uploadTable() {
          console.log("Clicked upload")
          if (this.title.length > 0 && this.items.length > 0 && this.$store.state.user) {
                let obj = {
                    "owner": this.$store.state.user.username,
                    "title": this.title,
                    "description": this.description,
                    "items": []
                };
                let name = this.$store.state.user.username
                // console.log(this.items);
                this.items.forEach(x=>console.log(x["KeepVotes"].includes(name)))
                // Get the items that have either "trash or keep" Vote \\
                let newlist = [];
                this.items.forEach(item =>{
                    if (item["KeepVotes"].includes(name) || 
                    item["JunkVotes"].includes(name)) {
                        newlist.push(item);
                    }
                    })
                console.log(newlist);
                // let newls = [];
                obj["items"]=newlist;
                console.log(obj);
          } else {
              console.log("Nope")
          }
      },
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
