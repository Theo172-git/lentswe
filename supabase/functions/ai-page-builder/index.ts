import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, currentBlocks, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI assistant that helps build web pages using a visual page builder. You can suggest and generate page sections/blocks.

Available block types:
- hero: Full-width hero banner with title, subtitle, and CTA buttons
- hero-split: Hero with image on one side and content on other
- hero-video: Hero with video background
- features-grid: Grid of feature cards with icons
- features-list: Vertical list of features
- features-icons: Simple icon-based feature highlights
- cta-banner: Full-width call-to-action banner
- cta-split: CTA with image and content side by side
- testimonials-carousel: Rotating testimonials slider
- testimonials-grid: Grid layout of testimonial cards
- team-grid: Grid of team member cards
- team-carousel: Sliding team member showcase
- gallery-grid: Grid-based image gallery
- gallery-masonry: Pinterest-style masonry layout
- pricing-table: Comparison pricing table
- pricing-cards: Card-style pricing display
- contact-form: Simple contact form
- contact-split: Contact form with info sidebar
- faq-accordion: Expandable FAQ section
- content-text: Rich text content block
- content-image: Image with caption
- content-video: Video embed
- stats-counter: Animated statistics
- stats-grid: Grid of stat cards
- logos-carousel: Client/partner logo carousel
- logos-grid: Grid of logos
- header: Site header/navigation
- footer: Site footer
- divider: Section divider
- spacer: Vertical spacing

When the user asks to create or modify a page, respond with a JSON object containing:
{
  "blocks": [array of block objects],
  "message": "explanation of what you created"
}

Each block object should have:
{
  "id": "block-{timestamp}",
  "type": "block-type",
  "content": { ...block-specific content },
  "styles": { ...optional styles },
  "order": number
}

For content fields, use realistic placeholder text that matches the user's industry/context.

Current page blocks: ${JSON.stringify(currentBlocks || [])}

Action requested: ${action || 'create'}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";

    // Try to parse JSON from the response
    let parsedResponse;
    try {
      // Find JSON in the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = { message: aiResponse, blocks: [] };
      }
    } catch {
      parsedResponse = { message: aiResponse, blocks: [] };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI page builder error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});