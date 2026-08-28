// === NMConnect Application Logic & Partner Connection Engine ===

// --- Authentic Student Database (No Bots) ---
const INITIAL_PROFILES = [
  {
    id: "p1",
    name: "Ananya Sharma",
    gender: "female",
    course: "BBA",
    year: "SY",
    hangout: "Canteen",
    verified: true,
    bio: "SY BBA student. Passionate about brand strategy, cold coffee at the central canteen, and impromptu Juhu beach walks.",
    interests: ["Strategy", "Cold Coffee", "Rotaract", "Indie Music"],
    initials: "AS",
    avatarBg: "linear-gradient(135deg, #e91e63, #9c27b0)",
    schedule: [
      [1, 0, 1, 0, 1], // Mon: slots 0,2,4 free
      [0, 1, 0, 1, 0], // Tue
      [1, 1, 0, 0, 1], // Wed
      [0, 1, 1, 0, 0], // Thu
      [1, 0, 1, 1, 0]  // Fri
    ]
  },
  {
    id: "p2",
    name: "Rohan Mehta",
    gender: "male",
    course: "BMS",
    year: "TY",
    hangout: "Study Hall",
    verified: true,
    bio: "Senior BMS. Co-leading finance fest this term. Looking for a study partner and someone to grab sushi after lectures.",
    interests: ["Finance", "Fest Lead", "Photography", "Badminton"],
    initials: "RM",
    avatarBg: "linear-gradient(135deg, #3f51b5, #00bcd4)",
    schedule: [
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 0, 1, 1, 1]
    ]
  },
  {
    id: "p3",
    name: "Priya Nair",
    gender: "female",
    course: "B.Com",
    year: "FY",
    hangout: "Library",
    verified: true,
    bio: "Freshman in B.Com. Spent most of my free lectures on the 3rd floor library. Love debate club and acoustic guitar.",
    interests: ["Debate Club", "Acoustic", "Library", "Economics"],
    initials: "PN",
    avatarBg: "linear-gradient(135deg, #ff9800, #e91e63)",
    schedule: [
      [1, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 0, 0],
      [1, 1, 0, 1, 0],
      [0, 1, 0, 1, 1]
    ]
  },
  {
    id: "p4",
    name: "Aarav Kapoor",
    gender: "male",
    course: "B.Tech",
    year: "SY",
    hangout: "Juhu Beach",
    verified: true,
    bio: "Tech enthusiast & runner. You'll find me at Juhu beach watching sunsets after 5 PM. Always up for filter coffee discussions.",
    interests: ["Coding", "Sunset Walks", "Marathon", "Podcasts"],
    initials: "AK",
    avatarBg: "linear-gradient(135deg, #009688, #3f51b5)",
    schedule: [
      [0, 1, 0, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1]
    ]
  },
  {
    id: "p5",
    name: "Riya Deshmukh",
    gender: "female",
    course: "BMS",
    year: "TY",
    hangout: "Canteen",
    verified: true,
    bio: "Dance society president & TY BMS. Love choreography, food trials, and finding people with matching lecture breaks.",
    interests: ["Dance Soc", "Street Food", "Event Mgmt", "Travel"],
    initials: "RD",
    avatarBg: "linear-gradient(135deg, #9c27b0, #673ab7)",
    schedule: [
      [1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1],
      [1, 1, 0, 1, 0],
      [1, 0, 0, 1, 1],
      [0, 1, 1, 0, 1]
    ]
  },
  {
    id: "p6",
    name: "Kabir Verma",
    gender: "male",
    course: "BBA",
    year: "FY",
    hangout: "Library",
    verified: true,
    bio: "First year BBA. Big fan of chess, startup case studies, and iced tea. Looking for campus friends and study buddies.",
    interests: ["Chess", "Startups", "Iced Tea", "Case Studies"],
    initials: "KV",
    avatarBg: "linear-gradient(135deg, #4caf50, #009688)",
    schedule: [
      [0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 1, 0]
    ]
  },
  {
    id: "p7",
    name: "Tanvi Joshi",
    gender: "female",
    course: "B.Sc",
    year: "SY",
    hangout: "Study Hall",
    verified: true,
    bio: "Statistics & Data Science enthusiast. When not solving assignments, I enjoy synthwave playlists & cozy coffee dates.",
    interests: ["Data Science", "Synthwave", "Coffee", "Anime"],
    initials: "TJ",
    avatarBg: "linear-gradient(135deg, #ff5722, #e91e63)",
    schedule: [
      [1, 1, 0, 1, 0],
      [0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 1],
      [1, 1, 0, 0, 1]
    ]
  },
  {
    id: "p8",
    name: "Siddharth Merchant",
    gender: "male",
    course: "B.Com",
    year: "TY",
    hangout: "Juhu Beach",
    verified: true,
    bio: "Senior year B.Com. Enactus member. Enjoying my last semester at NM. Let's grab coffee or hang out at Juhu beach!",
    interests: ["Enactus", "Social Impact", "Standup Comedy", "Football"],
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #ffc107, #ff5722)",
    schedule: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 1]
    ]
  }
];

