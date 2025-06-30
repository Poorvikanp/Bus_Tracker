const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return !this.number; // Name is required only if number is not provided
    }
  },
  number: {
    type: String,
    required: function() {
      return !this.name; // Number is required only if name is not provided
    }
  },
  route: {
    type: [String],
    required: true
  },
  direction: {
    type: String,
    required: true,
    enum: ['Thirthahalli-Shivamogga', 'Shivamogga-Thirthahalli']
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "On Time",
    enum: ["On Time", "Delayed", "Cancelled", "Departed", "Arrived"]
  },
  delayMinutes: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
busSchema.index({ direction: 1, departure: 1 });
busSchema.index({ status: 1 });

module.exports = mongoose.model('Bus', busSchema); 