const Orders = {
    template: `<div class="orders">
      <link rel="stylesheet" type="text/css" href="/static/css/orders.css">
      <div class="order-title"><h2> Orders </h2></div>

      <!--<swiper :options="swiperOption">
        <swiper-slide v-for="(s, index) in supplier" :key="supplier._id"><div class="supplier" v-on:click="open(s.supplier_name)">
          <img class="supplierLogo animated" v-bind:src="'static/img/supplier/'+ s.logo" alt="supplier">
        </div>  </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>-->

      <div class="container">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">

          <!-- Wrapper for slides -->
          <div class="carousel-inner">
          <div class="item active">
            <h3>Swipe and select supplier!</h3>
          </div>
            <div class="item" v-for="(s, index) in supplier" :key="supplier._id" v-on:click="open(s.supplier_name)">
              <h3><img v-bind:src="'static/img/supplier/'+ s.logo" alt="supplier"></h3>
            </div>
          </div>

          <!-- Left and right controls -->
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>


      <div class="row align-items-center">
        <div v-bind:id="s.supplier_name" class="md postIt animated swing" v-for="(s, index) in supplier" :key="supplier._id" style="display:inline">
          <img class="pin" src="static/img/pin.png" alt="pin">
          <a><i class=" animated fas fa-phone-alt iconOrder"></i></a>
            <h3>{{s.supplier_name}}:</h3>
          <div class="order-item" v-for="(g, index) in s.list_of_goods" :key="s.list_of_goods.name">
            {{g.quantity}} - {{g.name}}
          </div>
        </div>
      </div>

     </div>`,

    data() {
        return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        supplier: [],
      }


    },
    methods: {
      open: function(supplier){
        var x = document.getElementById(supplier);
        if (x.style.display === "none") {
          x.style.display = "inline";
        } else {
          x.style.display = "none";
        }
      },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
     // current swiper instance
     console.log("Order!");
     axios.get('http://localhost:8080/api/list_supplier')
     .then((response) => {
       var s = new Array();
       tmp = JSON.parse(response.data);
       for (i in tmp) {
         good = tmp[i].list_of_goods;
         newGood = new Array();
         for (j in good){
           parseGood = JSON.parse(good[j]);
           console.log(parseGood);

           var g = {"name" : parseGood.name,
 										"quantity" : parseGood.quantity }
           newGood.push(g);
         }
         var sup = {"supplier_name": tmp[i].supplier_name,
                      "logo": tmp[i].logo,
                      "list_of_goods": newGood
                    }
        this.supplier.push(sup);
       }
       this.$forceUpdate();
     })
     .catch(function (error) {
       console.log(error);
     });
     this.swiper.slideTo(3, 1000, false);
   }
}
