const languages = require("../models/Languages");

var languageService;

languageService.addLanguage = async (name) => {
    const language = await languages.create({name:name})
    return language._id;
}
languageService.deleteLanguage = async (name) => {
    let language = await languages.findOne(name)
    await languages.deleteOne(language);
    return language._id;
}