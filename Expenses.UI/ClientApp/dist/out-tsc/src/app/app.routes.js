"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./components/home/home.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var expense_claims_component_1 = require("./components/expense-claims/expense-claims.component");
exports.appRoutes = [
    // todo: individual expense
    { path: 'expenses/:id', component: page_not_found_component_1.PageNotFoundComponent },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        children: [
            {
                path: '',
                component: expense_claims_component_1.ExpenseClaimsComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
//# sourceMappingURL=app.routes.js.map