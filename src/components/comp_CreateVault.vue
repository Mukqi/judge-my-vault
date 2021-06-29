<template>
    <div>
        <div>Create Vault Page</div>
        <div>
            <!-- User: {{ user }} -->
        </div>
        <b-button @click="increment">Increment</b-button>
        <b-button size="sm" @click="showUpload = !showUpload">
            {{ showUpload ? 'Hide' : 'Show' }} Fixed bottom Alert
        </b-button>
        <b-button @click="callGet()">Get test</b-button>
        <div> {{ count }} </div>
        <b-alert
            v-model="showUpload"
            class="position-fixed fixed-bottom m-0 rounded-0"
            style="z-index: 2000;"
            variant="primary"
        >
            File has been imported. Upload now?
            <b-button variant="success" @click="uploadTable" :disabled="!canUpload"> Upload </b-button>
        </b-alert>
        Title: <b-form-input v-model="title" :state="title.length>0"></b-form-input>
        Description <b-input v-model="description"></b-input>
        <b-table 
            striped 
            bordered 
            :items="items" 
            :fields="fields"
            :tbody-tr-class="rowClass"
        >
            <template #cell(name)="data">
                <b class="text-info">{{ data.value.toUpperCase() }}</b>
                <!-- <b-button v-on:click="genGunPerkTable(data.item)">TEST</b-button> -->
                <!-- <DynamicImage :hash="data.item['Hash'].toString()"></DynamicImage> -->
            </template>
            <template #cell(Slots)="data">
                <div v-html="genGunPerkTable(data.item)"></div>
            </template>
        </b-table>

        <b-form-file v-model="file" class="mt-3" :state="items.length>0"></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

        <div>
            <b-button v-on:click="convertCSV">CSV->JSON</b-button>
        </div>
        <!-- <div>ITEMS JSON: {{ items }}</div> -->

    
    </div>
</template>

<script>

// import DynamicImage from '@/components/DynamicImage.vue'
import PerksJSON from '@/assets/Perks.json'
import { API } from 'aws-amplify';

var Papa = require('papaparse');
var fs = require('fs');
var axios = require('axios');
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'comp_CreateVault',
  props: {
  },
  components: {
    //   DynamicImage
  },
  data() {
      return {
          showUpload: false,
            file: null,
            csv: null,
            perks: PerksJSON.results,
            title: "",
            description: "",
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
    increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    },
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.Vote === 'Junk') return 'table-danger'
        else if (item.Vote === 'Keep') return 'table-success'
      },
      convertCSV() {
          console.log("Parsing...");
          var _this = this;
          if (this.file != null){
            Papa.parse(this.file, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    results.data.forEach(item => {item["Vote"] = "none"})
                    // console.log("Data:", results.data);
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
      },
      uploadTable() {
        console.log("Clicked upload")
        if (this.title.length > 0 && this.items.length > 0 && this.$store.state.user) {
            let obj = {
                "owner": this.$store.state.user.username,
                "title": this.title,
                "description": this.description,
            };
            // Get the items that have either "trash or keep" Vote 
            // let ls = this.items.filter(item => {
            //     item["Vote"]=="Keep" || item["Vote"]=="Junk"
            //     })
            let id = btoa(uuidv4());
            obj["Id"] = id;
            let newls = [];
            this.items.forEach(x => {
                let o = {
                    "id": x["Id"].replace(/"/g, ''),
                    "KeepVotes": [],
                    "JunkVotes": []
                }
                newls.push(o);
            });
            console.log(newls);
            obj["items"]=newls;
            console.log(obj);
          } else {
              console.log("Nope")
          }
      }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    canUpload() {
        return this.title.length > 0 && this.items.length > 0;
    }
  },
  watch: {
      items: function (val) {
        //   console.log("Create WATCH");
          this.showUpload = true;
      }
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
