"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js"
import { useEffect } from "react"

const AUTH_CACHE_KEY = "supabase-auth-user"

async function fetchUser(): Promise<User | null> {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return user
}

export function useAuth() {
    const {
        data: user,
        error,
        isLoading,
        mutate,
    } = useSWR<User | null>(AUTH_CACHE_KEY, fetchUser, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // Dedupe requests for 1 minute
    })

    useEffect(() => {
        const supabase = createClient()

        // Listen for auth changes and update cache
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            mutate(session?.user ?? null, false)
        })

        return () => subscription.unsubscribe()
    }, [mutate])

    return {
        user: user ?? null,
        isLoading,
        error,
        mutate,
    }
}
