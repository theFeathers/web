const { resolve } = require("path");

exports.getPath = path => resolve(__dirname, "../..", path);
