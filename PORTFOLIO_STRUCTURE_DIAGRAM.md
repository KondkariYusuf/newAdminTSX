# PortfolioPage.tsx - Component Structure Diagram

## File Structure
```
src/
├── pages/
│   └── Portfolio/
│       └── PortfolioPage.tsx (870 lines) ✅ NEW
│
└── components/
    └── form/
        ├── input/
        │   ├── InputField.tsx ✅ USED
        │   ├── FileInput.tsx ✅ USED
        │   └── TextArea.tsx ✅ USED
        └── Label.tsx ✅ USED
```

---

## Component Hierarchy

```
PortfolioPage.tsx
│
├── Form Container
│   ├── PageMeta (Title, Description)
│   │
│   ├── Message Display
│   │
│   └── Main Form
│       ├── Recent Work Section
│       │   ├── Label + InputField (Heading)
│       │   ├── Label + InputField (Subheading)
│       │   └── Label + TagInput (Services)
│       │
│       └── Projects Section
│           ├── Add Project Button
│           │
│           └── Project List (map)
│               └── Project Card (per project)
│                   ├── Project Header (Number, Remove Button)
│                   │
│                   ├── Basic Info Row
│                   │   ├── Title (InputField)
│                   │   ├── Year (InputField)
│                   │   └── Category (InputField)
│                   │
│                   ├── Meta Data Row
│                   │   ├── Slug (InputField)
│                   │   ├── Service Label (InputField)
│                   │   ├── Client (InputField)
│                   │   └── Date (InputField)
│                   │
│                   ├── Technologies
│                   │   └── Label + TagInput
│                   │
│                   ├── Main Image Section
│                   │   ├── Label + FileInput
│                   │   ├── Image Preview
│                   │   └── URL Input (InputField)
│                   │
│                   ├── Overview Section
│                   │   ├── Overview Title (InputField)
│                   │   ├── Overview Text (TextArea)
│                   │   └── Feature List (TagInput)
│                   │
│                   ├── Gallery Section
│                   │   ├── Label + FileInput (multi)
│                   │   ├── Gallery Preview Grid
│                   │   └── Gallery URLs (TagInput)
│                   │
│                   ├── Detail Sections
│                   │   ├── Add Section Button
│                   │   └── Detail Section List
│                   │       └── Detail Section Item
│                   │           ├── Section Title (InputField)
│                   │           ├── Section Text (TextArea)
│                   │           └── Remove Button
│                   │
│                   └── Final Image
│                       └── Label + InputField (URL)
│
└── Form Actions
    ├── Submit Button
    └── Reset Button
```

---

## Data Flow Diagram

```
State Management
│
├── portfolio: Portfolio
│   ├── recentWork: RecentWork
│   │   ├── heading: string
│   │   ├── subheading: string
│   │   └── services: string[]
│   │
│   └── projects: Project[]
│       └── Project
│           ├── _id?: string
│           ├── title: string
│           ├── slug: string
│           ├── year: number
│           ├── category: string
│           ├── imageUrl: string
│           ├── serviceLabel: string
│           ├── client: string
│           ├── detailDate: string
│           ├── technologies: string[]
│           ├── overviewTitle: string
│           ├── overviewText: string
│           ├── featureList: string[]
│           ├── galleryImages: string[]
│           ├── detailSections: DetailSection[]
│           │   └── DetailSection
│           │       ├── title: string
│           │       └── text: string
│           └── finalImageUrl: string
│
├── projectImages: (File | null)[]
│   └── Main image file per project
│
├── galleryImagesFiles: File[][]
│   └── Gallery images files per project
│
├── imagePreviewUrls: Record<string, string>
│   └── Preview URL for main image: "project_0", "project_1", etc.
│
├── galleryPreviewUrls: Record<string, string[]>
│   └── Preview URLs for gallery: "gallery_0", "gallery_1", etc.
│
├── loading: boolean
│   └── Form submission state
│
└── message: string
    └── Feedback messages
```

---

## User Interaction Flow