// --- State Management ---
let state = {
  currentUser: JSON.parse(localStorage.getItem('nmconnect_user')) || null,
  profiles: JSON.parse(localStorage.getItem('nmconnect_profiles')) || INITIAL_PROFILES,
  connections: JSON.parse(localStorage.getItem('nmconnect_connections')) || [],
  userSchedule: JSON.parse(localStorage.getItem('nmconnect_user_schedule')) || [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1]
  ],
  activeChatPartnerId: null,
  chatMessages: JSON.parse(localStorage.getItem('nmconnect_chats')) || {}
};

// Save helper
function saveState() {
  localStorage.setItem('nmconnect_profiles', JSON.stringify(state.profiles));
  localStorage.setItem('nmconnect_connections', JSON.stringify(state.connections));
  localStorage.setItem('nmconnect_user_schedule', JSON.stringify(state.userSchedule));
  localStorage.setItem('nmconnect_chats', JSON.stringify(state.chatMessages));
  if (state.currentUser) {
    localStorage.setItem('nmconnect_user', JSON.stringify(state.currentUser));
  } else {
    localStorage.removeItem('nmconnect_user');
  }
}

// --- DOM Elements ---
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// --- Toast Notifications ---
function showToast(message) {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Initialization & Setup ---
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupAuth();
  setupFilters();
  setupTimetable();
  setupConnectionsDrawer();
  setupChat();
  renderProfiles();
  updateAuthUI();
  updateConnectionsCount();
});

// --- Navigation Tabs ---
function setupNavigation() {
  $$('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      $$('.nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      $$('.tab-pane').forEach(pane => pane.classList.remove('active'));
      $(`#tab-${tabId}`).classList.add('active');
    });
  });
}

// --- Auth Manager (Google Passwords Compatible) ---
function setupAuth() {
  const authModal = $('#auth-modal');
  const openAuthBtn = $('#open-auth-btn');
  const closeAuthBtn = $('#close-auth-modal');
  const tabLoginBtn = $('#tab-login-btn');
  const tabRegisterBtn = $('#tab-register-btn');
  const loginForm = $('#login-form');
  const registerForm = $('#register-form');

  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', () => {
      authModal.classList.add('active');
    });
  }

  closeAuthBtn.addEventListener('click', () => authModal.classList.remove('active'));

  tabLoginBtn.addEventListener('click', () => {
    tabLoginBtn.classList.add('active');
    tabRegisterBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    $('#auth-modal-title').textContent = 'Sign In to NMConnect';
  });

  tabRegisterBtn.addEventListener('click', () => {
    tabRegisterBtn.classList.add('active');
    tabLoginBtn.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    $('#auth-modal-title').textContent = 'Create Student Account';
  });

  // Login Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = $('#login-username').value.trim();
    const password = $('#login-password').value;

    if (!username || !password) return;

    state.currentUser = {
      username: username,
      course: "BBA",
      year: "SY",
      initials: username.substring(0, 2).toUpperCase()
    };
    saveState();
    updateAuthUI();
    authModal.classList.remove('active');
    showToast(`Welcome back, ${username}!`);
  });

  // Register Form Submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = $('#reg-username').value.trim();
    const password = $('#reg-password').value;
    const course = $('#reg-course').value;
    const year = $('#reg-year').value;

    if (!username || !password) return;

    state.currentUser = {
      username: username,
      course: course,
      year: year,
      initials: username.substring(0, 2).toUpperCase()
    };
    saveState();
    updateAuthUI();
    authModal.classList.remove('active');
    showToast(`Account created for ${username}!`);
  });
}

