"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home/home.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var expenses_service_1 = require("./services/expenses.service");
var expense_claims_component_1 = require("./components/expense-claims/expense-claims.component");
var http_1 = require("@angular/common/http");
var projectConfigShared_1 = require("./shared/projectConfigShared");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                page_not_found_component_1.PageNotFoundComponent,
                expense_claims_component_1.ExpenseClaimsComponent
            ],
            imports: [
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(app_routes_1.appRoutes, { enableTracing: true } // <-- debugging purposes only
                ),
                platform_browser_1.BrowserModule
            ],
            providers: [expenses_service_1.ExpenseClaimsService,
                {
                    provide: projectConfigShared_1.AppConfig,
                    useValue: projectConfigShared_1.PROJECT_CONFIG
                }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map