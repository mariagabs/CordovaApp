function AppController() {

    this.init = () => {
        AppController.getPlanets();
    }

    this.getPlanets = () => {
        fetch(`https://api.le-systeme-solaire.net/rest/bodies`)
            .then(response => response.json())
            .then(resp => {
                AppController.buildPlanets(resp.bodies);
            })
            .catch(error => console.log(error))
    }

    this.buildPlanets = (results) => {
        results.forEach(item => {
            if(item.isPlanet === true){
                $("#planetsTable").append(`
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.englishName}</h5>
                            <h6 class="card-subtitle">${item.name}</h6>
                            <p class="card-text">Moons <span>${item.moons}</span></p>
                            <p class="card-text">Aphelion <span>${item.aphelion} km</span></p>
                            <p class="card-text">Gravity <span>${item.gravity} m.s<sup>-2</sup></span></p>
                            <p class="card-text">Density <span>${item.density} g.cm<sup>3</sup></span></p>
                            <p class="card-text">Inclination <span>${item.inclination}º</span></p>
                            <p class="card-text">Volume <span>${item.volume} 10<sup>10</sup> kg</span></p>
                            <p class="card-text">Mass <span>${item.mass} 10<sup>23</sup> kg</span></p>
                            <p class="card-text">Eccentricity <span>${item.eccentricity}</span></p>
                            <p class="card-text">Average temperature <span>${item.avgTemp} K</span></p>
                        </div>
                    </div>
                `);
            }
        });
    }

    this.getKnowncount = () => {
        fetch(`https://api.le-systeme-solaire.net/rest/knowncount`)
            .then(response => response.json())
            .then(resp => {
                AppController.buildKnowncount(resp.knowncount);
            })
            .catch(error => console.log(error))
    }

    this.getAsteroids = () => {
        fetch(`https://api.nasa.gov/`)
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    this.getSpaceX = () => {
        fetch(`https://api.spacexdata.com/v4/launches/latest`)
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    AppController.instance = null;

    AppController.getInstance = () => {
        if (AppController.instance == null)
            AppController.instance = new AppController();
        return AppController.instance;
    }

    AppController.init = () => {
        AppController.getInstance().init();
    }

    AppController.getPlanets = () => {
        AppController.getInstance().getPlanets();
    }

    AppController.buildPlanets = (planets) => {
        AppController.getInstance().buildPlanets(planets);
    }

    AppController.getKnowncount = () => {
        AppController.getInstance().getKnowncount();
    }
}