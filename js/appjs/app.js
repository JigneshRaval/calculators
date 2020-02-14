'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('/home', 'home.html', true),
            new Route('/simple-interest-calculator', 'simple-interest-calculator.html'),
            new Route('/SIP-Calculator-Groww', 'SIP-Calculator-Groww.html'),
            new Route('/SWP-Calculator-Groww', 'SWP-Calculator-Groww.html'),
            new Route('/HRA-Calculator-Groww', 'HRA-Calculator-Groww.html'),
            new Route('/NPS-Calculator-Groww', 'NPS-Calculator-Groww.html'),
            new Route('/FD-Calculator-Groww', 'FD-Calculator-Groww.html'),
            new Route('/PPF-Calculator-Groww', 'PPF-Calculator-Groww.html'),
            new Route('/sip-calculator-etmoney', 'sip-calculator.html'),
            new Route('/rent-receipt-generator', 'rent-receipt-generator.html'),
            new Route('/income-tax-calculator', 'income-tax-calculator.html'),
            new Route('/stock-average-calculator', 'stock-average-calculator.html'),
            new Route('/EPF-Calculator-personalfn', 'EPF-Calculator-personalfn.html'),
            new Route('/HRA-Calculator-ICICI', 'HRA-Calculator-ICICI.html'),
        ]);
    }
    init();
}());
