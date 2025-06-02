
# API Examples - Traffic API


## Endpoints

### 1. GET api/traffic-analysis/intersection
**Parameters:** `date` (required), `id_simpang` (optional)

**Request:**
```
GET /api/traffic/intersection?date=2024-06-01
```

**Response:**
```json
[
  {
    waktu_puncak: 'Morning',
    arm: 'Utara',
    id_simpang: 1,
    total_kendaraan: 85,
    flow_ratio: 0.01,
    cycle_time: 120,
    green_time: 25,
    capacity: 750
  },{
    waktu_puncak: 'Morning',
    arm: 'Selatan',
    id_simpang: 1,
    total_kendaraan: 98,
    flow_ratio: 0.02,
    cycle_time: 120,
    green_time: 25,
    capacity: 750
  },
  {
    waktu_puncak: 'Morning',
    arm: 'Timur',
    id_simpang: 1,
    total_kendaraan: 49,
    flow_ratio: 0.01,
    cycle_time: 120,
    green_time: 25,
    capacity: 750
  },
  ...
]
```

### 2. GET api/traffic-analysis/summary
**Parameters:** `date` (required), `id_simpang` (optional)

**Request:**
```
GET /api/traffic/summary?date=2024-06-01
```

**Response:**
```json
{
  "peakTrafficTime": "07:00-08:00",
  "coPollution": 34.56,
  "lostEstimation": 432500,
  "vehiclesQueued": 1250
}
```

## Error Response
```json
{
  "error": "Invalid date parameter"
}
```
