
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], language = 'en', companyKnowledge, recentInquiries, aiConfig } = await req.json();

    console.log('Received request:', { message, language, companyKnowledge });

    // Enhanced system prompt with comprehensive company knowledge
    const systemPrompt = `You are an intelligent AI assistant for DigitalPro, a premium digital solutions company. You are bilingual (English/Arabic) and provide expert guidance on digital services.

**COMPANY OVERVIEW:**
DigitalPro is a leading digital solutions provider specializing in:
- Logo Design (from $50) - Premium brand identities
- Website Development (from $200) - Modern responsive websites  
- E-commerce Solutions (from $500) - Complete online stores
- Social Media Management ($300/month) - Full social presence
- Digital Marketing (from $400) - ROI-focused campaigns
- Smart CX Systems (from $800) - AI customer experience
- Personal AI Assistants (from $600) - Business automation
- ERP Solutions (from $1200) - Enterprise systems

**YOUR ROLE:**
- Understand client needs and recommend appropriate services
- Provide detailed information about our offerings
- Generate qualified leads and gather requirements
- Schedule consultations and provide quotes
- Handle customer support inquiries professionally

**CONVERSATION GUIDELINES:**
1. Always be professional, friendly, and helpful
2. Ask clarifying questions to understand client needs
3. Provide specific pricing and service details
4. Offer to schedule consultations for complex projects
5. Handle both English and Arabic seamlessly
6. Use emojis appropriately to enhance communication
7. Provide actionable next steps

**PRICING STRUCTURE:**
- Logo Design: $50-200 (simple to complex)
- Websites: $200-2000+ (landing page to enterprise)
- E-commerce: $500-5000+ (basic to advanced)
- Social Media: $300-800/month (management + ads)
- Marketing: $400-2000+ (campaign complexity)
- Smart CX: $800-3000+ (features and scale)
- AI Assistants: $600-2500+ (complexity)
- ERP: $1200-10000+ (modules and users)

**LANGUAGE ADAPTATION:**
- Respond in the same language as the user
- Arabic responses should be culturally appropriate
- Use professional tone in both languages
- Include relevant cultural context when appropriate

**LEAD QUALIFICATION:**
Always try to gather:
- Company/project type
- Budget range
- Timeline
- Specific requirements
- Contact preferences

Remember: Your goal is to provide exceptional service while generating qualified leads for DigitalPro.`;

    // Prepare conversation context
    const conversationContext = conversationHistory.length > 0 
      ? conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')
      : '';

    // Enhanced context with recent inquiries and service examples
    const contextualInfo = `
Recent client inquiries: ${JSON.stringify(recentInquiries?.slice(0, 5) || [])}
Available services: ${JSON.stringify(companyKnowledge?.services || [])}
Company specialties: ${JSON.stringify(companyKnowledge?.specialties || [])}
`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Context: ${contextualInfo}` },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    console.log('Calling OpenRouter API...');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENROUTER_API_KEY')}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://digitalpro.ai',
        'X-Title': 'DigitalPro AI Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenRouter response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in openrouter-ai-chat function:', error);
    
    // Enhanced fallback response
    const fallbackResponse = language === 'ar' 
      ? `مرحباً! أنا مساعد DigitalPro الذكي. أعتذر عن الخطأ التقني، لكنني هنا لمساعدتك!

🎨 خدماتنا الرئيسية:
• تصميم الشعارات (من 50$) - هويات تجارية مميزة
• تطوير المواقع (من 200$) - مواقع حديثة ومتجاوبة
• المتاجر الإلكترونية (من 500$) - حلول تجارة شاملة
• إدارة وسائل التواصل (300$/شهر) - إدارة كاملة
• التسويق الرقمي (من 400$) - حملات مربحة

💬 كيف يمكنني مساعدتك؟ أخبرني عن:
- نوع المشروع المطلوب
- الميزانية المتاحة
- الجدول الزمني
- أي متطلبات خاصة

أنا هنا لمساعدتك في تحقيق أهدافك الرقمية!`
      : `Hello! I'm DigitalPro's AI assistant. I apologize for the technical issue, but I'm here to help!

🎨 Our Core Services:
• Logo Design (from $50) - Premium brand identities
• Website Development (from $200) - Modern responsive sites
• E-commerce Solutions (from $500) - Complete online stores
• Social Media Management ($300/month) - Full management
• Digital Marketing (from $400) - ROI-focused campaigns

💬 How can I help you? Tell me about:
- Your project type
- Available budget
- Timeline requirements
- Any specific needs

I'm here to help achieve your digital goals!`;

    return new Response(
      JSON.stringify({ response: fallbackResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
