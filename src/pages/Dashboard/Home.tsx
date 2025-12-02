// import React, { useEffect, useState } from "react";
// import InputField from "../../components/form/input/InputField";
// import FileInput from "../../components/form/input/FileInput";
// import TextArea from "../../components/form/input/TextArea";
// import Label from "../../components/form/Label";
// import PageMeta from "../../components/common/PageMeta";

// // Interfaces based on provided JSON structure
// interface FunFactItem {
//   value: string;
//   text: string;
// }

// interface Service {
//   number: string;
//   title: string;
//   list: string[];
//   imageUrl: string;
//   detailsUrl: string;
// }

// interface ServiceSection {
//   heading: string;
//   services: Service[];
// }

// interface FunFactSection {
//   title: string;
//   items: FunFactItem[];
// }

// interface ClientSection {
//   descriptionText: string;
//   companyNames: string[];
// }

// interface ParallaxImage {
//   imageUrl: string;
//   alt: string;
// }

// interface Hero {
//   satisfiedClientsPercent: number;
//   projectsCount: number;
//   countriesCount: number;
//   descriptionText: string;
// }

// interface About {
//   bodyText: string;
// }

// interface Video {
//   videoUrl: string;
// }

// interface HomePage {
//   _id?: string;
//   slug?: string;
//   hero: Hero;
//   about: About;
//   video: Video;
//   serviceSection: ServiceSection;
//   funFactSection: FunFactSection;
//   clientSection: ClientSection;
//   parallaxImage: ParallaxImage;
//   createdAt?: string;
//   updatedAt?: string;
//   __v?: number;
// }

// const defaultModel: HomePage = {
//   hero: {
//     satisfiedClientsPercent: 90,
//     projectsCount: 200,
//     countriesCount: 32,
//     descriptionText: "We're a digital products design & development agency that works passionately with the digital experiences.",
//   },
//   about: {
//     bodyText: "We're a dynamic startup agency specializing in innovative solutions for businesses looking to elevate their brand presence.",
//   },
//   video: {
//     videoUrl: "https://rrdevs.net/project-video/group-meeting.mp4",
//   },
//   serviceSection: {
//     heading: "Complex proficiency",
//     services: [
//       {
//         number: "(01)",
//         title: "Branding",
//         list: ["Creative Direction", "Brand Identity", "Branding Strategy", "Graphic Design", "Startup"],
//         imageUrl: "/assets/imgs/gallery/image-3.webp",
//         detailsUrl: "/service-details",
//       },
//       {
//         number: "(02)",
//         title: "UI/UX Design",
//         list: ["User Research", "Wireframing", "Prototyping", "Product Design"],
//         imageUrl: "/assets/imgs/gallery/image-4.webp",
//         detailsUrl: "/service-details",
//       },
//     ],
//   },
//   funFactSection: {
//     title: "Perfect —activity",
//     items: [
//       { value: "1.8M", text: "Total Impressions" },
//       { value: "260+", text: "Successful Projects" },
//       { value: "12+", text: "Countries Reached" },
//     ],
//   },
//   clientSection: {
//     descriptionText: "We're a great team of creatives with a strongest capabilities to helping progressive fields achieve their goals.",
//     companyNames: ["Google", "Netflix", "Spotify", "Airbnb", "Figma"],
//   },
//   parallaxImage: {
//     imageUrl: "/assets/imgs/gallery/image-7.webp",
//     alt: "Creative team working",
//   },
// };

// export default function Home() {
//   const [model, setModel] = useState<HomePage>(defaultModel);
//   const [videoFiles, setVideoFiles] = useState<File[]>([]);
//   const [parallaxFiles, setParallaxFiles] = useState<File[]>([]);
//   const [serviceImages, setServiceImages] = useState<(File | null)[]>([]);
//   const [clientLogos, setClientLogos] = useState<File[]>([]);
//   const [imagePreviewUrls, setImagePreviewUrls] = useState<{ [key: string]: string }>({});
//   const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");
//   const [parallaxPreviewUrl, setParallaxPreviewUrl] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Load home data on mount
//   useEffect(() => {
//     const fetchHome = async () => {
//       try {
//         setLoading(true);
//         // TODO: Replace with your API call
//         // const res = await api.get("/home");
//         // if (res.data) {
//         //   setModel(res.data);
//         //   setServiceImages(new Array(res.data.serviceSection.services.length).fill(null));
//         // }
//       } catch (error) {
//         console.error("Failed to load home data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHome();
//   }, []);

//   // Helper functions for nested state updates
//   const updateHero = (patch: Partial<Hero>) => {
//     setModel((prev) => ({
//       ...prev,
//       hero: { ...prev.hero, ...patch },
//     }));
//   };

//   const updateAbout = (patch: Partial<About>) => {
//     setModel((prev) => ({
//       ...prev,
//       about: { ...prev.about, ...patch },
//     }));
//   };

//   const updateVideo = (patch: Partial<Video>) => {
//     setModel((prev) => ({
//       ...prev,
//       video: { ...prev.video, ...patch },
//     }));
//   };

