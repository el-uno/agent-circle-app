"use client";

import dynamic from "next/dynamic";

export const WalletButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  {
    ssr: false,
    loading: () => (
      <div className="h-9 w-[150px] rounded-full border border-white/10" aria-hidden="true" />
    ),
  }
);
