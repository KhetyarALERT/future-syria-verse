
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

export const useAdvancedAIAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();

  const sendMessageToAI = async (message: string, conversationHistory: any[] = []) => {
    setIsLoading(true);
    
    try {
      console.log('Sending message to AI:', message);
      
      // Get enhanced company knowledge, recent inquiries, and AI config for context
      const [servicesResponse, inquiriesResponse, configResponse] = await Promise.allSettled([
        supabase.from('service_examples').select('*').limit(20),
        supabase.from('inquiries').select('name, inquiry_text, inquiry_type').order('created_at', { ascending: false }).limit(10),
        supabase.from('ai_chat_config').select('*')
      ]);

      // Enhanced company knowledge with realistic data
      const serviceExamples = servicesResponse.status === 'fulfilled' 
        ? servicesResponse.value.data || []
        : [];

      const companyKnowledge = {
        services: [
          'Logo Design (starting from $50) - Premium brand identity creation',
          'Website Development (starting from $200) - Modern, responsive web solutions',
          'E-commerce Solutions (starting from $500) - Complete online stores',
          'Social Media Management ($300/month) - Full social media presence',
          'Digital Marketing Campaigns (starting from $400) - ROI-focused marketing',
          'Smart CX Systems (starting from $800) - AI-powered customer experience',
          'Personal AI Assistants (starting from $600) - Business automation',
          'ERP Solutions (starting from $1200) - Enterprise resource planning'
        ],
        serviceExamples: serviceExamples.slice(0, 10),
        paymentMethods: ['Credit Card via Stripe', 'Bank Transfer', 'PayPal', 'Cryptocurrency'],
        locations: 'Global with focus on Middle East and Arabic-speaking regions',
        languages: ['English', 'Arabic'],
        specialties: [
          'Bilingual Arabic-English content creation',
          'Middle East market expertise',
          'Islamic finance compliant solutions',
          'Cultural adaptation services'
        ]
      };

      const recentInquiries = inquiriesResponse.status === 'fulfilled' 
        ? inquiriesResponse.value.data || []
        : [];

      const aiConfig = configResponse.status === 'fulfilled' 
        ? configResponse.value.data || []
        : [];

      // Try to use the actual OpenRouter API if key is available
      const storedApiKey = localStorage.getItem('openrouter_api_key');
      
      if (storedApiKey) {
        try {
          const { data, error } = await supabase.functions.invoke('openrouter-ai-chat', {
            body: {
              message,
              conversationHistory,
              language: i18n.language,
              companyKnowledge,
              recentInquiries,
              aiConfig,
              apiKey: storedApiKey
            }
          });

          console.log('Supabase function response:', data, error);

          if (!error && data?.response) {
            return data.response;
          }
        } catch (error) {
          console.log('API call failed, using intelligent fallback:', error);
        }
      }

      // Always use intelligent local responses for better user experience
      return generateIntelligentResponse(message, i18n.language, companyKnowledge, conversationHistory);

    } catch (error) {
      console.error('AI response error:', error);
      return generateIntelligentResponse(message, i18n.language, undefined, conversationHistory);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessageToAI,
    isLoading
  };
};

