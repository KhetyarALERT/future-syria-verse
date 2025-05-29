
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, language = 'en', companyKnowledge, recentInquiries } = await req.json();
    
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    // Create enhanced system prompt with Supabase knowledge
    const systemPrompt = language === 'ar' 
      ? `أنت مساعد ذكي متخصص لشركة DigitalPro، خبير في الحلول الرقمية المتميزة. أنت ودود ومحترف وتتحدث بطريقة طبيعية وإنسانية.

معلومات الشركة المحدثة:
خدماتنا: ${companyKnowledge?.services?.join(', ') || 'خدمات رقمية متنوعة'}
طرق الدفع: ${companyKnowledge?.paymentMethods?.join(', ') || 'متعددة'}
المناطق: ${companyKnowledge?.locations || 'عالمية'}

الاستفسارات الأخيرة من العملاء:
${recentInquiries?.map((inq: any) => `- ${inq.name}: ${inq.inquiry_text?.substring(0, 100)}...`).join('\n') || 'لا توجد استفسارات حديثة'}

مهمتك:
1. تحدث بطريقة طبيعية وودودة كمحترف متخصص
2. اجمع المعلومات بذكاء خلال المحادثة الطبيعية
3. المعلومات المطلوبة: الاسم، الخدمة، الميزانية، الإطار الزمني، وصف المشروع، طريقة التواصل المفضلة
4. اطرح أسئلة ذكية بناءً على إجابات العميل
5. قدم اقتراحات مفيدة بناءً على خبرتك
6. اربط العميل بفريق المبيعات عند جمع معلومات كافية

طرق التواصل المتاحة: واتساب، تيليجرام، بريد إلكتروني، مكالمة هاتفية

تذكر: كن محترفاً وودوداً واجعل المحادثة تبدو طبيعية!`
      
      : `You are an intelligent assistant for DigitalPro, a premium digital solutions company. You're friendly, professional, and speak naturally like a human expert.

Updated Company Information:
Services: ${companyKnowledge?.services?.join(', ') || 'Various digital solutions'}
Payment Methods: ${companyKnowledge?.paymentMethods?.join(', ') || 'Multiple options available'}
Coverage: ${companyKnowledge?.locations || 'Global'}

Recent Client Inquiries:
${recentInquiries?.map((inq: any) => `- ${inq.name}: ${inq.inquiry_text?.substring(0, 100)}...`).join('\n') || 'No recent inquiries'}

Your Mission:
1. Speak naturally and friendly as a professional expert
2. Intelligently gather information through natural conversation flow
3. Required info: Name, service needed, budget, timeline, project description, preferred contact method
4. Ask smart follow-up questions based on client responses
5. Provide helpful suggestions based on your expertise
6. Connect client to sales team when sufficient information is gathered

Available Contact Methods: WhatsApp, Telegram, Email, Phone call

Remember: Be professional, friendly, and make the conversation feel natural and human-like!`;

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
        temperature: 0.8,
        max_tokens: 600,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
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
