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

OrdersService.getOrders = function(){
    return OrdersCollection.find({}, {sort:{createdAt:-1}});
}

OrdersService.getOrder = function(id){
    return OrdersCollection.findOne({_id:id});
}

OrdersService.createOrder = function(customer, company, products, amount, shippingAddress, billingAddress, type){
    var created = false;
    var orderId = null;
    do {
        var number = 1;
        var latestOrder = OrdersCollection.findOne({}, {sort:{number:-1}});
        if(typeof latestOrder == 'object'){
            number = parseInt(latestOrder.number);
            number++;
        }

        var id = OrdersService.prefix + number;

        var order = {
            _id: id,
            customer : customer,
            company: company,
            products: products,
            amount: amount,
            payment: {},
            status: 'created',
            number: number,
            type: type,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        try{
            OrdersCollection.insert(order);
            created = true;
            return order;
        } catch(e){
            
        }
    } while(!created);
}

OrdersService.markOrderAsPaid = function(orderId, payment){

    var update = {
        '$set' : {
            status: 'paid',
            payment: payment,
            updatedAt: new Date()
        }
    };

    var result = OrdersCollection.update({_id:orderId, status: 'created'}, update);
    if(result){
        return OrdersCollection.findOne({_id:orderId});
    } else {
        return null;
    }
}


OrdersService.markOrderAsFailed = function(orderId, payment){

    var update = {
        '$set' : {
            status: 'failed',
            payment: payment,
            updatedAt: new Date()
        }
    };

    var result = OrdersCollection.update({_id:orderId, status: 'created'}, update);
    if(result){
        return OrdersCollection.findOne({_id:orderId});
    } else {
        return null;
    }
}

OrdersService.markOrderAsCanceled = function(orderId){
    var update = {
        '$set' : {
            status: 'canceled',
            updatedAt: new Date()
        }
    };

    OrdersCollection.update({_id:orderId}, update);
}

OrdersService.updateOrder = function(orderId, products, customer, company, shippingAddress, billingAddress){
    var update = {
        '$set' : {
            products: products,
            customer : customer,
            company: company,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            updatedAt: new Date()
        }
    };

    OrdersCollection.update({_id:orderId}, update);
}