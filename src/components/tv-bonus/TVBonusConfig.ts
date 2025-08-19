// TV Bonus Summary Configuration - Timing and Display Settings

export class TVBonusConfig {
  // Base timing configurations (in milliseconds)
  static readonly BASE_SLIDE_DURATION = 4000; // 4 seconds per slide
  static readonly SLIDE_TRANSITION_DELAY = 1000; // 1 second between slides
  static readonly MIN_LOCATION_DURATION = 6000; // Minimum 6 seconds per location
  static readonly MAX_LOCATION_DURATION = 30000; // Maximum 30 seconds per location
  
  // Table display configurations
  static readonly ROWS_PER_PAGE = 5;
  static readonly ANIMATION_STAGGER_DELAY = 100; // 0.1s delay between row animations
  
  // Location rotation configurations
  static readonly ENABLE_AUTO_ROTATION = true;
  static readonly PAUSE_ON_INTERACTION = true;
  
  // Performance thresholds
  static readonly PERFORMANCE_EXCELLENT_THRESHOLD = 100;
  static readonly PERFORMANCE_GOOD_THRESHOLD = 90;
  
  /**
   * Calculate total display time for a location based on slide count
   * Formula: (slideCount * slideDuration) + ((slideCount - 1) * transitionDelay) + bufferTime
   */
  static calculateLocationDisplayTime(rowCount: number): number {
    const slideCount = Math.ceil(rowCount / this.ROWS_PER_PAGE);
    
    if (slideCount <= 1) {
      return this.MIN_LOCATION_DURATION;
    }
    
    // Calculate base time: each slide gets display time + transition time between slides
    const slideDisplayTime = slideCount * this.BASE_SLIDE_DURATION;
    const transitionTime = (slideCount - 1) * this.SLIDE_TRANSITION_DELAY;
    const totalCalculatedTime = slideDisplayTime + transitionTime;
    
    // Apply min/max constraints
    return Math.min(
      Math.max(totalCalculatedTime, this.MIN_LOCATION_DURATION),
      this.MAX_LOCATION_DURATION
    );
  }
  
  /**
   * Calculate time for each slide within a location
   */
  static calculateSlideDisplayTime(): number {
    return this.BASE_SLIDE_DURATION;
  }
  
  /**
   * Get animation delay for table rows
   */
  static getRowAnimationDelay(rowIndex: number): number {
    return rowIndex * this.ANIMATION_STAGGER_DELAY;
  }
  
  /**
   * Get timing breakdown for debugging
   */
  static getTimingBreakdown(rowCount: number): {
    slideCount: number;
    slideDisplayTime: number;
    transitionTime: number;
    totalTime: number;
    effectiveTime: number;
  } {
    const slideCount = Math.ceil(rowCount / this.ROWS_PER_PAGE);
    const slideDisplayTime = slideCount * this.BASE_SLIDE_DURATION;
    const transitionTime = (slideCount - 1) * this.SLIDE_TRANSITION_DELAY;
    const totalTime = slideDisplayTime + transitionTime;
    const effectiveTime = this.calculateLocationDisplayTime(rowCount);
    
    return {
      slideCount,
      slideDisplayTime,
      transitionTime,
      totalTime,
      effectiveTime
    };
  }
}