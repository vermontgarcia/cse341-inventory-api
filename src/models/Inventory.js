const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    warehouseId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Warehouse',
      required: [true, 'There is no related warehouse'],
      autopopulate: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'There is no related product'],
      autopopulate: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('Inventory', InventorySchema);