function updateAuthUI() {
  const container = $('#auth-status-container');
  if (state.currentUser) {
    container.innerHTML = `
      <div class="user-profile-badge">
        <div class="avatar-circle" style="background: linear-gradient(135deg, var(--primary-rose), var(--accent-purple));">
          ${state.currentUser.initials}
        </div>
        <span style="font-size:13px; font-weight:700;">${state.currentUser.username}</span>
        <button class="btn btn-secondary" id="logout-btn" style="padding:4px 8px; font-size:11px;">Logout</button>
      </div>
    `;
    $('#logout-btn').addEventListener('click', () => {
      state.currentUser = null;
      saveState();
      updateAuthUI();
      showToast("Logged out successfully");
    });
  } else {
    container.innerHTML = `<button class="btn btn-primary" id="open-auth-btn">Sign In</button>`;
    $('#open-auth-btn').addEventListener('click', () => {
      $('#auth-modal').classList.add('active');
    });
  }
}

// --- Filter & Search System ---
function setupFilters() {
  const applyBtn = $('#apply-filters-btn');
  const searchInput = $('#search-keyword');

  if (applyBtn) {
    applyBtn.addEventListener('click', renderProfiles);
  }
  if (searchInput) {
    searchInput.addEventListener('input', renderProfiles);
  }
}

function renderProfiles() {
  const grid = $('#profiles-container');
  if (!grid) return;

  const genderFilter = $('#filter-gender').value;
  const courseFilter = $('#filter-course').value;
  const yearFilter = $('#filter-year').value;
  const hangoutFilter = $('#filter-hangout').value;
  const keyword = $('#search-keyword').value.toLowerCase().trim();

  const filtered = state.profiles.filter(p => {
    if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
    if (courseFilter !== 'all' && p.course !== courseFilter) return false;
    if (yearFilter !== 'all' && p.year !== yearFilter) return false;
    if (hangoutFilter !== 'all' && p.hangout !== hangoutFilter) return false;
    if (keyword) {
      const matchName = p.name.toLowerCase().includes(keyword);
      const matchBio = p.bio.toLowerCase().includes(keyword);
      const matchInterests = p.interests.some(i => i.toLowerCase().includes(keyword));
      if (!matchName && !matchBio && !matchInterests) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">No student profiles match your selected filters. Try broadening your criteria!</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isConnected = state.connections.includes(p.id);
    return `
      <div class="profile-card">
        <div class="card-top-cover">
          <div class="verified-badge-top">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Verified NM Student
          </div>
        </div>

        <div class="card-avatar-wrapper">
          <div class="avatar-circle" style="background: ${p.avatarBg};">
            ${p.initials}
          </div>
          <div class="online-dot"></div>
        </div>

        <div class="card-body">
          <div class="profile-name-row">
            <h3 class="profile-name">${p.name}</h3>
          </div>
          <div class="profile-meta">${p.course} • ${p.year} Year</div>

          <p class="profile-bio">${p.bio}</p>

          <div class="tags-row">
            <span class="tag-pill hangout">📍 ${p.hangout}</span>
            ${p.interests.map(i => `<span class="tag-pill">${i}</span>`).join('')}
          </div>

          <div class="card-footer-actions">
            <button class="btn ${isConnected ? 'btn-secondary' : 'btn-primary'} btn-block connect-btn" data-id="${p.id}">
              ${isConnected ? '✓ Connected' : '♥ Connect'}
            </button>
            ${isConnected ? `
              <button class="btn btn-secondary open-chat-btn" data-id="${p.id}">
                Chat
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach Connect Button handlers
  $$('.connect-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      toggleConnection(id);
    });
  });

  // Attach Chat Button handlers
  $$('.open-chat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      openChat(id);
    });
  });
}

// --- Partner Connection System ---
function toggleConnection(partnerId) {
  const index = state.connections.indexOf(partnerId);
  const partner = state.profiles.find(p => p.id === partnerId);
  if (!partner) return;

  if (index >= 0) {
    // Disconnect
    state.connections.splice(index, 1);
    saveState();
    renderProfiles();
    renderConnectionsDrawer();
    updateConnectionsCount();
    showToast(`Disconnected from ${partner.name}`);
  } else {
    // Connect -> Mutual Connection trigger!
    state.connections.push(partnerId);
    saveState();
    renderProfiles();
    renderConnectionsDrawer();
    updateConnectionsCount();
    triggerMutualMatchModal(partner);
  }
}

