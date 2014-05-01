Package.describe({
    summary: "Orders management base package"
});

Package.on_use(function (api, where) {
    api.add_files('lib/models/order.js', ['client', 'server']);
    api.add_files('lib/services/orders-service.js', ['client', 'server']);
    api.add_files('lib/bh-orders.js', ['client', 'server']);

    // To get started with
    // Default base implementation
    api.export('Orders', ['client', 'server']);

    // For advanced usage
    // Exports everything that is needed to extend package
    // bh-leet-products package is sample extension of this base package
    api.export('BhOrders', ['client', 'server']);

    api.export('OrdersService', ['client', 'server']);

    api.export('Order', ['client', 'server']);
    api.export('OrdersCollection', ['client', 'server']);
});

Package.on_test(function (api) {
    api.use('bh-orders');
    api.use('tinytest', ['client', 'server']);
    api.use('test-helpers', ['client', 'server']);
    api.use('accounts-base', ['client', 'server']);
    api.use('accounts-password', ['client', 'server']);

    api.add_files('test/bh-orders-test.js', ['client', 'server']);
    api.add_files('test/orders-service-test.js', ['client', 'server']);
});
