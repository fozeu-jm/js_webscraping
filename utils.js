const axios = require('axios');
const cheerio = require('cheerio');
exports.getDetails = async (els, raw) => {
    try {
        let carList = [];
        for (let i = 0; i < els.length; i++) {
            let relativeUrl = raw(els[i]).attr("about");
            const url = "https://www.arval.fr" + relativeUrl;

            const {data} = await axios.get(url);
            const $ = cheerio.load(data);

            //get image url
            let image = null;
            $('div.node-offer div.field-item.even > img').each((_idx, el) => {
                image = $(el).attr("src");
            });
            let marque = relativeUrl.split("/")[2];
            //get modele
            let modele = null;
            $('div.group-info-model h1').each((_idx, el) => {
                modele = $(el).text();
            });

            //get prix
            let prix = null;
            $('.offer .group-picture-price .group-info-price .group-price-old .field-name-field-offer-price .price').each((_idx, el) => {
                prix = $(el).text().split("€")[0];
            });

            //get duree_location
            let duree_location = null;
            $("div.infos-detail > div.field > div.field-items > div.field.even").each((_idx, el) => {
                duree_location = $(el).text().split(" ")[1];
            });

            //get distance
            let distance = null;
            $("div.infos-detail span.km").each((_idx, el) => {
                distance = $(el).text();
            });

            //get first_loyer
            let first_loyer = null;
            $(".field-item.even.offer-loaded").each((_idx, el) => {
                first_loyer = $(el).text().split("€")[0];
                first_loyer = first_loyer.split(" ").join("");
            });

            //get rest
            let categorie = null;
            let type_voiture = null;
            let portes = null;
            let carburant = null;
            let transmission = null;
            let puissance = null;
            let puissance_fiscale = null;
            let emission_co2 = null;
            let consomation = null;
            $(".field-name-field-offer-type-car").each((_idx, el) => {
                categorie = $(el).text().split("Catégorie")[1].trim();
                categorie = categorie.replace
            });

            $(".field-name-field-offer-type-vehicle").each((_idx, el) => {
                type_voiture = $(el).text().split("Type de voitures")[1].trim();
            });

            $(".field-name-field-offer-doors").each((_idx, el) => {
                portes = $(el).text().split("Portes")[1];
                portes = portes.split(" ")[0].trim();
            });

            $(".field-name-field-offer-fuel-type").each((_idx, el) => {
                carburant = $(el).text().split("Carburant")[1].trim();
            });
            $(".field-name-field-offer-transmission").each((_idx, el) => {
                transmission = $(el).text().split("Transmission")[1].trim();
            });

            $(".field-name-field-offer-fiscal-power").each((_idx, el) => {
                puissance_fiscale = $(el).text().split("Puissance fiscale")[1].trim();
                puissance_fiscale = puissance_fiscale.split(" ")[0];
            });

            $(".field-name-field-offer-horsepower").each((_idx, el) => {
                puissance = $(el).text().split("Puissance")[1];
                puissance = puissance.split(" ")[0].trim();
            });
            $(".field-name-field-emissions-co2-mixte-min").each((_idx, el) => {
                emission_co2 = $(el).text().split("Emissions CO₂ mixte WLTP")[1];
                emission_co2 = emission_co2.split(" ")[0].trim();
            });

            $(".field-name-field-consommation-mixte-min").each((_idx, el) => {
                consomation = $(el).text().split("Consommation mixte WLTP")[1];
                consomation = consomation.split(" ")[0].trim();
            });
            let car = {
                url: url,
                image: image,
                marque: marque,
                modele: modele,
                prix: prix,
                duree_location: duree_location,
                distance: distance,
                first_loyer: first_loyer,
                categorie: categorie,
                type_voiture: type_voiture,
                portes: portes,
                carburant: carburant,
                transmission: transmission,
                puissance: puissance,
                puissance_fiscale: puissance_fiscale,
                emission_co2: emission_co2,
                consomation: consomation
            };
            carList.push(car);
        }
        return carList;
    } catch (e) {
        throw e;
    }
};