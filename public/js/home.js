const Home = { template: `
    <div class="home-div stock-table">
    <link rel="stylesheet" type="text/css" href="/static/css/home.css">
      <h2>Benvenuto al </h2>
      <img class="logo-home" src="static/img/logoHome.png" alt="Logo">
      <h3> Scansiona la tua impronta digitale all'ingresso del magazzino!</h3>
      <img class="fingerprint" src="static/img/fingerprint.gif" alt="Logo">
      <div><router-link class="home-link" to="/login">Se non sei in magazzino fai il login!</router-link></div>
    </div>
` }
