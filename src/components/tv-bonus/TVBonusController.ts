// TV Bonus Summary Controller - MVC Pattern
import { TVBonusConfig } from './TVBonusConfig';

export class TVBonusController {
  /**
   * Calculate display time for a location using configuration
   */
  static calculateLocationDisplayTime(rowCount: number): number {
    return TVBonusConfig.calculateLocationDisplayTime(rowCount);
  }

  /**
   * Calculate slide display time
   */
  static calculateSlideDisplayTime(): number {
    return TVBonusConfig.calculateSlideDisplayTime();
  }

  /**
   * Calculate total slides for given row count
   */
  static calculateTotalSlides(rowCount: number): number {
    return Math.ceil(rowCount / TVBonusConfig.ROWS_PER_PAGE);
  }

  /**
   * Get timing breakdown for debugging purposes
   */
  static getTimingBreakdown(rowCount: number) {
    return TVBonusConfig.getTimingBreakdown(rowCount);
  }

  /**
   * Get current shift based on hour
   */
  static getCurrentShift(hour: number): string {
    if (hour >= 6 && hour < 14) return "S1";
    if (hour >= 14 && hour < 22) return "S2";
    return "S3";
  }

  /**
   * Find prodline for a given location
   */
  static findProdlineByLocation(location: string, locationData: Record<string, string[]>): string | undefined {
    return Object.keys(locationData).find(key => 
      locationData[key].includes(location)
    );
  }

  /**
   * Get performance styling classes using configuration thresholds
   */
  static getPerformanceClasses(performance: number): {
    textColor: string;
    badgeClass: string;
  } {
    if (performance >= TVBonusConfig.PERFORMANCE_EXCELLENT_THRESHOLD) {
      return {
        textColor: "text-green-500",
        badgeClass: "performance-excellent"
      };
    }
    if (performance >= TVBonusConfig.PERFORMANCE_GOOD_THRESHOLD) {
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

  /**
   * Pagination utilities using configuration
   */
  static getPaginationData(currentPage: number, totalItems: number) {
    const totalPages = Math.ceil(totalItems / TVBonusConfig.ROWS_PER_PAGE);
    const startIndex = (currentPage - 1) * TVBonusConfig.ROWS_PER_PAGE;
    const endIndex = startIndex + TVBonusConfig.ROWS_PER_PAGE;
    
    return {
      totalPages,
      startIndex,
      endIndex,
      hasMultiplePages: totalPages > 1
    };
  }

  /**
   * Get animation delay for table row
   */
  static getRowAnimationDelay(rowIndex: number): number {
    return TVBonusConfig.getRowAnimationDelay(rowIndex);
  }
}