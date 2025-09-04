require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.send('InfoYieldX Smart Chatbot is running! 🚀');
});

// Enhanced session state with better structure
const sessions = new Map();

// Cleanup inactive sessions every 2 minutes
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of sessions) {
    if (now - session.lastActive > 30 * 60 * 1000) { // 30 minutes
      sessions.delete(sessionId);
      console.log(`🧹 Cleaned up session: ${sessionId}`);
    }
  }
}, 2 * 60 * 1000);

// Enhanced knowledge base with more detailed responses
const knowledgeBase = {
  services: {
    description: "InfoYieldX specializes in cutting-edge technology solutions! We offer comprehensive services in Web Development, Mobile App Development, Enterprise Accounting, Oracle EBS, Oracle Database management, and Custom Solutions.",
    details: {
      'Web Development': {
        description: 'Custom, responsive websites built with modern technologies like MERN stack, Next.js, and React. We create everything from corporate websites to complex web applications.',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI/UX'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Next.js'],
        timeline: '2-8 weeks depending on complexity'
      },
      'App Development': {
        description: 'Native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native technologies.',
        features: ['Cross-platform', 'Native Performance', 'Cloud Integration', 'App Store Deployment'],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        timeline: '4-12 weeks depending on features'
      },
      'Accounting': {
        description: 'Comprehensive financial solutions including bookkeeping, tax preparation, financial reporting, and business advisory services.',
        features: ['Bookkeeping', 'Tax Preparation', 'Financial Reports', 'Business Advisory'],
        technologies: ['QuickBooks', 'Sage', 'Xero', 'Custom Solutions'],
        timeline: 'Ongoing monthly services'
      },
      'Oracle EBS': {
        description: 'Enterprise Resource Planning solutions with Oracle E-Business Suite implementation, customization, and support.',
        features: ['ERP Implementation', 'Customization', 'Integration', '24/7 Support'],
        technologies: ['Oracle EBS', 'PL/SQL', 'OAF', 'Workflow'],
        timeline: '3-12 months for full implementation'
      },
      'Oracle Database': {
        description: 'Scalable database solutions including design, optimization, migration, and administration for enterprise needs.',
        features: ['Database Design', 'Performance Tuning', 'Migration', 'Administration'],
        technologies: ['Oracle 19c/21c', 'RAC', 'Data Guard', 'RMAN'],
        timeline: '2-6 weeks for setup and optimization'
      },
      'Custom Solution': {
        description: 'Tailored solutions designed to meet your unique business needs, combining multiple technologies and services.',
        features: ['Custom Architecture', 'Scalable Design', 'Integration Support', 'Dedicated Team'],
        technologies: ['Varies by Project'],
        timeline: 'Varies based on requirements'
      }
    }
  },
  company: {
    whyChoose: "We combine innovation, expertise, and customer focus to deliver tailored solutions. Our experienced team in India leverages cutting-edge technologies and follows international best practices to ensure quality, affordability, and on-time delivery.",
    location: "InfoYieldX is headquartered in Bangalore, India's Silicon Valley, with a strong presence across major Indian cities and serving clients globally.",
    story: "Founded in 2020 by a passionate team of technologists and business experts, InfoYieldX started with a vision to bridge the gap between technology and business success. Today, we're a trusted partner for startups to enterprises worldwide.",
    mission: "To deliver transformative technology and financial solutions that drive business success and growth.",
    vision: "To be a global leader in integrated technology and business services, making advanced solutions accessible to businesses of all sizes.",
    team: "Our diverse team of 50+ professionals includes certified developers, Oracle experts, financial advisors, and project managers.",
    clients: "We've successfully delivered 200+ projects across 15+ countries, serving startups to Fortune 500 companies."
  },
  contact: {
    email: 'support@infoyieldx.com',
    phone: '+91-123-456-7890',
    hours: 'Monday-Friday, 10 AM-7 PM IST',
    response: 'We typically respond within 2-4 hours during business hours'
  }
};

