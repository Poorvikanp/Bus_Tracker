const mongoose = require('mongoose');
const Bus = require('../models/Bus');
require('dotenv').config();

const buses = [
  // Thirthahalli → Shivamogga (Sahyadri Buses)
  {
    name: "Bus 1",
    direction: "Thirthahalli-Shivamogga",
    departure: "6:05 AM",
    arrival: "7:20 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 2",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:00 AM",
    arrival: "8:20 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 3",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:15 AM",
    arrival: "8:40 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 4",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:40 AM",
    arrival: "8:50 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 5",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:50 AM",
    arrival: "9:00 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 6",
    direction: "Thirthahalli-Shivamogga",
    departure: "8:00 AM",
    arrival: "9:20 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 7",
    direction: "Thirthahalli-Shivamogga",
    departure: "9:06 AM",
    arrival: "10:20 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 8",
    direction: "Thirthahalli-Shivamogga",
    departure: "10:00 AM",
    arrival: "11:20 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 9",
    direction: "Thirthahalli-Shivamogga",
    departure: "11:45 AM",
    arrival: "1:05 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 10",
    direction: "Thirthahalli-Shivamogga",
    departure: "12:20 PM",
    arrival: "1:40 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 11",
    direction: "Thirthahalli-Shivamogga",
    departure: "1:15 PM",
    arrival: "2:40 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 12",
    direction: "Thirthahalli-Shivamogga",
    departure: "2:28 PM",
    arrival: "3:52 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 13",
    direction: "Thirthahalli-Shivamogga",
    departure: "2:50 PM",
    arrival: "4:10 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 14",
    direction: "Thirthahalli-Shivamogga",
    departure: "3:40 PM",
    arrival: "4:50 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 15",
    direction: "Thirthahalli-Shivamogga",
    departure: "4:46 PM",
    arrival: "6:10 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 16",
    direction: "Thirthahalli-Shivamogga",
    departure: "5:10 PM",
    arrival: "6:35 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 17",
    direction: "Thirthahalli-Shivamogga",
    departure: "5:20 PM",
    arrival: "6:40 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 18",
    direction: "Thirthahalli-Shivamogga",
    departure: "6:10 PM",
    arrival: "7:25 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 19",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:12 PM",
    arrival: "8:30 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "Bus 20",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:50 PM",
    arrival: "9:30 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },

  // Shivamogga → Thirthahalli (Sahyadri Buses)
  {
    name: "Bus 1",
    direction: "Shivamogga-Thirthahalli",
    departure: "7:45 AM",
    arrival: "9:15 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 2",
    direction: "Shivamogga-Thirthahalli",
    departure: "8:15 AM",
    arrival: "9:40 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 3",
    direction: "Shivamogga-Thirthahalli",
    departure: "8:40 AM",
    arrival: "10:00 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 4",
    direction: "Shivamogga-Thirthahalli",
    departure: "9:05 AM",
    arrival: "10:25 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 5",
    direction: "Shivamogga-Thirthahalli",
    departure: "10:05 AM",
    arrival: "11:30 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 6",
    direction: "Shivamogga-Thirthahalli",
    departure: "10:40 AM",
    arrival: "12:01 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 7",
    direction: "Shivamogga-Thirthahalli",
    departure: "12:28 PM",
    arrival: "1:50 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 8",
    direction: "Shivamogga-Thirthahalli",
    departure: "1:10 PM",
    arrival: "2:30 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 9",
    direction: "Shivamogga-Thirthahalli",
    departure: "1:36 PM",
    arrival: "3:00 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 10",
    direction: "Shivamogga-Thirthahalli",
    departure: "2:55 PM",
    arrival: "4:15 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 11",
    direction: "Shivamogga-Thirthahalli",
    departure: "3:35 PM",
    arrival: "5:00 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 12",
    direction: "Shivamogga-Thirthahalli",
    departure: "4:35 PM",
    arrival: "5:55 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 13",
    direction: "Shivamogga-Thirthahalli",
    departure: "5:10 PM",
    arrival: "6:30 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 14",
    direction: "Shivamogga-Thirthahalli",
    departure: "5:40 PM",
    arrival: "7:00 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 15",
    direction: "Shivamogga-Thirthahalli",
    departure: "6:08 PM",
    arrival: "7:30 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 16",
    direction: "Shivamogga-Thirthahalli",
    departure: "7:10 PM",
    arrival: "8:30 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 17",
    direction: "Shivamogga-Thirthahalli",
    departure: "7:50 PM",
    arrival: "9:15 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "Bus 18",
    direction: "Shivamogga-Thirthahalli",
    departure: "9:00 PM",
    arrival: "10:20 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },

  // Government Buses (KSRTC)
  {
    name: "KSRTC Bus 1",
    number: "KA-15-1234",
    direction: "Thirthahalli-Shivamogga",
    departure: "5:30 AM",
    arrival: "7:40 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "KSRTC Bus 2",
    number: "KA-15-1234",
    direction: "Shivamogga-Thirthahalli",
    departure: "6:45 AM",
    arrival: "8:55 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "KSRTC Bus 3",
    number: "KA-15-5678",
    direction: "Thirthahalli-Shivamogga",
    departure: "7:00 AM",
    arrival: "9:10 AM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "KSRTC Bus 4",
    number: "KA-15-5678",
    direction: "Shivamogga-Thirthahalli",
    departure: "8:15 AM",
    arrival: "10:25 AM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  },
  {
    name: "KSRTC Bus 5",
    number: "KA-15-9101",
    direction: "Thirthahalli-Shivamogga",
    departure: "12:00 PM",
    arrival: "2:10 PM",
    route: ["Thirthahalli Bus Stand", "Kudumallige", "Bejjavalli", "Malur", "Tuduru", "Mandagadde", "Sakrebailu", "Gajanuru", "Shivamogga KSRTC Bus Stand"]
  },
  {
    name: "KSRTC Bus 6",
    number: "KA-15-9101",
    direction: "Shivamogga-Thirthahalli",
    departure: "1:15 PM",
    arrival: "3:25 PM",
    route: ["Shivamogga KSRTC Bus Stand", "Gajanuru", "Sakrebailu", "Mandagadde", "Tuduru", "Malur", "Bejjavalli", "Kudumallige", "Thirthahalli Bus Stand"]
  }
];

async function seedBuses() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bus-tracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('🗄️  Connected to MongoDB');

    // Clear existing buses
    await Bus.deleteMany({});
    console.log('🧹 Cleared existing bus data');

    // Insert new buses
    await Bus.insertMany(buses);
    console.log(`✅ Successfully seeded ${buses.length} buses`);

    // Display summary
    const thirthahalliToShivamogga = await Bus.countDocuments({ direction: 'Thirthahalli-Shivamogga' });
    const shivamoggaToThirthahalli = await Bus.countDocuments({ direction: 'Shivamogga-Thirthahalli' });
    
    console.log('\n📊 Bus Summary:');
    console.log(`🚌 Thirthahalli → Shivamogga: ${thirthahalliToShivamogga} buses`);
    console.log(`🚌 Shivamogga → Thirthahalli: ${shivamoggaToThirthahalli} buses`);
    console.log(`🚌 Total: ${thirthahalliToShivamogga + shivamoggaToThirthahalli} buses`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding buses:', error);
    process.exit(1);
  }
}

seedBuses(); 