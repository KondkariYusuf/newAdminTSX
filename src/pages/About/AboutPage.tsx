// src/pages/AboutPage.tsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

import InputField from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import PageMeta from "../../components/common/PageMeta";


interface InfoStat {
  label: string;
  value: string;
}

interface InfoSection {
  subtitle: string;
  heading: string;
  stats: InfoStat[];
}

interface TeamMember {
  name: string;
  post: string;
  imageUrl: string;
}

interface TeamSection {
  heading: string;
  description: string;
  members: TeamMember[];
}

interface AboutModel {
  infoSection: InfoSection;
  teamSection: TeamSection;
}

const defaultModel: AboutModel = {
  infoSection: {
    subtitle: "Who are we?",
    heading: "We deliver creative ideas to a crowded world.",
    stats: [
      { label: "35+ Google reviews", value: "4.9" },
      { label: "Clients world-wide", value: "170+" },
      { label: "Completed projects", value: "1.7k" },
      { label: "Client satisfaction", value: "95%" },
    ],
  },
  teamSection: {
    heading: "Meet the talented squad, behind the creativity",
    description:
      "We are a great skilled and talented team behind the creativity and your amazing digital craft.",
    members: [
      { name: "James David", post: "CEO & Founder", imageUrl: "" },
      { name: "Brenda C. Janet", post: "Lead Developer", imageUrl: "" },
    ],
  },
};