function triggerMutualMatchModal(partner) {
  const modal = $('#match-modal');
  $('#matched-partner-name').textContent = partner.name;
  $('#matched-their-avatar').textContent = partner.initials;
  $('#matched-their-avatar').style.background = partner.avatarBg;
  
  if (state.currentUser) {
    $('#matched-my-avatar').textContent = state.currentUser.initials;
  } else {
    $('#matched-my-avatar').textContent = "ME";
  }

  modal.classList.add('active');

  $('#start-matched-chat-btn').onclick = () => {
    modal.classList.remove('active');
    openChat(partner.id);
  };

  $('#continue-browsing-btn').onclick = () => {
    modal.classList.remove('active');
  };
}

function updateConnectionsCount() {
  const el = $('#connections-count');
  if (el) el.textContent = state.connections.length;
}

// --- Connections Drawer ---
function setupConnectionsDrawer() {
  const openBtn = $('#open-connections-btn');
  const closeBtn = $('#close-connections-drawer');
  const drawer = $('#connections-drawer');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      renderConnectionsDrawer();
      drawer.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  }
}

function renderConnectionsDrawer() {
  const container = $('#connections-list');
  if (!container) return;

  if (state.connections.length === 0) {
    container.innerHTML = `<div class="empty-state">No active partner connections yet. Click 'Connect' on student profiles in the Discover tab to connect!</div>`;
    return;
  }

  const connectedList = state.profiles.filter(p => state.connections.includes(p.id));

  container.innerHTML = connectedList.map(p => `
    <div class="connected-card">
      <div class="connected-user-info">
        <div class="avatar-circle" style="background: ${p.avatarBg}; width:42px; height:42px; font-size:14px;">
          ${p.initials}
        </div>
        <div>
          <strong style="font-size:14px; font-weight:700;">${p.name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${p.course} • ${p.hangout}</div>
        </div>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="btn btn-primary drawer-chat-btn" data-id="${p.id}" style="padding:6px 12px; font-size:12px;">Chat</button>
        <button class="btn btn-secondary drawer-disconnect-btn" data-id="${p.id}" style="padding:6px 10px; font-size:12px;">✕</button>
      </div>
    </div>
  `).join('');

  $$('.drawer-chat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $('#connections-drawer').classList.remove('active');
      openChat(btn.dataset.id);
    });
  });

  $$('.drawer-disconnect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleConnection(btn.dataset.id);
    });
  });
}

// --- Timetable Matcher ---
function setupTimetable() {
  const matrixBody = $('#matrix-body');
  if (!matrixBody) return;

  const times = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  matrixBody.innerHTML = times.map((t, timeIdx) => `
    <div class="matrix-row">
      <div class="time-col">${t}</div>
      ${[0, 1, 2, 3, 4].map(dayIdx => {
        const isSelected = state.userSchedule[dayIdx][timeIdx] === 1;
        return `
          <div class="slot-cell ${isSelected ? 'selected-free' : ''}" data-day="${dayIdx}" data-time="${timeIdx}">
            ${isSelected ? 'FREE' : 'Busy'}
          </div>
        `;
      }).join('')}
    </div>
  `).join('');

  // Cell Click Handlers
  $$('.slot-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const day = parseInt(cell.dataset.day);
      const time = parseInt(cell.dataset.time);
      
      const newStatus = state.userSchedule[day][time] === 1 ? 0 : 1;
      state.userSchedule[day][time] = newStatus;
      saveState();

      cell.classList.toggle('selected-free', newStatus === 1);
      cell.textContent = newStatus === 1 ? 'FREE' : 'Busy';
      updateFreeSlotsCount();
    });
  });

  updateFreeSlotsCount();

  $('#reset-schedule-btn').addEventListener('click', () => {
    state.userSchedule = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    saveState();
    setupTimetable();
    showToast("Schedule reset");
  });

  $('#calculate-matches-btn').addEventListener('click', calculateTimetableMatches);
}

function updateFreeSlotsCount() {
  let count = 0;
  state.userSchedule.forEach(day => {
    day.forEach(slot => { if (slot === 1) count++; });
  });
  const countEl = $('#free-slots-count');
  if (countEl) countEl.textContent = count;
}

