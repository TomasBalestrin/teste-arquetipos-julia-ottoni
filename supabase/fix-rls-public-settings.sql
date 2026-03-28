-- Fix: permitir leitura pública de configurações não-sensíveis
-- Executar no SQL Editor do Supabase

CREATE POLICY "site_settings_select_public"
ON site_settings FOR SELECT
USING (key IN ('facebook_pixel_id', 'checkout_url'));
