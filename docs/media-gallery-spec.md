# Media Gallery - Technical Specification (Read-Only Viewer)

## 1. Overview
A read-only media gallery system for viewing and browsing image collections organized in folders.

## 2. Requirements

### 2.1 Functional Requirements
- **FR-1**: Display media folders with preview thumbnails (first 3 images)
- **FR-2**: Browse images within selected folder
- **FR-3**: View full-size image in lightbox/modal viewer
- **FR-4**: Search folders by name or image filename
- **FR-5**: Filter folders by date, name, or image count
- **FR-6**: Responsive grid layout for different screen sizes
- **FR-7**: Lazy loading for images to optimize performance
- **FR-8**: Keyboard navigation support (arrow keys, ESC)

### 2.2 Non-Functional Requirements
- **NFR-1**: Page load time < 2s for initial render
- **NFR-2**: Support 1000+ images without performance degradation
- **NFR-3**: Mobile-first responsive design
- **NFR-4**: Accessible (WCAG 2.1 Level AA)
- **NFR-5**: SEO optimized with proper meta tags and semantic HTML

## 3. Data Models

### 3.1 MediaItem Interface
```typescript
interface MediaItem {
  id: string;                  // Unique identifier
  fileName: string;            // Original filename
  url: string;                 // Image URL (CDN/storage)
  thumbnailUrl?: string;       // Optimized thumbnail (300x300)
  type: 'image';              // Future: 'video'
  fileSize: number;           // Bytes
  dimensions?: {              // Image dimensions
    width: number;
    height: number;
  };
  uploadedAt: Date;           // Upload timestamp
  uploadedBy?: string;        // User ID or name
  tags?: string[];            // Optional tags
  alt?: string;               // Accessibility alt text
}
```

### 3.2 MediaFolder Interface
```typescript
interface MediaFolder {
  id: string;                 // Unique identifier
  name: string;               // Folder name
  description?: string;       // Optional description
  thumbnails: string[];       // First 3-4 image URLs for preview
  imageCount: number;         // Total images in folder
  createdAt: Date;           // Creation timestamp
  updatedAt: Date;           // Last modified timestamp
  createdBy?: string;        // User ID or name
  isPublic: boolean;         // Visibility flag
}
```

### 3.3 API Response Types
```typescript
// GET /api/folders
interface FoldersResponse {
  folders: MediaFolder[];
  total: number;
  page: number;
  pageSize: number;
}

// GET /api/folders/:folderId/images
interface FolderImagesResponse {
  folderId: string;
  folderName: string;
  images: MediaItem[];
  total: number;
  page: number;
  pageSize: number;
}
```

## 4. Component Architecture

### 4.1 Component Tree
```
MediaGalleryPage/
├── MediaGalleryHeader
│   ├── SearchBar
│   └── FilterDropdown
├── FolderGrid
│   └── FolderCard (repeating)
│       ├── FolderThumbnails
│       └── FolderInfo
├── MediaGrid (when folder selected)
│   └── MediaCard (repeating)
│       └── MediaThumbnail
└── MediaLightbox
    ├── ImageViewer
    ├── NavigationControls
    └── ImageMetadata
```

### 4.2 Component Responsibilities

#### MediaGalleryPage (Container)
- State management (selected folder, search term, filters)
- Data fetching and caching
- Route handling
- Error boundary

#### FolderGrid
- Responsive grid layout
- Virtualization for large lists
- Empty state handling
- Loading skeleton

#### FolderCard
- Display folder preview (3 thumbnails)
- Folder metadata (name, count, date)
- Click handler to select folder
- Hover effects

#### MediaGrid
- Masonry or grid layout for images
- Infinite scroll / pagination
- Image lazy loading
- Selection state

#### MediaLightbox
- Full-size image display
- Keyboard navigation (←, →, ESC)
- Zoom controls
- Image metadata overlay
- Download button (optional)

## 5. State Management

### 5.1 Component State
```typescript
// MediaGalleryPage state
const [folders, setFolders] = useState<MediaFolder[]>([]);
const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
const [images, setImages] = useState<MediaItem[]>([]);
const [searchTerm, setSearchTerm] = useState('');
const [sortBy, setSortBy] = useState<'name' | 'date' | 'count'>('date');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);

// MediaLightbox state
const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
```

### 5.2 Data Fetching Strategy
- Use React Query / SWR for caching and automatic refetching
- Implement stale-while-revalidate pattern
- Prefetch next page on scroll
- Cache folder thumbnails aggressively

## 6. API Integration

### 6.1 Endpoints
```typescript
// Folder operations
GET /api/folders?search={term}&sort={field}&page={n}&limit={n}
GET /api/folders/:folderId
GET /api/folders/:folderId/images?page={n}&limit={n}

// Image operations
GET /api/images/:imageId
GET /api/images/:imageId/metadata
```

### 6.2 Mock Data (Development)
```typescript
// Mock API service for development
export const mockMediaAPI = {
  getFolders: async (params: FolderQueryParams): Promise<FoldersResponse> => {
    // Return mock data
  },
  getFolderImages: async (folderId: string, page: number): Promise<FolderImagesResponse> => {
    // Return mock data
  }
};
```

## 7. Performance Optimizations

### 7.1 Image Loading
- Lazy load images below the fold using Intersection Observer
- Use responsive images with `srcset` for different screen sizes
- Progressive image loading (blur-up technique)
- WebP format with fallback to JPG/PNG

