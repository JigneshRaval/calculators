'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('/simple-interest-calculator', 'simple-interest-calculator.html'),
			new Route('/SIP-Calculator-Groww', 'SIP-Calculator-Groww.html')
        ]);
    }
    init();
}());
