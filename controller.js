const axios = require('axios');
const cheerio = require('cheerio');
const utils = require("./utils");

exports.scraper = async (req, res, next) => {
    try {
        mydb = "https://webscrapping-dbc78.firebaseio.com/vehicle.json";
        const {data} = await axios.get(
            'https://www.arval.fr/nos-offres-du-moment?type_vehicle=All&_transmission=All&duration=All&items_per_page=All'
        );
        const $ = cheerio.load(data);

        let els = [];
        $('div.node-offer.view-mode-offer_horizontal').each((_idx, el) => {
            els.push(el);
        });
        let carList = await utils.getDetails(els, $);
        axios.put(mydb, carList).then((data) => {
            res.status(201).send({message: "OK !!"});
        }).catch(err => {
            res.send(err);
        });
    } catch (error) {
        throw error;
    }
};