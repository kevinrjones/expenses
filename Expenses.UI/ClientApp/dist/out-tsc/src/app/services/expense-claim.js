"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpenseItem = /** @class */ (function () {
    function ExpenseItem(item) {
        Object.assign(this, item);
    }
    Object.defineProperty(ExpenseItem.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpenseItem.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    return ExpenseItem;
}());
exports.ExpenseItem = ExpenseItem;
var ExpenseClaim = /** @class */ (function () {
    function ExpenseClaim(item) {
        Object.assign(this, item);
    }
    Object.defineProperty(ExpenseClaim.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpenseClaim.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpenseClaim.prototype, "ExpenseItems", {
        get: function () {
            return this.expenseItems;
        },
        enumerable: true,
        configurable: true
    });
    return ExpenseClaim;
}());
exports.ExpenseClaim = ExpenseClaim;
//# sourceMappingURL=expense-claim.js.map