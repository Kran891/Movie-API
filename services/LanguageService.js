const languages = require("../models/Languages");

var languageService = {} ;

languageService.addLanguage = async (name) => {
    const language = new languages({name:name})
    await language.save();
    return language._id;
}
languageService.findLanguageByName = async (name) => {
    const language = await languages.findOne({name:name},{_id:1});
    return language;
}
languageService.deleteLanguage = async (name) => {
    let language = await languages.findOne(name)
    await languages.deleteOne(language);
    return language._id;
}
languageService.getAllLanguages=async()=>{
    return await (await (languages.find({},{name:1,_id:0}))).map(x=>x.name)
}
module.exports = languageService