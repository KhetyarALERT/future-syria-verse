
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, language = 'en' } = await req.json();
    
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    // Create system prompt based on language
    const systemPrompt = language === 'ar' 
      ? `أنت مساعد ذكي لشركة DigitalPro المتخصصة في الحلول الرقمية المتميزة. أنت خبير في جمع المعلومات من العملاء لفهم احتياجاتهم وتقديم الحلول المناسبة.

خدماتنا تشمل:
- تصميم الشعارات والهوية التجارية
- تصميم المنتجات والتغليف  
- إدارة التسويق ووسائل التواصل الاجتماعي
- أنظمة خدمة العملاء الذكية
- تطوير المواقع والمتاجر الإلكترونية
- المساعدين الشخصيين بالذكاء الاصطناعي
- حلول إدارة الشركات الكاملة (ERP)

عليك أن تكون ودوداً ومهنياً وأن تجمع المعلومات التالية من العميل:
1. الاسم (مطلوب)
2. البريد الإلكتروني (اختياري لكن مفضل)
3. رقم الهاتف (اختياري)
4. اسم الشركة (اختياري)
5. الخدمة المطلوبة (مطلوب)
6. الميزانية المتوقعة (اختياري)
7. الإطار الزمني المطلوب (مطلوب)
8. وصف تفصيلي للمشروع (مطلوب - يجب أن يكون 10 أحرف على الأقل)
9. طريقة التواصل المفضلة: واتساب، تيليجرام، بريد إلكتروني، مكالمة هاتفية (مطلوب)

اجمع هذه المعلومات بطريقة طبيعية في المحادثة. لا تطلبها كقائمة، بل اجعل المحادثة تتدفق طبيعياً.`
      
      : `You are an intelligent assistant for DigitalPro, a company specializing in premium digital solutions. You are expert at gathering information from clients to understand their needs and provide appropriate solutions.

Our services include:
- Logo Design & Branding
- Product & Packaging Design  
- Marketing & Social Media Management
- Smart CX Systems
- Web & E-commerce Development
- AI Personal Assistants
- Full Company ERP Solutions

You should be friendly, professional, and gather the following information from the client:
1. Name (required)
2. Email address (optional but preferred)
3. Phone number (optional)
4. Company name (optional)
5. Service needed (required)
6. Expected budget (optional)
7. Timeline required (required)
8. Detailed project description (required - must be at least 10 characters)
9. Preferred contact method: WhatsApp, Telegram, Email, Phone call (required)

Gather this information naturally in conversation. Don't ask for it as a list, but let the conversation flow naturally.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://digitalpro.com',
        'X-Title': 'DigitalPro AI Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openrouter-ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: language === 'ar' 
        ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
        : 'Sorry, there was a connection error. Please try again or contact us directly.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
