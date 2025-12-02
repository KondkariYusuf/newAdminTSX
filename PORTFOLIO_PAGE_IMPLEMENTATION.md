# Portfolio Page TypeScript Implementation

## Overview
The `PortfolioPage.tsx` component is a comprehensive portfolio management interface built with React and TypeScript, using the provided UI components from the components folder.

## Features Implemented

### 1. **Data Structures (TypeScript Interfaces)**
```typescript
- Portfolio: Main portfolio container with recentWork and projects
- Project: Individual project with all fields (title, year, category, images, etc.)
- RecentWork: Section containing heading, subheading, and services
- DetailSection: Sub-sections within projects (Visual Hierarchy, Components, etc.)
```

### 2. **Recent Work Section**
- Manage heading and subheading
- Add/remove services using tag input
- Displayed at the top of the portfolio

### 3. **Projects Management**
Each project includes:
- **Basic Info**: Title, Year, Category
- **Meta Data**: Slug, Service Label, Client, Date
- **Technologies**: Tag-based input for tech stack
- **Main Image**: File upload with preview or URL input
- **Overview Section**: Title, descriptive text, and feature list
- **Gallery Images**: Upload up to 6 images with preview
- **Detail Sections**: Add/edit/remove custom detail sections (like "Visual Hierarchy", "Components")
- **Final Image**: Optional bottom image URL

### 4. **Image Handling**
- **Main Project Image**:
  - File upload support with preview using `FileInput` component
  - Alternative URL input option
  - Shows preview of uploaded file or existing image URL
  
- **Gallery Images** (up to 6):
  - Multi-file upload support
  - Grid preview showing all uploaded/existing images
  - Tag-based URL management for manual gallery URLs

### 5. **Form Components Used**
- `InputField`: Text, number, email inputs
- `FileInput`: File upload functionality
- `TextArea`: Multi-line text input
- `Label`: Styled form labels
- `PageMeta`: Page metadata (title, description)

### 6. **State Management**
- Portfolio data with nested projects
- Separate tracking for uploaded files vs. saved URLs
- Image preview URLs with object URLs for file inputs
- Loading and message states

### 7. **Local Operations**
- Add/remove projects locally
- Add/remove/update detail sections
- Tag management (technologies, services, features)
- Full form reset capability

## Components Structure

### State Variables
```typescript
const [portfolio, setPortfolio] = useState<Portfolio>(emptyPortfolio)
const [projectImages, setProjectImages] = useState<(File | null)[]>([])
const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[][]>([])
const [imagePreviewUrls, setImagePreviewUrls] = useState<{[key: string]: string}>({})
const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<{[key: string]: string[]}>({})
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState("")
```

### Key Functions
- `handleProjectImageChange()`: Handle main image upload
- `handleGalleryImagesChange()`: Handle gallery images upload
- `updateRecentWork()`: Update recent work section
- `updateProjectField()`: Update specific project fields
- `addProjectLocal()`: Add new project locally
- `removeProjectLocal()`: Remove project locally
- `addDetailSection()`: Add detail section to project
- `updateDetailSection()`: Update detail section content
- `removeDetailSection()`: Remove detail section
- `TagInput()`: Reusable tag input component
- `savePortfolio()`: Submit form data

## TagInput Component
A custom reusable component for managing tag arrays:
- Type a value and press comma to add
- Click × on tags to remove
- Visual feedback with brand colors
- Used for: services, technologies, features, gallery URLs

## Image Preview System
### Main Project Image Preview
- Shows uploaded file preview OR existing image URL
- Uses `URL.createObjectURL()` for file previews
- Clean up and replacement when new file is selected

### Gallery Images Preview
- Grid layout (2 columns on mobile, 6 on desktop)
- Shows uploaded file previews OR existing image URLs
- Thumbnail size (h-24) for easy browsing
- Supports up to 6 images

## API Integration Notes
The component includes TODO comments for API integration:
- Load portfolio data on mount: `GET /portfolio`
- Save portfolio data: `POST /portfolio` (create) or `PUT /portfolio` (update)
- Multipart form data for file uploads
- Separate endpoints for project CRUD operations

## JSON Structure Match
The component matches the provided JSON structure:
```json
{
  "_id": "6928555ebfecf1fb8a78729d",
  "recentWork": {
    "heading": "string",
    "subheading": "string",
    "services": ["string"]
  },
  "projects": [
    {
      "title": "string",
      "slug": "string",
      "year": number,
      "category": "string",
      "imageUrl": "string",
      "serviceLabel": "string",
      "client": "string",
      "detailDate": "string",
      "technologies": ["string"],
      "overviewTitle": "string",
      "overviewText": "string",
      "featureList": ["string"],
      "galleryImages": ["string"],
      "detailSections": [
        {
          "title": "string",
          "text": "string"
        }
      ],
      "finalImageUrl": "string"
    }
  ]
}
```

## Styling
- Uses Tailwind CSS with dark mode support
- Consistent with dashboard design
- Responsive grid layouts
- Color-coded buttons (brand, error, gray)
- Form validation visual feedback

## Next Steps for Full Implementation
1. Replace TODO API calls with actual endpoints
2. Implement file upload to Cloudinary or similar service
3. Add form validation
4. Add error handling for file uploads
5. Implement loading states during file upload
6. Add success/error notifications
7. Add confirmation dialogs for destructive actions
8. Implement auto-save functionality
9. Add drag-and-drop for images
10. Add image cropping/editing capabilities

## Usage
```tsx
import PortfolioPage from '@/pages/Portfolio/PortfolioPage';

// Use in routing
<Route path="/portfolio-management" element={<PortfolioPage />} />
```

## Browser Compatibility
- Modern browsers with ES6+ support
- File API support required
- ObjectURL support for image preview
