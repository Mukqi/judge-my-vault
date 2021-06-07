<template>
    <div>
        <img :src="link" />
    </div>
</template>


<script>
var axios = require('axios');

export default {
    props: {
        hash: {type:String, required: true}
    },
    data() {
        return{
            link: 'loading'   
        }
    },
    created() {
        this.APIGetImageURL();
    },
    methods: {
        getLink() {
            setTimeout(() => {
                this.link = 'response url for link: ' + this.hash
            }, 1000)
        },
        APIGetImageURL() {
            setTimeout(() => { 
                // console.log("Calling APIGetImageURL");
                // console.log(this.hash);
                if (!this.hash){
                    // console.log("Null hash: ", this.hash);
                    return null;
                }
                // call API to get the endpoint:
                // https://www.bungie.net/platform/Destiny2/Manifest/DestinyInventoryItemDefinition/+ Hash
                // Response.displayProperties.icon
                // console.log(toString("DA HASH:", this.hash));

                var url = "https://www.bungie.net/platform/Destiny2/Manifest/DestinyInventoryItemDefinition/"+this.hash
                
                // console.log("URL:", url);
                
                var iconurl = ""
                var options = {
                    headers: { 'X-API-Key': process.env.VUE_APP_DESTINY_2_API_KEY },
                };
                axios.get(url, options).then((response) => {
                    // console.log(response.data.Response.displayProperties.icon);
                    iconurl = "https://bungie.net" + response.data.Response.displayProperties.icon
                    // console.log("URL: " + iconurl);
                    this.link = iconurl;
                }, (error) => {
                    console.log(error);
                });
            }, 1000)
      },
    }
}
</script>