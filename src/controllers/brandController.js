const Brand = require('../models/Brand');

const getAllBrands = async (req, res) => {
  try {
    const brandsRaw = await Brand.find();
    const brands = brandsRaw.map((brand) => {
      return {
        id: brand.id,
        ...brand._doc,
        _id: undefined,
        __v: undefined,
      };
    });

    return res.status(200).json({
      brands,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brandRaw = await Brand.findById(id);
    if (brandRaw) {
      const brand = {
        id: brandRaw.id,
        ...brandRaw._doc,
        _id: undefined,
        __v: undefined,
      };
      return res.status(200).json({ brand });
    } else {
      return res.status(404).json({ msg: 'Brand not found' });
    }
  } catch (error) {
    console.log('Error fetching brand: ', error);
    return res.status(500).json({ error: 'Fetching Brand Error' });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brandRaw = await Brand.create({ name });
    if (brandRaw) {
      const newBrand = await Brand.findById(brandRaw.id);
      const brand = {
        id: newBrand.id,
        ...brandRaw._doc,
        _id: undefined,
        __v: undefined,
      };
      return res.status(201).json({ brand });
    }
  } catch (error) {
    res.status(422).json({ error });
  }
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const brandRaw = await Brand.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );
    if (brandRaw) {
      const brand = {
        id: brandRaw.id,
        ...brandRaw._doc,
        _id: undefined,
        __v: undefined,
      };
      return res.status(200).json({ brand });
    } else {
      return res.status(404).json({ msg: 'Brand not found' });
    }
  } catch (error) {
    console.log('Error updating brand: ', error);
    return res.status(500).json({ error: 'Updating Brand Error' });
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (brand) {
      return res.status(200).json({ msg: 'Brand deleted successfully' });
    } else {
      return res.status(404).json({ msg: 'Brand not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Deleting Brand Error' });
  }
};

module.exports = {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
