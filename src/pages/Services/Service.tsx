import { FormEvent, useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import api from "../../api/axios";

interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed: string;
}

interface ServiceModel {
  leftImage: ServiceImage;
  rightImage: ServiceImage;
  paragraphs: string[];
}

const defaultModel: ServiceModel = {
  leftImage: {
    src: "/assets/imgs/gallery/image-10.webp",
    alt: "Service info visual",
    width: 250,
    height: 320,
    speed: "0.9",
  },
  paragraphs: [
    "A practical guide explaining how and why Sage Craft should be part of every project to ensure its high quality and seamless user experience.",
    "If you already understand ask to continue scrolling; otherwise, click the link below to explore more.",
  ],
  rightImage: {
    src: "/assets/imgs/gallery/image-11.webp",
    alt: "Service related",
    width: 740,
    height: 930,
    speed: "0.8",
  },
};

const Service: React.FC = () => {
  const [model, setModel] = useState<ServiceModel>(defaultModel);
  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [leftPreview, setLeftPreview] = useState<string>(
    defaultModel.leftImage.src
  );
  const [rightPreview, setRightPreview] = useState<string>(
    defaultModel.rightImage.src
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/services");
        const data = res.data;

        if (!data) return;

        setModel((prev) => ({ ...prev, ...data }));
        setLeftPreview(data.leftImage?.src || defaultModel.leftImage.src);
        setRightPreview(data.rightImage?.src || defaultModel.rightImage.src);
      } catch (error) {
        console.error("Failed to load service info:", error);
        // keep defaults like original component
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const updateLeft = (patch: Partial<ServiceImage>) =>
    setModel((m) => ({ ...m, leftImage: { ...m.leftImage, ...patch } }));

  const updateRight = (patch: Partial<ServiceImage>) =>
    setModel((m) => ({ ...m, rightImage: { ...m.rightImage, ...patch } }));

  const updateParagraph = (index: number, text: string) => {
    setModel((m) => {
      const next = { ...m, paragraphs: [...m.paragraphs] };
      next.paragraphs[index] = text;
      return next;
    });
  };

  const addParagraph = () =>
    setModel((m) => ({ ...m, paragraphs: [...m.paragraphs, ""] }));

  const removeParagraph = (index: number) =>
    setModel((m) => ({
      ...m,
      paragraphs: m.paragraphs.filter((_, i) => i !== index),
    }));

  const handleLeftFiles = (files: FileList | null) => {
    const file = files && files.length ? files[0] : null;
    setLeftFile(file);
    setLeftPreview(file ? URL.createObjectURL(file) : model.leftImage.src);
    if (file) updateLeft({ src: "" });
  };

  const handleRightFiles = (files: FileList | null) => {
    const file = files && files.length ? files[0] : null;
    setRightFile(file);
    setRightPreview(file ? URL.createObjectURL(file) : model.rightImage.src);
    if (file) updateRight({ src: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const fd = new FormData();
      const payload: ServiceModel = JSON.parse(JSON.stringify(model));

      payload.leftImage = {
        ...(payload.leftImage || defaultModel.leftImage),
        src: leftFile ? "" : payload.leftImage?.src || "",
      };
      payload.rightImage = {
        ...(payload.rightImage || defaultModel.rightImage),
        src: rightFile ? "" : payload.rightImage?.src || "",
      };

      fd.append("payload", JSON.stringify(payload));
      if (leftFile) fd.append("leftImage", leftFile, leftFile.name);
      if (rightFile) fd.append("rightImage", rightFile, rightFile.name);

      const res = await api.post("/services", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;

      setMessage(data?.message || "Saved successfully.");

      if (data?.serviceInfo) {
        const next: ServiceModel = data.serviceInfo;
        setModel(next);
        setLeftPreview(next.leftImage?.src || defaultModel.leftImage.src);
        setRightPreview(next.rightImage?.src || defaultModel.rightImage.src);
        setLeftFile(null);
        setRightFile(null);
      }
    } catch (error: any) {
      console.error("save service-info error:", error);
      setMessage(
        error?.response?.data?.message || error.message || "Save failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setModel(defaultModel);
    setLeftFile(null);
    setRightFile(null);
    setLeftPreview(defaultModel.leftImage.src);
    setRightPreview(defaultModel.rightImage.src);
    setMessage("");
  };

  const isSuccess =
    message.toLowerCase().includes("success") ||
    message.toLowerCase().includes("saved");

  return (
    <>
      <PageMeta
        title="Service Info | Admin"
        description="Edit the service information section including images and descriptive paragraphs."
      />
      <PageBreadcrumb pageTitle="Edit Service Info" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Service Info">
          {message && (
            <div
              className={`mb-4 rounded-lg border px-4 py-2 text-sm ${
                isSuccess
                  ? "bg-success-500/10 text-success-700 dark:text-success-400 border-success-200 dark:border-success-800"
                  : "bg-error-500/10 text-error-700 dark:text-error-400 border-error-200 dark:border-error-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded border border-gray-200 bg-white p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Image */}
                <div>
                  <Label>Left Image</Label>
                  <div className="mt-2 space-y-3">
                    {leftPreview && (
                      <div className="overflow-hidden rounded border border-gray-200 dark:border-slate-700">
                        <img
                          src={leftPreview}
                          alt="left preview"
                          className="block h-auto w-full object-cover"
                        />
                      </div>
                    )}
                    <FileInput
                      onChange={(e) => handleLeftFiles(e.currentTarget.files)}
                    />
                  </div>
                </div>

                {/* Right Image */}
                <div>
                  <Label>Right Image</Label>
                  <div className="mt-2 space-y-3">
                    {rightPreview && (
                      <div className="overflow-hidden rounded border border-gray-200 dark:border-slate-700">
                        <img
                          src={rightPreview}
                          alt="right preview"
                          className="block h-auto w-full object-cover"
                        />
                      </div>
                    )}
                    <FileInput
                      onChange={(e) => handleRightFiles(e.currentTarget.files)}
                    />
                  </div>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="mt-6">
                <Label>Paragraphs</Label>
                <div className="mt-2 space-y-3">
                  {model.paragraphs.map((text, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-1">
                        <TextArea
                          value={text}
                          onChange={(value) => updateParagraph(index, value)}
                          rows={2}
                          placeholder={`Paragraph ${index + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="h-10 self-start rounded-md bg-red-600 px-3 text-sm font-medium text-white hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addParagraph}
                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    + Add paragraph
                  </button>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Service Info"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md bg-slate-800 px-5 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default Service;