// Advanced intent detection with multiple patterns and confidence scoring
function detectIntent(message, context = []) {
  const lowerMessage = message.toLowerCase();
  const intents = [];
  console.log(`Processing message: ${lowerMessage}`); // Debug log

  // Service-related intents
  if (/\b(service|offer|what.*do|provide|speciali[sz]e|solution|help.*with)\b/.test(lowerMessage)) {
    intents.push({ intent: 'services', confidence: 0.8 });
  }

  // Specific service inquiries
  const serviceKeywords = {
    'web_development': /\b(web|website|frontend|backend|react|node|mern|html|css|javascript)\b/i,
    'app_development': /\b(app|mobile|android|ios|react native|flutter|application)\b/i,
    'accounting': /\b(account|bookkeep|tax|financial|finance|money|budget)\b/i,
    'oracle_ebs': /\b(oracle\s*ebs|erp|enterprise\s*business\s*suite)\b/i,
    'oracle_database': /\b(oracle\s*database|oracle\s*db|sql|data\s*guard|rman)\b/i,
    'custom_solution': /\b(custom|tailored|unique|bespoke)\b/i
  };

  for (const [service, pattern] of Object.entries(serviceKeywords)) {
    if (pattern.test(lowerMessage)) {
      intents.push({ intent: 'service_specific', service, confidence: 0.9 });
    }
  }

  // Company information intents
  if (/\b(why.*choose|why.*infoyieldx|advantage|benefit|better)\b/.test(lowerMessage)) {
    intents.push({ intent: 'why_choose', confidence: 0.8 });
  }

  if (/\b(where|location|office|address|based|headquarter)\b/.test(lowerMessage)) {
    intents.push({ intent: 'location', confidence: 0.8 });
  }

  if (/\b(story|history|founded|started|about.*company|background)\b/.test(lowerMessage)) {
    intents.push({ intent: 'story', confidence: 0.8 });
  }

  if (/\b(mission|vision|goal|objective)\b/.test(lowerMessage)) {
    intents.push({ intent: 'mission_vision', confidence: 0.8 });
  }

  if (/\b(team|staff|people|employee|developer)\b/.test(lowerMessage)) {
    intents.push({ intent: 'team', confidence: 0.7 });
  }

  // Contact and support intents
  if (/\b(contact|reach|call|email|phone|support|help|talk|speak)\b/.test(lowerMessage)) {
    intents.push({ intent: 'contact', confidence: 0.8 });
  }

  // Project inquiry intents
  if (/\b(project|quote|estimate|cost|price|hire|work.*with|build|develop|create)\b/.test(lowerMessage)) {
    intents.push({ intent: 'project_inquiry', confidence: 0.9 });
  }

  // Navigation intents
  if (/\b(back|return|previous|menu|start.*over|main.*menu)\b/.test(lowerMessage)) {
    intents.push({ intent: 'navigation', confidence: 0.7 });
  }

  // Greeting intents
  if (/\b(hi|hello|hey|good.*morning|good.*afternoon|good.*evening)\b/.test(lowerMessage)) {
    intents.push({ intent: 'greeting', confidence: 0.6 });
  }

  // Farewell intents
  if (/\b(bye|goodbye|thanks|thank you|see you|later|done|finish)\b/.test(lowerMessage)) {
    intents.push({ intent: 'farewell', confidence: 0.7 });
  }

  // Affirmative/Negative intents
  if (/\b(yes|yeah|yep|sure|ok|okay|proceed|continue|go ahead)\b/.test(lowerMessage)) {
    intents.push({ intent: 'affirmative', confidence: 0.8 });
  }

  if (/\b(no|nope|cancel|stop|don't|not interested|skip)\b/.test(lowerMessage)) {
    intents.push({ intent: 'negative', confidence: 0.8 });
  }

  console.log(`Detected intents: ${JSON.stringify(intents)}`); // Debug log
  if (intents.length === 0) return null;
  return intents.sort((a, b) => b.confidence - a.confidence)[0];
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function isValidPhone(phone) {
  return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendInquiryEmail(data) {
  // Sanitize inputs to prevent HTML injection
  const sanitizedData = {
    name: sanitizeHtml(data.name),
    email: sanitizeHtml(data.email),
    phone: sanitizeHtml(data.phone || ''),
    company: sanitizeHtml(data.company || ''),
    serviceType: sanitizeHtml(data.serviceType),
    budget: sanitizeHtml(data.budget),
    timeline: sanitizeHtml(data.timeline || ''),
    details: sanitizeHtml(data.details)
  };

  console.log(`Sending inquiry email with service: ${sanitizedData.serviceType}`); // Debug log

  const adminMailOptions = {
    from: `"InfoYieldX Smart Bot" <${process.env.MAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 New Project Inquiry from ${sanitizedData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          New Project Inquiry 🎯
        </h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Client Information</h3>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
          ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
          ${sanitizedData.company ? `<p><strong>Company:</strong> ${sanitizedData.company}</p>` : ''}
        </div>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0369a1;">Project Details</h3>
          <p><strong>Service:</strong> ${sanitizedData.serviceType}</p>
          <p><strong>Budget:</strong> ${sanitizedData.budget}</p>
          <p><strong>Timeline:</strong> ${sanitizedData.timeline || 'Not specified'}</p>
          <p><strong>Details:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0369a1;">
            ${sanitizedData.details}
          </div>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          This inquiry was generated by InfoYieldX Smart Chatbot on ${new Date().toLocaleString()}.
        </p>
      </div>
    `,
  };

  const userMailOptions = {
    from: `"InfoYieldX Team" <${process.env.MAIL_USER}>`,
    to: sanitizedData.email,
    subject: '✅ Your Inquiry Received - InfoYieldX',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Thank You for Your Inquiry! 🙏
        </h2>
        <p>Hi <strong>${sanitizedData.name}</strong>,</p>
        <p>Thank you for reaching out to InfoYieldX! We're excited about the possibility of working together.</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #065f46;">Your Inquiry Summary:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Service:</strong> ${sanitizedData.serviceType}</li>
            <li><strong>Budget:</strong> ${sanitizedData.budget}</li>
            ${sanitizedData.timeline ? `<li><strong>Timeline:</strong> ${sanitizedData.timeline}</li>` : ''}
          </ul>
        </div>

        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #92400e;">What Happens Next?</h3>
          <ol style="margin: 0; padding-left: 20px; color: #78350f;">
            <li>Our team will review your requirements within 2-4 hours</li>
            <li>We'll prepare a customized proposal for your project</li>
            <li>One of our experts will contact you to discuss details</li>
            <li>We'll schedule a consultation call at your convenience</li>
          </ol>
        </div>

        <p>In the meantime, feel free to explore our <a href="https://infoyieldx.com" style="color: #2563eb;">portfolio</a> or reach out directly:</p>
        <ul>
          <li>📧 Email: support@infoyieldx.com</li>
          <li>📞 Phone: +91-123-456-7890</li>
          <li>🕒 Hours: Monday-Friday, 10 AM-7 PM IST</li>
        </ul>

        <p style="margin-top: 30px;">
          Warm regards,<br>
          <strong>The InfoYieldX Team</strong><br>
          <em>"Transforming Ideas into Digital Reality"</em>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log(`✅ Inquiry emails sent successfully for ${sanitizedData.serviceType}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message, error.stack);
    return false;
  }
}

// Smart response generator
class SmartResponseGenerator {
  static generateServiceResponse(service, userContext) {
    const serviceInfo = knowledgeBase.services.details[service];
    if (!serviceInfo) return null;

    return {
      message: `🚀 **${service}**\n\n${serviceInfo.description}\n\n✨ **Key Features:**\n${serviceInfo.features.map(f => `• ${f}`).join('\n')}\n\n🛠️ **Technologies:** ${serviceInfo.technologies.join(', ')}\n\n⏱️ **Typical Timeline:** ${serviceInfo.timeline}\n\nWould you like to start a project inquiry for ${service} or learn about our other services?`,
      options: [`Start ${service} Project`, 'View Other Services', 'Get Quote', 'Main Menu']
    };
  }

  static generateContextualOptions(currentStep, userHistory) {
    const baseOptions = ['Main Menu', 'Contact Support'];
    
    switch (currentStep) {
      case 'greeting':
        return ['🚀 Start Project', '📚 Learn About Us', '💬 Get Support', '📞 Contact Info'];
      case 'services_overview':
        return ['Web Development', 'App Development', 'Oracle Services', 'Accounting', 'Custom Solution'];
      case 'project_inquiry':
        return ['📧 Provide Email', '📞 Schedule Call', '❌ Cancel'];
      case 'company_info':
        return ['Our Services', 'Why Choose Us', 'Our Story', 'Start Project'];
      default:
        return baseOptions;
    }
  }
}

// Session reset function for "Refresh Chat"
function resetSession(session) {
  session.step = 'welcome';
  session.retryCount = 0;
  session.context = [];
  session.inquiryData = {
    name: '',
    email: session.inquiryData.email, // Preserve email for reuse
    phone: '',
    company: '',
    serviceType: '',
    budget: '',
    timeline: '',
    details: ''
  };
  session.currentService = '';
  session.conversationFlow = [];
  console.log(`🔄 Session ${session.id} reset for new chat`);
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  const sessionId = Math.random().toString(36).substring(2, 15);
  const session = {
    id: sessionId,
    step: 'welcome',
    retryCount: 0,
    context: [],
    inquiryData: {
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceType: '',
      budget: '',
      timeline: '',
      details: ''
    },
    lastActive: Date.now(),
    preferences: {},
    conversationFlow: [],
    currentService: ''
  };
  
  sessions.set(sessionId, session);
  console.log(`🔗 New connection: ${sessionId}`);

  // Welcome message
  const welcomeMessage = {
    message: "👋 Hello! I'm **X**, your smart assistant from InfoYieldX! \n\nI'm here to help you explore our services, answer questions, or start your next amazing project. What brings you here today?",
    options: ['🚀 Start a Project', '📚 Learn About InfoYieldX', '💬 I have Questions', '📞 Contact Information'],
    timestamp: Date.now()
  };

  ws.send(JSON.stringify(welcomeMessage));

  ws.on('message', async (data) => {
    try {
      const userMessage = data.toString().trim();
      const session = sessions.get(sessionId);
      
      if (!session) {
        ws.send(JSON.stringify({
          message: "Sorry, your session has expired. Let's start fresh! 👋",
          options: ['🚀 Start a Project', '📚 Learn About InfoYieldX']
        }));
        return;
      }

      session.lastActive = Date.now();
      session.context.push({ role: 'user', message: userMessage, timestamp: Date.now() });
      
      // Keep context manageable
      if (session.context.length > 20) {
        session.context = session.context.slice(-15);
      }

      let response = await processUserMessage(userMessage, session);
      
      // Add to conversation flow for analytics
      session.conversationFlow.push({
        user: userMessage,
        bot: response.message,
        step: session.step,
        timestamp: Date.now()
      });

      ws.send(JSON.stringify(response));
      
    } catch (error) {
      console.error('Message processing error:', error);
      ws.send(JSON.stringify({
        message: "Oops! Something went wrong on my end. Let me help you start over. 🔄",
        options: ['🚀 Start Project', '📚 About InfoYieldX', '💬 Support']
      }));
    }
  });

  ws.on('close', () => {
    sessions.delete(sessionId);
    console.log(`🔌 Connection closed: ${sessionId}`);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error for ${sessionId}:`, error);
    sessions.delete(sessionId);
  });
});

// Main message processing function
async function processUserMessage(userMessage, session) {
  // Prioritize session step over intent detection for project inquiry flow
  if (session.step.startsWith('project_inquiry_')) {
    switch (session.step) {
      case 'project_inquiry_email':
        return handleProjectEmail(userMessage, session);
      case 'project_inquiry_details':
        return handleProjectDetails(userMessage, session);
      case 'project_inquiry_service':
        return handleProjectServiceType(userMessage, session);
      case 'project_inquiry_budget':
        return handleProjectBudget(userMessage, session);
      case 'project_inquiry_timeline':
        return handleProjectTimeline(userMessage, session);
      case 'project_inquiry_description':
        return handleProjectDescription(userMessage, session);
      case 'project_inquiry_confirm':
        return handleProjectConfirmation(userMessage, session);
    }
  }

  const intent = detectIntent(userMessage, session.context);
  let response = { message: '', options: [], timestamp: Date.now() };

  // Handle global intents
  if (intent) {
    switch (intent.intent) {
      case 'greeting':
        return handleGreeting(session);
      case 'farewell':
        session.step = 'ended';
        return {
          message: "Thank you for chatting with InfoYieldX! 🙏 \n\nWe're always here when you need us. Have a wonderful day! ✨",
          options: ['🔄 Refresh Chat']
        };
      case 'navigation':
        return handleNavigation(userMessage, session);
      case 'contact':
        return handleContactInquiry(session);
      case 'services':
        return handleServicesOverview(session);
      case 'service_specific':
        return handleSpecificService(intent.service, session);
      case 'project_inquiry':
        return startProjectInquiry(session);
      case 'why_choose':
        return handleWhyChooseUs(session);
      case 'location':
        return handleLocationInquiry(session);
      case 'story':
        return handleCompanyStory(session);
      case 'mission_vision':
        return handleMissionVision(session);
      case 'team':
        return handleTeamInquiry(session);
    }
  }

  // Handle welcome step
  if (session.step === 'welcome') {
    return handleWelcomeResponse(userMessage, session);
  }

  return handleUnrecognizedInput(userMessage, session);
}

// Handler functions
function handleGreeting(session) {
  session.step = 'greeting_response';
  return {
    message: `Hello again! 👋 Great to see you're back. How can I make your day better?`,
    options: ['🚀 Start New Project', '📚 Learn More', '💬 Ask Questions', '📞 Contact Us']
  };
}

function handleWelcomeResponse(userMessage, session) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('project') || lowerMessage.includes('start')) {
    return startProjectInquiry(session);
  } else if (lowerMessage.includes('learn') || lowerMessage.includes('about')) {
    return handleServicesOverview(session);
  } else if (lowerMessage.includes('question') || lowerMessage.includes('help')) {
    session.step = 'help_mode';
    return {
      message: "I'm here to help! 💡 What would you like to know about InfoYieldX?",
      options: ['Our Services', 'Pricing', 'Process', 'Technologies', 'Success Stories']
    };
  } else if (lowerMessage.includes('contact')) {
    return handleContactInquiry(session);
  }
  
  return handleUnrecognizedInput(userMessage, session);
}

