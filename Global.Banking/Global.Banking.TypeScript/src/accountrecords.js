"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function loadAccount(jsonPath, accountNumber) {
    var json = fs.readFileSync(jsonPath).toString();
    var records = JSON.parse(json);
    var query = records.accounts.filter(function (r) { return r.number === accountNumber; });
    if (query.length) {
        return query[0];
    }
    else {
        return null;
    }
}
exports.loadAccount = loadAccount;
//# sourceMappingURL=accountrecords.js.map