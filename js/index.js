
const app = new Vue ({
  el: '#app',
  data: {
    breeds: [],       // A list of cat breeds
    selected: {},     // The current selected breed
    selectedName: '', // The selected breed's name
    selectedId: '',   // The selected breed's ID
    images: []        // A list of images of the selected breed
  },
  created() {
    // Gets cat breeds && sets default selected property
    axios.get('https://api.thecatapi.com/v1/breeds/')
      .then(res => {
        this.breeds = res.data;
        this.selected = this.breeds[0]; // Defaults selected breed to first in breeds list
        this.selectedName = this.selected.name;
        this.selectedId = this.selected.id;
      })
      .catch(error => console.log(error));
  },
  watch: {
    // Watches for changes in the selected property
    // Updates the selected breed and images displayed
    selectedName() {
      this.setSelected(this.selectedName);
      this.getImages(this.selectedId);
    }
  },
  methods: {
    // Gets images of the selected cat breed
    getImages(id) {
      axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=100`)
        .then(res => this.setImages(res))
        .catch(error => console.log(error));
    },
    // Sets images property
    setImages(res) {
      this.images.length = 0;
      for(image in res.data) {
        this.images.push(res.data[image].url);
      };
    },
    // Sets selected property
    setSelected(name) {
      try {
        this.selected = this.breeds.find(element => element.name == name);
        this.selectedId = this.selected.id;
      } catch (error) {
        console.log(error);
      }
    }
  }
});