function handleNavigation(userMessage, session) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('main') || lowerMessage.includes('menu') || lowerMessage.includes('start')) {
    session.step = 'welcome';
    session.retryCount = 0;
    return {
      message: "🏠 Back to the main menu! How can I assist you today?",
      options: ['🚀 Start Project', '📚 Learn About Us', '💬 Ask Questions', '📞 Contact Info']
    };
  } else if (lowerMessage.includes('refresh')) {
    resetSession(session);
    return {
      message: "🔄 Chat refreshed! Let's start anew. How can I assist you today?",
      options: ['🚀 Start Project', '📚 Learn About InfoYieldX', '💬 I have Questions', '📞 Contact Information']
    };
  }
  
  return handleUnrecognizedInput(userMessage, session);
}

function handleContactInquiry(session) {
  session.step = 'contact_provided';
  return {
    message: `📞 **Here's how to reach InfoYieldX:**\n\n📧 **Email:** ${knowledgeBase.contact.email}\n📱 **Phone:** ${knowledgeBase.contact.phone}\n🕒 **Hours:** ${knowledgeBase.contact.hours}\n⚡ **Response Time:** ${knowledgeBase.contact.response}\n\nWould you like to start a project inquiry right now, or do you prefer to contact us directly?`,
    options: ['🚀 Start Project Inquiry', '📞 I\'ll Call Directly', '📧 I\'ll Email', 'Main Menu']
  };
}