```
START
  │
  ├─→ [User lands on page]
  │   └─→ Component mounts
  │   └─→ Load portfolio data (TODO: API)
  │
  ├─→ [Edit Recent Work]
  │   ├─→ Type heading → updateRecentWork({ heading })
  │   ├─→ Type subheading → updateRecentWork({ subheading })
  │   └─→ Add services → TagInput → updateRecentWork({ services })
  │
  ├─→ [Add Project]
  │   ├─→ Click "Add Project"
  │   └─→ addProjectLocal() → New project added
  │
  ├─→ [Edit Project Details]
  │   ├─→ Type title → updateProjectField(idx, { title })
  │   ├─→ Type year → updateProjectField(idx, { year })
  │   ├─→ Type category → updateProjectField(idx, { category })
  │   ├─→ Type slug → updateProjectField(idx, { slug })
  │   ├─→ Type service label → updateProjectField(idx, { serviceLabel })
  │   ├─→ Type client → updateProjectField(idx, { client })
  │   └─→ Type date → updateProjectField(idx, { detailDate })
  │
  ├─→ [Add Technologies]
  │   ├─→ Type tech name, press comma
  │   └─→ handleTagInput() → TagInput → updateProjectField(idx, { technologies })
  │
  ├─→ [Upload Main Image]
  │   ├─→ Click FileInput
  │   ├─→ Select image file
  │   ├─→ handleProjectImageChange() called
  │   ├─→ File stored in projectImages[idx]
  │   ├─→ Preview URL created: imagePreviewUrls["project_idx"]
  │   ├─→ Component re-renders
  │   └─→ Image preview shown to user
  │
  ├─→ [OR Add Image URL]
  │   ├─→ Paste URL in imageUrl field
  │   └─→ updateProjectField(idx, { imageUrl })
  │
  ├─→ [Add Overview]
  │   ├─→ Type overview title → updateProjectField(idx, { overviewTitle })
  │   ├─→ Type overview text → updateProjectField(idx, { overviewText })
  │   └─→ Add features → TagInput → updateProjectField(idx, { featureList })
  │
  ├─→ [Upload Gallery Images]
  │   ├─→ Click FileInput
  │   ├─→ Select multiple images (max 6)
  │   ├─→ handleGalleryImagesChange() called
  │   ├─→ Files stored in galleryImagesFiles[idx]
  │   ├─→ Preview URLs created: galleryPreviewUrls["gallery_idx"]
  │   ├─→ Component re-renders
  │   └─→ Gallery grid preview shown
  │
  ├─→ [Add Detail Sections]
  │   ├─→ Click "+ Add Section"
  │   ├─→ addDetailSection(idx) called
  │   ├─→ New section added to detailSections
  │   │
  │   ├─→ Type section title → updateDetailSection(idx, sIdx, { title })
  │   ├─→ Type section text → updateDetailSection(idx, sIdx, { text })
  │   │
  │   └─→ Click "Remove" → removeDetailSection(idx, sIdx)
  │
  ├─→ [Add Final Image]
  │   ├─→ Paste URL
  │   └─→ updateProjectField(idx, { finalImageUrl })
  │
  ├─→ [Remove Project]
  │   ├─→ Click "Remove" button
  │   └─→ removeProjectLocal(idx)
  │
  ├─→ [Save Portfolio]
  │   ├─→ Click "Save Portfolio" button
  │   ├─→ Form validation (TODO)
  │   ├─→ savePortfolio() called
  │   ├─→ FormData constructed with:
  │   │   ├─→ JSON payload (portfolio state)
  │   │   ├─→ Project images
  │   │   └─→ Gallery images
  │   ├─→ API request sent (TODO: implement)
  │   ├─→ setLoading(true)
  │   ├─→ Wait for response...
  │   ├─→ setLoading(false)
  │   ├─→ setMessage("Success/Error")
  │   └─→ User sees feedback
  │
  ├─→ [Reset Form]
  │   ├─→ Click "Reset" button
  │   ├─→ setPortfolio(emptyPortfolio)
  │   ├─→ Clear all file states
  │   ├─→ Clear preview URLs
  │   └─→ Form reset to initial state
  │
  └─→ END
```

---

## State Update Paths

### Recent Work Update
```
User input
    ↓
updateRecentWork({ field: value })
    ↓
setPortfolio(prev => ({
  ...prev,
  recentWork: { ...prev.recentWork, field: value }
}))
    ↓
Component re-renders
```

### Project Field Update
```
User input
    ↓
updateProjectField(idx, { field: value })
    ↓
setPortfolio(prev => {
  const projects = [...prev.projects];
  projects[idx] = { ...projects[idx], field: value };
  return { ...prev, projects };
})
    ↓
Component re-renders
```

### File Upload
```
File selection
    ↓
handleProjectImageChange(idx, files)
    ↓
setProjectImages(prev => { copy[idx] = file; return copy; })
    ↓
setImagePreviewUrls(prev => ({ ...prev, [`project_${idx}`]: URL }))
    ↓
updateProjectField(idx, { imageUrl: "" })
    ↓
Component re-renders with preview
```

---

## TypeScript Type Hierarchy

```
Portfolio
├── _id?: string
├── recentWork: RecentWork
│   ├── heading: string
│   ├── subheading: string
│   └── services: string[]
├── projects: Project[]
│   └── Project
│       ├── _id?: string
│       ├── title: string
│       ├── slug: string
│       ├── year: number
│       ├── category: string
│       ├── imageUrl: string
│       ├── serviceLabel: string
│       ├── client: string
│       ├── detailDate: string
│       ├── technologies: string[]
│       ├── overviewTitle: string
│       ├── overviewText: string
│       ├── featureList: string[]
│       ├── galleryImages: string[]
│       ├── detailSections: DetailSection[]
│       │   └── DetailSection
│       │       ├── title: string
│       │       └── text: string
│       ├── finalImageUrl: string
│       ├── createdAt?: string
│       └── updatedAt?: string
├── __v?: number
└── updatedAt?: string
```

