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
  // Use a ref to store the listener handle
  const listenerRef = useRef<PluginListenerHandle | null>(null);

  useEffect(() => {
    // Define an async function to set up the listener
    const setupListener = async () => {
      // Await the promise to get the listener handle
      const listenerHandle = await CapacitorApp.addListener("backButton", () => {
        if (window.history.length <= 1 || pathname === initialPathRef.current) {
          CapacitorApp.exitApp();
        } else {
          router.back();
        }
      });
      // Store the handle in the ref so we can access it later for cleanup
      listenerRef.current = listenerHandle;
    };

    setupListener();

    return () => {
      // Check if the handle exists before trying to remove the listener
      if (listenerRef.current) {
        listenerRef.current.remove();
      }
    };
  }, [router, pathname]);

  return null;
}