// Tipos manuais para as tabelas em supabase/migrations/0001_init.sql.
// Se preferir, troque por tipos gerados com:
//   supabase gen types typescript --project-id <id> > lib/supabase/types.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          panda_video_id: string | null;
          hubla_product_id: string | null;
          clone_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          panda_video_id?: string | null;
          hubla_product_id?: string | null;
          clone_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          panda_video_id?: string | null;
          hubla_product_id?: string | null;
          clone_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      product_access: {
        Row: {
          id: string;
          profile_id: string;
          product_id: string;
          source: string;
          hubla_transaction_id: string | null;
          granted_at: string;
          revoked_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          product_id: string;
          source?: string;
          hubla_transaction_id?: string | null;
          granted_at?: string;
          revoked_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          profile_id?: string;
          product_id?: string;
          source?: string;
          hubla_transaction_id?: string | null;
          granted_at?: string;
          revoked_at?: string | null;
          completed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
