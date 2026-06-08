// State variables
let activePlatform = 'discord';
let activeHookIndex = 0;

// Platform specific hooks list
const hooks = {
  discord: [
    { name: "LP Slippage Hook", label: "Focuses on yield losses and manual LP fatigue" },
    { name: "Yield Dilution Hook", label: "Focuses on automated pool rebalancing" },
    { name: "Beta Gated Access", label: "Focuses on exclusivity and founding developer group" }
  ],
  twitter: [
    { name: "Alpha Post Hook", label: "Tailored for active alpha tweets/replies" },
    { name: "Degen Bot Speed Hook", label: "Focuses on bot execution speed without coding" },
    { name: "Gated 50 Slots Hook", label: "Brief, high-impact DM hook for waitlists" }
  ],
  linkedin: [
    { name: "Governance Collaboration", label: "Focuses on educational/synergy partnership" },
    { name: "University Guild Program", label: "Focuses on student quantitative trading workshops" },
    { name: "Advisory Beta Slot", label: "High-level review invite for Web3 builders" }
  ]
};

// Platforms template messages compiler
const templates = {
  discord: [
    // LP Slippage Hook
    (recipient, protocol, hookText, sender) => 
`Hey ${recipient}! Saw your post in the ${protocol} Discord about slippage on your yield trades.${hookText ? ` ${hookText}.` : ' Impressive LP strategy, but manual rebalancing must eat into your APY.'} Have you looked into setting up an autonomous agent for it?

We're building AgentVault—a no-code tool that lets you launch 24/7 trading agents to auto-execute strategies like stop-losses or yield routing. Would love to get you early access to our MVP to automate this. Let me know if you're down to test it!

- ${sender}`,
    
    // Yield Dilution Hook
    (recipient, protocol, hookText, sender) => 
`Yo ${recipient}! Noticed you were discussing ${protocol} yield strategies in the server.${hookText ? ` ${hookText}.` : ' Yield dilution is a huge pain when you cannot monitor pools 24/7.'}

We're launching AgentVault—a no-code platform to spin up 24/7 autonomous agents that auto-rebalance pools. Capping our private beta at 50 slots. Let me know if you want an invite key to try it!

- ${sender}`,
    
    // Beta Gated Access
    (recipient, protocol, hookText, sender) => 
`Hey ${recipient}! Since you're deep in the weeds with ${protocol}, wanted to invite you to the AgentVault founding group.${hookText ? ` ${hookText}.` : ''}

We built a no-code portal to launch 24/7 autonomous trading agents. We're launching an exclusive guild of 50 power users with direct dev channels to shape the roadmap. Let me know if you want early access to test our MVP!

- ${sender}`
  ],
  
  twitter: [
    // Alpha Post Hook
    (recipient, protocol, hookText, sender) => 
`Yo ${recipient}, love your alpha on ${protocol}.${hookText ? ` ${hookText}.` : ''}

I'm building AgentVault, a no-code portal to launch 24/7 autonomous trading agents in minutes (auto-buy dips, compound yield). We're capping beta at 50 users. Down to try the MVP? 🚀`,
    
    // Degen Bot Speed Hook
    (recipient, protocol, hookText, sender) => 
`Hey ${recipient} - saw your take on ${protocol}.${hookText ? ` ${hookText}.` : ''} Manual execution lag is a killer.

We built AgentVault so you can spin up 24/7 autonomous trading agents in plain English. No code needed. Capping our private alpha at 50 slots. Let me know if you want in!`,
    
    // Gated 50 Slots Hook
    (recipient, protocol, hookText, sender) => 
`Yo ${recipient}! Saw you in the ${protocol} threads.${hookText ? ` ${hookText}.` : ''}

We're launching AgentVault, a no-code portal for 24/7 crypto trading agents. Capping founding group at 50 users. Would love your feedback on the MVP. Drop an invite key? 🚀`
  ],
  
  linkedin: [
    // Governance Collaboration
    (recipient, protocol, hookText, sender) => 
`Hi ${recipient},

I came across your profile and noticed your work leading ${protocol}.${hookText ? ` ${hookText}.` : ''}

I'm reaching out from AgentVault. We've built a no-code platform that enables retail and student investors to build and deploy autonomous, 24/7 crypto trading agents. Given your interest in Web3 education and hands-on tooling, we'd love to partner with you to offer your members early access. 

Would you be open to a brief chat this week?

Best,
${sender}`,
    
    // University Guild Program
    (recipient, protocol, hookText, sender) => 
`Hi ${recipient},

I hope this finds you well. I've been following ${protocol} and noticed your involvement.${hookText ? ` ${hookText}.` : ''}

I'm reaching out from AgentVault. We're launching our 'Campus Yield Guild' program, giving select university blockchain organizations early access to build 24/7 autonomous trading agents without writing code. 

We'd love to discuss setting up a demo workshop/competition for your members. Do you have 10 minutes this week?

Best,
${sender}`,
    
    // Advisory Beta Slot
    (recipient, protocol, hookText, sender) => 
`Hi ${recipient},

I noticed your background in Web3 and your work with ${protocol}.${hookText ? ` ${hookText}.` : ''}

I'm building AgentVault. We allow users to spin up 24/7 autonomous trading agents from natural language prompts. We are capping our early feedback guild at 50 users, and I'd highly value your feedback as an advisor/builder. 

Would you be open to a brief conversation?

Best,
${sender}`
  ]
};

