const Ranking = {
    template: `<div class="ranking stock-table">
      <link rel="stylesheet" type="text/css" href="/static/css/ranking.css">
      <div class="ranking-title"><h2> Ranking </h2></div>
      <div id="chart" ref="barchart"></div>
    </div>
    `,

    data() {
        return {
         staff: [],
         name: [],
         point: []
       }
      },
      methods: {
        listStaff: function () {
          axios.get('http://localhost:8080/api/list_staff')
          .then((response) => {
            //this.staff = response.data;
            var s =  response.data;
            console.log(s.length);
            for (var i = 0; i < s.length; i++){
              mov = s[i].warehouseMovements;
              var name = s[i].name;
              var p=0;
              console.log("Movimenti "+ i);
              console.log(mov.length);
              if (mov.length > 0){
                p = this.countPoint(mov);
              }
              this.name.push(name);
              this.point.push(p);
            }

          })
          .catch(function (error) {
            console.log(error);
          });
        },

        countPoint: function(warehouseMovements){
          var point = 0;
          var data = new Date();

          for (var i = 0; i < warehouseMovements.length; i++){
            var d = new Date(warehouseMovements[i].date);
            var mov = warehouseMovements[i].movement;
            if (d.getMonth() == data.getMonth()){
              point += mov;
            }
          }
          return point;
        },

        init: function(){
          this.listStaff();
        },
      },
      computed: {
          sortedStaff: function() {
              this.staff.sort( ( a, b) => {
                  return b.warehouseMovements - a.warehouseMovements;
              });
              return this.staff;
          }
      },
      mounted(){
        this.init();
        new ApexCharts(this.$refs.barchart, {
          chart: {
            type: 'bar',
            height: 350
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], //takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          fill: {
            colors: ['#d6002a']
          },
          markers: {
            size: 4,
            opacity: 0.9,
            colors: ["#FFA41B"],
            strokeColor: "#fff",
            strokeWidth: 2,

            hover: {
              size: 7,
            }
          },
          series: [{
            name: 'score in this month',
            data: this.point
          }],
          xaxis: {
            categories: this.name
          }
        }).render()
      }
}
