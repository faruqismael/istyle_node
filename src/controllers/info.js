const Info = require("../models/Info");

async function createInfo(info) {
    try{
        const newInfo = await Info.create(info)
        return newInfo;
    } catch(err) {
        return err.message;
    }
}

async function getInfo(condition) {
    try{
        const infos = await Info.findAll(condition)
        return infos;
    } catch(err) {
        return err.message;
    }
}

module.exports = {
    getInfo,
    createInfo
}