//   const updateServiceSection = (patch: Partial<ServiceSection>) => {
//     setModel((prev) => ({
//       ...prev,
//       serviceSection: { ...prev.serviceSection, ...patch },
//     }));
//   };

//   const updateFunFactSection = (patch: Partial<FunFactSection>) => {
//     setModel((prev) => ({
//       ...prev,
//       funFactSection: { ...prev.funFactSection, ...patch },
//     }));
//   };

//   const updateClientSection = (patch: Partial<ClientSection>) => {
//     setModel((prev) => ({
//       ...prev,
//       clientSection: { ...prev.clientSection, ...patch },
//     }));
//   };

//   const updateParallaxImage = (patch: Partial<ParallaxImage>) => {
//     setModel((prev) => ({
//       ...prev,
//       parallaxImage: { ...prev.parallaxImage, ...patch },
//     }));
//   };

//   // Service management
//   const addService = () => {
//     const newService: Service = {
//       number: `(${String(model.serviceSection.services.length + 1).padStart(2, "0")})`,
//       title: "New Service",
//       list: [],
//       imageUrl: "",
//       detailsUrl: "/service-details",
//     };
//     updateServiceSection({
//       services: [...model.serviceSection.services, newService],
//     });
//     setServiceImages((prev) => [...prev, null]);
//   };

//   const updateService = (index: number, patch: Partial<Service>) => {
//     const services = model.serviceSection.services.map((s, i) =>
//       i === index ? { ...s, ...patch } : s
//     );
//     updateServiceSection({ services });
//   };

//   const removeService = (index: number) => {
//     const services = model.serviceSection.services.filter((_, i) => i !== index);
//     updateServiceSection({ services });
//     setServiceImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Fun fact management
//   const addFunFact = () => {
//     updateFunFactSection({
//       items: [...model.funFactSection.items, { value: "", text: "" }],
//     });
//   };

//   const updateFunFact = (index: number, patch: Partial<FunFactItem>) => {
//     const items = model.funFactSection.items.map((item, i) =>
//       i === index ? { ...item, ...patch } : item
//     );
//     updateFunFactSection({ items });
//   };

//   const removeFunFact = (index: number) => {
//     const items = model.funFactSection.items.filter((_, i) => i !== index);
//     updateFunFactSection({ items });
//   };

//   // Image handlers
//   const handleServiceImageChange = (index: number, files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     setServiceImages((prev) => {
//       const copy = [...prev];
//       copy[index] = file;
//       return copy;
//     });

//     const previewUrl = URL.createObjectURL(file);
//     setImagePreviewUrls((prev) => ({
//       ...prev,
//       [`service_${index}`]: previewUrl,
//     }));

//     updateService(index, { imageUrl: "" });
//   };

//   const handleParallaxFiles = (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     setParallaxFiles([file]);

//     const previewUrl = URL.createObjectURL(file);
//     setParallaxPreviewUrl(previewUrl);

//     updateParallaxImage({ imageUrl: "" });
//   };

//   const handleVideoFiles = (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     setVideoFiles([file]);

//     const previewUrl = URL.createObjectURL(file);
//     setVideoPreviewUrl(previewUrl);

//     updateVideo({ videoUrl: "" });
//   };

//   const handleClientLogos = (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const newFiles = Array.from(files);
//     setClientLogos((prev) => [...prev, ...newFiles]);
//   };

//   const removeExistingLogo = (index: number) => {
//     setModel((prev) => ({
//       ...prev,
//       clientSection: {
//         ...prev.clientSection,
//         companyNames: prev.clientSection.companyNames.filter((_, i) => i !== index),
//       },
//     }));
//   };

//   const removeNewLogo = (index: number) => {
//     setClientLogos((prev) => prev.filter((_, i) => i !== index));
//   };

//   const setServiceList = (serviceIndex: number, list: string[]) => {
//     updateService(serviceIndex, { list });
//   };

//   // TagInput component (reusable)
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
//                 onClick={() => onChange(value.filter((_, i) => i !== idx))}
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
//             if (val.endsWith(",") || val.endsWith(" ")) {
//               const tag = val.slice(0, -1).trim();
//               if (tag && !value.includes(tag)) {
//                 onChange([...value, tag]);
//                 setInputValue("");
//               }
//             }
//           }}
//         />
//       </div>
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       const payload = JSON.parse(JSON.stringify(model));

//       // Clear URLs when new files are being uploaded
//       if (parallaxFiles.length) {
//         payload.parallaxImage = { ...payload.parallaxImage, imageUrl: "" };
//       }

//       payload.serviceSection = {
//         ...payload.serviceSection,
//         services: payload.serviceSection.services.map((s: Service, idx: number) => {
//           if (serviceImages[idx]) {
//             return { ...s, imageUrl: "" };
//           }
//           return s;
//         }),
//       };

//       if (videoFiles.length) {
//         payload.video = { ...payload.video, videoUrl: "" };
//       }

//       if (clientLogos.length) {
//         payload.clientSection = {
//           ...payload.clientSection,
//           companyNames: payload.clientSection.companyNames || [],
//         };
//       }

