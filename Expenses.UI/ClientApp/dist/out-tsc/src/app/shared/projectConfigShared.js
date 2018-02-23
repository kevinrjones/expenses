"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
exports.AppConfig = new core_1.InjectionToken('app.config');
exports.PROJECT_CONFIG = {
    expensesUrl: environment_1.environment.expensesUrl,
    rootUrl: environment_1.environment.rootUrl
};
//# sourceMappingURL=projectConfigShared.js.map