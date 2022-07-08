"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/movie", function (req, res) {
    res.end("this is movie");
});
router.get("/countries", function (req, res) {
    var countries = [
        { name: "japan", capital: "tokyo" },
        { name: "germany", capital: "berlin" },
    ];
    res.json(countries);
});
module.exports = router;
