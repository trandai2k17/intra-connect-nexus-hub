// TV Bonus Summary Controller - MVC Pattern
export class TVBonusController {
  // Configuration constants
  private static readonly BASE_SLIDE_DURATION = 3000; // 3 seconds per slide
  private static readonly MIN_LOCATION_DURATION = 5000; // Minimum 5 seconds per location
  private static readonly ROWS_PER_PAGE = 5;

  // Calculate total display time for a location based on its slide count
  static calculateLocationDisplayTime(rowCount: number): number {
    const slideCount = Math.ceil(rowCount / this.ROWS_PER_PAGE);
    const calculatedTime = slideCount * this.BASE_SLIDE_DURATION;
    return Math.max(calculatedTime, this.MIN_LOCATION_DURATION);
  }

  // Calculate total slides for given row count
  static calculateTotalSlides(rowCount: number): number {
    return Math.ceil(rowCount / this.ROWS_PER_PAGE);
  }

  // Get current shift based on hour
  static getCurrentShift(hour: number): string {
    if (hour >= 6 && hour < 14) return "S1";
    if (hour >= 14 && hour < 22) return "S2";
    return "S3";
  }

  // Find prodline for a given location
  static findProdlineByLocation(location: string, locationData: Record<string, string[]>): string | undefined {
    return Object.keys(locationData).find(key => 
      locationData[key].includes(location)
    );
  }

  // Get performance styling classes
  static getPerformanceClasses(performance: number): {
    textColor: string;
    badgeClass: string;
  } {
    if (performance >= 100) {
      return {
        textColor: "text-green-500",
        badgeClass: "performance-excellent"
      };
    }
    if (performance >= 90) {
      return {
        textColor: "text-yellow-500", 
        badgeClass: "performance-good"
      };
    }
    return {
      textColor: "text-red-500",
      badgeClass: "performance-poor"
    };
  }

  // Pagination utilities
  static getPaginationData(currentPage: number, totalItems: number) {
    const totalPages = Math.ceil(totalItems / this.ROWS_PER_PAGE);
    const startIndex = (currentPage - 1) * this.ROWS_PER_PAGE;
    const endIndex = startIndex + this.ROWS_PER_PAGE;
    
    return {
      totalPages,
      startIndex,
      endIndex,
      hasMultiplePages: totalPages > 1
    };
  }
}