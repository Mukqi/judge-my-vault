var DynamicImage = Vue.component('DynamicImage', {
  props: {
    url: {type:String, required: true}
  },
  data : function() {
    return {link : 'loading'}
  },
  template: '<div>{{ link }} </div>',
  created() {
    this.getLink();
  },
  methods: {
    getLink() {
      setTimeout(() => {
        this.link = 'response url for link: ' + this.url
      }, 1000)
    }
  }
})