function handleServicesOverview(session) {
  session.step = 'services_overview';
  return {
    message: `🌟 **InfoYieldX Services Overview**\n\n${knowledgeBase.services.description}\n\nWhich service interests you most? I can provide detailed information about each:`,
    options: ['💻 Web Development', '📱 App Development', '💼 Accounting Services', '🏢 Oracle EBS', '🗄️ Oracle Database', '🔧 Custom Solution', '🚀 Start Project']
  };
}

function handleSpecificService(service, session) {
  const serviceMap = {
    'web_development': 'Web Development',
    'app_development': 'App Development',
    'accounting': 'Accounting',
    'oracle_ebs': 'Oracle EBS',
    'oracle_database': 'Oracle Database',
    'custom_solution': 'Custom Solution'
  };
  
  const serviceName = serviceMap[service];
  const response = SmartResponseGenerator.generateServiceResponse(serviceName, session.context);
  
  if (response) {
    session.step = 'service_details';
    session.currentService = serviceName;
    console.log(`Transitioned to step: ${session.step}, service: ${serviceName}`); // Debug log
    return response;
  }
  
  return handleUnrecognizedInput('', session);
}

function startProjectInquiry(session) {
  // Check if a valid email is already stored
  if (session.inquiryData.email && isValidEmail(session.inquiryData.email)) {
    console.log(`Reusing existing email: ${session.inquiryData.email}`); // Debug log
    session.step = 'project_inquiry_details';
    session.retryCount = 0;
    return {
      message: `Welcome back! Using your email: ${session.inquiryData.email}. What's your name? (And optionally, your company name)`,
      options: []
    };
  }

  session.step = 'project_inquiry_email';
  session.retryCount = 0;
  console.log(`Prompting for new email for session: ${session.id}`); // Debug log
  return {
    message: `🚀 **Awesome! Let's start your project inquiry.**\n\nI'll need a few details to connect you with the right expert. First, what's your email address? 📧`,
    options: []
  };
}

