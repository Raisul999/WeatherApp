window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let windVal = document.querySelector(".wind");
    const temperatureSpan = document.querySelector(".temperature span");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/461a7293cf25f10aab0751aa67741151/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon, windSpeed, pressure } = data.currently;
                    temperatureDegree.innerHTML = Math.floor(temperature);
                    temperatureDescription.innerHTML = summary;
                    locationTimezone.innerHTML = data.timezone;
                    windVal.innerHTML = "Wind: " + windSpeed + "  Km/h  ";




                    let celcius = (temperature - 32) * (5 / 9);

                    setIcons(icon, document.querySelector(".icon"));

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML === "℉") {
                            temperatureSpan.innerHTML = "℃";
                            temperatureDegree.innerHTML = Math.floor(celcius);

                        } else {
                            temperatureSpan.innerHTML = "℉";
                            temperatureDegree.innerHTML = Math.floor(temperature);
                        }

                    });

                });

        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])

    }



});