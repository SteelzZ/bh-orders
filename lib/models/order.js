Order = function(document){
    _.extend(this, document);
};

Order.prototype = {
    constructor: Order
}

OrdersCollection = new Meteor.Collection("bh-orders", {
    transform: function(document){
        return new Order(document)
    }
});

OrdersCollection.allow({
    insert: function (userId, doc) {
        // the user must be logged in
        return userId;
    },
    update: function (userId, doc, fields, modifier) {
        // the user must be logged in
        return userId;
    },
    remove: function (userId, doc) {
        // the user must be logged in
        return userId;
    },
});