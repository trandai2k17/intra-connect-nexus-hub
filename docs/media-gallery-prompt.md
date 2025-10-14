# Media Gallery - Implementation Prompt

## Objective
Create a **read-only media gallery page** for browsing and viewing image collections organized in folders. This is a pure frontend implementation with mock data.

---

## Core Requirements

### 1. Folder Grid View (Home)
- Display media folders in a responsive grid:
  - **Mobile**: 2 columns
  - **Tablet**: 3 columns  
  - **Desktop**: 4-6 columns
- Each folder card shows:
  - First 3 image thumbnails as preview
  - Folder name
  - Total image count
  - Created date
- Click folder → navigate to image grid view
- Search bar to filter folders by name
- Sort dropdown: by date, name, or image count

### 2. Image Grid View (Folder Detail)
- Display all images in selected folder
- Responsive masonry/grid layout
- Lazy load images (only load what's visible)
- Click image → open lightbox viewer
- Breadcrumb navigation: Home > Folder Name
- Back button to return to folder grid

### 3. Lightbox Viewer
- Full-size image display
- Keyboard navigation:
  - `←` / `→` arrows: previous/next image
  - `ESC`: close lightbox
- Navigation controls (prev/next buttons)
- Image counter: "3 / 24"
- Show image metadata (filename, size, dimensions)
- Close button (X)

### 4. Search & Filter
- Real-time search (debounce 300ms)
- Filter folders by:
  - Name (partial match)
  - Date range
  - Image count
- Clear filters button

---

## Technical Stack

### Required
- **React 18+** with TypeScript
- **Vite** (build tool)
- **React Router** for navigation
- **Tailwind CSS** (use semantic tokens from design system)
- **Lucide React** for icons
- **@tanstack/react-query** for data fetching/caching

### Recommended
- `react-lazy-load-image-component` for lazy loading
- `react-intersection-observer` for viewport detection
- `framer-motion` for animations (optional)

---

## Data Models

```typescript
interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image';
  fileSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
  alt?: string;
}

interface MediaFolder {
  id: string;
  name: string;
  description?: string;
  thumbnails: string[];  // First 3 image URLs
  imageCount: number;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}
```

---

## Mock Data Strategy

Create mock API service with realistic data:

```typescript
// services/mockMediaApi.ts
export const mockMediaAPI = {
  // Return 8-12 folders with random image counts
  getFolders: async (params: { search?: string; sortBy?: string }) => {
    await delay(500); // Simulate network
    return {
      folders: MOCK_FOLDERS.filter(f => 
        f.name.toLowerCase().includes(params.search?.toLowerCase() || '')
      ),
      total: MOCK_FOLDERS.length
    };
  },

  // Return 20-50 images per folder
  getFolderImages: async (folderId: string) => {
    await delay(300);
    return {
      folderId,
      folderName: 'Sample Folder',
      images: MOCK_IMAGES,
      total: MOCK_IMAGES.length
    };
  }
};
```

Use **Lorem Picsum** or **Unsplash** for placeholder images:
- Thumbnails: `https://picsum.photos/300/300?random={id}`
- Full size: `https://picsum.photos/1200/800?random={id}`

---

## Component Structure

```
src/
├── pages/
│   └── MediaGallery.tsx           # Main route container
├── components/
│   └── media-gallery/
│       ├── FolderGrid.tsx         # Grid of folder cards
│       ├── FolderCard.tsx         # Single folder preview
│       ├── MediaGrid.tsx          # Grid of images
│       ├── MediaCard.tsx          # Single image thumbnail
│       ├── MediaLightbox.tsx      # Full-size viewer
│       ├── SearchBar.tsx          # Search input
│       └── FilterDropdown.tsx     # Sort/filter controls
├── hooks/
│   ├── useMediaFolders.ts         # Fetch folders with react-query
│   ├── useFolderImages.ts         # Fetch images with react-query
│   └── useLightboxNavigation.ts   # Keyboard shortcuts
└── services/
    └── mockMediaApi.ts            # Mock API implementation
```

---

## Key Features Implementation

### State Management
```typescript
const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState('');
const [sortBy, setSortBy] = useState<'name' | 'date' | 'count'>('date');
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
```

### Routing
```typescript
// Route: /media-gallery
// Route: /media-gallery/:folderId
```

### Performance
- Lazy load images below fold
- Virtualize long lists (optional: use `react-window`)
- Debounce search input
- Cache folder data with react-query

### Accessibility
- All images have `alt` attributes
- Keyboard navigation fully supported
- Focus indicators visible
- ARIA labels on buttons
- Screen reader announcements

---

## UI Design Guidelines

### Design System
- Use semantic tokens: `bg-background`, `text-foreground`, `border-border`
- No hardcoded colors (e.g., no `text-white`, `bg-gray-500`)
- Consistent spacing with Tailwind scale
- Smooth transitions: `transition-all duration-200`

### Component Patterns
```typescript
// FolderCard hover effect
<Card className="group hover:shadow-lg transition-shadow cursor-pointer">
  <div className="aspect-square grid grid-cols-3 gap-1 overflow-hidden rounded-t-lg">
    {thumbnails.map(url => (
      <img src={url} alt="" className="w-full h-full object-cover" />
    ))}
  </div>
  <CardContent>
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-sm text-muted-foreground">{imageCount} images</p>
  </CardContent>
</Card>
```

### Responsive Breakpoints
```typescript
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

---

## Implementation Steps

### Phase 1: Basic Structure
1. Create route `/media-gallery` in App.tsx
2. Build `FolderGrid` with mock data (8 folders)
3. Implement `FolderCard` component
4. Add basic click handling to navigate

### Phase 2: Image Grid
1. Create `MediaGrid` component
2. Fetch images when folder selected
3. Implement lazy loading
4. Add breadcrumb navigation

### Phase 3: Lightbox
1. Build `MediaLightbox` modal
2. Add keyboard navigation (arrows, ESC)
3. Show image metadata
4. Prev/next controls

### Phase 4: Search & Filter
1. Add `SearchBar` component with debounce
2. Implement filter dropdown
3. Add loading states
4. Empty state handling

### Phase 5: Polish
1. Add animations (fade-in, scale)
2. Loading skeletons
3. Error boundaries
4. Accessibility audit
5. Mobile testing

---

## Mock Data Example

```typescript
const MOCK_FOLDERS: MediaFolder[] = [
  {
    id: 'f1',
    name: 'Product Photos 2024',
    description: 'Latest product imagery',
    thumbnails: [
      'https://picsum.photos/300/300?random=1',
      'https://picsum.photos/300/300?random=2',
      'https://picsum.photos/300/300?random=3'
    ],
    imageCount: 24,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    isPublic: true
  },
  // ... 7-11 more folders
];

const MOCK_IMAGES: MediaItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `img-${i + 1}`,
  fileName: `image-${i + 1}.jpg`,
  url: `https://picsum.photos/1200/800?random=${i + 1}`,
  thumbnailUrl: `https://picsum.photos/300/300?random=${i + 1}`,
  type: 'image',
  fileSize: Math.floor(Math.random() * 5000000) + 500000,
  dimensions: { width: 1200, height: 800 },
  uploadedAt: new Date(2024, 0, i + 1),
  alt: `Sample image ${i + 1}`
}));
```

---

## Error Handling

```typescript
// Show toast on errors
import { toast } from 'sonner';

