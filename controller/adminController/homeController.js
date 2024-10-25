import ProductModel from "../../models/prodectsModel.js";
import userModel from "../../models/userModel.js";
import OrderModel from "../../models/orderModel.js";

export const getAdmin = async (req, res) => {
    try {
        const newUsers = await userModel.find().sort({ createdAt: -1 }).limit(5);
        
        const totalRevenueResult = await OrderModel.aggregate([
            { $match: { paymentStatus: "Paid" } }, 
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } } 
        ]);
        const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

        const totalSalesCount = await OrderModel.countDocuments({ paymentStatus: "Paid" });
        const totalUsers = await userModel.countDocuments();
        const totalProducts = await ProductModel.countDocuments();

        const outOfStockProducts = await ProductModel.find({
            availableSize: { 
                $not: { $elemMatch: { stock: { $gt: 0 } } } 
            }
        });

        const newOrders = await OrderModel.find().sort({ createdAt: -1 }).limit(5);
        
        res.render("admin/index", { 
            newUsers, 
            totalRevenue, 
            totalSalesCount, 
            totalUsers, 
            totalProducts,
            outOfStockProducts,
            newOrders
        });
    } catch (error) {
        console.error("Error fetching data for admin dashboard:", error);
        res.status(500).send("Internal Server Error");
    }
};

