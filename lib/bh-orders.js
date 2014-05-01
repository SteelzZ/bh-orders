BhOrders = function (ordersService){
    var self = this;

    if(!(ordersService instanceof OrdersService))
    throw new Meteor.Error("Given order service is not instance of OrdersService");

    this.ordersService = ordersService;   

    if(Meteor.isServer){
        this.publish();
    }

    if(Meteor.isClient){
        this.subscribe();
    }
}

BhOrders.prototype.constructor = BhOrders;

BhOrders.prototype.subscribe = function(){
    this.ordersService.subscribe();
}

BhOrders.prototype.publish = function(){
    this.ordersService.publish();
}


Orders = new BhOrders(new OrdersService());