try {
  const folders = await mockMediaAPI.getFolders({ search });
} catch (error) {
  toast.error('Failed to load folders. Please try again.');
}
```

---

## Testing Checklist

- [ ] Folders load and display correctly
- [ ] Search filters folders in real-time
- [ ] Sort dropdown changes folder order
- [ ] Clicking folder navigates to image grid
- [ ] Images lazy load as you scroll
- [ ] Lightbox opens on image click
- [ ] Keyboard arrows navigate images
- [ ] ESC closes lightbox
- [ ] Breadcrumb navigation works
- [ ] Mobile responsive (2 columns)
- [ ] Tablet responsive (3 columns)
- [ ] Desktop responsive (4-6 columns)
- [ ] Loading states show properly
- [ ] Error states handled gracefully

---

## Expected Deliverables

1. ✅ Working `/media-gallery` route
2. ✅ Folder grid with search & filter
3. ✅ Image grid with lazy loading
4. ✅ Lightbox with keyboard navigation
5. ✅ Responsive design (mobile, tablet, desktop)
6. ✅ Mock data implementation
7. ✅ Clean TypeScript types
8. ✅ Follows design system (semantic tokens)

---

## Out of Scope (Do NOT Implement)

- ❌ Upload functionality
- ❌ Delete/edit features
- ❌ Backend API integration
- ❌ User authentication
- ❌ Real database
- ❌ Video support
- ❌ Image editing tools

---

**Start with Phase 1 and build incrementally. Focus on clean, maintainable code with proper TypeScript types.**