//       // Append payload
//       formData.append("payload", JSON.stringify(payload));

//       // Append files
//       if (parallaxFiles.length) {
//         formData.append("parallaxImage", parallaxFiles[0]);
//       }

//       serviceImages.forEach((file, idx) => {
//         if (file) {
//           formData.append(`serviceImage_${idx}`, file);
//         }
//       });

//       if (videoFiles.length) {
//         formData.append("video_0", videoFiles[0]);
//       }

//       const existingLogosCount = model.clientSection.companyNames.length;
//       clientLogos.forEach((file, idx) => {
//         formData.append(`clientLogo_${existingLogosCount + idx}`, file);
//       });

//       // TODO: Replace with your API call
//       // const response = await api.put("/home", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });
//       // setMessage(response.data?.message || "Home page updated successfully!");

//       setMessage("Home page saved successfully! (TODO: Implement API)");
//     } catch (error: any) {
//       console.error("Error:", error);
//       setMessage(error.message || "Failed to save home page");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageMeta
//         title="Home Page Management"
//         description="Manage your home page content, images, and sections."
//       />
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Home Page Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             Edit hero section, services, fun facts, clients, and more.
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

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Hero Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Hero Section
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <Label htmlFor="satisfiedClients">Satisfied Clients %</Label>
//                   <InputField
//                     id="satisfiedClients"
//                     type="number"
//                     value={model.hero.satisfiedClientsPercent.toString()}
//                     onChange={(e) =>
//                       updateHero({
//                         satisfiedClientsPercent: parseInt(e.target.value) || 0,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="projectsCount">Projects Count</Label>
//                   <InputField
//                     id="projectsCount"
//                     type="number"
//                     value={model.hero.projectsCount.toString()}
//                     onChange={(e) =>
//                       updateHero({
//                         projectsCount: parseInt(e.target.value) || 0,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="countriesCount">Countries Count</Label>
//                   <InputField
//                     id="countriesCount"
//                     type="number"
//                     value={model.hero.countriesCount.toString()}
//                     onChange={(e) =>
//                       updateHero({
//                         countriesCount: parseInt(e.target.value) || 0,
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="heroDescription">Description</Label>
//                 <TextArea
//                   value={model.hero.descriptionText}
//                   onChange={(value) =>
//                     updateHero({ descriptionText: value })
//                   }
//                   placeholder="Enter hero section description"
//                   rows={3}
//                 />
//               </div>
//             </div>

//             {/* About Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 About Section
//               </h2>

//               <div>
//                 <Label htmlFor="aboutText">Body Text</Label>
//                 <TextArea
//                   value={model.about.bodyText}
//                   onChange={(value) =>
//                     updateAbout({ bodyText: value })
//                   }
//                   placeholder="Enter about section text"
//                   rows={4}
//                 />
//               </div>
//             </div>

//             {/* Video Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Video Section
//               </h2>

//               <div>
//                 <Label htmlFor="videoUrl">Video URL</Label>
//                 <InputField
//                   id="videoUrl"
//                   value={model.video.videoUrl}
//                   onChange={(e) =>
//                     updateVideo({ videoUrl: e.target.value })
//                   }
//                   placeholder="https://example.com/video.mp4"
//                 />
//               </div>

//               <div>
//                 <Label>Upload Video File</Label>
//                 <FileInput
//                   onChange={(e) =>
//                     handleVideoFiles(e.currentTarget.files)
//                   }
//                 />
//               </div>

//               {/* Video Preview */}
//               {(videoPreviewUrl || model.video.videoUrl) && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     Video Preview:
//                   </p>
//                   <video
//                     controls
//                     className="w-full max-h-96 rounded-lg border border-gray-200 dark:border-gray-700"
//                     src={
//                       videoPreviewUrl || model.video.videoUrl
//                     }
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Service Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Service Section
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={addService}
//                   className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
//                 >
//                   + Add Service
//                 </button>
//               </div>

//               <div>
//                 <Label htmlFor="serviceHeading">Heading</Label>
//                 <InputField
//                   id="serviceHeading"
//                   value={model.serviceSection.heading}
//                   onChange={(e) =>
//                     updateServiceSection({ heading: e.target.value })
//                   }
//                   placeholder="Service section heading"
//                 />
//               </div>

//               <div className="space-y-4">
//                 {model.serviceSection.services.map((service, idx) => (
//                   <div
//                     key={idx}
//                     className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 space-y-4"
//                   >
//                     <div className="flex items-start justify-between">
//                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                         Service {idx + 1}
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={() => removeService(idx)}
//                         className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors"
//                       >
//                         Remove
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor={`serviceNumber_${idx}`}>Number</Label>
//                         <InputField
//                           id={`serviceNumber_${idx}`}
//                           value={service.number}
//                           onChange={(e) =>
//                             updateService(idx, { number: e.target.value })
//                           }
//                           placeholder="(01)"
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor={`serviceTitle_${idx}`}>Title</Label>
//                         <InputField
//                           id={`serviceTitle_${idx}`}
//                           value={service.title}
//                           onChange={(e) =>
//                             updateService(idx, { title: e.target.value })
//                           }
//                           placeholder="Service title"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <Label htmlFor={`serviceDetailsUrl_${idx}`}>Details URL</Label>
//                       <InputField
//                         id={`serviceDetailsUrl_${idx}`}
//                         value={service.detailsUrl}
//                         onChange={(e) =>
//                           updateService(idx, { detailsUrl: e.target.value })
//                         }
//                         placeholder="/service-details"
//                       />
//                     </div>

