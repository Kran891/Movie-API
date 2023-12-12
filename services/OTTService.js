const otts = require("../models/OTT");

var ottService = {Object};

ottService.addOTT = async (name) =>{
    const ott = await otts.create({name : name})
    return ott._id;
};
ottService.updateOTT = async (name) => {
    let ott = await otts.findOne(name);
    ott.name = name;
    await otts.updateOne(ott);
    return ott._id;
}
ottService.deleteOTT = async (name) => {
    let ott = await otts.findOne(name);
    await otts.deleteOne(ott);
    return otts._id;
}
ottService.findOTTByName = async (name) => {
    const ott = await otts.findOne(name);
    return ott._id;
}

