// import React, { useEffect, useState } from "react";
// import InputField from "../../components/form/input/InputField";
// import FileInput from "../../components/form/input/FileInput";
// import TextArea from "../../components/form/input/TextArea";
// import Label from "../../components/form/Label";
// import PageMeta from "../../components/common/PageMeta";
// // import api from "../../api/axios"; 


// // Interfaces based on the provided JSON structure
// interface DetailSection {
//   title: string;
//   text: string;
// }

// interface Project {
//   _id?: string;
//   title: string;
//   slug: string;
//   year: number;
//   category: string;
//   imageUrl: string;
//   serviceLabel: string;
//   client: string;
//   detailDate: string;
//   technologies: string[];
//   overviewTitle: string;
//   overviewText: string;
//   featureList: string[];
//   galleryImages: string[];
//   detailSections: DetailSection[];
//   finalImageUrl: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface RecentWork {
//   heading: string;
//   subheading: string;
//   services: string[];
// }

// interface Portfolio {
//   _id?: string;
//   recentWork: RecentWork;
//   projects: Project[];
//   __v?: number;
//   updatedAt?: string;
// }

// const emptyDetailSection: DetailSection = {
//   title: "New Section",
//   text: "",
// };

// const emptyProject: Project = {
//   title: "New Project",
//   year: new Date().getFullYear(),
//   category: "Uncategorized",
//   imageUrl: "",
//   slug: "",
//   serviceLabel: "",
//   client: "",
//   detailDate: "",
//   technologies: [],
//   overviewTitle: "",
//   overviewText: "",
//   featureList: [],
//   galleryImages: [],
//   detailSections: [],
//   finalImageUrl: "",
// };

// const emptyRecentWork: RecentWork = {
//   heading: "Creative works with our incredible people.",
//   subheading: "Creative works with our incredible people.",
//   services: ["Design", "Development", "Marketing", "Writing"],
// };

// const emptyPortfolio: Portfolio = {
//   recentWork: emptyRecentWork,
//   projects: [emptyProject],
// };

// export default function PortfolioPage() {
//   const [portfolio, setPortfolio] = useState<Portfolio>(emptyPortfolio);
//   const [projectImages, setProjectImages] = useState<(File | null)[]>([]); // Main project images
//   const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[][]>([]); // Gallery images per project
//   const [imagePreviewUrls, setImagePreviewUrls] = useState<{
//     [key: string]: string;
//   }>({}); // For file preview
//   const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<{
//     [key: string]: string[];
//   }>({}); // For gallery preview
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Handle main project image change
//   const handleProjectImageChange = (index: number, files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     setProjectImages((prev) => {
//       const copy = [...prev];
//       copy[index] = file;
//       return copy;
//     });

//     // Create preview URL
//     const previewUrl = URL.createObjectURL(file);
//     setImagePreviewUrls((prev) => ({
//       ...prev,
//       [`project_${index}`]: previewUrl,
//     }));

//     // Clear the imageUrl to indicate new file is selected
//     updateProjectField(index, { imageUrl: "" });
//   };

//   // Handle gallery images change
//   const handleGalleryImagesChange = (
//     projectIndex: number,
//     files: FileList | null
//   ) => {
//     if (!files) return;

//     const fileArray = Array.from(files).slice(0, 6); // Max 6 gallery images
//     setGalleryImagesFiles((prev) => {
//       const copy = [...prev];
//       copy[projectIndex] = fileArray;
//       return copy;
//     });

//     // Create preview URLs for gallery
//     const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
//     setGalleryPreviewUrls((prev) => ({
//       ...prev,
//       [`gallery_${projectIndex}`]: previewUrls,
//     }));

//     // Clear gallery images to indicate new files are selected
//     updateProjectField(projectIndex, { galleryImages: [] });
//   };

//   // Update recent work section
//   const updateRecentWork = (patch: Partial<RecentWork>) => {
//     setPortfolio((prev) => ({
//       ...prev,
//       recentWork: { ...prev.recentWork, ...patch },
//     }));
//   };

//   // Update project field
//   const updateProjectField = (index: number, patch: Partial<Project>) => {
//     setPortfolio((prev) => {
//       const projects = [...prev.projects];
//       projects[index] = { ...projects[index], ...patch };
//       return { ...prev, projects };
//     });
//   };

//   // Add project locally
//   const addProjectLocal = () => {
//     setPortfolio((prev) => ({
//       ...prev,
//       projects: [...prev.projects, { ...emptyProject }],
//     }));
//     setProjectImages((prev) => [...prev, null]);
//     setGalleryImagesFiles((prev) => [...prev, []]);
//   };

//   // Remove project locally
//   const removeProjectLocal = (index: number) => {
//     setPortfolio((prev) => ({
//       ...prev,
//       projects: prev.projects.filter((_, i) => i !== index),
//     }));
//     setProjectImages((prev) => prev.filter((_, i) => i !== index));
//     setGalleryImagesFiles((prev) => prev.filter((_, i) => i !== index));

//     // Clean up preview URLs
//     setImagePreviewUrls((prev) => {
//       const copy = { ...prev };
//       delete copy[`project_${index}`];
//       return copy;
//     });
//     setGalleryPreviewUrls((prev) => {
//       const copy = { ...prev };
//       delete copy[`gallery_${index}`];
//       return copy;
//     });
//   };