function handleProjectEmail(userMessage, session) {
  if (isValidEmail(userMessage)) {
    session.inquiryData.email = userMessage;
    session.step = 'project_inquiry_details';
    session.retryCount = 0;
    console.log(`Stored email: ${userMessage}`); // Debug log
    
    return {
      message: `✅ Got it! Now, what's your name? (And optionally, your company name)`,
      options: []
    };
  } else {
    session.retryCount++;
    if (session.retryCount >= 3) {
      return {
        message: "Having trouble with the email? 🤔 Let's try a different approach:",
        options: ['📞 Schedule a Call Instead', '💬 Chat with Support', '🏠 Main Menu']
      };
    }
    return {
      message: `Hmm, that doesn't look like a valid email address. Could you please try again? 📧\n\n*Example: john@company.com*`,
      options: ['Skip for Now', 'Main Menu']
    };
  }
}

function handleProjectDetails(userMessage, session) {
  const parts = userMessage.split(',').map(p => p.trim());
  session.inquiryData.name = parts[0];
  if (parts.length > 1) {
    session.inquiryData.company = parts[1];
  }
  
  session.step = 'project_inquiry_service';
  return {
    message: `Nice to meet you, ${session.inquiryData.name}! 👋\n\nWhat type of project are you looking to build?`,
    options: ['💻 Website/Web App', '📱 Mobile App', '🏢 Enterprise Solution', '💼 Accounting System', '🔧 Custom Solution']
  };
}