const AboutPage: React.FC = () => {
  const [model, setModel] = useState<AboutModel>(defaultModel);
  const [teamFiles, setTeamFiles] = useState<(File | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------- fetch existing About from backend ----------
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        const data: any = res.data;
        if (!data) return;

        setModel((prev) => ({
          ...prev,
          infoSection: {
            ...prev.infoSection,
            ...(data.infoSection || {}),
          },
          teamSection: {
            ...prev.teamSection,
            ...(data.teamSection || {}),
          },
        }));

        if (data.teamSection?.members) {
          setTeamFiles(Array(data.teamSection.members.length).fill(null));
        }
      } catch (err) {
        console.error("Failed to fetch about data", err);
      }
    };

    fetchAbout();
  }, []);

  // ---------- helpers ----------
  const setInfoSection = (patch: Partial<InfoSection>) =>
    setModel((m) => ({ ...m, infoSection: { ...m.infoSection, ...patch } }));

  const updateStat = (i: number, patch: Partial<InfoStat>) => {
    const next = model.infoSection.stats.map((s, idx) =>
      idx === i ? { ...s, ...patch } : s
    );
    setInfoSection({ stats: next });
  };

  const setTeamSection = (patch: Partial<TeamSection>) =>
    setModel((m) => ({ ...m, teamSection: { ...m.teamSection, ...patch } }));

  const addMember = () => {
    setTeamSection({
      members: [
        ...model.teamSection.members,
        { name: "New Member", post: "Role", imageUrl: "" },
      ],
    });
    setTeamFiles((p) => [...p, null]);
  };

  const updateMember = (idx: number, patch: Partial<TeamMember>) => {
    const next = model.teamSection.members.map((m, i) =>
      i === idx ? { ...m, ...patch } : m
    );
    setTeamSection({ members: next });
  };

  const removeMember = (idx: number) => {
    setTeamSection({
      members: model.teamSection.members.filter((_, i) => i !== idx),
    });
    setTeamFiles((p) => p.filter((_, i) => i !== idx));
  };

  const handleTeamImageChange = (idx: number, files: FileList | null) => {
    setTeamFiles((prev) => {
      const copy = [...prev];
      copy[idx] = files && files.length > 0 ? files[0] : null;
      return copy;
    });

    if (files && files.length > 0) {
      updateMember(idx, { imageUrl: "" });
    }
  };

  // ---------- submit ----------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const fd = new FormData();
      const payload: AboutModel = JSON.parse(JSON.stringify(model));

      // wipe URLs where new files exist
      payload.teamSection.members = payload.teamSection.members.map(
        (m, idx) => ({
          ...m,
          imageUrl: teamFiles[idx] ? "" : m.imageUrl || "",
        })
      );

      fd.append("payload", JSON.stringify(payload));

      // attach team images
      teamFiles.forEach((file, idx) => {
        if (file) fd.append(`teamImage_${idx}`, file, file.name);
      });

      const res = await api.put("/about", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data?.message || "Saved successfully.");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setModel(defaultModel);
    setTeamFiles([]);
    setMessage("");
  };

  const isSuccess =
    message.toLowerCase().includes("success") ||
    message.toLowerCase().includes("saved");

  return (
    <>
      <PageMeta
        title="About Page Management"
        description="Manage the About page info section and team members."
      />
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row gap-6 px-4 py-6 max-w-7xl mx-auto w-full">
        {/* <SideBar /> */}

        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4 px-2 text-gray-900 dark:text-white">
            Edit About Page
          </h1>

          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded-lg border ${
                isSuccess
                  ? "bg-success-500/10 text-success-700 dark:text-success-400 border-success-200 dark:border-success-800"
                  : "bg-error-500/10 text-error-700 dark:text-error-400 border-error-200 dark:border-error-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Info Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                Info Section
              </h2>

              <div>
                <Label htmlFor="infoSubtitle">Subtitle</Label>
                <InputField
                  id="infoSubtitle"
                  value={model.infoSection.subtitle}
                  onChange={(e) =>
                    setInfoSection({ subtitle: e.target.value })
                  }
                  placeholder="Who are we?"
                />
              </div>

              <div>
                <Label htmlFor="infoHeading">Heading</Label>
                <InputField
                  id="infoHeading"
                  value={model.infoSection.heading}
                  onChange={(e) =>
                    setInfoSection({ heading: e.target.value })
                  }
                  placeholder="We deliver creative ideas..."
                />
              </div>

              <div className="space-y-3">
                <Label>Stats</Label>
                {model.infoSection.stats.map((s, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <div>
                      <Label htmlFor={`statLabel_${i}`}>Label</Label>
                      <InputField
                        id={`statLabel_${i}`}
                        value={s.label}
                        onChange={(e) =>
                          updateStat(i, { label: e.target.value })
                        }
                        placeholder="35+ Google reviews"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`statValue_${i}`}>Value</Label>
                      <InputField
                        id={`statValue_${i}`}
                        value={s.value}
                        onChange={(e) =>
                          updateStat(i, { value: e.target.value })
                        }
                        placeholder="4.9"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Team Section
                </h2>
                <button
                  type="button"
                  onClick={addMember}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
                >
                  + Member
                </button>
              </div>

              <div>
                <Label htmlFor="teamHeading">Heading</Label>
                <InputField
                  id="teamHeading"
                  value={model.teamSection.heading}
                  onChange={(e) =>
                    setTeamSection({ heading: e.target.value })
                  }
                  placeholder="Meet the talented squad..."
                />
              </div>

              <div>
                <Label htmlFor="teamDescription">Description</Label>
                <TextArea
                  value={model.teamSection.description}
                  onChange={(value) =>
                    setTeamSection({ description: value })
                  }
                  placeholder="We are a great skilled and talented team..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                {model.teamSection.members.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`memberName_${i}`}>Name</Label>
                        <InputField
                          id={`memberName_${i}`}
                          value={m.name}
                          onChange={(e) =>
                            updateMember(i, { name: e.target.value })
                          }
                          placeholder="Team member name"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`memberPost_${i}`}>Post</Label>
                        <InputField
                          id={`memberPost_${i}`}
                          value={m.post}
                          onChange={(e) =>
                            updateMember(i, { post: e.target.value })
                          }
                          placeholder="Role"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`memberImage_${i}`}>Image</Label>
                        <FileInput
                          onChange={(e) =>
                            handleTeamImageChange(
                              i,
                              e.currentTarget.files
                            )
                          }
                        />

                        {(m.imageUrl || teamFiles[i]) && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Preview:
                            </p>
                            <img
                              src={
                                teamFiles[i]
                                  ? URL.createObjectURL(
                                      teamFiles[i] as File
                                    )
                                  : m.imageUrl
                              }
                              alt={m.name}
                              className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeMember(i)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {model.teamSection.members.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No team members yet. Add one to get started.
                  </p>
                )}
              </div>
            </section>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save About"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
