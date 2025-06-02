import { db } from './index.js';
import { traffic } from './schema.js';

const seedData = [
  {
    id_simpang: 1,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 45,
    mp: 28,
    aup: 12,
    waktu: '07:00'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'P',
    dari_arah: 'Selatan',
    ke_arah: 'Utara',
    sm: 52,
    mp: 31,
    aup: 15,
    waktu: '07:00'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'O',
    dari_arah: 'Timur',
    ke_arah: 'Barat',
    sm: 23,
    mp: 18,
    aup: 8,
    waktu: '07:00'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'O',
    dari_arah: 'Barat',
    ke_arah: 'Timur',
    sm: 28,
    mp: 22,
    aup: 9,
    waktu: '07:00'
  },
  {
    id_simpang: 2,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 67,
    mp: 42,
    aup: 18,
    waktu: '08:00'
  },
  {
    id_simpang: 2,
    tipe_pendekat: 'P',
    dari_arah: 'Selatan',
    ke_arah: 'Utara',
    sm: 71,
    mp: 45,
    aup: 20,
    waktu: '08:00'
  },
  {
    id_simpang: 2,
    tipe_pendekat: 'O',
    dari_arah: 'Timur',
    ke_arah: 'Barat',
    sm: 34,
    mp: 26,
    aup: 11,
    waktu: '08:00'
  },
  {
    id_simpang: 2,
    tipe_pendekat: 'O',
    dari_arah: 'Barat',
    ke_arah: 'Timur',
    sm: 38,
    mp: 29,
    aup: 13,
    waktu: '08:00'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 89,
    mp: 56,
    aup: 24,
    waktu: '17:30'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'P',
    dari_arah: 'Selatan',
    ke_arah: 'Utara',
    sm: 95,
    mp: 61,
    aup: 27,
    waktu: '17:30'
  },
  {
    id_simpang: 1,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 78,
    mp: 48,
    aup: 21,
    waktu: '12:00'
  },
  {
    id_simpang: 2,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 84,
    mp: 52,
    aup: 23,
    waktu: '05:00'
  },
  {
    id_simpang: 3,
    tipe_pendekat: 'P',
    dari_arah: 'Utara',
    ke_arah: 'Selatan',
    sm: 43,
    mp: 27,
    aup: 12,
    waktu: '12:00'
  }
];

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    await db.delete(traffic);
    console.log('Cleared existing traffic data');
    
    for (const data of seedData) {
      await db.insert(traffic).values(data);
    }
    
    console.log('seeding completed');
    
    return { success: true, count: seedData.length };
  } catch (error) {
    throw error;
  }
}


const isMainModule = process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js');

if (isMainModule) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