### 7.2 Rendering
- Virtualize long lists using `react-window` or `react-virtualized`
- Memoize expensive computations with `useMemo`
- Debounce search input (300ms delay)
- Implement windowing for large image grids

### 7.3 Caching
- Cache folder list in localStorage/sessionStorage
- Use service worker for offline access
- CDN for image assets
- Browser cache headers (Cache-Control, ETag)

## 8. Responsive Design

### 8.1 Breakpoints
```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape, small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large screens */
```

### 8.2 Grid Layout
```
Mobile (< 640px):     2 columns for folders, 2 for images
Tablet (640-1024px):  3 columns for folders, 3 for images
Desktop (> 1024px):   4 columns for folders, 6 for images
```

## 9. Accessibility

### 9.1 Requirements
- All images have meaningful `alt` attributes
- Keyboard navigation (Tab, Enter, Arrow keys, ESC)
- Focus indicators visible and clear
- ARIA labels for interactive elements
- Screen reader announcements for state changes
- Sufficient color contrast (4.5:1 minimum)

### 9.2 Keyboard Shortcuts
```
TAB         - Navigate between elements
ENTER       - Open folder/image
ESC         - Close lightbox
←/→ ARROWS  - Navigate between images in lightbox
+/-         - Zoom in/out in lightbox
```

## 10. Error Handling

### 10.1 Error States
- Network error (offline, timeout)
- 404 - Folder/image not found
- 403 - Access denied
- 500 - Server error
- Image load failure (broken URL)

### 10.2 Error UI
- Toast notifications for transient errors
- Error boundary for component crashes
- Fallback UI for missing images
- Retry mechanism for failed requests

## 11. SEO Optimization

### 11.1 Meta Tags
```html
<title>Media Gallery | {Folder Name}</title>
<meta name="description" content="Browse {count} images in {folder name} collection">
<meta property="og:title" content="Media Gallery - {Folder Name}">
<meta property="og:image" content="{folder thumbnail}">
<meta property="og:type" content="website">
<link rel="canonical" href="/media-gallery/{folderId}">
```

### 11.2 Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "{Folder Name}",
  "description": "{Folder Description}",
  "image": [
    "{image1_url}",
    "{image2_url}"
  ]
}
```

## 12. Testing Strategy

### 12.1 Unit Tests
- Component rendering with different props
- State management logic
- Utility functions (formatFileSize, sortFolders)
- Mock API responses

### 12.2 Integration Tests
- User flow: Browse folders → Select folder → View images
- Search and filter functionality
- Lightbox navigation
- Error handling scenarios

### 12.3 E2E Tests (Playwright/Cypress)
- Complete user journey
- Cross-browser compatibility
- Mobile responsive testing
- Accessibility audit

## 13. Future Enhancements (Out of Scope)

- Video support
- Slideshow mode
- Image comparison (side-by-side)
- Favorite/bookmark images
- Share functionality
- Print optimization
- Export/download folder as ZIP
- Image metadata editing (admin mode)

## 14. Implementation Phases

### Phase 1: Core Viewer (Week 1)
- Basic folder grid
- Image grid for selected folder
- Simple lightbox viewer
- Mock data integration

### Phase 2: Search & Filter (Week 2)
- Search implementation
- Sort/filter options
- Loading states
- Error handling

### Phase 3: Optimization (Week 3)
- Lazy loading
- Image optimization
- Performance tuning
- Accessibility audit

### Phase 4: Polish (Week 4)
- Animations and transitions
- SEO optimization
- Cross-browser testing
- Documentation

## 15. Technical Stack

### Core
- React 18+ with TypeScript
- Vite for build tool
- React Router for routing

### UI & Styling
- Tailwind CSS (semantic tokens from design system)
- shadcn/ui components
- Lucide React icons
- Framer Motion (animations)

### Data Fetching
- @tanstack/react-query for API state management
- Axios for HTTP requests

### Image Optimization
- react-lazy-load-image-component
- react-intersection-observer

### Testing
- Vitest for unit tests
- React Testing Library
- Playwright for E2E tests

## 16. File Structure

```
src/
├── pages/
│   └── MediaGallery.tsx              # Main page container
├── components/
│   └── media-gallery/
│       ├── FolderGrid.tsx
│       ├── FolderCard.tsx
│       ├── MediaGrid.tsx
│       ├── MediaCard.tsx
│       ├── MediaLightbox.tsx
│       ├── SearchBar.tsx
│       └── FilterDropdown.tsx
├── hooks/
│   ├── useMediaFolders.ts            # Folder data fetching
│   ├── useFolderImages.ts            # Image data fetching
│   └── useLightboxNavigation.ts      # Keyboard navigation
├── services/
│   ├── mediaApi.ts                   # API client
│   └── mockMediaApi.ts               # Mock data for development
├── types/
│   └── media.ts                      # TypeScript interfaces
└── utils/
    ├── imageOptimization.ts
    └── formatters.ts
```

## 17. Code Quality Standards

- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Husky for pre-commit hooks
- 80%+ test coverage target
- Prop-types validation for all components
- JSDoc comments for public APIs
- Semantic commit messages (Conventional Commits)

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-14  
**Author**: Development Team  
**Status**: Ready for Review
