# PortfolioPage.tsx - Code Examples & Reference

## Quick Reference Guide

### 1. Update Recent Work

#### Update Heading
```tsx
updateRecentWork({ heading: "New Heading" });
```

#### Update Services
```tsx
updateRecentWork({ 
  services: [...newServicesArray] 
});
```

### 2. Manage Projects

#### Add New Project
```tsx
const addProjectLocal = () => {
  setPortfolio((prev) => ({
    ...prev,
    projects: [...prev.projects, { ...emptyProject }],
  }));
};
```

#### Update Project Field
```tsx
updateProjectField(projectIndex, {
  title: "New Title",
  year: 2025,
  category: "Branding"
});
```

#### Remove Project
```tsx
const removeProjectLocal = (index: number) => {
  setPortfolio((prev) => ({
    ...prev,
    projects: prev.projects.filter((_, i) => i !== index),
  }));
};
```

### 3. Image Management

#### Handle Main Image Upload
```tsx
const handleProjectImageChange = (index: number, files: FileList | null) => {
  if (!files) return;
  
  const file = files[0];
  setProjectImages((prev) => {
    const copy = [...prev];
    copy[index] = file;
    return copy;
  });

  // Create preview URL
  const previewUrl = URL.createObjectURL(file);
  setImagePreviewUrls((prev) => ({
    ...prev,
    [`project_${index}`]: previewUrl,
  }));

  // Clear imageUrl to indicate new file
  updateProjectField(index, { imageUrl: "" });
};
```

#### Handle Gallery Images Upload
```tsx
const handleGalleryImagesChange = (
  projectIndex: number,
  files: FileList | null
) => {
  if (!files) return;

  const fileArray = Array.from(files).slice(0, 6); // Max 6
  setGalleryImagesFiles((prev) => {
    const copy = [...prev];
    copy[projectIndex] = fileArray;
    return copy;
  });

  // Create preview URLs
  const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
  setGalleryPreviewUrls((prev) => ({
    ...prev,
    [`gallery_${projectIndex}`]: previewUrls,
  }));

  // Clear gallery images to indicate new files
  updateProjectField(projectIndex, { galleryImages: [] });
};
```

### 4. Detail Sections

#### Add Detail Section
```tsx
const addDetailSection = (projectIndex: number) => {
  const project = portfolio.projects[projectIndex];
  const detailSections = [...(project.detailSections || [])];
  detailSections.push({ title: "New Section", text: "" });
  updateProjectField(projectIndex, { detailSections });
};
```

#### Update Detail Section
```tsx
const updateDetailSection = (
  projectIndex: number,
  sectionIndex: number,
  patch: Partial<DetailSection>
) => {
  const project = portfolio.projects[projectIndex];
  const detailSections = project.detailSections.map((section, i) =>
    i === sectionIndex ? { ...section, ...patch } : section
  );
  updateProjectField(projectIndex, { detailSections });
};
```

#### Remove Detail Section
```tsx
const removeDetailSection = (projectIndex: number, sectionIndex: number) => {
  const project = portfolio.projects[projectIndex];
  const detailSections = project.detailSections.filter(
    (_, i) => i !== sectionIndex
  );
  updateProjectField(projectIndex, { detailSections });
};
```

### 5. Tag Management

#### Add Tag
```tsx
const handleTagInput = (
  value: string,
  tags: string[],
  onUpdate: (tags: string[]) => void
) => {
  if (value.endsWith(",") || value.endsWith(" ")) {
    const tag = value.slice(0, -1).trim();
    if (tag && !tags.includes(tag)) {
      onUpdate([...tags, tag]);
    }
  }
};
```

#### Remove Tag
```tsx
const removeTag = (
  tags: string[], 
  index: number, 
  onUpdate: (tags: string[]) => void
) => {
  onUpdate(tags.filter((_, i) => i !== index));
};
```

#### TagInput Component Usage
```tsx
<TagInput
  value={portfolio.recentWork.services}
  onChange={(services) =>
    updateRecentWork({ services })
  }
/>
```

### 6. Form Submission

#### Save Portfolio
```tsx
const savePortfolio = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const formData = new FormData();
    
    // Append portfolio data
    formData.append("payload", JSON.stringify(portfolio));

    // Append main project images
    projectImages.forEach((file, idx) => {
      if (file) {
        formData.append(`projectImage_${idx}`, file);
      }
    });

    // Append gallery images
    galleryImagesFiles.forEach((files, pIdx) => {
      files.forEach((file, gIdx) => {
        formData.append(`galleryImage_${pIdx}_${gIdx}`, file);
      });
    });

    // TODO: Replace with your API call
    // const response = await api.post("/portfolio", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    setMessage("Portfolio saved successfully!");
  } catch (error: any) {
    setMessage(error.message || "Failed to save portfolio");
  } finally {
    setLoading(false);
  }
};
```

## Data Flow Example

### Adding a New Project Flow

