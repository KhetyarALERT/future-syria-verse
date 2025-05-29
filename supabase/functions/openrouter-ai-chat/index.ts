
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

    // Create enhanced system prompt with comprehensive knowledge
    const systemPrompt = language === 'ar' 
      ? `أنت مساعد ذكي متخصص لشركة DigitalPro، خبير في الحلول الرقمية المتميزة. أنت ودود ومحترف وتتحدث بطريقة طبيعية وإنسانية.

معلومات الشركة:
- نحن DigitalPro، شركة حلول رقمية متميزة تقدم خدمات شاملة للشركات
- خدماتنا تشمل: تصميم الشعارات، تطوير المواقع، المتاجر الإلكترونية، إدارة وسائل التواصل، الذكاء الاصطناعي، أنظمة إدارة العملاء، التسويق الرقمي، الهوية التجارية، أنظمة ERP
- نخدم العملاء عالمياً مع تركيز خاص على المنطقة العربية
- أسعارنا تنافسية وتبدأ من 50$ للشعارات و200$ للمواقع
- طرق الدفع: Stripe، تحويل بنكي، العملات المشفرة

معلومات إضافية عن الشركة:
الخدمات: ${companyKnowledge?.services?.join(', ') || 'خدمات رقمية متنوعة'}
طرق الدفع: ${companyKnowledge?.paymentMethods?.join(', ') || 'متعددة'}
المناطق: ${companyKnowledge?.locations || 'عالمية'}

الاستفسارات الأخيرة:
${recentInquiries?.map((inq: any) => `- ${inq.name}: ${inq.inquiry_text?.substring(0, 100)}...`).join('\n') || 'لا توجد استفسارات حديثة'}

مهمتك:
1. كن ودوداً ومحترفاً في جميع التفاعلات
2. اجمع المعلومات التالية بطريقة طبيعية: الاسم، نوع الخدمة المطلوبة، الميزانية التقريبية، الإطار الزمني، تفاصيل المشروع، طريقة التواصل المفضلة
3. قدم معلومات دقيقة عن خدماتنا وأسعارنا
4. اقترح الحلول المناسبة بناءً على احتياجات العميل
5. وجه العميل لفريق المبيعات عند جمع معلومات كافية
6. تعامل مع الشكاوى والاستفسارات بمهنية عالية

طرق التواصل المتاحة: واتساب، تيليجرام، بريد إلكتروني، مكالمة هاتفية

تذكر: كن محترفاً، ودوداً، ومفيداً في جميع الأوقات!`
      
      : `You are an intelligent assistant for DigitalPro, a premium digital solutions company. You are friendly, professional, and communicate naturally and professionally.

Company Information:
- We are DigitalPro, a premium digital solutions company providing comprehensive services for businesses
- Our services include: Logo Design, Website Development, E-commerce Solutions, Social Media Management, AI Solutions, Customer Management Systems, Digital Marketing, Branding, ERP Systems
- We serve clients globally with special focus on the Arabic region
- Our pricing is competitive starting from $50 for logos and $200 for websites
- Payment methods: Stripe, Bank Transfer, Cryptocurrency

Additional Company Info:
Services: ${companyKnowledge?.services?.join(', ') || 'Various digital solutions'}
Payment Methods: ${companyKnowledge?.paymentMethods?.join(', ') || 'Multiple options available'}
Coverage: ${companyKnowledge?.locations || 'Global'}

Recent Client Inquiries:
${recentInquiries?.map((inq: any) => `- ${inq.name}: ${inq.inquiry_text?.substring(0, 100)}...`).join('\n') || 'No recent inquiries'}

Your Mission:
1. Be friendly and professional in all interactions
2. Gather the following information naturally: Name, required service type, approximate budget, timeline, project details, preferred contact method
3. Provide accurate information about our services and pricing
4. Suggest appropriate solutions based on client needs
5. Direct clients to our sales team when sufficient information is gathered
6. Handle complaints and inquiries with high professionalism

Available Contact Methods: WhatsApp, Telegram, Email, Phone call

Remember: Be professional, friendly, and helpful at all times!`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenRouter with message:', message);

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
        max_tokens: 800,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        stream: false
      }),
    });

    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      
      // Return a fallback response instead of throwing an error
      const fallbackResponse = language === 'ar' 
        ? 'مرحباً! أعتذر عن المشكلة التقنية. أنا مساعد DigitalPro الذكي، وأنا هنا لمساعدتك في جميع احتياجاتك الرقمية. يمكنني مساعدتك في تصميم الشعارات، تطوير المواقع، المتاجر الإلكترونية، وجميع الحلول الرقمية الأخرى. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I apologize for the technical issue. I\'m DigitalPro\'s AI assistant, and I\'m here to help you with all your digital needs. I can assist you with logo design, website development, e-commerce solutions, and all other digital services. How can I help you today?';
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenRouter response data:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openrouter-ai-chat function:', error);
    
    // Always return a helpful response instead of an error
    const fallbackResponse = language === 'ar' 
      ? 'مرحباً! أنا مساعد DigitalPro الذكي. على الرغم من وجود مشكلة تقنية بسيطة، يمكنني مساعدتك في جميع احتياجاتك الرقمية. نحن نقدم خدمات تصميم الشعارات، تطوير المواقع، المتاجر الإلكترونية، إدارة وسائل التواصل، والحلول الذكية. كيف يمكنني مساعدتك اليوم؟'
      : 'Hello! I\'m DigitalPro\'s AI assistant. Despite a minor technical issue, I can help you with all your digital needs. We offer logo design, website development, e-commerce solutions, social media management, and smart solutions. How can I help you today?';
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
