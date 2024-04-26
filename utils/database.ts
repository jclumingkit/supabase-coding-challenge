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
      city_table: {
        Row: {
          city_country_id: string
          city_id: string
          city_name: string
        }
        Insert: {
          city_country_id: string
          city_id?: string
          city_name: string
        }
        Update: {
          city_country_id?: string
          city_id?: string
          city_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_table_city_country_id_fkey"
            columns: ["city_country_id"]
            isOneToOne: false
            referencedRelation: "country_table"
            referencedColumns: ["country_id"]
          },
        ]
      }
      country_table: {
        Row: {
          country_id: string
          country_name: string
        }
        Insert: {
          country_id?: string
          country_name: string
        }
        Update: {
          country_id?: string
          country_name?: string
        }
        Relationships: []
      }
      listing_table: {
        Row: {
          listing_date_created: string
          listing_date_updated: string | null
          listing_id: string
          listing_name: string
          listing_product_id: string
          listing_vendor_id: string
        }
        Insert: {
          listing_date_created?: string
          listing_date_updated?: string | null
          listing_id?: string
          listing_name: string
          listing_product_id: string
          listing_vendor_id: string
        }
        Update: {
          listing_date_created?: string
          listing_date_updated?: string | null
          listing_id?: string
          listing_name?: string
          listing_product_id?: string
          listing_vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_table_listing_product_id_fkey"
            columns: ["listing_product_id"]
            isOneToOne: false
            referencedRelation: "product_table"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "listing_table_listing_vendor_id_fkey"
            columns: ["listing_vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_table"
            referencedColumns: ["vendor_id"]
          },
        ]
      }
      location_table: {
        Row: {
          location_city_id: string
          location_id: string
          location_name: string
        }
        Insert: {
          location_city_id: string
          location_id?: string
          location_name: string
        }
        Update: {
          location_city_id?: string
          location_id?: string
          location_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_table_location_city_id_fkey"
            columns: ["location_city_id"]
            isOneToOne: false
            referencedRelation: "city_table"
            referencedColumns: ["city_id"]
          },
        ]
      }
      product_table: {
        Row: {
          product_date_created: string
          product_date_updated: string | null
          product_id: string
          product_name: string
        }
        Insert: {
          product_date_created?: string
          product_date_updated?: string | null
          product_id?: string
          product_name: string
        }
        Update: {
          product_date_created?: string
          product_date_updated?: string | null
          product_id?: string
          product_name?: string
        }
        Relationships: []
      }
      question_table: {
        Row: {
          question_date_created: string
          question_date_updated: string | null
          question_description: string
          question_expected_response: string
          question_id: string
          question_title: string
        }
        Insert: {
          question_date_created?: string
          question_date_updated?: string | null
          question_description: string
          question_expected_response: string
          question_id?: string
          question_title: string
        }
        Update: {
          question_date_created?: string
          question_date_updated?: string | null
          question_description?: string
          question_expected_response?: string
          question_id?: string
          question_title?: string
        }
        Relationships: []
      }
      response_table: {
        Row: {
          response_id: string
          response_question_id: string
          response_user_id: string
          response_value: string
        }
        Insert: {
          response_id?: string
          response_question_id: string
          response_user_id: string
          response_value: string
        }
        Update: {
          response_id?: string
          response_question_id?: string
          response_user_id?: string
          response_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "response_table_response_question_id_fkey"
            columns: ["response_question_id"]
            isOneToOne: false
            referencedRelation: "question_table"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "response_table_response_user_id_fkey"
            columns: ["response_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_table: {
        Row: {
          vendor_date_created: string
          vendor_date_updated: string | null
          vendor_id: string
          vendor_location_id: string
          vendor_name: string
        }
        Insert: {
          vendor_date_created?: string
          vendor_date_updated?: string | null
          vendor_id?: string
          vendor_location_id: string
          vendor_name: string
        }
        Update: {
          vendor_date_created?: string
          vendor_date_updated?: string | null
          vendor_id?: string
          vendor_location_id?: string
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_table_vendor_location_id_fkey"
            columns: ["vendor_location_id"]
            isOneToOne: false
            referencedRelation: "location_table"
            referencedColumns: ["location_id"]
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
