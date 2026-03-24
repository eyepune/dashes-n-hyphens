"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getStartupApplications, getContactMessages, getBlogPosts,
  createBlogPost, updateBlogPost, deleteBlogPost,
  signIn, signOut, getSession,
  type BlogPost, type StartupApplication, type ContactMessage
} from "@/lib/supabase";
import { LogOut, Users, Mail, BookOpen, Plus, Trash2, Edit3, Download, CheckCircle2, Loader2, X } from "lucide-react";

type Tab = "applications" | "messages" | "blog";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err.message || "Invalid credentials.");
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#0B1F2F" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#4EC3C7" }}>
            <span className="font-serif font-bold text-xl" style={{ color: "#0B1F2F" }}>D</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Dashes n Hyphens</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 32 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@dashesnhyphens.com" required
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13, outline: "none" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontFamily: "inherit", fontSize: 13, outline: "none" }} />
            </div>
            {error && <p style={{ color: "#FC8181", fontSize: 12, background: "rgba(252,129,129,0.1)", padding: "10px 14px", borderRadius: 8, marginBottom: 16 }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "12px", background: "#4EC3C7", color: "#0B1F2F", fontWeight: 600, fontSize: 14, border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BlogEditor({ post, onSave, onClose }: { post?: BlogPost; onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    author: post?.author || "",
    category: post?.category || "IPO Advisory",
    published: post?.published ?? false,
    slug: post?.slug || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.title || !form.author || !form.content) return;
    if (!form.slug) form.slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setLoading(true);
    if (post?.id) {
      await updateBlogPost(post.id, form);
    } else {
      await createBlogPost(form);
    }
    setLoading(false);
    onSave();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "32px 16px" }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 600, boxShadow: "0 40px 80px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #E2E8F0" }}>
          <h3 className="font-serif text-xl font-bold" style={{ color: "#0B1F2F" }}>{post ? "Edit Post" : "New Post"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#718096" }}><X size={20} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Article title" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label className="input-label">Author</label>
              <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="input-field" placeholder="Author name" />
            </div>
            <div>
              <label className="input-label">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                <option>IPO Advisory</option>
                <option>Startup Funding</option>
                <option>Government Grants</option>
                <option>Market Insights</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="input-field" style={{ resize: "none" }} placeholder="Brief summary" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="input-label">Content (HTML)</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} className="input-field" style={{ resize: "none", fontFamily: "monospace", fontSize: 12 }} placeholder="<h2>Section heading</h2><p>Content...</p>" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: "#4EC3C7" }} />
            <label htmlFor="published" style={{ fontSize: 14, color: "#0B1F2F", fontWeight: 500 }}>Publish immediately</label>
          </div>
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #E2E8F0", display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", border: "1px solid #E2E8F0", background: "#fff", color: "#4A5568", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Cancel</button>
          <button onClick={handleSave} disabled={loading} style={{ padding: "10px 20px", background: "#0B1F2F", color: "#fff", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, opacity: loading ? 0.6 : 1 }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            {post ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("applications");
  const [applications, setApplications] = useState<StartupApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then(session => {
      setAuthenticated(!!session);
      setChecking(false);
    });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    if (tab === "applications") {
      const { data } = await getStartupApplications();
      setApplications(data || []);
    } else if (tab === "messages") {
      const { data } = await getContactMessages();
      setMessages(data || []);
    } else if (tab === "blog") {
      const { data } = await getBlogPosts(false);
      setPosts(data || []);
    }
    setLoading(false);
  }, [tab]);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    loadData();
  };

  const handleSignOut = async () => {
    await signOut();
    setAuthenticated(false);
  };

  if (checking) return (
    <div style={{ minHeight: "100vh", background: "#0B1F2F", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={28} className="animate-spin" style={{ color: "#4EC3C7" }} />
    </div>
  );

  if (!authenticated) return <LoginForm onLogin={() => setAuthenticated(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA" }}>
      {/* Header */}
      <div style={{ background: "#0B1F2F", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#4EC3C7", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-serif font-bold text-sm" style={{ color: "#0B1F2F" }}>D</span>
          </div>
          <div>
            <div className="text-white font-sans font-semibold" style={{ fontSize: 13 }}>Admin Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>Dashes n Hyphens</div>
          </div>
        </div>
        <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { icon: Users, label: "Applications", count: applications.length, color: "#EFF6FF", iconColor: "#3B82F6" },
            { icon: Mail, label: "Messages", count: messages.length, color: "#FFF7ED", iconColor: "#F97316" },
            { icon: BookOpen, label: "Blog Posts", count: posts.length, color: "#ECFDF5", iconColor: "#10B981" },
          ].map(({ icon: Icon, label, count, color, iconColor }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E2E8F0" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={18} style={{ color: iconColor }} />
              </div>
              <div className="font-serif" style={{ fontSize: 28, fontWeight: 700, color: "#0B1F2F", marginBottom: 4 }}>{count}</div>
              <div style={{ fontSize: 12, color: "#4A5568" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 12, padding: 4, border: "1px solid #E2E8F0", marginBottom: 20, width: "fit-content" }}>
          {(["applications", "messages", "blog"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit", background: tab === t ? "#0B1F2F" : "transparent", color: tab === t ? "#fff" : "#4A5568", transition: "all 0.2s" }}>
              {t === "applications" ? "Applications" : t === "messages" ? "Messages" : "Blog Posts"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 0" }}>
              <Loader2 size={24} className="animate-spin" style={{ color: "#4EC3C7" }} />
            </div>
          ) : (
            <>
              {/* Applications */}
              {tab === "applications" && (
                <div>
                  <div style={{ padding: "16px 24px", borderBottom: "1px solid #E2E8F0" }}>
                    <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#0B1F2F" }}>Startup Applications</h2>
                  </div>
                  {applications.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#718096", fontSize: 14 }}>No applications yet. They will appear here once submitted.</div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#F5F7FA", borderBottom: "1px solid #E2E8F0" }}>
                            {["Startup", "Founder", "Email", "Sector", "Stage", "Funding", "Deck", "Date"].map(h => (
                              <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#718096", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id} style={{ borderBottom: "1px solid #F9F9F9" }}>
                              <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0B1F2F" }}>{app.startup_name}</td>
                              <td style={{ padding: "12px 16px", color: "#4A5568" }}>{app.founder_name}</td>
                              <td style={{ padding: "12px 16px", color: "#4A5568" }}>{app.email}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "rgba(78,195,199,0.1)", color: "#4EC3C7", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{app.sector}</span></td>
                              <td style={{ padding: "12px 16px", color: "#4A5568" }}>{app.funding_stage}</td>
                              <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0B1F2F" }}>{app.funding_required}</td>
                              <td style={{ padding: "12px 16px" }}>
                                {app.pitch_deck_url ? (
                                  <a href={app.pitch_deck_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#4EC3C7", fontSize: 12, fontWeight: 600 }}>
                                    <Download size={12} /> Download
                                  </a>
                                ) : <span style={{ color: "#CBD5E0", fontSize: 11 }}>—</span>}
                              </td>
                              <td style={{ padding: "12px 16px", color: "#718096", fontSize: 11 }}>{new Date(app.created_at || "").toLocaleDateString("en-IN")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Messages */}
              {tab === "messages" && (
                <div>
                  <div style={{ padding: "16px 24px", borderBottom: "1px solid #E2E8F0" }}>
                    <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#0B1F2F" }}>Contact Messages</h2>
                  </div>
                  {messages.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#718096", fontSize: 14 }}>No messages yet. They will appear here once submitted.</div>
                  ) : (
                    <div>
                      {messages.map(msg => (
                        <div key={msg.id} style={{ padding: "20px 24px", borderBottom: "1px solid #F5F7FA" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <div>
                              <span style={{ fontWeight: 600, fontSize: 14, color: "#0B1F2F" }}>{msg.name}</span>
                              {msg.company && <span style={{ color: "#718096", fontSize: 13, marginLeft: 8 }}>· {msg.company}</span>}
                            </div>
                            <span style={{ color: "#718096", fontSize: 11 }}>{new Date(msg.created_at || "").toLocaleDateString("en-IN")}</span>
                          </div>
                          <div style={{ color: "#4EC3C7", fontSize: 12, marginBottom: 8 }}>{msg.email}</div>
                          <p style={{ color: "#4A5568", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Blog */}
              {tab === "blog" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #E2E8F0" }}>
                    <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#0B1F2F" }}>Blog Posts</h2>
                    <button onClick={() => { setEditingPost(undefined); setShowEditor(true); }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#4EC3C7", color: "#0B1F2F", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                      <Plus size={14} /> New Post
                    </button>
                  </div>
                  {posts.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#718096", fontSize: 14 }}>No blog posts yet. Create your first post!</div>
                  ) : (
                    <div>
                      {posts.map(post => (
                        <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderBottom: "1px solid #F5F7FA" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#0B1F2F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</span>
                              <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 700, flexShrink: 0, background: post.published ? "#ECFDF5" : "#F5F7FA", color: post.published ? "#059669" : "#9CA3AF" }}>
                                {post.published ? "Live" : "Draft"}
                              </span>
                            </div>
                            <div style={{ fontSize: 11, color: "#718096" }}>{post.category} · {post.author} · {new Date(post.created_at || "").toLocaleDateString("en-IN")}</div>
                          </div>
                          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                            <button onClick={() => { setEditingPost(post); setShowEditor(true); }}
                              style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: "#F5F7FA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A5568" }}>
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => post.id && handleDeletePost(post.id)}
                              style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: "#F5F7FA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#4A5568" }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showEditor && (
        <BlogEditor
          post={editingPost}
          onSave={() => { setShowEditor(false); loadData(); }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