//                     <div>
//                       <Label>Service List Items</Label>
//                       <TagInput
//                         value={service.list}
//                         onChange={(list) => setServiceList(idx, list)}
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor={`serviceImage_${idx}`}>Service Image</Label>
//                       <FileInput
//                         onChange={(e) =>
//                           handleServiceImageChange(idx, e.currentTarget.files)
//                         }
//                       />
//                     </div>

//                     {/* Service Image Preview */}
//                     <div className="mt-4">
//                       {imagePreviewUrls[`service_${idx}`] ? (
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-600 dark:text-gray-400">
//                             Preview (new file):
//                           </p>
//                           <img
//                             src={imagePreviewUrls[`service_${idx}`]}
//                             alt="Service preview"
//                             className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                           />
//                         </div>
//                       ) : service.imageUrl ? (
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-600 dark:text-gray-400">
//                             Current image:
//                           </p>
//                           <img
//                             src={service.imageUrl}
//                             alt="Service"
//                             className="w-40 h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                           />
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 ))}

//                 {model.serviceSection.services.length === 0 && (
//                   <p className="text-center text-gray-500 dark:text-gray-400 py-8">
//                     No services yet. Add one to get started.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Fun Fact Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Fun Fact Section
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={addFunFact}
//                   className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
//                 >
//                   + Add Item
//                 </button>
//               </div>

//               <div>
//                 <Label htmlFor="funFactTitle">Title</Label>
//                 <InputField
//                   id="funFactTitle"
//                   value={model.funFactSection.title}
//                   onChange={(e) =>
//                     updateFunFactSection({ title: e.target.value })
//                   }
//                   placeholder="Fun fact section title"
//                 />
//               </div>

//               <div className="space-y-3">
//                 {model.funFactSection.items.map((item, idx) => (
//                   <div key={idx} className="flex gap-3 items-end">
//                     <div className="flex-shrink-0 w-32">
//                       <Label htmlFor={`factValue_${idx}`}>Value</Label>
//                       <InputField
//                         id={`factValue_${idx}`}
//                         value={item.value}
//                         onChange={(e) =>
//                           updateFunFact(idx, { value: e.target.value })
//                         }
//                         placeholder="1.8M"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <Label htmlFor={`factText_${idx}`}>Text</Label>
//                       <InputField
//                         id={`factText_${idx}`}
//                         value={item.text}
//                         onChange={(e) =>
//                           updateFunFact(idx, { text: e.target.value })
//                         }
//                         placeholder="Total Impressions"
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => removeFunFact(idx)}
//                       className="px-3 py-2 bg-error-500 hover:bg-error-600 text-white rounded text-sm font-medium transition-colors"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}

//                 {model.funFactSection.items.length === 0 && (
//                   <p className="text-center text-gray-500 dark:text-gray-400 py-8">
//                     No items yet. Add one to get started.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Client Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Client Section
//               </h2>

//               <div>
//                 <Label htmlFor="clientDescription">Description</Label>
//                 <TextArea
//                   value={model.clientSection.descriptionText}
//                   onChange={(value) =>
//                     updateClientSection({ descriptionText: value })
//                   }
//                   placeholder="Client section description"
//                   rows={4}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <Label>Client Logos</Label>

//                 {/* Existing Logos */}
//                 {model.clientSection.companyNames.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {model.clientSection.companyNames.map((url, idx) => (
//                       <div
//                         key={idx}
//                         className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900/50"
//                       >
//                         <img
//                           src={url}
//                           alt={`Client logo ${idx + 1}`}
//                           className="w-full h-24 object-contain"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeExistingLogo(idx)}
//                           className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-error-600 transition-colors"
//                           title="Remove"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Newly Selected Logos */}
//                 {clientLogos.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {clientLogos.map((file, idx) => (
//                       <div
//                         key={idx}
//                         className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900/50"
//                       >
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={file.name}
//                           className="w-full h-24 object-contain"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeNewLogo(idx)}
//                           className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-error-600 transition-colors"
//                           title="Remove"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <FileInput
//                   onChange={(e) =>
//                     handleClientLogos(e.currentTarget.files)
//                   }
//                 />
//                 <p className="text-xs text-gray-600 dark:text-gray-400">
//                   Upload client logos (drag & drop or click)
//                 </p>
//               </div>
//             </div>

//             {/* Parallax Image Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Parallax Image
//               </h2>

//               <div>
//                 <Label htmlFor="parallaxAlt">Alt Text</Label>
//                 <InputField
//                   id="parallaxAlt"
//                   value={model.parallaxImage.alt}
//                   onChange={(e) =>
//                     updateParallaxImage({ alt: e.target.value })
//                   }
//                   placeholder="Image description"
//                 />
//               </div>