function handleProjectServiceType(userMessage, session) {
  console.log(`User selected service: ${userMessage}`); // Debug log
  // Map button labels to knowledgeBase keys
  const serviceTypeMap = {
    '💻 Website/Web App': 'Web Development',
    '📱 Mobile App': 'App Development',
    '🏢 Enterprise Solution': 'Oracle EBS',
    '💼 Accounting System': 'Accounting',
    '🔧 Custom Solution': 'Custom Solution'
  };

  const normalizedServiceType = serviceTypeMap[userMessage] || userMessage;
  session.inquiryData.serviceType = normalizedServiceType;
  session.currentService = normalizedServiceType; // Track current service
  console.log(`Normalized service type: ${normalizedServiceType}`); // Debug log

  // Validate service type
  const serviceInfo = knowledgeBase.services.details[normalizedServiceType];
  if (!serviceInfo) {
    console.error(`Invalid service type: ${normalizedServiceType}`);
    return {
      message: `Oops! It looks like "${userMessage}" is not a valid service. Please select a valid service:`,
      options: ['💻 Website/Web App', '📱 Mobile App', '🏢 Enterprise Solution', '💼 Accounting System', '🔧 Custom Solution', '🏠 Main Menu']
    };
  }

  session.step = 'project_inquiry_budget';

  // Provide service-specific response
  const serviceMessages = {
    'Web Development': `Great choice! Our Web Development services create custom, responsive websites with modern technologies like React and Node.js. 🎯\n\nWhat's your approximate budget range?`,
    'App Development': `Awesome! Our App Development services build native and cross-platform mobile apps for iOS and Android. 📱\n\nWhat's your approximate budget range?`,
    'Accounting': `Perfect! Our Accounting services offer comprehensive financial solutions, including bookkeeping and tax preparation. 💼\n\nWhat's your approximate budget range?`,
    'Oracle EBS': `Excellent! Our Oracle EBS services provide enterprise-grade ERP solutions with customization and support. 🏢\n\nWhat's your approximate budget range?`,
    'Oracle Database': `Great! Our Oracle Database services ensure scalable, optimized database solutions for your enterprise. 🗄️\n\nWhat's your approximate budget range?`,
    'Custom Solution': `Nice! Our Custom Solutions are tailored to your unique needs, combining multiple technologies. 🔧\n\nWhat's your approximate budget range?`
  };

  const message = serviceMessages[normalizedServiceType] || `Great choice! ${userMessage} projects are our specialty. 🎯\n\nWhat's your approximate budget range?`;

  return {
    message,
    options: ['💰 Under $5,000', '💰💰 $5,000 - $15,000', '💰💰💰 $15,000 - $50,000', '💰💰💰💰 $50,000+', '🤷 Not Sure Yet']
  };
}

function handleProjectBudget(userMessage, session) {
  session.inquiryData.budget = userMessage;
  session.step = 'project_inquiry_timeline';
  return {
    message: `Got it! When would you like to get started? (How urgent is your project?)`,
    options: ['🚀 ASAP', '📅 Within 1 Month', '📅 2-3 Months', '📅 Flexible Timeline', '🤔 Need Advice']
  };
}

function handleProjectTimeline(userMessage, session) {
  session.inquiryData.timeline = userMessage;
  session.step = 'project_inquiry_description';
  return {
    message: `Excellent! Last step - tell me more about your project vision. What specific features or goals do you have in mind? 💭\n\n*Feel free to be as detailed as you'd like!*`,
    options: []
  };
}

function handleProjectDescription(userMessage, session) {
  session.inquiryData.details = userMessage;
  session.step = 'project_inquiry_confirm';
  
  const summary = `📋 **Project Inquiry Summary:**\n\n👤 **Name:** ${session.inquiryData.name}${session.inquiryData.company ? `\n🏢 **Company:** ${session.inquiryData.company}` : ''}\n📧 **Email:** ${session.inquiryData.email}\n🎯 **Service:** ${session.inquiryData.serviceType}\n💰 **Budget:** ${session.inquiryData.budget}\n📅 **Timeline:** ${session.inquiryData.timeline}\n\n📝 **Project Details:**\n${session.inquiryData.details}\n\nReady to submit this inquiry?`;
  
  return {
    message: summary,
    options: ['✅ Yes, Submit Inquiry!', '✏️ Edit Details', '❌ Cancel']
  };
}

