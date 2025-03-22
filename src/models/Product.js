const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    netContent: {
      type: String,
      required: [true, 'Content is required'],
    },
    expiration: {
      type: {
        type: String,
        enum: ['Expiration Day', 'Best Before'],
      },
      date: {
        type: String,
      },
    },
    brandId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
      required: [true, 'Brand is required'],
      autopopulate: true,
    },
    warehouseId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Warehouse',
      required: [true, 'Warehouse is required'],
      autopopulate: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('Product', ProductSchema);
