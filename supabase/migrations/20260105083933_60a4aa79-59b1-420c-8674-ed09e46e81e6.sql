-- Create forklifts table for admin management
CREATE TABLE public.forklifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'electric',
  capacity TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_weekly DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_biweekly DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
  eco_friendly BOOLEAN NOT NULL DEFAULT true,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.forklifts ENABLE ROW LEVEL SECURITY;

-- Public read access for marketplace
CREATE POLICY "Anyone can view available forklifts"
ON public.forklifts FOR SELECT
USING (is_available = true);

-- Admin full access
CREATE POLICY "Admins can manage all forklifts"
ON public.forklifts FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_forklifts_updated_at
  BEFORE UPDATE ON public.forklifts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial forklift data
INSERT INTO public.forklifts (name, type, capacity, description, image_url, price_weekly, price_biweekly, price_monthly, eco_friendly) VALUES
('Reach Truck SRX14/16', 'electric', '1,400 - 1,600 kg', 'Pedestrian-operated reach truck. Zero-emission electric, ideal for warehouse operations at 600mm load center.', '/forklift-1.jpg', 5500, 10000, 17000, true),
('Forklift S20-35', 'lpg', '2,000 - 3,500 kg', 'Diesel or LPG drive forklift with superelastic or pneumatic tyres. Versatile for indoor/outdoor use at 500mm LC.', '/forklift-2.jpg', 6500, 12000, 20000, true),
('Electric Stacker WSX12/14', 'electric', '1,200 - 1,400 kg', 'Pedestrian-operated electric stacker. Zero emissions for a cleaner, quieter workplace environment.', '/forklift-3.jpg', 4000, 7500, 13000, true),
('Li-ion Hand Pallet Truck WPio12', 'electric', '1,200 kg', 'Lithium-ion powered pedestrian pallet truck. Eco-friendly, low maintenance, and highly efficient.', '/forklift-4.jpg', 3000, 5500, 9500, true),
('Electric 3-Wheel GTX16-20s', 'electric', '1,600 - 2,000 kg', 'Li-ion Clark electric three-wheel forklift with superelastic tyres. Excellent maneuverability at 500mm LC.', '/forklift-5.jpg', 5000, 9500, 16000, true),
('Electric Stacker WSX12/14 Pro', 'electric', '1,200 - 1,400 kg', 'Advanced pedestrian-operated stacker with enhanced lifting capability. Perfect for tight spaces.', '/forklift-6.jpg', 4500, 8500, 14500, true);