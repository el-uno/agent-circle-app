"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  clearSession,
  getStoredSession,
  signInWithSolana,
  type SiwsSession,
} from "@/lib/auth";

export function useSiws() {
  const { publicKey, signMessage, connected } = useWallet();
  const wallet = publicKey?.toBase58() ?? null;
  const [session, setSession] = useState<SiwsSession | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSession(wallet ? getStoredSession(wallet) : null);
  }, [wallet]);

  const verify = useCallback(async () => {
    if (!wallet || !signMessage) {
      setError("This wallet does not support message signing.");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      setSession(await signInWithSolana(wallet, signMessage));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setVerifying(false);
    }
  }, [wallet, signMessage]);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  return { connected, wallet, session, verify, verifying, error, signOut };
}
