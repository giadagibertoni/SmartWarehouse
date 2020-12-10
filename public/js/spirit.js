const Spirit = {
    template: `
    <div class="stock-table">
      <link rel="stylesheet" type="text/css" href="/static/css/stock.css">
      <i :style="displayPlus" v-on:click="zoomIn" class="fas fa-search-plus"></i>
      <i :style="displayMinus" v-on:click="zoomOut" class="fas fa-search-minus"></i>
          <div class = "insert-div">
            <i v-on:click="add" class="fas fa-plus-circle"></i>
            <i v-on:click="sub" class="fas fa-minus-circle"></i>
            <div :style="display" class="form-insert">
              <input class="input100 stock" type="text" placeholder="Insert name of the good" v-model="nameGood">
              <input class="input100 stock" type="text" placeholder="Insert quantity" v-model="quantity">
              <input v-if="addButton" class="login100-form-btn" type="submit" value="Insert" @click="insert_stock">
              <input v-else class="login100-form-btn" type="submit" value="Remove" @click="remove_stock">
            </div>
          </div>
          <div v-bind:class="sizeFont">
    				<div class="table100 ver2 m-b-110">
    					<table data-vertable="ver2">
    						<thead>
    							<tr class="row100 head">
    								<th class="column100 column1" data-column="column1">Description</th>
    								<th class="column100 column2" data-column="column2">Stock</th>
    							</tr>
    						</thead>

    						<tbody>
    							<tr class="row100" v-for="(g, index) in sortedList" :key="goods._id">
    								<td class="column100 column1" data-column="column1">{{g.name}}</td>
    								<td class="column100 column2" data-column="column2">{{g.stock}}</td>
    							</tr>
    						</tbody>
    					</table>
    				</div>
          </div>
    </div>`,

    data() {
    		return {
         goods: [],
         addButton: true,
         nameGood: "",
         quantity: "",
         display: "display:none",
         displayMinus: "display:none",
         displayPlus: "display:inline",
         sizeFont: "smallFont"
       }
      },
      methods: {
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
            type: 'Spirit',
            username: app.user.username
          })
          .then((response) => {
            Swal.fire({
              type: 'success',
              title: 'The stock has been changed correctly!'
            });
            this.listGoods();
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
            this.listGoods();
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

    		listGoods: function () {
          axios.post('http://localhost:8080/api/list_goods', {
            type: 'Spirit'
          })
          .then((response) => {
            this.goods = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    		},

    		init: function(){
    			this.listGoods();
    		},
    	},
      computed: {
        sortedList: function(){
          this.goods.sort((a,b)=>{
            return b.stock - a.stock;
          });
          return this.goods;
        }
      },
    	mounted(){
    		this.init()
    	}
}