// Initialize elements once DOM loads
document.addEventListener('DOMContentLoaded', () => {
  renderHookSelector();
  updateOutreach();
});

// Tab Navigation Logic
function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(`${tabId}-tab`).classList.add('active');
  
  // Find button by text matching or custom attributes
  const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');
}

// Platform selector
function setPlatform(platform) {
  activePlatform = platform;
  activeHookIndex = 0; // reset active hook

  // Deactivate all platform buttons
  const buttons = document.querySelectorAll('.platform-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const selectedBtn = document.querySelector(`.platform-btn[data-platform="${platform}"]`);
  if (selectedBtn) selectedBtn.classList.add('active');

  // Rerender hook options and update message
  renderHookSelector();
  updateOutreach();
}

// Render Hook Selector Options
function renderHookSelector() {
  const container = document.getElementById('hook-container');
  if (!container) return;
  
  container.innerHTML = '';
  const currentHooks = hooks[activePlatform];
  
  currentHooks.forEach((hook, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `hook-option ${index === activeHookIndex ? 'active' : ''}`;
    btn.innerHTML = `<strong>${hook.name}</strong><br><span style="font-size: 0.75rem; opacity: 0.85;">${hook.label}</span>`;
    btn.onclick = () => {
      activeHookIndex = index;
      document.querySelectorAll('.hook-option').forEach((opt, idx) => {
        if (idx === index) opt.classList.add('active');
        else opt.classList.remove('active');
      });
      updateOutreach();
    };
    container.appendChild(btn);
  });
}

// Generate the message dynamically and sync print preview elements
function updateOutreach() {
  const recipientInput = document.getElementById('recipient-name');
  const protocolInput = document.getElementById('protocol-name');
  const customHookInput = document.getElementById('custom-hook');
  const senderInput = document.getElementById('sender-name');
  
  if (!recipientInput) return;

  const recipient = recipientInput.value.trim() || '[Recipient Name]';
  const protocol = protocolInput.value.trim() || '[Project/Protocol]';
  const customHook = customHookInput.value.trim() || '';
  const sender = senderInput.value.trim() || '[Your Name]';

  // Render text for current tab
  const message = templates[activePlatform][activeHookIndex](recipient, protocol, customHook, sender);
  
  // Update UI Elements based on platform styling
  const chatPreviewBox = document.getElementById('chat-preview-box');
  const chatHeaderTitle = document.getElementById('chat-header-title');
  const chatBodyContent = document.getElementById('chat-body-content');
  
  if (chatPreviewBox && chatHeaderTitle && chatBodyContent) {
    // Reset classes
    chatPreviewBox.className = 'chat-window ' + activePlatform + '-theme';
    chatHeaderTitle.textContent = recipient;
    
    // Load platform specific HTML structures
    if (activePlatform === 'discord') {
      chatBodyContent.innerHTML = `
        <div class="avatar">${sender.charAt(0).toUpperCase()}</div>
        <div class="message-container">
          <div class="user-meta">
            <span class="username">${sender}</span>
            <span class="timestamp">Today at ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div class="message-text">${escapeHtml(message)}</div>
        </div>
      `;
    } else if (activePlatform === 'twitter') {
      chatBodyContent.innerHTML = `
        <div class="message-wrapper">
          <div class="bubble">${escapeHtml(message)}</div>
          <div class="timestamp">Sent • ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
      `;
    } else if (activePlatform === 'linkedin') {
      chatBodyContent.innerHTML = `
        <div class="message-card">
          <div class="user-meta">
            <div class="avatar">${sender.charAt(0).toUpperCase()}</div>
            <div>
              <span class="username">${sender}</span>
              <span class="title">Business Development at AgentVault</span>
            </div>
          </div>
          <div class="message-text">${escapeHtml(message)}</div>
        </div>
      `;
    }
  }

  // Synchronize print layout previews
  const printDiscord = document.getElementById('print-discord-outreach');
  const printTwitter = document.getElementById('print-twitter-outreach');
  const printLinkedin = document.getElementById('print-linkedin-outreach');

  // Print previews use the first hook (or default)
  if (printDiscord) printDiscord.textContent = templates['discord'][0](recipient, protocol, customHook, sender);
  if (printTwitter) printTwitter.textContent = templates['twitter'][0](recipient, protocol, customHook, sender);
  if (printLinkedin) printLinkedin.textContent = templates['linkedin'][0](recipient, protocol, customHook, sender);
}

// Escape HTML utility
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Copy to Clipboard logic
function copyToClipboard() {
  const recipientInput = document.getElementById('recipient-name');
  const protocolInput = document.getElementById('protocol-name');
  const customHookInput = document.getElementById('custom-hook');
  const senderInput = document.getElementById('sender-name');
  
  if (!recipientInput) return;

  const recipient = recipientInput.value.trim() || '[Recipient Name]';
  const protocol = protocolInput.value.trim() || '[Project/Protocol]';
  const customHook = customHookInput.value.trim() || '';
  const sender = senderInput.value.trim() || '[Your Name]';

  const text = templates[activePlatform][activeHookIndex](recipient, protocol, customHook, sender);
  
  navigator.clipboard.writeText(text).then(() => {
    // Show toast
    const copyToast = document.getElementById('copy-toast');
    if (copyToast) {
      copyToast.classList.add('show');
      setTimeout(() => {
        copyToast.classList.remove('show');
      }, 2000);
    }
    
    // Add success class to button
    const copyButton = document.getElementById('copy-button');
    if (copyButton) {
      copyButton.classList.add('copied');
      const btnSpan = copyButton.querySelector('span');
      btnSpan.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.classList.remove('copied');
        btnSpan.textContent = 'Copy Copy';
      }, 2000);
    }
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

// Accordion Logic for Campaigns
function toggleCampaign(campId) {
  const card = document.getElementById(`${campId}-card`);
  
  if (card) {
    const isOpen = card.classList.contains('open');
    
    // Close all first for clean accordion experience
    document.querySelectorAll('.campaign-card').forEach(c => {
      c.classList.remove('open');
    });
    
    if (!isOpen) {
      card.classList.add('open');
    }
  }
}