//               <div>
//                 <Label>Upload Image</Label>
//                 <FileInput
//                   onChange={(e) =>
//                     handleParallaxFiles(e.currentTarget.files)
//                   }
//                 />
//               </div>

//               {/* Parallax Preview */}
//               {(parallaxPreviewUrl || model.parallaxImage.imageUrl) && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     Image Preview:
//                   </p>
//                   <img
//                     src={parallaxPreviewUrl || model.parallaxImage.imageUrl}
//                     alt="Parallax"
//                     className="w-full max-h-96 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Form Actions */}
//             <div className="flex items-center gap-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Saving..." : "Save Home Page"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setModel(defaultModel);
//                   setVideoFiles([]);
//                   setParallaxFiles([]);
//                   setServiceImages([]);
//                   setClientLogos([]);
//                   setImagePreviewUrls({});
//                   setVideoPreviewUrl("");
//                   setParallaxPreviewUrl("");
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

// Interfaces
interface FunFactItem {
  value: string;
  text: string;
}

interface Service {
  number: string;
  title: string;
  list: string[];
  imageUrl: string;
  detailsUrl: string;
}

interface ServiceSection {
  heading: string;
  services: Service[];
}

interface FunFactSection {
  title: string;
  items: FunFactItem[];
}

interface ClientSection {
  descriptionText: string;
  companyNames: string[]; // stored as URLs
}

interface ParallaxImage {
  imageUrl: string;
  alt: string;
}

interface Hero {
  satisfiedClientsPercent: number;
  projectsCount: number;
  countriesCount: number;
  descriptionText: string;
}

interface About {
  bodyText: string;
}

interface Video {
  videoUrl: string;
}

