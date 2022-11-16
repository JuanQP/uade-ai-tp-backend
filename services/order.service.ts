// Gettign the Newly created Mongoose Model we just created
import Order from '../models/Order.model';

// Async function to get the User List
export async function getOrders (query: Object, page: number, limit: number) {

    // Options setup for the mongoose paginate
    const options = {
        page,
        limit,
        sort: {$natural: -1},
    }
    // Try Catch the awaited promise to handle the error
    try {
        const Orders = await Order.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Orders;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while Paginating Orders');
    }
}

export async function getOrderById (id: string) {

    // Try Catch the awaited promise to handle the error
    try {
        const OrderResult = await Order.findById(id);
        return OrderResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while retrieving Order');
    }
}

export async function createOrder (order: Order) {
    const newOrder = new Order({
        ...order,
    });

    try {
        // Saving the Order
        const savedOrder = await newOrder.save();
        return savedOrder;
    } catch (e) {
        // return a Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Order")
    }
}

export async function updateOrderStatus (ids: string[], nuevoEstado: string) {

    // Try Catch the awaited promise to handle the error
    try {
        const OrderResult = await Order.updateMany(
            {'_id': {$in: ids}},
            {estado: nuevoEstado}
        );
        return OrderResult;

    } catch (e) {
        // return a Error message describing the reason
        console.log("error services",e)
        throw Error('Error while updating Orders');
    }
}
