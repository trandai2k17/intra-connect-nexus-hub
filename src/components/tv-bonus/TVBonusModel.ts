// TV Bonus Summary Model - Data structures and mock data

export interface BonusData {
  tech: string;
  skillLevel: string;
  target: number;
  unit: string;
  curTarget: number;
  downtime: number;
  correction: number;
  performance: number;
}

export interface LateCaseData {
  oneDayCount: number;
  twoDaysCount: number;
  threeDaysCount: number;
  moreThanThreeDaysCount: number;
  totalCount: number;
}

export interface LocationBonusData {
  [locationId: string]: BonusData[];
}

export interface LocationData {
  [prodlineId: string]: string[];
}

// Model class for TV Bonus data management
export class TVBonusModel {
  // Static data configurations
  static readonly PRODLINE_ITEMS = [
    "CB-DESIGNER",
    "CB-TECHNICIAN", 
    "CB-QUALITY",
    "MILL-OPERATOR",
    "CAST-TECHNICIAN"
  ] as const;

  static readonly LOCATION_DATA: LocationData = {
    "CB-DESIGNER": ["Location A1", "Location A2", "Location A3"],
    "CB-TECHNICIAN": ["Location B1", "Location B2"], 
    "CB-QUALITY": ["Location C1", "Location C2", "Location C3", "Location C4"],
    "MILL-OPERATOR": ["Location D1", "Location D2", "Location D3"],
    "CAST-TECHNICIAN": ["Location E1", "Location E2", "Location E3", "Location E4", "Location E5"]
  };

  static readonly MOCK_LATE_CASE_DATA: LateCaseData = {
    oneDayCount: 8,
    twoDaysCount: 1,
    threeDaysCount: 0,
    moreThanThreeDaysCount: 1,
    totalCount: 10
  };

  static readonly LOCATION_BONUS_DATA: LocationBonusData = {
    "Location A1": [
      { tech: "John Doe", skillLevel: "Senior", target: 50, unit: "cases", curTarget: 45, downtime: 2, correction: 1, performance: 92 },
      { tech: "Jane Smith", skillLevel: "Mid", target: 40, unit: "cases", curTarget: 38, downtime: 1, correction: 2, performance: 88 },
      { tech: "Mike Johnson", skillLevel: "Junior", target: 30, unit: "cases", curTarget: 32, downtime: 0, correction: 0, performance: 107 },
      { tech: "Sarah Wilson", skillLevel: "Senior", target: 55, unit: "cases", curTarget: 50, downtime: 1, correction: 0, performance: 91 },
      { tech: "Tom Brown", skillLevel: "Mid", target: 45, unit: "cases", curTarget: 42, downtime: 2, correction: 1, performance: 87 },
      { tech: "Lisa Davis", skillLevel: "Junior", target: 35, unit: "cases", curTarget: 38, downtime: 0, correction: 1, performance: 106 },
      { tech: "Bob Miller", skillLevel: "Senior", target: 60, unit: "cases", curTarget: 55, downtime: 1, correction: 2, performance: 88 }
    ],
    "Location A2": [
      { tech: "Alice Green", skillLevel: "Senior", target: 52, unit: "cases", curTarget: 48, downtime: 1, correction: 1, performance: 90 },
      { tech: "Charlie Black", skillLevel: "Mid", target: 42, unit: "cases", curTarget: 40, downtime: 2, correction: 0, performance: 95 }
    ],
    "Location A3": [
      { tech: "David White", skillLevel: "Senior", target: 48, unit: "cases", curTarget: 46, downtime: 1, correction: 1, performance: 94 },
      { tech: "Emma Blue", skillLevel: "Mid", target: 38, unit: "cases", curTarget: 36, downtime: 0, correction: 2, performance: 89 },
      { tech: "Frank Gray", skillLevel: "Junior", target: 32, unit: "cases", curTarget: 35, downtime: 1, correction: 0, performance: 103 }
    ]
  };

  // Get all locations grouped by prodline
  static getAllLocationsByProdline() {
    return Object.entries(this.LOCATION_DATA).map(([prodline, locations]) => ({
      prodline,
      locations
    }));
  }

  // Get bonus data for specific location
  static getBonusDataByLocation(locationId: string): BonusData[] {
    return this.LOCATION_BONUS_DATA[locationId] || [];
  }

  // Get default bonus data (fallback)
  static getDefaultBonusData(): BonusData[] {
    return this.LOCATION_BONUS_DATA["Location A1"] || [];
  }
}