---

## Component Props & Callbacks

### InputField
```tsx
<InputField
  id={`id_${index}`}
  type="text" | "number" | "email" | "date"
  value={value}
  onChange={(e) => updateField(e.target.value)}
  placeholder="..."
  disabled={false}
  error={false}
  success={false}
  hint="optional hint"
/>
```

### FileInput
```tsx
<FileInput
  onChange={(e) => handleFileChange(e.currentTarget.files)}
/>
```

### TextArea
```tsx
<TextArea
  value={value}
  onChange={(value) => updateField(value)}
  placeholder="..."
  rows={4}
  disabled={false}
  error={false}
  hint="optional"
/>
```

### Label
```tsx
<Label htmlFor={`id_${index}`}>
  Field Name
</Label>
```

### TagInput (Custom)
```tsx
<TagInput
  value={stringArray}
  onChange={(newArray) => updateField(newArray)}
/>
```

---

## Event Handler Map

```
handleProjectImageChange()
  ├─→ Get file from FileInput
  ├─→ Store in projectImages array
  ├─→ Create object URL for preview
  ├─→ Update preview URLs
  └─→ Clear imageUrl to flag new file

handleGalleryImagesChange()
  ├─→ Get files from FileInput (max 6)
  ├─→ Store in galleryImagesFiles array
  ├─→ Create object URLs for previews
  ├─→ Update preview URLs
  └─→ Clear galleryImages to flag new files

updateRecentWork(patch)
  └─→ Shallow merge into recentWork

updateProjectField(index, patch)
  └─→ Shallow merge into project at index

addProjectLocal()
  ├─→ Add new project to projects array
  ├─→ Add null to projectImages
  └─→ Add empty array to galleryImagesFiles

removeProjectLocal(index)
  ├─→ Remove project at index
  ├─→ Remove image at index
  ├─→ Remove gallery at index
  └─→ Clean up preview URLs

addDetailSection(projectIndex)
  └─→ Add empty detail section to project

updateDetailSection(pIdx, sIdx, patch)
  └─→ Shallow merge into section at index

removeDetailSection(pIdx, sIdx)
  └─→ Remove section at index

handleTagInput(value, tags, onUpdate)
  ├─→ Check if value ends with comma/space
  ├─→ Extract tag
  ├─→ Check if unique
  └─→ Call onUpdate with new array

removeTag(tags, index, onUpdate)
  └─→ Filter out tag at index

savePortfolio(e)
  ├─→ Prevent default form submission
  ├─→ Create FormData
  ├─→ Append portfolio JSON
  ├─→ Append project image files
  ├─→ Append gallery image files
  ├─→ Send to API (TODO)
  └─→ Handle response/error
```

---

## CSS Class Structure

```
Main Container
  ├─→ px-4 sm:px-6 lg:px-8  (padding)
  ├─→ py-8                   (vertical padding)
  ├─→ max-w-6xl              (max width)
  └─→ mx-auto                (center)

Card Sections
  ├─→ bg-white dark:bg-gray-800  (background)
  ├─→ rounded-lg                 (border radius)
  ├─→ shadow                     (shadow)
  └─→ p-6                        (padding)

Grid Layouts
  ├─→ grid grid-cols-1 md:grid-cols-3 gap-4  (3 column grid)
  ├─→ grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3  (6 col gallery)
  └─→ space-y-6 / space-y-4  (vertical spacing)

Buttons
  ├─→ px-6 py-2           (padding)
  ├─→ rounded-lg          (radius)
  ├─→ font-medium         (weight)
  ├─→ transition-colors   (animation)
  ├─→ hover:bg-*          (hover state)
  ├─→ disabled:opacity-50 (disabled state)
  └─→ focus:outline-hidden (focus state)

Text
  ├─→ text-3xl font-bold           (heading)
  ├─→ text-sm text-gray-600        (body)
  └─→ dark:text-gray-400           (dark mode)
```

---

## API Integration Points (TODO)

```
In useEffect (load):
  GET /portfolio
    ├─→ Response type: Portfolio
    └─→ Set portfolio state with response data

In savePortfolio():
  POST /portfolio (create)
  or PUT /portfolio (update)
    ├─→ Body: FormData with:
    │   ├─→ payload: JSON.stringify(portfolio)
    │   ├─→ projectImage_0, projectImage_1, ...
    │   └─→ galleryImage_0_0, galleryImage_0_1, ...
    ├─→ Response type: { portfolio: Portfolio, message: string }
    └─→ Update state with response data

Additional endpoints (from JSX):
  POST /portfolio/{portfolioId}/projects
  PUT /portfolio/{portfolioId}/projects/{projectId}
  DELETE /portfolio/{portfolioId}/projects/{projectId}
  DELETE /portfolio/{portfolioId}
```

---

This complete structure provides a clear visual understanding of how all pieces fit together!
