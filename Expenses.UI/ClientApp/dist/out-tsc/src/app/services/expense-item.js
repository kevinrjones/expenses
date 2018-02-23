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
//# sourceMappingURL=expense-item.js.map