interface HomePageModel {
  _id?: string;
  slug?: string;
  hero: Hero;
  about: About;
  video: Video;
  serviceSection: ServiceSection;
  funFactSection: FunFactSection;
  clientSection: ClientSection;
  parallaxImage: ParallaxImage;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const defaultModel: HomePageModel = {
  hero: {
    satisfiedClientsPercent: 90,
    projectsCount: 200,
    countriesCount: 32,
    descriptionText:
      "We're a digital products design & development agency that works passionately with the digital experiences.",
  },
  about: {
    bodyText:
      "We're a dynamic startup agency specializing in innovative solutions for businesses looking to elevate their brand presence.",
  },
  video: {
    videoUrl: "https://rrdevs.net/project-video/group-meeting.mp4",
  },
  serviceSection: {
    heading: "Complex proficiency",
    services: [
      {
        number: "(01)",
        title: "Branding",
        list: ["Creative Direction", "Brand Identity", "Branding Strategy", "Graphic Design", "Startup"],
        imageUrl: "/assets/imgs/gallery/image-3.webp",
        detailsUrl: "/service-details",
      },
      {
        number: "(02)",
        title: "UI/UX Design",
        list: ["User Research", "Wireframing", "Prototyping", "Product Design"],
        imageUrl: "/assets/imgs/gallery/image-4.webp",
        detailsUrl: "/service-details",
      },
    ],
  },
  funFactSection: {
    title: "Perfect —activity",
    items: [
      { value: "1.8M", text: "Total Impressions" },
      { value: "260+", text: "Successful Projects" },
      { value: "12+", text: "Countries Reached" },
    ],
  },
  clientSection: {
    descriptionText:
      "We're a great team of creatives with a strongest capabilities to helping progressive fields achieve their goals.",
    companyNames: ["/assets/clients/google.png", "/assets/clients/netflix.png"],
  },
  parallaxImage: {
    imageUrl: "/assets/imgs/gallery/image-7.webp",
    alt: "Creative team working",
  },
};

export default function Home() {
  const [model, setModel] = useState<HomePageModel>(defaultModel);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [parallaxFiles, setParallaxFiles] = useState<File[]>([]);
  const [serviceImages, setServiceImages] = useState<(File | null)[]>([]);
  const [clientLogos, setClientLogos] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<{ [key: string]: string }>({});
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");
  const [parallaxPreviewUrl, setParallaxPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load home data on mount (GET /home)
  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const res = await api.get("/home");
        const data = res.data;
        if (data) {
          setModel((prev) => ({
            ...prev,
            ...data,
            hero: { ...prev.hero, ...(data.hero || {}) },
            about: { ...prev.about, ...(data.about || {}) },
            video: { ...prev.video, ...(data.video || {}) },
            serviceSection: { ...prev.serviceSection, ...(data.serviceSection || {}) },
            funFactSection: { ...prev.funFactSection, ...(data.funFactSection || {}) },
            clientSection: { ...prev.clientSection, ...(data.clientSection || {}) },
            parallaxImage: { ...prev.parallaxImage, ...(data.parallaxImage || {}) },
          }));

          if (data.serviceSection && Array.isArray(data.serviceSection.services)) {
            setServiceImages(new Array(data.serviceSection.services.length).fill(null));
          }
        }
      } catch (err) {
        console.error("Failed to load home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  // nested updates
  const updateHero = (patch: Partial<Hero>) => setModel((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
  const updateAbout = (patch: Partial<About>) => setModel((prev) => ({ ...prev, about: { ...prev.about, ...patch } }));
  const updateVideo = (patch: Partial<Video>) => setModel((prev) => ({ ...prev, video: { ...prev.video, ...patch } }));
  const updateServiceSection = (patch: Partial<ServiceSection>) => setModel((prev) => ({ ...prev, serviceSection: { ...prev.serviceSection, ...patch } }));
  const updateFunFactSection = (patch: Partial<FunFactSection>) => setModel((prev) => ({ ...prev, funFactSection: { ...prev.funFactSection, ...patch } }));
  const updateClientSection = (patch: Partial<ClientSection>) => setModel((prev) => ({ ...prev, clientSection: { ...prev.clientSection, ...patch } }));
  const updateParallaxImage = (patch: Partial<ParallaxImage>) => setModel((prev) => ({ ...prev, parallaxImage: { ...prev.parallaxImage, ...patch } }));

  // services
  const addService = () => {
    const newService: Service = { number: `(${String(model.serviceSection.services.length + 1).padStart(2, "0")})`, title: "New Service", list: [], imageUrl: "", detailsUrl: "/service-details" };
    updateServiceSection({ services: [...model.serviceSection.services, newService] });
    setServiceImages((prev) => [...prev, null]);
  };

  const updateService = (index: number, patch: Partial<Service>) => {
    const services = model.serviceSection.services.map((s, i) => (i === index ? { ...s, ...patch } : s));
    updateServiceSection({ services });
  };

  const removeService = (index: number) => {
    const services = model.serviceSection.services.filter((_, i) => i !== index);
    updateServiceSection({ services });
    setServiceImages((prev) => prev.filter((_, i) => i !== index));
  };

  // fun facts
  const addFunFact = () => updateFunFactSection({ items: [...model.funFactSection.items, { value: "", text: "" }] });
  const updateFunFact = (index: number, patch: Partial<FunFactItem>) => {
    const items = model.funFactSection.items.map((it, i) => (i === index ? { ...it, ...patch } : it));
    updateFunFactSection({ items });
  };
  const removeFunFact = (index: number) => updateFunFactSection({ items: model.funFactSection.items.filter((_, i) => i !== index) });

  // image handlers
  const handleServiceImageChange = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setServiceImages((prev) => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrls((prev) => ({ ...prev, [`service_${index}`]: previewUrl }));
    updateService(index, { imageUrl: "" });
  };

  const handleParallaxFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setParallaxFiles([file]);
    const previewUrl = URL.createObjectURL(file);
    setParallaxPreviewUrl(previewUrl);
    updateParallaxImage({ imageUrl: "" });
  };

  const handleVideoFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setVideoFiles([file]);
    const previewUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(previewUrl);
    updateVideo({ videoUrl: "" });
  };

  const handleClientLogos = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setClientLogos((prev) => [...prev, ...newFiles]);
  };

  const removeExistingLogo = (index: number) => {
    updateClientSection({ companyNames: model.clientSection.companyNames.filter((_, i) => i !== index) });
  };

  const removeNewLogo = (index: number) => setClientLogos((prev) => prev.filter((_, i) => i !== index));

  const setServiceList = (serviceIndex: number, list: string[]) => updateService(serviceIndex, { list });

  // TagInput component
  const TagInput = ({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) => {
    const [inputValue, setInputValue] = useState("");
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {value.map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-sm">
              {tag}
              <button type="button" onClick={() => onChange(value.filter((_, i) => i !== idx))} className="hover:text-brand-700 dark:hover:text-brand-300">×</button>
            </span>
          ))}
        </div>
        <InputField type="text" value={inputValue} placeholder="Type and press comma to add" onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          if (val.endsWith(",") || val.endsWith(" ")) {
            const tag = val.slice(0, -1).trim();
            if (tag && !value.includes(tag)) {
              onChange([...value, tag]);
              setInputValue("");
            }
          }
        }} />
      </div>
    );
  };

  // submit (PUT /home)
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    setMessage("");
    setLoading(true);
    try {
      const fd = new FormData();
      const payload: any = JSON.parse(JSON.stringify(model));

      // Clear URLs if new files provided so backend will replace
      if (parallaxFiles.length) payload.parallaxImage = { ...(payload.parallaxImage || {}), imageUrl: "" };

      payload.serviceSection = {
        ...(payload.serviceSection || {}),
        services: (payload.serviceSection?.services || []).map((s: Service, idx: number) => (serviceImages[idx] ? { ...s, imageUrl: "" } : s)),
      };

      if (videoFiles.length) payload.video = { ...(payload.video || {}), videoUrl: "" };

      // When new client logos are uploaded, we choose to append them. Backend should return new URLs.
      if (clientLogos.length) payload.clientSection = { ...(payload.clientSection || {}), companyNames: payload.clientSection?.companyNames || [] };

      // append payload first
      fd.append("payload", JSON.stringify(payload));

      // append parallax
      if (parallaxFiles.length) fd.append("parallaxImage", parallaxFiles[0], parallaxFiles[0].name);

      // append service images
      serviceImages.forEach((file, idx) => {
        if (file) fd.append(`serviceImage_${idx}`, file, (file as File).name);
      });

      // append video files (only first expected)
      videoFiles.forEach((file, idx) => {
        if (file) fd.append(`video_${idx}`, file, file.name);
      });

      // append client logos — send indices so backend can append after existing ones
      const existingLogosCount = Array.isArray(model.clientSection.companyNames) ? model.clientSection.companyNames.length : 0;
      clientLogos.forEach((file, idx) => {
        fd.append(`clientLogo_${existingLogosCount + idx}`, file, file.name);
      });

      const res = await api.put("/home", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage(res.data?.message || "Home page updated.");

      // re-merge returned model if provided
      if (res.data?.home) {
        const data = res.data.home;
        setModel((prev) => ({
          ...prev,
          ...data,
          hero: { ...prev.hero, ...(data.hero || {}) },
          about: { ...prev.about, ...(data.about || {}) },
          video: { ...prev.video, ...(data.video || {}) },
          serviceSection: { ...prev.serviceSection, ...(data.serviceSection || {}) },
          funFactSection: { ...prev.funFactSection, ...(data.funFactSection || {}) },
          clientSection: { ...prev.clientSection, ...(data.clientSection || {}) },
          parallaxImage: { ...prev.parallaxImage, ...(data.parallaxImage || {}) },
        }));

        if (data.serviceSection && Array.isArray(data.serviceSection.services)) {
          setServiceImages(new Array(data.serviceSection.services.length).fill(null));
        }

        // clear local file states
        setParallaxFiles([]);
        setServiceImages((s) => s.map(() => null));
        setVideoFiles([]);
        setClientLogos([]);
        setImagePreviewUrls({});
        setParallaxPreviewUrl("");
        setVideoPreviewUrl("");
      }
    } catch (err: any) {
      console.error("save home error:", err);
      setMessage(err?.response?.data?.message || err.message || "Failed to save home");
    } finally {
      setLoading(false);
    }
  };

  // cleanup object URLs
  useEffect(() => {
    return () => {
      Object.values(imagePreviewUrls).forEach((u) => URL.revokeObjectURL(u));
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      if (parallaxPreviewUrl) URL.revokeObjectURL(parallaxPreviewUrl);
      // do not revoke files in state as they may be reused; revocation occurs when state cleared
    };
  }, [imagePreviewUrls, videoPreviewUrl, parallaxPreviewUrl]);

  return (
    <>
      <PageMeta title="Home Page Management" description="Manage your home page content, images, and sections." />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Home Page Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Edit hero section, services, fun facts, clients, and more.</p>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-success-500/10 text-success-700 dark:text-success-400 border border-success-200 dark:border-success-800" : "bg-error-500/10 text-error-700 dark:text-error-400 border border-error-200 dark:border-error-800"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* HERO */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Hero Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="satisfiedClients">Satisfied Clients %</Label>
                  <InputField id="satisfiedClients" type="number" value={model.hero.satisfiedClientsPercent.toString()} onChange={(e) => updateHero({ satisfiedClientsPercent: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label htmlFor="projectsCount">Projects Count</Label>
                  <InputField id="projectsCount" type="number" value={model.hero.projectsCount.toString()} onChange={(e) => updateHero({ projectsCount: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <Label htmlFor="countriesCount">Countries Count</Label>
                  <InputField id="countriesCount" type="number" value={model.hero.countriesCount.toString()} onChange={(e) => updateHero({ countriesCount: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div>
                <Label htmlFor="heroDescription">Description</Label>
                <TextArea value={model.hero.descriptionText} onChange={(v) => updateHero({ descriptionText: v })} rows={3} />
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Section</h2>
              <Label htmlFor="aboutText">Body Text</Label>
              <TextArea value={model.about.bodyText} onChange={(v) => updateAbout({ bodyText: v })} rows={4} />
            </div>

            {/* VIDEO */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Video Section</h2>
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <InputField id="videoUrl" value={model.video.videoUrl} onChange={(e) => updateVideo({ videoUrl: e.target.value })} placeholder="https://example.com/video.mp4" />
              </div>

              <div>
                <Label>Upload Video File</Label>
                <FileInput onChange={(e) => handleVideoFiles(e.currentTarget.files)} />
              </div>

              {(videoPreviewUrl || model.video.videoUrl) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Video Preview:</p>
                  <video controls className="w-full max-h-96 rounded-lg border border-gray-200 dark:border-gray-700" src={videoPreviewUrl || model.video.videoUrl} />
                </div>
              )}
            </div>

            {/* SERVICE */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Service Section</h2>
                <button type="button" onClick={addService} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg">+ Add Service</button>
              </div>

              <div>
                <Label htmlFor="serviceHeading">Heading</Label>
                <InputField id="serviceHeading" value={model.serviceSection.heading} onChange={(e) => updateServiceSection({ heading: e.target.value })} placeholder="Service section heading" />
              </div>

              <div className="space-y-4">
                {model.serviceSection.services.map((service, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service {idx + 1}</h3>
                      <button type="button" onClick={() => removeService(idx)} className="px-3 py-1 bg-error-500 hover:bg-error-600 text-white rounded text-sm">Remove</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Number</Label>
                        <InputField value={service.number} onChange={(e) => updateService(idx, { number: e.target.value })} />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <InputField value={service.title} onChange={(e) => updateService(idx, { title: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <Label>Details URL</Label>
                      <InputField value={service.detailsUrl} onChange={(e) => updateService(idx, { detailsUrl: e.target.value })} />
                    </div>

                    <div>
                      <Label>Service List</Label>
                      <TagInput value={service.list} onChange={(list) => setServiceList(idx, list)} />
                    </div>

                    <div>
                      <Label>Service Image</Label>
                      <FileInput onChange={(e) => handleServiceImageChange(idx, e.currentTarget.files)} />
                    </div>

                    <div className="mt-4">
                      {imagePreviewUrls[`service_${idx}`] ? (
                        <div>
                          <p className="text-sm text-gray-600">Preview (new file):</p>
                          <img src={imagePreviewUrls[`service_${idx}`]} alt="Service preview" className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                      ) : service.imageUrl ? (
                        <div>
                          <p className="text-sm text-gray-600">Current image:</p>
                          <img src={service.imageUrl} alt="Service" className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

                {model.serviceSection.services.length === 0 && <p className="text-center text-gray-500 py-8">No services yet. Add one to get started.</p>}
              </div>
            </div>

            {/* FUN FACTS */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fun Fact Section</h2>
                <button type="button" onClick={addFunFact} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg">+ Add Item</button>
              </div>

              <div>
                <Label>Title</Label>
                <InputField value={model.funFactSection.title} onChange={(e) => updateFunFactSection({ title: e.target.value })} />
              </div>

              <div className="space-y-3">
                {model.funFactSection.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-end">
                    <div className="w-32">
                      <Label>Value</Label>
                      <InputField value={item.value} onChange={(e) => updateFunFact(idx, { value: e.target.value })} />
                    </div>
                    <div className="flex-1">
                      <Label>Text</Label>
                      <InputField value={item.text} onChange={(e) => updateFunFact(idx, { text: e.target.value })} />
                    </div>
                    <button type="button" onClick={() => removeFunFact(idx)} className="px-3 py-2 bg-error-500 text-white rounded">Remove</button>
                  </div>
                ))}

                {model.funFactSection.items.length === 0 && <p className="text-center text-gray-500 py-8">No items yet. Add one to get started.</p>}
              </div>
            </div>

            {/* CLIENT SECTION */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client Section</h2>

              <div>
                <Label>Description</Label>
                <TextArea value={model.clientSection.descriptionText} onChange={(v) => updateClientSection({ descriptionText: v })} rows={4} />
              </div>

              <div>
                <Label>Client Logos</Label>

                {Array.isArray(model.clientSection.companyNames) && model.clientSection.companyNames.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {model.clientSection.companyNames.map((url, idx) => (
                      <div key={idx} className="relative border rounded-lg p-3 bg-gray-50">
                        <img src={url} alt={`Client ${idx + 1}`} className="w-full h-24 object-contain" />
                        <button type="button" onClick={() => removeExistingLogo(idx)} className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full w-6 h-6">×</button>
                      </div>
                    ))}
                  </div>
                )}

                {clientLogos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                    {clientLogos.map((file, idx) => (
                      <div key={idx} className="relative border rounded-lg p-3 bg-gray-50">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-contain" />
                        <button type="button" onClick={() => removeNewLogo(idx)} className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full w-6 h-6">×</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <FileInput onChange={(e) => handleClientLogos(e.currentTarget.files)} />
                  <p className="text-xs text-gray-600 mt-2">Uploading new files will append to current logos.</p>
                </div>
              </div>
            </div>

            {/* PARALLAX */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Parallax Image</h2>
              <div>
                <Label>Alt Text</Label>
                <InputField value={model.parallaxImage.alt} onChange={(e) => updateParallaxImage({ alt: e.target.value })} />
              </div>

              <div>
                <FileInput onChange={(e) => handleParallaxFiles(e.currentTarget.files)} />
              </div>

              {(parallaxPreviewUrl || model.parallaxImage.imageUrl) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img src={parallaxPreviewUrl || model.parallaxImage.imageUrl} alt="Parallax" className="w-full max-h-96 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-500 text-white rounded-lg">{loading ? "Saving..." : "Save Home Page"}</button>
              <button type="button" onClick={() => { setModel(defaultModel); setVideoFiles([]); setParallaxFiles([]); setServiceImages([]); setClientLogos([]); setImagePreviewUrls({}); setVideoPreviewUrl(""); setParallaxPreviewUrl(""); setMessage(""); }} className="px-6 py-2 bg-gray-200 rounded-lg">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