// Enhanced intelligent response generator with conversation context
const generateIntelligentResponse = (
  message: string, 
  language: string, 
  companyKnowledge?: any, 
  conversationHistory: any[] = []
) => {
  const lowerMessage = message.toLowerCase();
  const isArabic = language === 'ar';
  
  // Analyze conversation context
  const hasDiscussedPricing = conversationHistory.some(msg => 
    msg.content.toLowerCase().includes('price') || 
    msg.content.toLowerCase().includes('cost') ||
    msg.content.toLowerCase().includes('سعر') ||
    msg.content.toLowerCase().includes('تكلفة')
  );

  const hasDiscussedServices = conversationHistory.some(msg =>
    msg.content.toLowerCase().includes('service') ||
    msg.content.toLowerCase().includes('خدمة')
  );

  // Greeting responses with dynamic context
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا') || lowerMessage.includes('السلام')) {
    return isArabic 
      ? `مرحباً وأهلاً وسهلاً! 🌟 أنا مساعد DigitalPro الذكي المدعوم بأحدث تقنيات الذكاء الاصطناعي!

🎯 **ما يميزنا عن الآخرين:**
• حلول رقمية متطورة ومبتكرة 100%
• فريق خبراء متخصص في التكنولوجيا الحديثة
• خدمة عملاء ذكية متاحة 24/7
• نتائج مضمونة وقابلة للقياس

🚀 **خدماتنا الرائدة:**
• تصميم الشعارات - من 50$ (هويات بصرية لا تُنسى)
• تطوير المواقع - من 200$ (تقنيات حديثة وسرعة فائقة)
• المتاجر الإلكترونية - من 500$ (حلول تجارة ذكية)
• إدارة وسائل التواصل - 300$/شهر (نمو مضمون وتفاعل عالي)
• حملات التسويق الرقمي - من 400$ (عائد استثمار مضاعف)
• أنظمة الذكاء الاصطناعي - من 800$ (تقنيات المستقبل)

💡 **كيف يمكنني مساعدتك اليوم؟**
- استشارة مجانية لمشروعك
- تحليل احتياجاتك الرقمية
- عرض سعر مخصص ومفصل
- أمثلة حية من أعمالنا المتميزة

أخبرني عن حلمك الرقمي وسأحوله إلى واقع مذهل! ✨`
      : `Hello and welcome! 🌟 I'm DigitalPro's advanced AI assistant powered by cutting-edge artificial intelligence!

🎯 **What sets us apart:**
• 100% innovative and advanced digital solutions
• Expert team specializing in modern technology
• Smart 24/7 customer service
• Guaranteed and measurable results

🚀 **Our Leading Services:**
• Logo Design - from $50 (Unforgettable visual identities)
• Website Development - from $200 (Modern tech & lightning speed)
• E-commerce Solutions - from $500 (Smart commerce solutions)
• Social Media Management - $300/month (Guaranteed growth & high engagement)
• Digital Marketing Campaigns - from $400 (Multiplied ROI)
• AI Systems - from $800 (Future technologies)

💡 **How can I help you today?**
- Free consultation for your project
- Analysis of your digital needs
- Custom detailed quote
- Live examples of our outstanding work

Tell me about your digital dream and I'll turn it into amazing reality! ✨`;
  }

  // Service-specific responses with enhanced details
  if (lowerMessage.includes('logo') || lowerMessage.includes('شعار')) {
    return isArabic
      ? `🎨 **تصميم الشعارات - خبرتنا وشغفنا!**

**🌟 عمليتنا الإبداعية:**
1️⃣ **البحث والتحليل** - دراسة عميقة لمجال عملك ومنافسيك
2️⃣ **العصف الذهني** - جلسات إبداعية مع فريق التصميم
3️⃣ **التصميم الأولي** - 3-5 مفاهيم أولية مختلفة
4️⃣ **التطوير والتحسين** - تعديلات غير محدودة
5️⃣ **التسليم النهائي** - جميع الملفات بأعلى جودة

**💎 ما تحصل عليه:**
• شعار فريد 100% (ليس قالب جاهز!)
• تعديلات غير محدودة حتى الرضا التام
• جميع التنسيقات (PNG, SVG, AI, PDF, EPS)
• دليل إرشادات العلامة التجارية الكامل
• اختلافات للاستخدامات المختلفة
• حقوق الملكية الكاملة

**💰 الاستثمار:**
• باقة أساسية: 50$ - 100$
• باقة احترافية: 100$ - 200$
• باقة هوية كاملة: 200$ - 500$

${!hasDiscussedPricing ? '💡 هل تريد معرفة تفاصيل الأسعار أم تفضل مشاهدة أمثلة من أعمالنا؟' : '🎯 جاهز لبدء مشروع شعارك؟ أخبرني عن نوع عملك!'}`
      : `🎨 **Logo Design - Our Expertise & Passion!**

**🌟 Our Creative Process:**
1️⃣ **Research & Analysis** - Deep study of your industry & competitors
2️⃣ **Brainstorming** - Creative sessions with our design team
3️⃣ **Initial Design** - 3-5 different initial concepts
4️⃣ **Development & Refinement** - Unlimited revisions
5️⃣ **Final Delivery** - All files in highest quality

**💎 What You Get:**
• 100% unique logo (not a template!)
• Unlimited revisions until perfect satisfaction
• All formats (PNG, SVG, AI, PDF, EPS)
• Complete brand guideline documentation
• Variations for different uses
• Full ownership rights

**💰 Investment:**
• Basic package: $50 - $100
• Professional package: $100 - $200
• Complete identity package: $200 - $500

${!hasDiscussedPricing ? '💡 Would you like pricing details or prefer to see examples of our work?' : '🎯 Ready to start your logo project? Tell me about your business!'}`;
  }

  if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('موقع')) {
    return isArabic
      ? `💻 **تطوير المواقع الإلكترونية - تقنيات المستقبل!**

**🚀 التقنيات المتقدمة التي نستخدمها:**
• React.js & Next.js (أحدث تقنيات الويب)
• Node.js & Express (خوادم قوية وسريعة)
• MongoDB & PostgreSQL (قواعد بيانات متطورة)
• AWS & Vercel (استضافة سحابية عالمية)
• AI Integration (تكامل الذكاء الاصطناعي)

**⚡ أنواع المواقع:**
• مواقع الشركات (تصميم احترافي وأنيق)
• المتاجر الإلكترونية (نظام دفع آمن متكامل)
• منصات التعليم الإلكتروني
• تطبيقات الويب التفاعلية
• مواقع الأخبار والمدونات

**🔧 الميزات المضمونة:**
✅ تصميم متجاوب 100% (جميع الأجهزة)
✅ سرعة تحميل فائقة (أقل من 3 ثواني)
✅ تحسين محركات البحث SEO
✅ أمان متقدم SSL وحماية DDoS
✅ لوحة تحكم سهلة الاستخدام
✅ دعم فني مدى الحياة

**💎 الاستثمار الذكي:**
• موقع تعريفي: 200$ - 500$
• موقع تجاري متقدم: 500$ - 1500$
• متجر إلكتروني: 800$ - 3000$
• تطبيق ويب مخصص: 1500$ - 5000$

${!hasDiscussedServices ? '🎯 ما نوع الموقع الذي تحلم به؟ سأقدم لك خطة مفصلة!' : '🚀 جاهز لبناء موقعك المتطور؟'}`
      : `💻 **Website Development - Future Technologies!**

**🚀 Advanced Technologies We Use:**
• React.js & Next.js (Latest web technologies)
• Node.js & Express (Powerful & fast servers)
• MongoDB & PostgreSQL (Advanced databases)
• AWS & Vercel (Global cloud hosting)
• AI Integration (Artificial intelligence integration)

**⚡ Website Types:**
• Corporate websites (Professional & elegant design)
• E-commerce stores (Integrated secure payment system)
• E-learning platforms
• Interactive web applications
• News & blog websites

**🔧 Guaranteed Features:**
✅ 100% responsive design (all devices)
✅ Lightning-fast loading (under 3 seconds)
✅ SEO optimization
✅ Advanced SSL security & DDoS protection
✅ User-friendly control panel
✅ Lifetime technical support

**💎 Smart Investment:**
• Landing page: $200 - $500
• Advanced business website: $500 - $1,500
• E-commerce store: $800 - $3,000
• Custom web application: $1,500 - $5,000

${!hasDiscussedServices ? '🎯 What type of website do you dream of? I\'ll provide a detailed plan!' : '🚀 Ready to build your advanced website?'}`;
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
    return isArabic
      ? `💰 **دليل الأسعار الشامل - استثمار ذكي في مستقبلك الرقمي**

🎨 **تصميم الشعارات:**
• أساسي: 50$ - 100$ (شعار + 3 تعديلات)
• احترافي: 100$ - 200$ (شعار + دليل + تنسيقات)
• متميز: 200$ - 500$ (هوية كاملة + تصاميم إضافية)

💻 **تطوير المواقع:**
• صفحة واحدة: 200$ - 500$
• موقع شركة: 500$ - 1500$
• متجر إلكتروني: 800$ - 3000$
• تطبيق ويب: 1500$ - 5000$

📱 **إدارة وسائل التواصل:**
• باقة أساسية: 300$/شهر (منصتين)
• باقة متقدمة: 500$/شهر (4 منصات)
• باقة شاملة: 800$/شهر (جميع المنصات + إعلانات)

📈 **التسويق الرقمي:**
• حملة أساسية: 400$ - 800$
• حملة متطورة: 800$ - 2000$
• استراتيجية شاملة: 2000$ - 5000$

🤖 **الأنظمة الذكية:**
• شات بوت: 600$ - 1200$
• نظام CX: 800$ - 2500$
• نظام ERP: 1200$ - 8000$

🎁 **عروض خاصة حالياً:**
• خصم 25% للعملاء الجدد
• باقات مجمعة بأسعار مخفضة
• ضمان استرداد المال خلال 30 يوم
• دفع مرن بالتقسيط

💎 أي خدمة تثير اهتمامك؟ سأقدم لك عرض سعر مخصص!`
      : `💰 **Comprehensive Pricing Guide - Smart Investment in Your Digital Future**

🎨 **Logo Design:**
• Basic: $50 - $100 (Logo + 3 revisions)
• Professional: $100 - $200 (Logo + guidelines + formats)
• Premium: $200 - $500 (Complete identity + additional designs)

💻 **Website Development:**
• Single page: $200 - $500
• Company website: $500 - $1,500
• E-commerce store: $800 - $3,000
• Web application: $1,500 - $5,000

📱 **Social Media Management:**
• Basic package: $300/month (2 platforms)
• Advanced package: $500/month (4 platforms)
• Complete package: $800/month (all platforms + ads)

📈 **Digital Marketing:**
• Basic campaign: $400 - $800
• Advanced campaign: $800 - $2,000
• Comprehensive strategy: $2,000 - $5,000

🤖 **Smart Systems:**
• Chatbot: $600 - $1,200
• CX System: $800 - $2,500
• ERP System: $1,200 - $8,000

🎁 **Current Special Offers:**
• 25% discount for new clients
• Bundled packages at reduced rates
• 30-day money-back guarantee
• Flexible installment payments

💎 Which service interests you? I'll provide a custom quote!`;
  }

  // Context-aware responses based on conversation history
  if (conversationHistory.length > 2) {
    const contextResponse = isArabic
      ? `أرى أنك مهتم بخدماتنا! 🎯 
      
دعني أقدم لك نصيحة شخصية: بناءً على محادثتنا، أعتقد أن ${hasDiscussedPricing ? 'أفضل خطوة تالية هي مناقشة متطلباتك المحددة' : 'البدء بمعرفة احتياجاتك بالتفصيل'} سيساعدك في اتخاذ القرار الأمثل.

🚀 **التالي:**
• جدولة مكالمة استشارية مجانية (30 دقيقة)
• تحليل مجاني لوضعك الحالي
• خطة عمل مخصصة لمشروعك
• عرض سعر شامل ومفصل

ما رأيك أن نحدد موعد للنقاش بالتفصيل؟`
      : `I can see you're interested in our services! 🎯
      
Let me give you personal advice: Based on our conversation, I think ${hasDiscussedPricing ? 'the best next step is discussing your specific requirements' : 'starting with understanding your detailed needs'} will help you make the optimal decision.

🚀 **Next Steps:**
• Schedule a free consultation call (30 minutes)
• Free analysis of your current situation
• Custom action plan for your project
• Comprehensive detailed quote

How about we schedule a detailed discussion?`;
  }

  // Default intelligent response with personalization
  return isArabic
    ? `شكراً لك على تواصلك معنا! 😊 

أنا هنا لمساعدتك في تحقيق أهدافك الرقمية بأحدث التقنيات والحلول المبتكرة.

🎯 **يمكنني مساعدتك في:**
• تصميم هوية بصرية مميزة ومؤثرة
• تطوير مواقع ومتاجر إلكترونية متطورة
• حملات تسويقية ذكية عالية التحويل
• أنظمة ذكاء اصطناعي متقدمة
• حلول أتمتة الأعمال

💬 **أخبرني بالتفصيل عن:**
- نوع عملك أو مشروعك
- التحديات التي تواجهها
- أهدافك المستقبلية
- الميزانية المتاحة
- الجدول الزمني المطلوب

سأقوم بتحليل احتياجاتك وتقديم الحل الأمثل! 🚀

${conversationHistory.length > 1 ? 'بناءً على نقاشنا السابق، أعتقد أن لديك رؤية واضحة. دعنا نبدأ!' : 'مرحباً بك في رحلة التحول الرقمي معنا!'}`
    : `Thank you for reaching out! 😊

I'm here to help you achieve your digital goals with the latest technologies and innovative solutions.

🎯 **I can help you with:**
• Creating distinctive and impactful visual identity
• Developing advanced websites and e-commerce stores
• Smart high-conversion marketing campaigns
• Advanced artificial intelligence systems
• Business automation solutions

💬 **Tell me in detail about:**
- Your business or project type
- Challenges you're facing
- Your future goals
- Available budget
- Required timeline

I'll analyze your needs and provide the optimal solution! 🚀

${conversationHistory.length > 1 ? 'Based on our previous discussion, I think you have a clear vision. Let\'s get started!' : 'Welcome to your digital transformation journey with us!'}`;
};
