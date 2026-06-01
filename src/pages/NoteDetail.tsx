import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler((result: Note | null) => {
            setNote(result);
            setLoading(false);
          })
          .withFailureHandler((error: Error) => {
            console.error('Failed to fetch note:', error);
            setLoading(false);
          })
          .getNoteById(id);
      } else {
        // Mock data for local development
        setTimeout(() => {
          setNote({
            id: id,
            title: 'Mock Note Title',
            icon: 'book',
            color: 'bg-primary-container',
            iconColor: 'text-on-primary-container',
            userEmail: 'mock@example.com',
            createdAt: new Date().toString()
          });
          setLoading(false);
        }, 500);
      }
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-on-surface-variant">Loading note details...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-error">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12 md:px-12">
        {/* Toolbar/Status Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm rounded-full">DRAFT</div>
            <span className="font-date-stamp text-date-stamp text-on-surface-variant">
              Created {new Date(note.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined">share</button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors material-symbols-outlined">archive</button>
            <button className="p-2 text-error hover:bg-error-container/20 rounded-full transition-colors material-symbols-outlined">delete</button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="space-y-6">
          {/* Section Title Input */}
          <div className="group">
            <input
              className="w-full bg-transparent border-none focus:ring-0 font-h1 text-h1 text-on-surface placeholder:text-outline-variant p-0 m-0 selection:bg-primary-container selection:text-on-primary-container"
              placeholder="Section Title"
              type="text"
              defaultValue={note.title}
              readOnly
            />
          </div>

          {/* Date Metadata */}
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span className="font-body-md text-body-md">{new Date(note.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Image Integration */}
          <div className="my-8 rounded-xl overflow-hidden shadow-sm">
            <img
              alt="Corporate collaboration"
              className="w-full h-64 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVCQclDgoCrhp06D5AWN82_F8iYv4_aSSXdKFDOoXJ9PzSzzy2t079f8qsLXATaF42-Dp9oDYkLmj9M1s7fwyi91eJEvIbeIpuPrSnrsIL5wHzavGlSfxHom3JO3ibzm1nVxUzP-DygBAZAnYZi8uFTnASDT7awtS78aTv940eOzMFe-brmTfHH0a_K23yAl9Wczc939ulBC2FWn9JpzqfFhrP-pczC178iAJaiUjsQi2zaORE4IVQmiLkOrWuxh-xGAoSp0GiLcU"
            />
          </div>

          {/* Note Body Area */}
          <div className="relative min-h-[500px]">
            <textarea
              className="w-full h-full min-h-[500px] bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface-variant placeholder:text-outline-variant p-0 resize-none selection:bg-primary-container selection:text-on-primary-container leading-relaxed outline-none"
              placeholder="Start writing your thoughts here..."
              defaultValue="The Q4 strategy focuses on expanding our market share in the enterprise productivity sector by leveraging MindMeld's unique mental clarity framework. Our primary objectives include:

1. Seamless Cross-Platform Integration: Ensuring the user workspace remains consistent whether on desktop or mobile.
2. AI-Driven Organization: Implementing subtle, invisible categorization that helps users find notes without manual tagging.
3. Corporate Modern Aesthetic: Maintaining a UI that feels reliable, efficient, and professional.

Initial research suggests that a minimalist, high-whitespace environment reduces cognitive load by approximately 24% during long-form drafting sessions. This note serves as the foundation for the upcoming board presentation scheduled for next Thursday."
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
