const Bus = require('../models/Bus');

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({ isActive: true }).sort({ departure: 1 });
    res.json({
      success: true,
      data: buses,
      count: buses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching buses',
      error: error.message
    });
  }
};

// Get bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }
    res.json({
      success: true,
      data: bus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bus',
      error: error.message
    });
  }
};

// Get buses by direction
exports.getBusesByDirection = async (req, res) => {
  try {
    const { direction } = req.params;
    const buses = await Bus.find({ 
      direction, 
      isActive: true 
    }).sort({ departure: 1 });
    
    res.json({
      success: true,
      data: buses,
      count: buses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching buses by direction',
      error: error.message
    });
  }
};

// Update bus status
exports.updateBusStatus = async (req, res) => {
  try {
    const { currentLocation, status, delayMinutes } = req.body;
    
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { 
        currentLocation, 
        status, 
        delayMinutes, 
        lastUpdated: Date.now() 
      },
      { new: true, runValidators: true }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.json({
      success: true,
      message: 'Bus status updated successfully',
      data: bus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating bus status',
      error: error.message
    });
  }
};

// Create new bus
exports.createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    
    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: bus
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating bus',
      error: error.message
    });
  }
};

// Delete bus (soft delete)
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.json({
      success: true,
      message: 'Bus deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting bus',
      error: error.message
    });
  }
}; 