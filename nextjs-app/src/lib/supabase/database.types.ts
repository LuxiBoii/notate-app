// lib/supabase/database.types.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      workspaces: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          owner_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          owner_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          owner_id?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          created_at: string
          role: 'owner' | 'editor' | 'viewer'
        }
        Insert: {
          workspace_id: string
          user_id: string
          created_at?: string
          role?: 'owner' | 'editor' | 'viewer'
        }
        Update: {
          workspace_id?: string
          user_id?: string
          created_at?: string
          role?: 'owner' | 'editor' | 'viewer'
        }
      }
      note_groups: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          workspace_id: string
          parent_group_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          workspace_id: string
          parent_group_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          workspace_id?: string
          parent_group_id?: string | null
        }
      }
      notes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: Json
          group_id: string | null
          workspace_id: string
          is_pinned: boolean
          is_public: boolean
          public_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content?: Json
          group_id?: string | null
          workspace_id: string
          is_pinned?: boolean
          is_public?: boolean
          public_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: Json
          group_id?: string | null
          workspace_id?: string
          is_pinned?: boolean
          is_public?: boolean
          public_url?: string | null
        }
      }
    }
  }
}