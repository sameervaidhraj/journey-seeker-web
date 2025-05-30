export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          category: string
          created_at: string | null
          description: string
          discount: number | null
          highlight: string | null
          id: string
          image_url: string | null
          limited: boolean | null
          original_price: string | null
          price: string
          title: string
          updated_at: string | null
          validity: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          discount?: number | null
          highlight?: string | null
          id?: string
          image_url?: string | null
          limited?: boolean | null
          original_price?: string | null
          price: string
          title: string
          updated_at?: string | null
          validity?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          discount?: number | null
          highlight?: string | null
          id?: string
          image_url?: string | null
          limited?: boolean | null
          original_price?: string | null
          price?: string
          title?: string
          updated_at?: string | null
          validity?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string | null
          description: string
          duration: string
          id: string
          image_url: string
          price: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          duration: string
          id?: string
          image_url: string
          price: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          duration?: string
          id?: string
          image_url?: string
          price?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pending_actions: {
        Row: {
          action_data: Json
          action_type: string
          created_at: string | null
          id: string
          record_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action_data: Json
          action_type: string
          created_at?: string | null
          id?: string
          record_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action_data?: Json
          action_type?: string
          created_at?: string | null
          id?: string
          record_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_actions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      special_offers: {
        Row: {
          category: string
          created_at: string
          description: string
          discount: number | null
          highlight: string | null
          id: string
          limited: boolean | null
          original_price: string | null
          price: string
          title: string
          updated_at: string
          validity: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          discount?: number | null
          highlight?: string | null
          id?: string
          limited?: boolean | null
          original_price?: string | null
          price: string
          title: string
          updated_at?: string
          validity?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          discount?: number | null
          highlight?: string | null
          id?: string
          limited?: boolean | null
          original_price?: string | null
          price?: string
          title?: string
          updated_at?: string
          validity?: string | null
        }
        Relationships: []
      }
      travel_packages: {
        Row: {
          created_at: string
          description: string
          duration: string
          id: string
          image_url: string
          price: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          duration: string
          id?: string
          image_url: string
          price: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: string
          id?: string
          image_url?: string
          price?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "super_admin" | "admin" | "editor" | "viewer"
      user_status: "active" | "pending" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["super_admin", "admin", "editor", "viewer"],
      user_status: ["active", "pending", "suspended"],
    },
  },
} as const
