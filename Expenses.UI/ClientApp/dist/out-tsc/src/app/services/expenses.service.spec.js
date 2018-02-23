"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var expenses_service_1 = require("./expenses.service");
describe('ItemsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [expenses_service_1.ExpensesService]
        });
    });
    it('should be created', testing_1.inject([expenses_service_1.ExpensesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=expenses.service.spec.js.map