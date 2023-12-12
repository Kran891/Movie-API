const otts = require("../models/OTT");

var ottService = {};

ottService.addOTT = async (name) =>{
    const ott = new otts({name : name})
    await ott.save();
    return ott._id;
};
ottService.updateOTT = async (name) => {
    let ott = await otts.findOne({name:name});
    ott.name = name;
    await otts.updateOne(ott);
    return ott._id;
}
ottService.deleteOTT = async (name) => {
    let ott = await otts.findOne({name:name});
    await otts.deleteOne(ott);
    return otts._id;
}
ottService.findOTTByName = async (name) => {
    const ott = await otts.findOne({name:name},{_id:1});
    return ott;
}

module.exports = ottService
