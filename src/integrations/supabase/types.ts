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
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          inquiry_id: string | null
          is_read: boolean
          message: string
          notification_type: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          is_read?: boolean
          message: string
          notification_type?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          is_read?: boolean
          message?: string
          notification_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          inquiry_id: string | null
          messages: Json | null
          session_id: string
          updated_at: string
          user_data: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          messages?: Json | null
          session_id: string
          updated_at?: string
          user_data?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          inquiry_id?: string | null
          messages?: Json | null
          session_id?: string
          updated_at?: string
          user_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          contact_preference_details: string | null
          created_at: string
          email: string
          id: string
          inquiry_text: string
          inquiry_type: Database["public"]["Enums"]["inquiry_type"]
          language: string
          metadata: Json | null
          name: string
          phone: string | null
          preferred_contact_method: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
        }
        Insert: {
          contact_preference_details?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_text: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"]
          language?: string
          metadata?: Json | null
          name: string
          phone?: string | null
          preferred_contact_method?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Update: {
          contact_preference_details?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_text?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"]
          language?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          preferred_contact_method?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Relationships: []
      }
      service_examples: {
        Row: {
          content: Json
          created_at: string
          example_type: string
          id: string
          language: string
          service_type: string
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          example_type: string
          id?: string
          language?: string
          service_type: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          example_type?: string
          id?: string
          language?: string
          service_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          created_at: string
          description: string | null
          id: string
          inquiry_id: string | null
          priority: string | null
          reason: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          inquiry_id?: string | null
          priority?: string | null
          reason: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          inquiry_id?: string | null
          priority?: string | null
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_requests_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      inquiry_status: "new" | "in_progress" | "resolved" | "closed"
      inquiry_type:
        | "service_inquiry"
        | "support_request"
        | "complaint"
        | "suggestion"
        | "general"
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
      inquiry_status: ["new", "in_progress", "resolved", "closed"],
      inquiry_type: [
        "service_inquiry",
        "support_request",
        "complaint",
        "suggestion",
        "general",
      ],
    },
  },
} as const
