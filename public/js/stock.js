const Stock = {
    template: `
    <div class="stockDiv">
      <link rel="stylesheet" type="text/css" href="/static/css/stock.css">
      <div class="iconDiv">
        <a><i :style="displayPlus" v-on:click="zoomIn" class="fas fa-search-plus animated"></i></a>
        <a><i :style="displayMinus" v-on:click="zoomOut" class="fas fa-search-minus animated"></i></a>
        <a><i v-on:click="changeVisualization" class="fas fa-eye animated"></i></a>
      </div>
      <div :style="displayBottle">
        <div class="row" v-bind:class="sizeFont">
          <div class="col stockRow" v-bind:id="g.name" v-for="(g, index) in sortedList" :key="app.goods._id" v-on:click="changeStock(g.name)">
            <img class="bottle animated" v-bind:src="'static/img/bottle/'+ g.image" alt="bottle">
            <div>{{g.stock}}</div>
          </div>
        </div>
      </div>

      <div :style="displayTable" class="table100 ver2 m-b-110" v-bind:class="sizeFont">
        <table data-vertable="ver2">
          <thead>
            <tr class="row100 head">
              <th class="column100 column1" data-column="column1">Description</th>
              <th class="column100 column2" data-column="column2">Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr class="row100" v-for="(g, index) in sortedList" :key="app.goods._id" v-on:click="changeStock(g.name)">
              <td class="column100 column1" data-column="column1">{{g.name}}</td>
              <td class="column100 column2" data-column="column2">{{g.stock}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,

    data() {
    		return {
         addButton: true,
         nameGood: "",
         quantity: "",
         display: "display:none",
         displayMinus: "display:none",
         displayPlus: "display:inline",
         sizeFont: "smallFont",
         displayBottle: "display:inline",
         displayTable:"display:none",
       }
      },
      methods: {
        changeStock: function(good){
          console.log(good);
          this.$dialog
            .prompt({
              title: "Insert the quantity of goods",
              body: "If you want remove a goods use - before number",
              promptHelp: '"[+:okText]"'
            })
            .then(dialog => {
              // Triggered when proceed button is clicked
              // Show an alert with the user's input as the message
            //  this.$dialog.alert(dialog.data || '[empty]')
              axios.post('http://localhost:8080/api/insert_stock_good', {
                name: good,
                stock: dialog.data,
                type: app.stockType,
                username: app.user.username
              })
              .then((response) => {
                Swal.fire({
                  type: 'success',
                  title: 'The stock has been changed correctly!'
                });
                app.listGoods();
                this.display= "display:none";
                this.nameGood = "";
                this.quantity = "";
              /*  axios.post('http://localhost:8080/api/loginSubmit', {
                  usr: app.user.username,
                  pw: app.user.password
                })
                .then(function (response) {
                  app.user = response.data;
                })
                .catch(function (error) {
                  console.log(error);
                });*/

              })
              .catch(function (error) {
                alert (error);
              });
            })
            .catch(() => {
            });
        },
        zoomIn: function(){
          this.sizeFont = "large";
          this.displayMinus = "display:inline";
          this.displayPlus = "display:none";
        },
        zoomOut: function(){
          this.sizeFont = "smallFont";
          this.displayMinus = "display:none";
          this.displayPlus = "display:inline";
        },
        add: function(event){
          if (this.addButton === false){
            this.display= "display:inline";
          }else if (this.display === "display:none"){
            this.display= "display:inline";
          }else{
            this.display= "display:none";
          }

          this.addButton=true;

        },
        changeVisualization: function(){
          if (this.displayBottle==="display:inline"){
            this.displayBottle="display:none";
            this.displayTable="display:inline";
          }else{
            this.displayBottle="display:inline";
            this.displayTable="display:none";
          }
        },
        sub: function(event){

          if (this.addButton === true){
            this.display= "display:inline";
          }else if (this.display === "display:none"){
            this.display= "display:inline";
          }else{
            this.display= "display:none";
          }
          this.addButton=false;
        },
        insert_stock: function(event){
          axios.post('http://localhost:8080/api/insert_stock_good', {
            name: this.nameGood,
            stock: this.quantity,
            type: app.stockType,
            username: app.user.username
          })
          .then((response) => {
            Swal.fire({
              type: 'success',
              title: 'The stock has been changed correctly!'
            });
            app.listGoods();
            this.display= "display:none";
            this.nameGood = "";
            this.quantity = "";
            axios.post('http://localhost:8080/api/loginSubmit', {
              usr: app.user.username,
              pw: app.user.password
            })
            .then(function (response) {
              app.user = response.data;
            })
            .catch(function (error) {
              console.log(error);
            });

          })
          .catch(function (error) {
            alert (error);
          });
        },

        remove_stock: function(){
          axios.post('http://localhost:8080/api/remove_stock_good', {
            name: this.nameGood,
            stock: this.quantity,
            username: app.user.username
          })
          .then((response) => {
            Swal.fire({
              type: 'success',
              title: 'The stock has been changed correctly!',
              timer: 2500
            });
            app.listGoods();
            this.display= "display:none";
            this.nameGood = "";
            this.quantity = "";
            axios.post('http://localhost:8080/api/loginSubmit', {
              usr: app.user.username,
              pw: app.user.password
            })
            .then(function (response) {
              app.user = response.data;
            })
            .catch(function (error) {
              console.log(error);
            });
          })
          .catch(function (error) {
            alert (error);
          });
        },


    		init: function(){
    			app.listGoods();
    		},
    	},
      computed: {
        sortedList: function(){
          app.goods.sort((a,b)=>{
            return a.stock - b.stock;
          });
          return app.goods;
        }
      },
    	mounted(){
        console.log(app.stockType);
    		this.init();
    	}
}
