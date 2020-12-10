const User = {
    template: `<div class="stock-table">
      <link rel="stylesheet" type="text/css" href="/static/css/userProgress.css">
      <div class="user-title"><h2> Personal Progress </h2></div>
      <div id="chart" ref="barchart"></div>
     </div>`,

    data() {
      return {
        movement : [],
        date: []
      };
    },
    mounted(){
      var s = app.user.warehouseMovements;
      for (var i = 0; i < s.length; i++){
        var n_mov = s[i].movement;
        var d_mov = new Date(s[i].date);

        this.movement.push(n_mov);
        this.date.push(d_mov.getDate()+"-"+(d_mov.getMonth()+1)+"-"+d_mov.getFullYear());
      }
      new ApexCharts(this.$refs.barchart, {
          chart: {
            type: 'line',
            height: 350,
            shadow: {
              enabled: false,
              color: '#bbb',
              top: 3,
              left: 2,
              blur: 3,
              opacity: 1
            },
          },
          stroke: {
            width: 7,
            curve: 'smooth'
          },
          fill:  {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              type: 'vertical',
              opacityFrom: 0.7,
              opacityTo: 0.9,
              colorStops: [
                {
                  offset: 0,
                  color: "#1bea00",
                  opacity: 1
                },
                {
                  offset: 40,
                  color: "#f7db07",
                  opacity: 1
                },
                {
                  offset: 100,
                  color: "#ef0000",
                  opacity: 1
                }
              ]
            }
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

        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], //takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
        },

        series: [{
          name: 'warehouse movements',
          data: this.movement,
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
        }],
        xaxis: {
          categories: this.date
        }
      }).render()
    }
}
