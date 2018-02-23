"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var expenses_service_1 = require("../../services/expenses.service");
var expense_claim_1 = require("../../services/expense-claim");
require("rxjs/add/operator/map");
var ExpenseClaimsComponent = /** @class */ (function () {
    // todo: add logger
    function ExpenseClaimsComponent(expensesService) {
        this.expensesService = expensesService;
    }
    // todo: add toast  
    ExpenseClaimsComponent.prototype.ngOnInit = function () {
        // this.expensesService.claims()
        //   .subscribe(
        //     (claims) => {
        //       this.claims = claims;
        //       console.log(claims)
        //     },
        //     (error) => console.error(error)
        //   );
        var _this = this;
        var d = this.expensesService.claims()
            .subscribe(function (claims) {
            _this.claims = claims.map(function (c) { return new expense_claim_1.ExpenseClaim(c); });
        }, function (error) { return console.error(error); });
        console.log(d);
    };
    ExpenseClaimsComponent = __decorate([
        core_1.Component({
            selector: 'app-expense-claims',
            templateUrl: './expense-claims.component.html',
            styleUrls: ['./expense-claims.component.scss']
        }),
        __metadata("design:paramtypes", [expenses_service_1.ExpenseClaimsService])
    ], ExpenseClaimsComponent);
    return ExpenseClaimsComponent;
}());
exports.ExpenseClaimsComponent = ExpenseClaimsComponent;
//# sourceMappingURL=expense-claims.component.js.map