import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ArrowRight, BookOpen, Brain, Clock3, Eye, FileCode2, Globe2, NotebookPen, UserRound, WandSparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavbarLandingPage from '../components/NavbarLandingPage';
import { usePublicNotebooks } from '../../notebook/hooks/useNotebooks';

const REAL_FEATURES = [
  {
    Icon: NotebookPen,
    title: 'Block-first notebook editor',
    description: 'Write with headings, paragraphs, bullets, quotes, links, code blocks, images, videos, and dividers in one document flow.',
  },
  {
    Icon: Globe2,
    title: 'Private or public publishing',
    description: 'Each notebook can stay private or be shared publicly through a direct URL for open reading.',
  },
  {
    Icon: Eye,
    title: 'Public reading experience',
    description: 'Public pages show creator identity and created date so readers can trust context before they dive in.',
  },
  {
    Icon: WandSparkles,
    title: 'AI tools roadmap in progress',
    description: 'AI workspace exists and is marked as coming soon. You see product direction transparently, not hidden promises.',
  },
];

function LandingPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { data: publicNotebooks, isLoading } = usePublicNotebooks();

  const liveStats = useMemo(() => {
    const notebooks = publicNotebooks ?? [];
    const notebookCount = notebooks.length;
    const creators = new Set(notebooks.map((n) => (n.ownerName || 'Unknown user').trim())).size;
    const totalBlocks = notebooks.reduce((sum, notebook) => sum + (notebook.blocks?.length || 0), 0);
    const avgBlocks = notebookCount ? Math.round(totalBlocks / notebookCount) : 0;

    return { notebookCount, creators, avgBlocks };
  }, [publicNotebooks]);

  const notebookPreview = useMemo(() => {
    return (publicNotebooks ?? []).slice(0, 3);
  }, [publicNotebooks]);

  return (
    <div className="min-h-screen bg-black text-zinc-100" style={{ fontFamily: "'Space Grotesk', 'Manrope', sans-serif" }}>
      <NavbarLandingPage />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-emerald-900/40 px-4 pb-16 pt-14 sm:px-8 lg:px-16">
        <div className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="mx-auto grid max-w-8xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-emerald-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Real notebooks. Real learning trails.
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
              Your knowledge should be
              <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-300 bg-clip-text text-transparent"> searchable, shareable, and worth revisiting.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              BrainArchive is a focused notebook product for writing structured notes and publishing selected work publicly without changing your core workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/70 bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 sm:w-auto"
                >
                  Open Dashboard
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/70 bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 sm:w-auto"
                >
                  Create Free Account
                  <ArrowRight size={16} />
                </button>
              )}

              <Link
                to="/notebooks"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-emerald-600 hover:text-white sm:w-auto"
              >
                Explore Public Notebooks
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-100">Community Snapshot</p>
              <span className="rounded-full bg-emerald-900/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Live
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[10px] leading-tight uppercase tracking-normal text-zinc-500 sm:text-[11px] sm:tracking-wide">Public notebooks</p>
                <p className="mt-1 text-2xl font-bold text-emerald-300">{isLoading ? '...' : liveStats.notebookCount}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[10px] leading-tight uppercase tracking-normal text-zinc-500 sm:text-[11px] sm:tracking-wide">Creators</p>
                <p className="mt-1 text-2xl font-bold text-zinc-100">{isLoading ? '...' : liveStats.creators}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-[10px] leading-tight uppercase tracking-normal text-zinc-500 sm:text-[11px] sm:tracking-wide">Avg blocks</p>
                <p className="mt-1 text-2xl font-bold text-zinc-100">{isLoading ? '...' : liveStats.avgBlocks}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">How people use BrainArchive</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><BookOpen size={14} className="mt-0.5 shrink-0 text-emerald-300" /> <span>Store class notes and revision summaries</span></li>
                <li className="flex items-start gap-2"><FileCode2 size={14} className="mt-0.5 shrink-0 text-emerald-300" /> <span>Keep code snippets near explanations</span></li>
                <li className="flex items-start gap-2"><Brain size={14} className="mt-0.5 shrink-0 text-emerald-300" /> <span>Build personal knowledge bases over time</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      
      {/* Features */}
      <section className="px-4 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-8xl">
          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Feature reality check</p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">What the BrainArchive actually does today</h2>
            </div>
            <Link to="/notebooks" className="text-sm font-medium text-emerald-300 hover:text-emerald-200 flex justify-center items-center gap-1">
              Open live notebooks <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {REAL_FEATURES.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition hover:-translate-y-0.5 hover:border-emerald-700/70"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-700/40 bg-emerald-900/20">
                  <item.Icon size={20} className="text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Public Notebooks */}
      <section className="border-y border-zinc-900 bg-zinc-950 px-4 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-8xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Recent public notebooks</h2>
          <p className="mt-2 text-zinc-400">A real-time preview from the public feed.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {notebookPreview.length > 0 ? (
              notebookPreview.map((notebook) => (
                <Link
                  key={notebook._id}
                  to={`/public/nb/${notebook._id}`}
                  className="group rounded-xl border border-zinc-800 bg-black p-4 transition hover:border-emerald-700/70"
                >
                  <p className="line-clamp-2 text-lg font-semibold text-zinc-100 group-hover:text-emerald-200">{notebook.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{notebook.description?.trim() || 'No description provided.'}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs text-zinc-500">
                    <span className="inline-flex min-w-0 items-center gap-1"><UserRound size={13} className="shrink-0" /> <span className="truncate">{notebook.ownerName || 'Unknown user'}</span></span>
                    <span className="inline-flex shrink-0 items-center gap-1"><Clock3 size={13} /> {new Date(notebook.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-black p-5 text-sm text-zinc-400 md:col-span-3">
                {isLoading ? 'Loading notebooks...' : 'No public notebooks published yet. Be the first one to share.'}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <section className="px-4 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-8xl flex-col gap-5 rounded-2xl border border-emerald-800/50 bg-gradient-to-br from-emerald-900/20 to-black p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Start now</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Write privately. Publish selectively. Grow your knowledge archive.</h2>
            <p className="mt-2 text-sm text-zinc-300">No gimmicks. Just a clean writing workflow and public sharing when you decide.</p>
          </div>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Go to Dashboard
            </Link>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Sign up free
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
