"use client";
import { Button } from '@/components/ui/button';
import { Icons } from '@/config/siteConfig';
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [isAllowlisted, setIsAllowlisted] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "allowlist" | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const fetchPlayers = async () => {
      try {
        const res = await fetch('/api/fivem/players');
        const data = await res.json();
        if (data && data.Data) {
          setPlayerCount(data.Data.clients);
          setMaxPlayers(data.Data.sv_maxclients);
        }
      } catch (e) {
        console.error("Failed to fetch player count", e);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkRole = async () => {
      if (session?.user) {
        try {
          // appending a timestamp to prevent browser-level caching
          const res = await fetch(`/api/user/role?t=${Date.now()}`);
          const data = await res.json();
          setIsAllowlisted(data.isAllowlisted);
        } catch (e) {
          console.error("Failed to check role", e);
        }
      }
    };

    if (session?.user) {
      checkRole();
      interval = setInterval(checkRole, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session]);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {/* Background: static cinematic image with dark-to-red overlay */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-75"
          style={{
            backgroundImage:
              "url('https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/ChatGPTImageMar11202609_39_13PM.png')",
          }}
        />
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        >
          <source src="https://files.catbox.moe/fc733s.mp4" type="video/mp4" />
        </video>
        {/* Overlay: keep dark focus on left, no red tint on right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <section className="relative min-h-screen flex items-center">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 py-24 flex flex-col lg:flex-row items-center lg:items-center">
          {/* Left column: copy + CTA */}
          <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-left">
            <p className="text-sm sm:text-base tracking-[0.25em] text-foreground/70 uppercase">
              Welcome to
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#0c0c18] to-foreground">
              India Town Roleplay
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-lg">
              A high-intensity survival roleplay experience set in a collapsing city. Forge alliances, make impossible choices,
              and carve your legacy out of the chaos.
            </p>

            <div className="mt-8 flex flex-row items-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!session?.user) {
                    setModalType("login");
                    setIsModalOpen(true);
                  } else if (isAllowlisted === false) {
                    setModalType("allowlist");
                    setIsModalOpen(true);
                  } else if (isAllowlisted === true) {
                    window.location.href = "fivem://connect/ma4erd";
                  }
                }}
                className="relative flex items-center justify-center bg-[#11141e] text-white px-8 py-3.5 rounded-xl font-bold tracking-wider transition-transform hover:scale-105 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                style={{
                  boxShadow: "inset 0 0 0 2px transparent",
                  background: "linear-gradient(#11141e, #11141e) padding-box, linear-gradient(to right, #ef4444, #7f1d1d) border-box",
                  border: "2px solid transparent"
                }}
              >
                <span className="relative flex items-center z-10 text-base sm:text-lg">
                  PLAY <span className="ml-2 font-black text-xl leading-none">›</span>
                </span>
              </button>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/5 text-gray-200">
                <Icons.joinDiscord className="w-5 h-5 opacity-80" />
                <span className="font-bold tracking-widest text-base sm:text-lg">
                  {playerCount}/{maxPlayers}
                </span>
              </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-md border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-center">
                    {modalType === "login" ? "Authentication Required" : "Whitelist Required"}
                  </DialogTitle>
                  <DialogDescription className="text-center pt-2">
                    {modalType === "login"
                      ? "You must be signed in to play India Town Roleplay. Please sign in with Discord to continue."
                      : "You must be whitelisted to join the server. Please apply for the whitelist first."}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                  {modalType === "login" ? (
                    <Button
                      onClick={() => signIn("discord", { callbackUrl: "/" })}
                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white gap-2 w-full py-6"
                    >
                      <Icons.loginDiscord className="w-5 h-5" />
                      Sign In with Discord
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsModalOpen(false);
                        router.push("/applications");
                      }}
                      className="bg-red-600 hover:bg-red-500 text-white gap-2 w-full py-6"
                    >
                      Apply for Whitelist
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right spacer to mimic composition (image is handled by background) */}
          <div className="hidden lg:block w-1/2" />
        </div>

        {/* Scroll Indicator - Three Downward Chevrons */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-[2px] animate-pulse">
          {/* Top arrow - darkest */}
          <svg
            className="w-6 h-6 text-red-900 drop-shadow-[0_0_8px_rgba(127,29,29,0.8)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {/* Middle arrow - lighter */}
          <svg
            className="w-6 h-6 text-red-700 drop-shadow-[0_0_8px_rgba(185,28,28,0.8)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {/* Bottom arrow - lightest */}
          <svg
            className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>
    </>
  );
}
// Note for AI: The Image component used for background is a placeholder for a looping video.
// The "filter blur-sm brightness-50" classes are to simulate the video effect.