//   // Add detail section to project
//   const addDetailSection = (projectIndex: number) => {
//     const project = portfolio.projects[projectIndex];
//     const detailSections = [...(project.detailSections || [])];
//     detailSections.push({ ...emptyDetailSection });
//     updateProjectField(projectIndex, { detailSections });
//   };

//   // Update detail section
//   const updateDetailSection = (
//     projectIndex: number,
//     sectionIndex: number,
//     patch: Partial<DetailSection>
//   ) => {
//     const project = portfolio.projects[projectIndex];
//     const detailSections = project.detailSections.map((section, i) =>
//       i === sectionIndex ? { ...section, ...patch } : section
//     );
//     updateProjectField(projectIndex, { detailSections });
//   };

//   // Remove detail section
//   const removeDetailSection = (projectIndex: number, sectionIndex: number) => {
//     const project = portfolio.projects[projectIndex];
//     const detailSections = project.detailSections.filter(
//       (_, i) => i !== sectionIndex
//     );
//     updateProjectField(projectIndex, { detailSections });
//   };

//   // Handle tag input for technologies, services, features
//   const handleTagInput = (
//     value: string,
//     tags: string[],
//     onUpdate: (tags: string[]) => void
//   ) => {
//     if (value.endsWith(",") || value.endsWith(" ")) {
//       const tag = value.slice(0, -1).trim();
//       if (tag && !tags.includes(tag)) {
//         onUpdate([...tags, tag]);
//       }
//     }
//   };

//   // Remove tag
//   const removeTag = (tags: string[], index: number, onUpdate: (tags: string[]) => void) => {
//     onUpdate(tags.filter((_, i) => i !== index));
//   };

//   // Render tag input component
//   const TagInput = ({
//     value,
//     onChange,
//   }: {
//     value: string[];
//     onChange: (value: string[]) => void;
//   }) => {
//     const [inputValue, setInputValue] = useState("");

//     return (
//       <div className="space-y-2">
//         <div className="flex flex-wrap gap-2">
//           {value.map((tag, idx) => (
//             <span
//               key={idx}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-sm"
//             >
//               {tag}
//               <button
//                 type="button"
//                 onClick={() => removeTag(value, idx, onChange)}
//                 className="hover:text-brand-700 dark:hover:text-brand-300"
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//         <InputField
//           type="text"
//           value={inputValue}
//           placeholder="Type and press comma to add"
//           onChange={(e) => {
//             const val = e.target.value;
//             setInputValue(val);
//             handleTagInput(val, value, (newTags) => {
//               onChange(newTags);
//               setInputValue("");
//             });
//           }}
//         />
//       </div>
//     );
//   };

//   // Load portfolio data
//   useEffect(() => {
//     const loadPortfolio = async () => {
//       try {
//         setLoading(true);
//         // TODO: Replace with your API call
//         // const response = await api.get("/portfolio");
//         // if (response.data) {
//         //   setPortfolio(response.data);
//         //   setPortfolioId(response.data._id);
//         // }
//       } catch (error) {
//         console.error("Failed to load portfolio:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPortfolio();
//   }, []);

//   const savePortfolio = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       // TODO: Implement multipart form data submission
//       // Create FormData and append portfolio data and files
//       const formData = new FormData();
//       formData.append("payload", JSON.stringify(portfolio));

//       // Append main project images
//       projectImages.forEach((file, idx) => {
//         if (file) {
//           formData.append(`projectImage_${idx}`, file);
//         }
//       });

//       // Append gallery images
//       galleryImagesFiles.forEach((files, pIdx) => {
//         files.forEach((file, gIdx) => {
//           formData.append(`galleryImage_${pIdx}_${gIdx}`, file);
//         });
//       });

//       // TODO: Make API call
//       // const response = await api.post("/portfolio", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       setMessage("Portfolio saved successfully!");
//     } catch (error: any) {
//       setMessage(error.message || "Failed to save portfolio");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageMeta 
//         title="Portfolio Management" 
//         description="Manage your portfolio projects, images, and recent work section."
//       />
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Portfolio Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             Manage your portfolio projects, images, and recent work section.
//           </p>

//           {message && (
//             <div
//               className={`mb-6 p-4 rounded-lg ${
//                 message.includes("success")
//                   ? "bg-success-500/10 text-success-700 dark:text-success-400 border border-success-200 dark:border-success-800"
//                   : "bg-error-500/10 text-error-700 dark:text-error-400 border border-error-200 dark:border-error-800"
//               }`}
//             >
//               {message}
//             </div>
//           )}

//           <form onSubmit={savePortfolio} className="space-y-6">
//             {/* Recent Work Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Recent Work Section
//               </h2>

//               <div>
//                 <Label htmlFor="heading">Heading</Label>
//                 <InputField
//                   id="heading"
//                   value={portfolio.recentWork.heading}
//                   onChange={(e) =>
//                     updateRecentWork({ heading: e.target.value })
//                   }
//                   placeholder="Enter heading"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="subheading">Subheading</Label>
//                 <InputField
//                   id="subheading"
//                   value={portfolio.recentWork.subheading}
//                   onChange={(e) =>
//                     updateRecentWork({ subheading: e.target.value })
//                   }
//                   placeholder="Enter subheading"
//                 />
//               </div>

