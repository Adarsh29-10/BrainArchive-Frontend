import { useAuth0 } from "@auth0/auth0-react";
import { Mail, Copy, Check, ShieldCheck, UserRound, CalendarDays, AtSign } from "lucide-react";
import { useState } from "react";
import { LoadingState } from "../../../shared/ui/LoaderStates";
import LogoutButton from "../../../shared/ui/LogoutButton";

function ProfilePage() {
  const { user, isLoading } = useAuth0();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <LoadingState message="Loading profile..." fullScreen={true} />;
  }

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const joinedDate = user?.updated_at
    ? new Date(user.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-8 lg:px-16 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="h-24 bg-gradient-to-r from-emerald-700/25 via-zinc-800 to-zinc-900 sm:h-28" />
          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="h-24 w-24 rounded-2xl border-4 border-zinc-900 bg-zinc-800 object-cover shadow-lg sm:h-28 sm:w-28"
                />
                <div className="pb-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Account</p>
                  <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{user?.name || "Unnamed user"}</h1>
                  <p className="mt-1 text-sm text-zinc-400">{user?.email || "No email available"}</p>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
                <ShieldCheck size={14} className={user?.email_verified ? "text-emerald-400" : "text-yellow-400"} />
                {user?.email_verified ? "Verified account" : "Verification pending"}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="mb-2 inline-flex items-center gap-1 text-xs uppercase tracking-wide text-zinc-500">
              <AtSign size={13} />
              Nickname
            </p>
            <p className="truncate text-sm font-medium text-zinc-200">{user?.nickname || "Not provided"}</p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="mb-2 inline-flex items-center gap-1 text-xs uppercase tracking-wide text-zinc-500">
              <CalendarDays size={13} />
              Account Activity
            </p>
            <p className="text-sm font-medium text-zinc-200">{joinedDate}</p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:col-span-2 lg:col-span-1">
            <p className="mb-2 inline-flex items-center gap-1 text-xs uppercase tracking-wide text-zinc-500">
              <UserRound size={13} />
              User ID
            </p>
            <p className="truncate font-mono text-xs text-zinc-300 sm:text-sm">{user?.sub || "N/A"}</p>
          </article>
        </section>

        <section className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-zinc-100">Account details</h2>
          <p className="mt-1 text-sm text-zinc-400">This section contains your current sign-in identity information.</p>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500">
                <Mail size={14} />
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm text-zinc-100">{user?.email || "No email available"}</span>
                <button
                  onClick={handleCopyEmail}
                  className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={17} className="text-emerald-400" /> : <Copy size={17} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-5">
            <LogoutButton />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
