OrdersService = function(){
    this.subsciptionName = 'bh-orders';
}

OrdersService.prototype.publishOrders = function(user){
    var result = user ? OrdersCollection.find({}) : null;
    return result;
}

OrdersService.prototype.publish = function(){
    Meteor.publish(this.subsciptionName, this.publishOrders);
}

OrdersService.prototype.subscribe = function(){
    var self = this;
    Meteor.startup(function(){
        Meteor.subscribe(self.subsciptionName, Meteor.userId());
    })
}