//               <div>
//                 <Label>Services</Label>
//                 <TagInput
//                   value={portfolio.recentWork.services}
//                   onChange={(services) =>
//                     updateRecentWork({ services })
//                   }
//                 />
//               </div>
//             </div>

//             {/* Projects Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Projects ({portfolio.projects.length})
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={addProjectLocal}
//                   className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
//                 >
//                   + Add Project
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {portfolio.projects.map((project, projectIndex) => (
//                   <div
//                     key={projectIndex}
//                     className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-6 bg-gray-50 dark:bg-gray-900/50"
//                   >
//                     <div className="flex items-start justify-between">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         Project {projectIndex + 1}
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={() => removeProjectLocal(projectIndex)}
//                         className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors"
//                       >
//                         Remove
//                       </button>
//                     </div>

//                     {/* Basic Project Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <Label htmlFor={`title_${projectIndex}`}>Title</Label>
//                         <InputField
//                           id={`title_${projectIndex}`}
//                           value={project.title}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               title: e.target.value,
//                             })
//                           }
//                           placeholder="Project title"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`year_${projectIndex}`}>Year</Label>
//                         <InputField
//                           id={`year_${projectIndex}`}
//                           type="number"
//                           value={project.year.toString()}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               year: parseInt(e.target.value) || new Date().getFullYear(),
//                             })
//                           }
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`category_${projectIndex}`}>
//                           Category
//                         </Label>
//                         <InputField
//                           id={`category_${projectIndex}`}
//                           value={project.category}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               category: e.target.value,
//                             })
//                           }
//                           placeholder="e.g., Branding, Web Design"
//                         />
//                       </div>
//                     </div>

//                     {/* Slug and Meta Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                       <div>
//                         <Label htmlFor={`slug_${projectIndex}`}>Slug</Label>
//                         <InputField
//                           id={`slug_${projectIndex}`}
//                           value={project.slug}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               slug: e.target.value,
//                             })
//                           }
//                           placeholder="project-slug"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`serviceLabel_${projectIndex}`}>
//                           Service Label
//                         </Label>
//                         <InputField
//                           id={`serviceLabel_${projectIndex}`}
//                           value={project.serviceLabel}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               serviceLabel: e.target.value,
//                             })
//                           }
//                           placeholder="Visual Identity"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`client_${projectIndex}`}>
//                           Client
//                         </Label>
//                         <InputField
//                           id={`client_${projectIndex}`}
//                           value={project.client}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               client: e.target.value,
//                             })
//                           }
//                           placeholder="Client name"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`detailDate_${projectIndex}`}>
//                           Date
//                         </Label>
//                         <InputField
//                           id={`detailDate_${projectIndex}`}
//                           value={project.detailDate}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               detailDate: e.target.value,
//                             })
//                           }
//                           placeholder="January 2025"
//                         />
//                       </div>
//                     </div>

//                     {/* Technologies */}
//                     <div>
//                       <Label>Technologies</Label>
//                       <TagInput
//                         value={project.technologies}
//                         onChange={(technologies) =>
//                           updateProjectField(projectIndex, { technologies })
//                         }
//                       />
//                     </div>

//                     {/* Main Project Image */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <Label htmlFor={`projectImage_${projectIndex}`}>
//                         Main Project Image
//                       </Label>
//                       <FileInput
//                         onChange={(e) =>
//                           handleProjectImageChange(projectIndex, e.currentTarget.files)
//                         }
//                       />

//                       {/* Image Preview */}
//                       <div className="mt-4">
//                         {imagePreviewUrls[`project_${projectIndex}`] ? (
//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               Preview (new file):
//                             </p>
//                             <img
//                               src={imagePreviewUrls[`project_${projectIndex}`]}
//                               alt="Project preview"
//                               className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                             />
//                           </div>
//                         ) : project.imageUrl ? (
//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               Current image:
//                             </p>
//                             <img
//                               src={project.imageUrl}
//                               alt="Project"
//                               className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                             />
//                           </div>
//                         ) : null}
//                       </div>

//                       <div className="mt-4">
//                         <Label htmlFor={`imageUrl_${projectIndex}`}>
//                           Or paste image URL
//                         </Label>
//                         <InputField
//                           id={`imageUrl_${projectIndex}`}
//                           value={project.imageUrl}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               imageUrl: e.target.value,
//                             })
//                           }
//                           placeholder="https://example.com/image.jpg"
//                         />
//                       </div>
//                     </div>

//                     {/* Overview Section */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
//                       <h4 className="font-semibold text-gray-900 dark:text-white">
//                         Overview Section
//                       </h4>

//                       <div>
//                         <Label htmlFor={`overviewTitle_${projectIndex}`}>
//                           Overview Title
//                         </Label>
//                         <InputField
//                           id={`overviewTitle_${projectIndex}`}
//                           value={project.overviewTitle}
//                           onChange={(e) =>
//                             updateProjectField(projectIndex, {
//                               overviewTitle: e.target.value,
//                             })
//                           }
//                           placeholder="Overview title"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`overviewText_${projectIndex}`}>
//                           Overview Text
//                         </Label>
//                         <TextArea
//                           value={project.overviewText}
//                           onChange={(value) =>
//                             updateProjectField(projectIndex, {
//                               overviewText: value,
//                             })
//                           }
//                           placeholder="Detailed overview text"
//                           rows={4}
//                         />
//                       </div>

//                       <div>
//                         <Label>Feature List</Label>
//                         <TagInput
//                           value={project.featureList}
//                           onChange={(featureList) =>
//                             updateProjectField(projectIndex, { featureList })
//                           }
//                         />
//                       </div>
//                     </div>

//                     {/* Gallery Images */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
//                       <h4 className="font-semibold text-gray-900 dark:text-white">
//                         Gallery Images (up to 6)
//                       </h4>

//                       <div>
//                         <Label htmlFor={`gallery_${projectIndex}`}>
//                           Upload Gallery Images
//                         </Label>
//                         <FileInput
//                           onChange={(e) =>
//                             handleGalleryImagesChange(projectIndex, e.currentTarget.files)
//                           }
//                         />
//                       </div>

//                       {/* Gallery Preview */}
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
//                         {galleryPreviewUrls[`gallery_${projectIndex}`]
//                           ? galleryPreviewUrls[`gallery_${projectIndex}`].map(
//                               (url, idx) => (
//                                 <img
//                                   key={idx}
//                                   src={url}
//                                   alt={`Gallery ${idx + 1}`}
//                                   className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700"
//                                 />
//                               )
//                             )
//                           : project.galleryImages.map((url, idx) => (
//                               <img
//                                 key={idx}
//                                 src={url}
//                                 alt={`Gallery ${idx + 1}`}
//                                 className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700"
//                               />
//                             ))}
//                       </div>

//                       <div>
//                         <Label>Gallery Image URLs</Label>
//                         <TagInput
//                           value={project.galleryImages}
//                           onChange={(galleryImages) =>
//                             updateProjectField(projectIndex, { galleryImages })
//                           }
//                         />
//                       </div>
//                     </div>

//                     {/* Detail Sections */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-semibold text-gray-900 dark:text-white">
//                           Detail Sections
//                         </h4>
//                         <button
//                           type="button"
//                           onClick={() => addDetailSection(projectIndex)}
//                           className="px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded text-sm font-medium hover:bg-brand-500/20 transition-colors"
//                         >
//                           + Add Section
//                         </button>
//                       </div>

//                       <div className="space-y-3">
//                         {project.detailSections.map((section, sectionIndex) => (
//                           <div
//                             key={sectionIndex}
//                             className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-3"
//                           >
//                             <div className="flex items-start justify-between gap-3">
//                               <div className="flex-1 space-y-3">
//                                 <div>
//                                   <Label
//                                     htmlFor={`sectionTitle_${projectIndex}_${sectionIndex}`}
//                                   >
//                                     Section Title
//                                   </Label>
//                                   <InputField
//                                     id={`sectionTitle_${projectIndex}_${sectionIndex}`}
//                                     value={section.title}
//                                     onChange={(e) =>
//                                       updateDetailSection(
//                                         projectIndex,
//                                         sectionIndex,
//                                         { title: e.target.value }
//                                       )
//                                     }
//                                     placeholder="e.g., Visual Hierarchy"
//                                   />
//                                 </div>

//                                 <div>
//                                   <Label
//                                     htmlFor={`sectionText_${projectIndex}_${sectionIndex}`}
//                                   >
//                                     Section Text
//                                   </Label>
//                                   <TextArea
//                                     value={section.text}
//                                     onChange={(value) =>
//                                       updateDetailSection(
//                                         projectIndex,
//                                         sectionIndex,
//                                         { text: value }
//                                       )
//                                     }
//                                     placeholder="Section description"
//                                     rows={3}
//                                   />
//                                 </div>
//                               </div>

//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   removeDetailSection(projectIndex, sectionIndex)
//                                 }
//                                 className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors flex-shrink-0"
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         ))}

