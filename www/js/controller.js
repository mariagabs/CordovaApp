function AppController() {
  this.init = () => {
    let today = new Date();
    let yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);
    let yesterdayFormat = yesterday.toISOString().split("T")[0];
    AppController.getPlanets();
    AppController.getKnowncount();
    AppController.getAsteroids(yesterdayFormat);
    AppController.getSpaceX("past");
    AppController.getSpaceX("upcoming");
    AppController.getNews();

    var dateAsteroids = document.getElementById("date-asteroids");
    dateAsteroids.innerHTML += `${yesterday.toDateString()}`;

    var spinner = document.getElementById("spinner");
  };

  this.getPlanets = () => {
    spinner.classList.add("show");
    fetch(`https://api.le-systeme-solaire.net/rest/bodies`)
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildPlanets(resp.bodies);
        spinner.classList.remove("show");
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
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.englishName}</h5>
                        <h6 class="card-subtitle">${item.name}</h6>
                        <div class="row">
                        <div class="col-md-6 col-sm-12">
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
                        </div>
                        <div class="col-md-6 col-sm-12">
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
            `;
      aux = false;
    });
  };

  this.getAsteroids = (yesterday) => {
    spinner.classList.add("show");
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${yesterday}&end_date=${yesterday}&api_key=XbST8m2LTc3xVc1j1LbdDjIorjj4IU6PPHQZFoU7`,
    )
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildAsteroids(resp.near_earth_objects[yesterday]);
         spinner.classList.remove("show");
      })
      .catch((error) => console.log("error -> " + error));
  };

  this.buildAsteroids = (results) => {
    results.forEach((item) => {
      var asteroids = document.getElementById("asteroids");
      asteroids.innerHTML += `
            <div class="col-md-6 col-sm-12">
      <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    ${item.name}
                </h5>
                <p class="card-text">Estimated diameter <span>${item.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                  4,
                )} Km - ${item.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
        4,
      )} Km</span></p>
                <p class="card-text">Potentially dangerous? <span>${
                  item.is_potentially_hazardous_asteroid ? "Yes" : "No"
                }</span></p>
                <p class="card-text">Relative velocity <span>${parseFloat(
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_second,
                ).toFixed(4)} Km/s</span></p>
                <p class="card-text">Miss distance <span>${parseFloat(
                  item.close_approach_data[0].miss_distance.kilometers,
                ).toFixed(4)} Km</span></p>
                <a href="${
                  item.nasa_jpl_url
                }" target="_blank" class="card-text card-text-link">Read more...</a>
            </div>
        </div>
        </div>
            `;
    });
  };

  this.getSpaceX = (type) => {
     spinner.classList.add("show");
    fetch(`https://api.spacexdata.com/v4/launches/${type}`)
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildSpaceX(resp, type);
         spinner.classList.remove("show");
      })
      .catch((error) => console.log(error));
  };

  this.buildSpaceX = (results, type) => {
    let aux = true;
    let count = 0;
    results.forEach((item, index) => {
      if (count < 5) {
        count++;
        var launch = document.getElementById(type);
        launch.innerHTML += `
      <div class="carousel-item ${aux ? "active" : ""}">
      <div class="card card-space-x">
      ${
        item.links.patch.small
          ? `<img class="card-img-top" src="${item.links.patch.small}" alt="${item.name}">`
          : "<img class='card-img-top no-photo' src='../img/no-photo.svg' alt='No photo'>"
      }
            <div class="card-body">
              <div class="row align-items-center row-mobile">
              <div class="col-md-11 col-sm-9">
              <p class="card-title">
                ${item.name}
              </p>
              </div>
              <div class="col-md-1 col-sm-3">
              <img src="../img/info.svg" class="img-info" ${
                item.details
                  ? `onclick="hideShowDiv('card-details-${type}${index}')"`
                  : ""
              }>
              </div>
              </div>
              ${
                item.details
                  ? `<p class="card-text launch-desc" id="card-details-${type}${index}">${item.details}</p>`
                  : ""
              }
              <div class="launch-info">
                <p class="card-text">
                  Launch date <span>${item.date_utc.split("T")[0]}</span>
                </p>
                <p class="card-text">
                  Flight number <span>${item.flight_number}</span>
                </p>
              </div>
              <a class="card-text-link" target="_blank" href="${
                item.links.reddit.campaign
              }">Read more...</a>
            </div>
          </div>
          </div>
            `;
        aux = false;
      }
    });
  };

  this.getNews = () => {
     spinner.classList.add("show");
    fetch(`https://api.spaceflightnewsapi.net/v3/articles`)
      .then((response) => response.json())
      .then((resp) => {
        AppController.buildNews(resp);
         spinner.classList.remove("show");
      })
      .catch((error) => console.log(error));
  };

  this.buildNews = (results) => {
    results.forEach((item) => {
      var news = document.getElementById("news");
      news.innerHTML += `
            <div class="col-md-4 col-sm-12 d-flex align-items-stretch">
      <div class="card">
        <img class="card-img-top" src="${item.imageUrl}" alt="${item.newsSite}">
        <div class="card-body">
          <p class="card-title">${item.title}</p>
          <p class="card-subtitle">by ${item.newsSite} • ${
        item.publishedAt.split("T")[0]
      }</p>
          <p class="card-text">${item.summary}</p>
          <a class="card-text-link" href="${
            item.url
          }" target="_blank">Read more...</a>
        </div>
      </div>
      </div>
            `;
    });
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

  AppController.getAsteroids = (yesterday) => {
    AppController.getInstance().getAsteroids(yesterday);
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

  AppController.getSpaceX = (type) => {
    AppController.getInstance().getSpaceX(type);
  };

  AppController.buildSpaceX = (spacex, type) => {
    AppController.getInstance().buildSpaceX(spacex, type);
  };

  AppController.getNews = () => {
    AppController.getInstance().getNews();
  };

  AppController.buildNews = (news) => {
    AppController.getInstance().buildNews(news);
  };
}

AppController();
