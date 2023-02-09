const Setting = require("../models/Setting");

async function createSetting(setting) {
  try {
    const newSetting = await Setting.create(setting);
    return newSetting;
  } catch (err) {
    return err.message;
  }
}

async function getSetting() {
  try {
    const settings = await Setting.findAll();
    return settings;
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  getSetting,
  createSetting,
};