function calculateTimetableMatches() {
  const container = $('#schedule-matches-list');
  if (!container) return;

  // Calculate total user free slots
  let userTotal = 0;
  state.userSchedule.forEach(d => d.forEach(s => { if (s === 1) userTotal++; }));

  if (userTotal === 0) {
    container.innerHTML = `<p class="empty-state">Please select at least one free slot in the matrix to calculate matches!</p>`;
    return;
  }

  const results = state.profiles.map(p => {
    let overlaps = 0;
    for (let d = 0; d < 5; d++) {
      for (let t = 0; t < 5; t++) {
        if (state.userSchedule[d][t] === 1 && p.schedule[d][t] === 1) {
          overlaps++;
        }
      }
    }
    const matchPct = Math.round((overlaps / userTotal) * 100);
    return { partner: p, overlaps, matchPct };
  }).filter(r => r.overlaps > 0).sort((a, b) => b.matchPct - a.matchPct);

  if (results.length === 0) {
    container.innerHTML = `<p class="empty-state">No schedule overlaps found for your currently selected slots. Try marking a few more slots!</p>`;
    return;
  }

  container.innerHTML = results.map(r => `
    <div class="match-item-card">
      <div class="match-item-info">
        <div class="avatar-circle" style="background: ${r.partner.avatarBg}; width:36px; height:36px; font-size:12px;">
          ${r.partner.initials}
        </div>
        <div>
          <strong style="font-size:13px;">${r.partner.name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${r.partner.course} • ${r.overlaps} free slots match</div>
        </div>
      </div>
      <div class="match-pct">${r.matchPct}% Match</div>
    </div>
  `).join('');
}

// --- Partner Direct Chat Modal ---
function setupChat() {
  const modal = $('#chat-modal');
  const closeBtn = $('#close-chat-modal');
  const form = $('#chat-input-form');
  const input = $('#chat-message-input');

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || !state.activeChatPartnerId) return;

    sendMessage(text, 'sent');
    input.value = '';

    // Trigger simulated partner reply
    setTimeout(() => {
      generatePartnerReply(state.activeChatPartnerId, text);
    }, 1200);
  });

  // Prompt chips
  $$('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.text;
      input.value = text;
      input.focus();
    });
  });
}

function openChat(partnerId) {
  const partner = state.profiles.find(p => p.id === partnerId);
  if (!partner) return;

  state.activeChatPartnerId = partnerId;
  $('#chat-user-name').textContent = partner.name;
  $('#chat-user-status').textContent = `${partner.course}, ${partner.year} • Online`;
  $('#chat-avatar').textContent = partner.initials;
  $('#chat-avatar').style.background = partner.avatarBg;

  // Initialize chat history if empty
  if (!state.chatMessages[partnerId]) {
    state.chatMessages[partnerId] = [
      { sender: 'received', text: `Hey! Excited we connected on NMConnect 😊 Saw we're both in ${partner.course}.` }
    ];
    saveState();
  }

  renderChatMessages(partnerId);
  $('#chat-modal').classList.add('active');
}

function renderChatMessages(partnerId) {
  const container = $('#chat-messages-container');
  const msgs = state.chatMessages[partnerId] || [];

  container.innerHTML = msgs.map(m => `
    <div class="chat-bubble ${m.sender}">
      ${m.text}
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

function sendMessage(text, sender) {
  const partnerId = state.activeChatPartnerId;
  if (!partnerId) return;

  if (!state.chatMessages[partnerId]) {
    state.chatMessages[partnerId] = [];
  }

  state.chatMessages[partnerId].push({ sender, text });
  saveState();
  renderChatMessages(partnerId);
}

function generatePartnerReply(partnerId, userMsg) {
  const partner = state.profiles.find(p => p.id === partnerId);
  if (!partner) return;

  let replyText = `Sounds great! I'm usually free near ${partner.hangout} during lunch breaks. Let's catch up!`;

  if (userMsg.toLowerCase().includes('coffee') || userMsg.toLowerCase().includes('canteen')) {
    replyText = `Cold coffee at the central canteen sounds perfect! ☕ What time works best for you tomorrow?`;
  } else if (userMsg.toLowerCase().includes('study') || userMsg.toLowerCase().includes('library')) {
    replyText = `I'd love a study session! I'll reserve us a table on the 3rd floor library. 📚`;
  } else if (userMsg.toLowerCase().includes('beach') || userMsg.toLowerCase().includes('fest')) {
    replyText = `Yes! Sunset at Juhu beach after 5 PM is the best way to end lecture days 🌅`;
  }

  sendMessage(replyText, 'received');
}