function handleProjectConfirmation(userMessage, session) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('yes') || lowerMessage.includes('submit')) {
    return submitProjectInquiry(session);
  } else if (lowerMessage.includes('edit')) {
    session.step = 'project_inquiry_service';
    return {
      message: "No problem! Let's update your details. What would you like to change?",
      options: ['Service Type', 'Budget', 'Timeline', 'Project Description', 'Contact Info']
    };
  } else if (lowerMessage.includes('cancel')) {
    session.step = 'welcome';
    return {
      message: "No worries! Your inquiry has been cancelled. Is there anything else I can help you with? 😊",
      options: ['🚀 Start New Project', '📚 Learn About Services', '💬 Ask Questions', '🏠 Main Menu', '🔄 Refresh Chat']
    };
  }
  
  return handleUnrecognizedInput(userMessage, session);
}

async function submitProjectInquiry(session) {
  console.log(`Submitting inquiry: ${JSON.stringify(session.inquiryData)}`); // Debug log
  const emailSent = await sendInquiryEmail(session.inquiryData);
  session.step = 'inquiry_submitted';
  
  if (emailSent) {
    return {
      message: `🎉 **Inquiry Submitted Successfully!**\n\nThank you, ${session.inquiryData.name}! Your ${session.inquiryData.serviceType} project inquiry has been sent to our team.\n\n✅ **What happens next:**\n• Our experts will review your requirements\n• You'll receive a detailed proposal within 24 hours\n• We'll schedule a consultation call\n• Get ready to bring your vision to life!\n\n📧 **Confirmation email sent to:** ${session.inquiryData.email}`,
      options: ['🚀 Start Another Project', '📚 Learn More About Us', '💬 Chat with Support', '👋 Goodbye', '🔄 Refresh Chat']
    };
  } else {
    return {
      message: `⚠️ **Oops! Something went wrong...**\n\nDon't worry, ${session.inquiryData.name}! I've saved your details. Let's try contacting our team directly:\n\n📞 **Call:** +91-123-456-7890\n📧 **Email:** support@infoyieldx.com\n\nOr would you like to try submitting again?`,
      options: ['🔄 Try Again', '📞 I\'ll Call Directly', '📧 I\'ll Email', '🏠 Main Menu', '🔄 Refresh Chat']
    };
  }
}

function handleWhyChooseUs(session) {
  session.step = 'company_info';
  return {
    message: `🌟 **Why Choose InfoYieldX?**\n\n${knowledgeBase.company.whyChoose}\n\n🏆 **Our Track Record:**\n• ${knowledgeBase.company.clients}\n• Expert team of ${knowledgeBase.company.team.split(' ')[4]}+ professionals\n• Based in ${knowledgeBase.company.location.split(',')[0]}\n• Serving clients globally since 2020\n\nWhat else would you like to know about us?`,
    options: ['🏢 Our Story', '👥 Our Team', '🎯 Our Mission', '🚀 Start Project', '📞 Contact Us']
  };
}

function handleLocationInquiry(session) {
  session.step = 'location_info';
  return {
    message: `📍 **InfoYieldX Location & Presence**\n\n🏢 ${knowledgeBase.company.location}\n\n🌍 **Global Reach:** We serve clients across 15+ countries while maintaining our strong roots in India's tech hub.\n\n🕒 **Time Zone Advantage:** Our IST working hours align well with both Asian and European markets, ensuring smooth communication.\n\nInterested in working with our Bangalore-based team?`,
    options: ['🚀 Start Project', '👥 Meet Our Team', '📞 Schedule Call', '🏠 Main Menu']
  };
}

function handleCompanyStory(session) {
  session.step = 'company_story';
  return {
    message: `📖 **The InfoYieldX Story**\n\n${knowledgeBase.company.story}\n\n🚀 **Our Journey:**\n• **2020:** Founded by tech enthusiasts\n• **2021:** First 50 successful projects\n• **2022:** Expanded to Oracle solutions\n• **2023:** Reached 100+ global clients\n• **2024:** Launched advanced AI solutions\n• **2025:** Continuing to innovate and grow!\n\nWant to be part of our success story?`,
    options: ['🚀 Start Your Project', '🎯 Our Mission & Vision', '👥 Meet Our Team', '📞 Contact Us']
  };
}

