"use client";

import { useEffect, useRef } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { PluginListenerHandle } from '@capacitor/core';

export default function BackButtonHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const initialPathRef = useRef(pathname);
  const currentPathRef = useRef(pathname);
  // Use a ref to store the listener handle
  const listenerRef = useRef<PluginListenerHandle | null>(null);

  // Keep the current pathname in a ref so the single listener reads the latest value
  useEffect(() => {
    currentPathRef.current = pathname;
  }, [pathname]);

  // Register the backButton listener once on mount. The listener reads currentPathRef
  useEffect(() => {
    const setupListener = async () => {
      const listenerHandle = await CapacitorApp.addListener("backButton", () => {
        const currentPath = currentPathRef.current;
        if (window.history.length <= 1 || currentPath === initialPathRef.current) {
          CapacitorApp.exitApp();
        } else {
          router.back();
        }
      });

      listenerRef.current = listenerHandle;
    };

    setupListener();

    return () => {
      if (listenerRef.current) {
        listenerRef.current.remove();
        listenerRef.current = null;
      }
    };
  }, []);

  return null;
}