```
User clicks "Add Project"
    ↓
addProjectLocal() called
    ↓
portfolio.projects array updated
setProjectImages incremented
setGalleryImagesFiles incremented
    ↓
Component re-renders with new empty project
    ↓
User fills in project details
    ↓
updateProjectField() called on each input change
    ↓
portfolio state updated
    ↓
User uploads main image
    ↓
handleProjectImageChange() called
    ↓
File stored in projectImages array
Preview URL created and stored
    ↓
Image preview shown to user
    ↓
User uploads gallery images
    ↓
handleGalleryImagesChange() called
    ↓
Files stored in galleryImagesFiles array
Preview URLs created for each
    ↓
Gallery grid preview shown
    ↓
User clicks "Save Portfolio"
    ↓
savePortfolio() called
    ↓
FormData created with:
- JSON payload (portfolio data)
- File objects (images)
    ↓
API request sent with multipart/form-data
    ↓
Success/Error message shown
```

## Image Preview URLs

### Project Image Preview Key
```
Format: `project_${index}`
Example: "project_0", "project_1", "project_2"
```

### Gallery Preview Key
```
Format: `gallery_${index}`
Example: "gallery_0", "gallery_1"
Value: Array of preview URLs
```

## TypeScript Types Reference

### Portfolio Type
```typescript
interface Portfolio {
  _id?: string;
  recentWork: RecentWork;
  projects: Project[];
  __v?: number;
  updatedAt?: string;
}
```

### Project Type
```typescript
interface Project {
  _id?: string;
  title: string;
  slug: string;
  year: number;
  category: string;
  imageUrl: string;
  serviceLabel: string;
  client: string;
  detailDate: string;
  technologies: string[];
  overviewTitle: string;
  overviewText: string;
  featureList: string[];
  galleryImages: string[];
  detailSections: DetailSection[];
  finalImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### RecentWork Type
```typescript
interface RecentWork {
  heading: string;
  subheading: string;
  services: string[];
}
```

### DetailSection Type
```typescript
interface DetailSection {
  title: string;
  text: string;
}
```

## Component Imports

```tsx
import React, { useEffect, useState } from "react";
import InputField from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import PageMeta from "../../components/common/PageMeta";
```

## Initial State

```tsx
const emptyDetailSection: DetailSection = {
  title: "New Section",
  text: "",
};

const emptyProject: Project = {
  title: "New Project",
  year: new Date().getFullYear(),
  category: "Uncategorized",
  imageUrl: "",
  slug: "",
  serviceLabel: "",
  client: "",
  detailDate: "",
  technologies: [],
  overviewTitle: "",
  overviewText: "",
  featureList: [],
  galleryImages: [],
  detailSections: [],
  finalImageUrl: "",
};

const emptyRecentWork: RecentWork = {
  heading: "Creative works with our incredible people.",
  subheading: "Creative works with our incredible people.",
  services: ["Design", "Development", "Marketing", "Writing"],
};

const emptyPortfolio: Portfolio = {
  recentWork: emptyRecentWork,
  projects: [emptyProject],
};
```

## Styling Classes Used

### Container
```tsx
className="px-4 sm:px-6 lg:px-8 py-8"
className="max-w-6xl mx-auto"
```

### Cards
```tsx
className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
```

### Buttons
```tsx
// Primary
className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg"

// Secondary
className="px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded text-sm"

// Danger
className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm"
```

### Tags
```tsx
className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-600"
```

### Grid
```tsx
className="grid grid-cols-1 md:grid-cols-3 gap-4"
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
```

## API Integration Checklist

- [ ] Create/Update Portfolio endpoint
- [ ] Add/Update/Delete Project endpoint
- [ ] File upload to cloud storage
- [ ] Error handling
- [ ] Loading states
- [ ] Success notifications
- [ ] Validation
- [ ] Authentication
- [ ] Authorization
- [ ] Rate limiting
- [ ] Caching strategy
- [ ] Optimistic updates

## Testing Scenarios

1. **Add Project**: Add project → fill fields → save
2. **Upload Images**: Upload main image → see preview → upload gallery
3. **Detail Sections**: Add section → edit → remove
4. **Tags**: Add tag → remove tag → verify array
5. **Reset**: Make changes → reset → verify cleared
6. **Error Handling**: Network error → show message
7. **Loading**: Save → show loading state → hide when done

## Troubleshooting

### Image Preview Not Showing
- Check if `imagePreviewUrls` has correct key
- Verify `URL.createObjectURL()` was called
- Ensure file is not null

### Tags Not Adding
- Check if value ends with comma or space
- Verify tag doesn't already exist
- Check if array is properly updated

### Form Not Submitting
- Verify all required fields filled
- Check console for errors
- Ensure FileInput is properly connected

### Images Not Uploading
- Check FormData construction
- Verify file type is allowed
- Check file size limits
- Verify multipart/form-data header
