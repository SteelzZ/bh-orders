/*****************************/
/*         Facade tests      */
/*****************************/
Tinytest.add('BhOrders - Check required API', function (test) {
    // Order maters :) - fix it so it wouldnt
    test.equal(
        Object.keys(BhOrders.prototype), 
        [
            // BhProducts
            "subscribe", "publish"
        ]
    );  
});

Tinytest.add('BhOrders - Throws Meteor.Error exception if passed services does not match required interface', function (test) {
    test.throws(function(){
        new BhOrders();
    });
});

Tinytest.add('BhOrders - Check if passed services are registered', function (test) {
    var bhOrders = new BhOrders(new OrdersService());

    test.instanceOf(bhOrders.ordersService, OrdersService);
});