function handleMissionVision(session) {
  session.step = 'mission_vision';
  return {
    message: `🎯 **Our Mission & Vision**\n\n**🚀 Mission:**\n${knowledgeBase.company.mission}\n\n**🌟 Vision:**\n${knowledgeBase.company.vision}\n\n**💡 Our Values:**\n• Innovation-driven solutions\n• Customer-centric approach\n• Quality without compromise\n• Transparent communication\n• Continuous learning & growth\n\nReady to experience our commitment firsthand?`,
    options: ['🚀 Start Project', '📖 Our Story', '👥 Our Team', '🏠 Main Menu']
  };
}

function handleTeamInquiry(session) {
  session.step = 'team_info';
  return {
    message: `👥 **Meet Our Amazing Team**\n\n${knowledgeBase.company.team}\n\n🏆 **Our Expertise:**\n• **Developers:** Full-stack, Mobile, Oracle specialists\n• **Designers:** UI/UX experts with modern approach\n• **Consultants:** Business & technical advisors\n• **Project Managers:** Certified PMP professionals\n• **Quality Assurance:** Testing & security experts\n\n🎓 **Certifications:** Oracle Certified, AWS Certified, Google Certified, Microsoft Certified\n\nWant to work with our expert team?`,
    options: ['🚀 Start Project', '💼 See Our Work', '📞 Schedule Consultation', '🏠 Main Menu']
  };
}

function handleUnrecognizedInput(userMessage, session) {
  session.retryCount++;
  
  // Provide smart suggestions based on conversation context
  let suggestions = [];
  const recentContext = session.context.slice(-3);
  
  if (session.step === 'project_inquiry_service') {
    suggestions = ['💻 Website/Web App', '📱 Mobile App', '🏢 Enterprise Solution', '💼 Accounting System', '🔧 Custom Solution'];
  } else if (recentContext.some(c => c.message && c.message.toLowerCase().includes('project'))) {
    suggestions = ['🚀 Start Project Inquiry', '💰 Get Quote', '📞 Schedule Call'];
  } else if (recentContext.some(c => c.message && c.message.toLowerCase().includes('service'))) {
    suggestions = ['💻 Website/Web App', '📱 Mobile App', '🏢 Enterprise Solution', '💼 Accounting System', '🔧 Custom Solution'];
  } else {
    suggestions = ['🚀 Start Project', '📚 Learn About Us', '💬 Ask Questions', '📞 Contact Info'];
  }
  
  if (session.retryCount >= 2) {
    return {
      message: `🤔 I want to make sure I understand you correctly! Let me connect you with our support team, or you can choose from these options:`,
      options: [...suggestions, '💬 Chat with Human Support', '🏠 Main Menu', '🔄 Refresh Chat']
    };
  }
  
  return {
    message: `Sorry, I didn't catch that! 😅 Please select an option or rephrase your request:`,
    options: suggestions
  };
}

// Enhanced error handling and logging
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Analytics and monitoring
setInterval(() => {
  const activeConnections = sessions.size;
  const totalMemoryUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  
  console.log(`📊 Stats - Active Sessions: ${activeConnections}, Memory: ${totalMemoryUsage}MB`);
  
  // Log conversation analytics
  let totalConversations = 0;
  let completedInquiries = 0;
  const serviceCounts = {};
  
  for (const [sessionId, session] of sessions) {
    totalConversations++;
    if (session.step === 'inquiry_submitted') {
      completedInquiries++;
    }
    if (session.inquiryData.serviceType) {
      serviceCounts[session.inquiryData.serviceType] = (serviceCounts[session.inquiryData.serviceType] || 0) + 1;
    }
  }
  
  if (totalConversations > 0) {
    const conversionRate = ((completedInquiries / totalConversations) * 100).toFixed(1);
    console.log(`📈 Conversion Rate: ${conversionRate}% (${completedInquiries}/${totalConversations})`);
    console.log(`📊 Service selection counts: ${JSON.stringify(serviceCounts)}`);
  }
}, 5 * 60 * 1000); // Every 5 minutes

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`
  🚀 InfoYieldX Smart Chatbot Server Started!
  
  📡 WebSocket: ws://localhost:${PORT}
  🌐 Health Check: http://localhost:${PORT}
  
  ✨ Features Enabled:
  • Smart Intent Detection
  • Context-Aware Responses  
  • Enhanced Project Inquiry Flow
  • Email Notifications
  • Session Management
  • Analytics & Monitoring
  
  🎯 Ready to provide magical customer experiences!
  `);
});