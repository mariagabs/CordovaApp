function AppController() {
  this.init = () => {
    AppController.getPlanets();
    AppController.getKnowncount();
  };

  this.getPlanets = () => {
    fetch(`https://api.le-systeme-solaire.net/rest/bodies`)
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildPlanets(resp.bodies);
      })
      .catch((error) => console.log("error ->" + error));
  };

  this.buildPlanets = (results) => {
    let aux = true;
    results.forEach((item) => {
      if (item.isPlanet === true) {
        const qntMoons = item.moons != null ? item.moons.length : 0;
        var planets = document.getElementById("planets");
        planets.innerHTML += `
        <div class="carousel-item ${aux ? "active" : ""}">
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.englishName}</h5>
                        <h6 class="card-subtitle">${item.name}</h6>
                        <p class="card-text">Moons <span>${qntMoons}</span></p>
                        <p class="card-text">Aphelion <span>${
                          item.aphelion
                        } km</span></p>
                        <p class="card-text">Gravity <span>${
                          item.gravity
                        } m.s<sup>-2</sup></span></p>
                        <p class="card-text">Density <span>${
                          item.density
                        } g.cm<sup>3</sup></span></p>
                        <p class="card-text">Inclination <span>${
                          item.inclination
                        }º</span></p>
                        <p class="card-text">Volume <span>${
                          item.vol.volValue
                        } 10<sup>${item.vol.volExponent}</sup> kg</span></p>
                        <p class="card-text">Mass <span>${
                          item.mass.massValue
                        } 10<sup>${item.mass.massExponent}</sup> kg</span></p>
                        <p class="card-text">Eccentricity <span>${
                          item.eccentricity
                        }</span></p>
                        <p class="card-text">Average temperature <span>${
                          item.avgTemp
                        } K</span></p>
                    </div>
                </div>
            </div>
        </div>
            `;
        aux = false;
      }
    });
  };

  this.getKnowncount = () => {
    fetch(`https://api.le-systeme-solaire.net/rest/knowncount`)
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildKnowncount(resp.knowncount);
      })
      .catch((error) => console.log(error));
  };

  this.buildKnowncount = (results) => {
    let aux = true;
    results.forEach((item) => {
      var things = document.getElementById("things");
      things.innerHTML += `
      <div class="carousel-item ${aux ? "active" : ""}">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <h3 class="things-title">${item.id}</h3>
              </div>
              <div class="col-sm-6">
                <h3>${item.knownCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            `;
      aux = false;
    });
  };

  this.getAsteroids = () => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-09-17&end_date=2021-09-17&api_key=XbST8m2LTc3xVc1j1LbdDjIorjj4IU6PPHQZFoU7`,
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  this.getSpaceX = () => {
    fetch(`https://api.spacexdata.com/v4/launches/latest`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  AppController.instance = null;

  AppController.getInstance = () => {
    if (AppController.instance == null)
      AppController.instance = new AppController();
    return AppController.instance;
  };

  AppController.init = () => {
    AppController.getInstance().init();
  };

  AppController.getPlanets = () => {
    AppController.getInstance().getPlanets();
  };

  AppController.buildPlanets = (planets) => {
    AppController.getInstance().buildPlanets(planets);
  };

  AppController.getAsteroids = () => {
    AppController.getInstance().getAsteroids();
  };

  AppController.buildAsteroids = (asteroids) => {
    AppController.getInstance().buildAsteroids(asteroids);
  };

  AppController.getKnowncount = () => {
    AppController.getInstance().getKnowncount();
  };

  AppController.buildKnowncount = (knowncount) => {
    AppController.getInstance().buildKnowncount(knowncount);
  };

  AppController.getSpaceX = () => {
    AppController.getInstance().getSpaceX();
  };

  AppController.buildSpaceX = (spacex) => {
    AppController.getInstance().buildSpaceX(spacex);
  };
}

AppController();