//                         {project.detailSections.length === 0 && (
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             No detail sections yet. Add one to get started.
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Final Image */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <Label htmlFor={`finalImageUrl_${projectIndex}`}>
//                         Final Image URL (bottom)
//                       </Label>
//                       <InputField
//                         id={`finalImageUrl_${projectIndex}`}
//                         value={project.finalImageUrl}
//                         onChange={(e) =>
//                           updateProjectField(projectIndex, {
//                             finalImageUrl: e.target.value,
//                           })
//                         }
//                         placeholder="https://example.com/final-image.jpg"
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 {portfolio.projects.length === 0 && (
//                   <p className="text-center text-gray-500 dark:text-gray-400 py-8">
//                     No projects yet. Add one to get started.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex items-center gap-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Saving..." : "Save Portfolio"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setPortfolio(emptyPortfolio);
//                   setProjectImages([]);
//                   setGalleryImagesFiles([]);
//                   setImagePreviewUrls({});
//                   setGalleryPreviewUrls({});
//                   setMessage("");
//                 }}
//                 className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
//               >
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import InputField from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import PageMeta from "../../components/common/PageMeta";

import api from "../../api/axios";

// Interfaces based on the provided JSON structure
interface DetailSection {
  title: string;
  text: string;
}

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

interface RecentWork {
  heading: string;
  subheading: string;
  services: string[];
}

interface Portfolio {
  _id?: string;
  recentWork: RecentWork;
  projects: Project[];
  __v?: number;
  updatedAt?: string;
}

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

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio>(emptyPortfolio);
  const [projectImages, setProjectImages] = useState<(File | null)[]>([]); // Main project images
  const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[][]>([]); // Gallery images per project
  const [imagePreviewUrls, setImagePreviewUrls] = useState<{ [key: string]: string }>({}); // For file preview
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<{ [key: string]: string[] }>({}); // For gallery preview
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [portfolioId, setPortfolioId] = useState<string | null>(null);

  // Handle main project image change
  const handleProjectImageChange = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

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

    // Clear the imageUrl to indicate new file is selected
    updateProjectField(index, { imageUrl: "" });
  };

  // Handle gallery images change
  const handleGalleryImagesChange = (projectIndex: number, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 6); // Max 6 gallery images
    setGalleryImagesFiles((prev) => {
      const copy = [...prev];
      copy[projectIndex] = fileArray;
      return copy;
    });

    // Create preview URLs for gallery
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setGalleryPreviewUrls((prev) => ({
      ...prev,
      [`gallery_${projectIndex}`]: previewUrls,
    }));

    // Clear gallery images to indicate new files are selected
    updateProjectField(projectIndex, { galleryImages: [] });
  };

  // Update recent work section
  const updateRecentWork = (patch: Partial<RecentWork>) => {
    setPortfolio((prev) => ({
      ...prev,
      recentWork: { ...prev.recentWork, ...patch },
    }));
  };

  // Update project field
  const updateProjectField = (index: number, patch: Partial<Project>) => {
    setPortfolio((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], ...patch };
      return { ...prev, projects };
    });
  };

  // Add project locally
  const addProjectLocal = () => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject }],
    }));
    setProjectImages((prev) => [...prev, null]);
    setGalleryImagesFiles((prev) => [...prev, []]);
  };

  // Remove project locally
  const removeProjectLocal = (index: number) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    setProjectImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryImagesFiles((prev) => prev.filter((_, i) => i !== index));

    // Clean up preview URLs
    setImagePreviewUrls((prev) => {
      const copy = { ...prev };
      delete copy[`project_${index}`];
      return copy;
    });
    setGalleryPreviewUrls((prev) => {
      const copy = { ...prev };
      delete copy[`gallery_${index}`];
      return copy;
    });
  };

  // Add detail section to project
  const addDetailSection = (projectIndex: number) => {
    const project = portfolio.projects[projectIndex];
    const detailSections = [...(project.detailSections || [])];
    detailSections.push({ ...emptyDetailSection });
    updateProjectField(projectIndex, { detailSections });
  };

  // Update detail section
  const updateDetailSection = (projectIndex: number, sectionIndex: number, patch: Partial<DetailSection>) => {
    const project = portfolio.projects[projectIndex];
    const detailSections = project.detailSections.map((section, i) =>
      i === sectionIndex ? { ...section, ...patch } : section
    );
    updateProjectField(projectIndex, { detailSections });
  };

  // Remove detail section
  const removeDetailSection = (projectIndex: number, sectionIndex: number) => {
    const project = portfolio.projects[projectIndex];
    const detailSections = project.detailSections.filter((_, i) => i !== sectionIndex);
    updateProjectField(projectIndex, { detailSections });
  };

  // Handle tag input for technologies, services, features
  const handleTagInput = (value: string, tags: string[], onUpdate: (tags: string[]) => void) => {
    if (value.endsWith(",") || value.endsWith(" ")) {
      const tag = value.slice(0, -1).trim();
      if (tag && !tags.includes(tag)) {
        onUpdate([...tags, tag]);
      }
    }
  };

  // Remove tag
  const removeTag = (tags: string[], index: number, onUpdate: (tags: string[]) => void) => {
    onUpdate(tags.filter((_, i) => i !== index));
  };

  // Render tag input component
  const TagInput = ({ value, onChange }: { value: string[]; onChange: (value: string[]) => void; }) => {
    const [inputValue, setInputValue] = useState("");

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {value.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(value, idx, onChange)}
                className="hover:text-brand-700 dark:hover:text-brand-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <InputField
          type="text"
          value={inputValue}
          placeholder="Type and press comma to add"
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);
            handleTagInput(val, value, (newTags) => {
              onChange(newTags);
              setInputValue("");
            });
          }}
        />
      </div>
    );
  };

  // Load portfolio data (GET /portfolio)
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        const res = await api.get("/portfolio");
        if (res?.data) {
          const data = res.data;

          const projects = (data.projects || []).map((p: any) => ({ ...emptyProject, ...p }));

          setPortfolio({
            recentWork: data.recentWork || emptyRecentWork,
            projects: projects.length ? projects : [emptyProject],
          });

          setPortfolioId(data._id || null);
          setProjectImages(Array(projects.length).fill(null));
          setGalleryImagesFiles(Array(projects.length).fill([]));
        } else {
          setPortfolio(emptyPortfolio);
          setProjectImages(Array(emptyPortfolio.projects.length).fill(null));
          setGalleryImagesFiles(Array(emptyPortfolio.projects.length).fill([]));
        }
      } catch (error) {
        console.error("Failed to load portfolio:", error);
        // keep defaults
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  // Save portfolio (create or update) with multipart form data
  const savePortfolio = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      // deep clone portfolio so we can modify safely
      const payload: any = JSON.parse(JSON.stringify(portfolio));

      // Clear imageUrl / galleryImages where new files selected so server overwrites
      payload.projects = (payload.projects || []).map((p: any, idx: number) => {
        const updated = { ...p };
        if (projectImages[idx]) {
          updated.imageUrl = "";
        }
        const gFiles = galleryImagesFiles[idx] || [];
        if (gFiles.length) {
          updated.galleryImages = [];
        }
        return updated;
      });

      formData.append("payload", JSON.stringify(payload));

      // Append main project images
      projectImages.forEach((file, idx) => {
        if (file) {
          formData.append(`projectImage_${idx}`, file, (file as File).name);
        }
      });

      // Append gallery images
      galleryImagesFiles.forEach((files, pIdx) => {
        (files || []).forEach((file, gIdx) => {
          formData.append(`galleryImage_${pIdx}_${gIdx}`, file, file.name);
        });
      });

      let res;
      if (portfolioId) {
        res = await api.put("/portfolio", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/portfolio", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const data = res.data;
      setMessage(data?.message || (portfolioId ? "Portfolio updated." : "Portfolio created."));

      if (data?.portfolio?._id) {
        setPortfolioId(data.portfolio._id);

        if (data.portfolio.projects) {
          const projects = data.portfolio.projects.map((p: any) => ({ ...emptyProject, ...p }));
          setPortfolio((prev) => ({ ...prev, projects }));
          setProjectImages(Array(projects.length).fill(null));
          setGalleryImagesFiles(Array(projects.length).fill([]));
        }

        if (data.portfolio.recentWork) {
          setPortfolio((prev) => ({ ...prev, recentWork: data.portfolio.recentWork }));
        }
      }
    } catch (error: any) {
      console.error("savePortfolio error:", error);
      setMessage(error?.response?.data?.message || error.message || "Failed to save portfolio");
    } finally {
      setLoading(false);
    }
  };

  // Add single project remote (POST /portfolio/:id/projects)
  const addProjectRemote = async (index: number) => {
    if (!portfolioId) {
      setMessage("Create a portfolio first (Save Portfolio) before adding single projects via API.");
      return;
    }
    const project = portfolio.projects[index];
    if (!project) {
      setMessage("Project not found.");
      return;
    }

    if (projectImages[index] || (galleryImagesFiles[index] || []).length) {
      setMessage("To upload new images for this project, use Save Portfolio instead of Add remote.");
      return;
    }

    if (!project.title || !project.year || !project.category) {
      setMessage("Title, year and category are required to add a project.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await api.post(`/portfolio/${portfolioId}/projects`, {
        title: project.title,
        slug: project.slug,
        year: project.year,
        category: project.category,
        imageUrl: project.imageUrl || "",

        serviceLabel: project.serviceLabel,
        client: project.client,
        detailDate: project.detailDate,
        technologies: project.technologies,
        overviewTitle: project.overviewTitle,
        overviewText: project.overviewText,
        featureList: project.featureList,
        galleryImages: project.galleryImages,
        detailSections: project.detailSections,
        finalImageUrl: project.finalImageUrl,
      });

      if (res.data?.project) {
        const newProjects = [...portfolio.projects];
        newProjects[index] = { ...emptyProject, ...res.data.project };
        setPortfolio((prev) => ({ ...prev, projects: newProjects }));
        setMessage("Project added on server.");
      } else {
        setMessage(res.data?.message || "Project added.");
      }
    } catch (err: any) {
      console.error("addProjectRemote error:", err);
      setMessage(err.response?.data?.message || err.message || "Add project failed.");
    } finally {
      setLoading(false);
    }
  };

  // Update single project remote (PUT /portfolio/:id/projects/:projectId)
  const updateProjectRemote = async (index: number) => {
    const project = portfolio.projects[index];
    if (!portfolioId || !project || !project._id) {
      setMessage("Project must exist on server (has _id) to update remotely. Use Save Portfolio to create portfolio first.");
      return;
    }

    if (projectImages[index] || (galleryImagesFiles[index] || []).length) {
      setMessage("To upload new images for this project, use Save Portfolio instead of Update remote.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await api.put(`/portfolio/${portfolioId}/projects/${project._id}`, {
        title: project.title,
        slug: project.slug,
        year: project.year,
        category: project.category,
        imageUrl: project.imageUrl || "",

        serviceLabel: project.serviceLabel,
        client: project.client,
        detailDate: project.detailDate,
        technologies: project.technologies,
        overviewTitle: project.overviewTitle,
        overviewText: project.overviewText,
        featureList: project.featureList,
        galleryImages: project.galleryImages,
        detailSections: project.detailSections,
        finalImageUrl: project.finalImageUrl,
      });

      setMessage(res.data?.message || "Project updated.");
      if (res.data?.project) {
        const next = portfolio.projects.map((p, i) => (i === index ? { ...emptyProject, ...res.data.project } : p));
        setPortfolio((prev) => ({ ...prev, projects: next }));
      }
    } catch (err: any) {
      console.error("updateProjectRemote error:", err);
      setMessage(err.response?.data?.message || err.message || "Update project failed.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project remote
  const deleteProjectRemote = async (index: number) => {
    const project = portfolio.projects[index];
    if (!portfolioId || !project || !project._id) {
      removeProjectLocal(index);
      setMessage("Project removed locally.");
      return;
    }

    if (!window.confirm("Delete this project on server? This cannot be undone.")) return;

    setLoading(true);
    setMessage("");
    try {
      const res = await api.delete(`/portfolio/${portfolioId}/projects/${project._id}`);
      setMessage(res.data?.message || "Project deleted.");
      removeProjectLocal(index);
    } catch (err: any) {
      console.error("deleteProjectRemote error:", err);
      setMessage(err.response?.data?.message || err.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  // Delete entire portfolio
  const deletePortfolio = async () => {
    if (!portfolioId) {
      setMessage("No portfolio to delete.");
      return;
    }
    if (!window.confirm("Delete the entire portfolio from server?")) return;

    setLoading(true);
    setMessage("");
    try {
      const res = await api.delete(`/portfolio/${portfolioId}`);
      setMessage(res.data?.message || "Portfolio deleted.");
      setPortfolio(emptyPortfolio);
      setPortfolioId(null);
      setProjectImages([]);
      setGalleryImagesFiles([]);
    } catch (err: any) {
      console.error("deletePortfolio error:", err);
      setMessage(err.response?.data?.message || err.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Portfolio Management" description="Manage your portfolio projects, images, and recent work section." />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portfolio Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your portfolio projects, images, and recent work section.</p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-success-500/10 text-success-700 dark:text-success-400 border border-success-200 dark:border-success-800" : "bg-error-500/10 text-error-700 dark:text-error-400 border border-error-200 dark:border-error-800"}`}>
              {message}
            </div>
          )}

          <form onSubmit={savePortfolio} className="space-y-6">
            {/* Recent Work Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Work Section</h2>

              <div>
                <Label htmlFor="heading">Heading</Label>
                <InputField id="heading" value={portfolio.recentWork.heading} onChange={(e) => updateRecentWork({ heading: e.target.value })} placeholder="Enter heading" />
              </div>

              <div>
                <Label htmlFor="subheading">Subheading</Label>
                <InputField id="subheading" value={portfolio.recentWork.subheading} onChange={(e) => updateRecentWork({ subheading: e.target.value })} placeholder="Enter subheading" />
              </div>

              <div>
                <Label>Services</Label>
                <TagInput value={portfolio.recentWork.services} onChange={(services) => updateRecentWork({ services })} />
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects ({portfolio.projects.length})</h2>
                <div className="flex gap-2">
                  <button type="button" onClick={addProjectLocal} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">+ Add Project</button>
                  <button type="button" onClick={deletePortfolio} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">Delete Portfolio</button>
                </div>
              </div>

              <div className="space-y-6">
                {portfolio.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-6 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project {projectIndex + 1}</h3>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => removeProjectLocal(projectIndex)} className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors">Remove</button>
                        <button type="button" onClick={() => updateProjectRemote(projectIndex)} className="px-3 py-1 bg-white/6 text-sm rounded">Update remote</button>
                        <button type="button" onClick={() => addProjectRemote(projectIndex)} className="px-3 py-1 bg-white/6 text-sm rounded">Add remote</button>
                      </div>
                    </div>

                    {/* Basic Project Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`title_${projectIndex}`}>Title</Label>
                        <InputField id={`title_${projectIndex}`} value={project.title} onChange={(e) => updateProjectField(projectIndex, { title: e.target.value })} placeholder="Project title" />
                      </div>

                      <div>
                        <Label htmlFor={`year_${projectIndex}`}>Year</Label>
                        <InputField id={`year_${projectIndex}`} type="number" value={project.year.toString()} onChange={(e) => updateProjectField(projectIndex, { year: parseInt(e.target.value) || new Date().getFullYear() })} />
                      </div>

                      <div>
                        <Label htmlFor={`category_${projectIndex}`}>Category</Label>
                        <InputField id={`category_${projectIndex}`} value={project.category} onChange={(e) => updateProjectField(projectIndex, { category: e.target.value })} placeholder="e.g., Branding, Web Design" />
                      </div>
                    </div>

                    {/* Slug and Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`slug_${projectIndex}`}>Slug</Label>
                        <InputField id={`slug_${projectIndex}`} value={project.slug} onChange={(e) => updateProjectField(projectIndex, { slug: e.target.value })} placeholder="project-slug" />
                      </div>

                      <div>
                        <Label htmlFor={`serviceLabel_${projectIndex}`}>Service Label</Label>
                        <InputField id={`serviceLabel_${projectIndex}`} value={project.serviceLabel} onChange={(e) => updateProjectField(projectIndex, { serviceLabel: e.target.value })} placeholder="Visual Identity" />
                      </div>

                      <div>
                        <Label htmlFor={`client_${projectIndex}`}>Client</Label>
                        <InputField id={`client_${projectIndex}`} value={project.client} onChange={(e) => updateProjectField(projectIndex, { client: e.target.value })} placeholder="Client name" />
                      </div>

                      <div>
                        <Label htmlFor={`detailDate_${projectIndex}`}>Date</Label>
                        <InputField id={`detailDate_${projectIndex}`} value={project.detailDate} onChange={(e) => updateProjectField(projectIndex, { detailDate: e.target.value })} placeholder="January 2025" />
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <Label>Technologies</Label>
                      <TagInput value={project.technologies} onChange={(technologies) => updateProjectField(projectIndex, { technologies })} />
                    </div>

                    {/* Main Project Image */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <Label htmlFor={`projectImage_${projectIndex}`}>Main Project Image</Label>
                      <FileInput onChange={(e) => handleProjectImageChange(projectIndex, e.currentTarget.files)} />

                      {/* Image Preview */}
                      <div className="mt-4">
                        {imagePreviewUrls[`project_${projectIndex}`] ? (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Preview (new file):</p>
                            <img src={imagePreviewUrls[`project_${projectIndex}`]} alt="Project preview" className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
                          </div>
                        ) : project.imageUrl ? (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Current image:</p>
                            <img src={project.imageUrl} alt="Project" className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <Label htmlFor={`imageUrl_${projectIndex}`}>Or paste image URL</Label>
                        <InputField id={`imageUrl_${projectIndex}`} value={project.imageUrl} onChange={(e) => updateProjectField(projectIndex, { imageUrl: e.target.value })} placeholder="https://example.com/image.jpg" />
                      </div>
                    </div>

                    {/* Overview Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Overview Section</h4>

                      <div>
                        <Label htmlFor={`overviewTitle_${projectIndex}`}>Overview Title</Label>
                        <InputField id={`overviewTitle_${projectIndex}`} value={project.overviewTitle} onChange={(e) => updateProjectField(projectIndex, { overviewTitle: e.target.value })} placeholder="Overview title" />
                      </div>

                      <div>
                        <Label htmlFor={`overviewText_${projectIndex}`}>Overview Text</Label>
                        <TextArea value={project.overviewText} onChange={(value) => updateProjectField(projectIndex, { overviewText: value })} placeholder="Detailed overview text" rows={4} />
                      </div>

                      <div>
                        <Label>Feature List</Label>
                        <TagInput value={project.featureList} onChange={(featureList) => updateProjectField(projectIndex, { featureList })} />
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Gallery Images (up to 6)</h4>

                      <div>
                        <Label htmlFor={`gallery_${projectIndex}`}>Upload Gallery Images</Label>
                        <FileInput onChange={(e) => handleGalleryImagesChange(projectIndex, e.currentTarget.files)} />
                      </div>

                      {/* Gallery Preview */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {galleryPreviewUrls[`gallery_${projectIndex}`]
                          ? galleryPreviewUrls[`gallery_${projectIndex}`].map((url, idx) => (
                              <img key={idx} src={url} alt={`Gallery ${idx + 1}`} className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700" />
                            ))
                          : project.galleryImages.map((url, idx) => (
                              <img key={idx} src={url} alt={`Gallery ${idx + 1}`} className="w-full h-24 object-cover rounded border border-gray-200 dark:border-gray-700" />
                            ))}
                      </div>

                      <div>
                        <Label>Gallery Image URLs</Label>
                        <TagInput value={project.galleryImages} onChange={(galleryImages) => updateProjectField(projectIndex, { galleryImages })} />
                      </div>
                    </div>

                    {/* Detail Sections */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Detail Sections</h4>
                        <button type="button" onClick={() => addDetailSection(projectIndex)} className="px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded text-sm font-medium hover:bg-brand-500/20 transition-colors">+ Add Section</button>
                      </div>

                      <div className="space-y-3">
                        {project.detailSections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 space-y-3">
                                <div>
                                  <Label htmlFor={`sectionTitle_${projectIndex}_${sectionIndex}`}>Section Title</Label>
                                  <InputField id={`sectionTitle_${projectIndex}_${sectionIndex}`} value={section.title} onChange={(e) => updateDetailSection(projectIndex, sectionIndex, { title: e.target.value })} placeholder="e.g., Visual Hierarchy" />
                                </div>

                                <div>
                                  <Label htmlFor={`sectionText_${projectIndex}_${sectionIndex}`}>Section Text</Label>
                                  <TextArea value={section.text} onChange={(value) => updateDetailSection(projectIndex, sectionIndex, { text: value })} placeholder="Section description" rows={3} />
                                </div>
                              </div>

                              <button type="button" onClick={() => removeDetailSection(projectIndex, sectionIndex)} className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors flex-shrink-0">Remove</button>
                            </div>
                          </div>
                        ))}

                        {project.detailSections.length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">No detail sections yet. Add one to get started.</p>
                        )}
                      </div>
                    </div>

                    {/* Final Image */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <Label htmlFor={`finalImageUrl_${projectIndex}`}>Final Image URL (bottom)</Label>
                      <InputField id={`finalImageUrl_${projectIndex}`} value={project.finalImageUrl} onChange={(e) => updateProjectField(projectIndex, { finalImageUrl: e.target.value })} placeholder="https://example.com/final-image.jpg" />
                    </div>
                  </div>
                ))}

                {portfolio.projects.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">No projects yet. Add one to get started.</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Saving..." : portfolioId ? "Save Portfolio (PUT)" : "Create Portfolio (POST)"}</button>

              <button type="button" onClick={() => { setPortfolio(emptyPortfolio); setProjectImages([]); setGalleryImagesFiles([]); setImagePreviewUrls({}); setGalleryPreviewUrls({}); setMessage(""); }} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
// export default PortfolioPage;