const API_BASE = "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod";
const CIRCUITS = {
    "Gauteng Circuit": ["Daveyton","Tsakane","Soshanguve","Soweto","Vosloorus"],
    "Highveld Circuit": ["Badplaas","Breyton","Ermelo","Machododorp","Nhlazatshe","Secunda","Witbank"],
    "Lowveld Circuit": ["Barberton","Ka-Mhlutshwa","Matsulu","Mshadza","Ndlunkulu"],
    "Eswatini Circuit": ["Matsapha","Siteki"]
};

const API = {
    register_member: `${API_BASE}/register_member`,
    verify_member: `${API_BASE}/verify_member`,
    retrieve_members: `${API_BASE}/retrieve_branch_member`,
    update_finance: `${API_BASE}/update_finance`,
    get_finance_report: `${API_BASE}/get_finance_report`,
    view_apologies: `${API_BASE}/view_apologies`
};

const UI = {
    showLoading() {
        document.getElementById("spinner-overlay").style.display = "flex";
    },
    hideLoading() {
        document.getElementById("spinner-overlay").style.display = "none";
    }
};

const App = {
    currentMode: '',

    init() {
        this.populateDropdowns();
        
        // SECURITY GATE: Force Login
        if (!localStorage.getItem("role")) {
            this.navigate('screen-role');
        } else {
            this.setupDashboard();
            this.navigate('screen-dashboard');
        }
    },

    populateDropdowns() {
        const cSel = document.getElementById('reg-circuit-select');
        const bSel = document.getElementById('reg-branch-select');
        if (cSel) Object.keys(CIRCUITS).forEach(c => cSel.add(new Option(c, c)));
        if (bSel) Object.values(CIRCUITS).flat().forEach(b => bSel.add(new Option(b, b)));
    },

    // --- AUTH & NAVIGATION ---
   navigate(id) {
    // Strict Guard: No access to dashboard screens without role
    const publicScreens = ['screen-role', 'screen-login', 'screen-signup'];  // ADD screen-signup HERE
    if (!localStorage.getItem("role") && !publicScreens.includes(id)) {
        id = 'screen-role';
    }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
    document.getElementById(id).classList.add('active-screen');
},

    togglePassword(id) {
        const input = document.getElementById(id);
        input.type = input.type === 'password' ? 'text' : 'password';
    },

    toggleRoleFields() {
        const role = document.getElementById('role-select').value;
        document.getElementById('circuit-select-group').style.display = (role === 'CIRCUIT') ? 'block' : 'none';
        document.getElementById('branch-select-group').style.display = (role === 'BRANCH') ? 'block' : 'none';
    },

    // --- ROLE SELECTION & REGISTRATION ---
    handleRoleSelection() {
        const role = document.getElementById('role-select').value;
        
        if (!role) {
            alert("Please select a role");
            return;
        }
        
        // Store the selected role
        localStorage.setItem("role", role);
        
        // Set location based on role
        if (role === 'BRANCH') {
            localStorage.setItem("location", document.getElementById('reg-branch-select').value);
            localStorage.setItem("branch", document.getElementById('reg-branch-select').value);
        } else if (role === 'CIRCUIT') {
            localStorage.setItem("location", document.getElementById('reg-circuit-select').value);
        } else {
            localStorage.setItem("location", "National HQ");
        }
        
        // Setup and navigate to dashboard
        this.setupDashboard();
        this.navigate('screen-dashboard');
    },

    signup() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const role = sessionStorage.getItem("signup-role");

        if (!name || !email || !password || !confirm) {
            alert("All fields are required");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Store signup data in localStorage (you'd send this to your API in production)
        localStorage.setItem("signup-name", name);
        localStorage.setItem("signup-email", email);
        localStorage.setItem("signup-role", role);
        
        if (sessionStorage.getItem("signup-branch")) {
            localStorage.setItem("signup-branch", sessionStorage.getItem("signup-branch"));
        }
        if (sessionStorage.getItem("signup-circuit")) {
            localStorage.setItem("signup-circuit", sessionStorage.getItem("signup-circuit"));
        }

        alert("Account created successfully! Please sign in.");
        
        // Clear signup fields
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('signup-confirm').value = '';
        
        this.navigate('screen-login');
    },

    // --- LOGIN ---
    login() {
        const role = document.getElementById('login-role').value;
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        if (!email || !pass) {
            alert("Credentials required");
            return;
        }

        localStorage.setItem("role", role);
        localStorage.setItem("location", role === 'BRANCH' ? "Tsakane" : "National HQ");
        if (role === 'BRANCH') {
            localStorage.setItem("branch", "Tsakane");
        }
        
        this.setupDashboard();
        this.navigate('screen-dashboard');
    },

    logout() {
        localStorage.clear();
        location.reload();
    },

    // --- DASHBOARD SETUP ---
    setupDashboard() {
        const role = localStorage.getItem("role");
        const loc = localStorage.getItem("location");
        const grid = document.getElementById("action-grid");
        grid.innerHTML = "";
        document.getElementById('dash-title').innerText = role + " HUB";
        document.getElementById('dash-subtitle').innerText = "Assigned to: " + loc;

        if (['NATIONAL', 'SECRETARY', 'FINANCE'].includes(role)) {
            this.addBtn("Content Management", () => this.navigate('screen-content-hub'), grid);
            this.addBtn("View Members", () => this.drillCircuits('MEMBERS'), grid);
            this.addBtn("Apology Audit", () => this.drillCircuits('APOLOGY'), grid);
            this.addBtn("Financial Audit", () => this.drillCircuits('FINANCE'), grid);
        } else if (role === 'BRANCH') {
            this.addBtn("Register Member", () => this.navigate('screen-member-register'), grid);
            this.addBtn("Branch Members", () => this.loadMembers(loc), grid);
            this.addBtn("Update Finance", () => this.navigate('screen-branch-finance'), grid);
        } else if (role === 'CIRCUIT') {
            this.addBtn("View Branches", () => this.drillBranches(loc, 'MEMBERS'), grid);
            this.addBtn("Circuit Financials", () => this.drillBranches(loc, 'FINANCE'), grid);
        }
    },

    addBtn(text, action, container) {
        const btn = document.createElement("button");
        btn.className = "button";
        btn.innerText = text;
        btn.onclick = action;
        container.appendChild(btn);
    },

    // --- DRILLDOWN LOGIC ---
    drillCircuits(mode) {
        this.currentMode = mode;
        const container = document.getElementById("drill-container");
        document.getElementById("drill-title").innerText = "Select Circuit";
        container.innerHTML = "";
        Object.keys(CIRCUITS).forEach(c => {
            this.addBtn(c, () => this.drillBranches(c, mode), container);
        });
        this.navigate('screen-drilldown');
    },

    drillBranches(circuit, mode) {
        const container = document.getElementById("drill-container");
        document.getElementById("drill-title").innerText = circuit + " Branches";
        container.innerHTML = "";
        CIRCUITS[circuit].forEach(b => {
            this.addBtn(b, () => this.loadRecords(b, mode), container);
        });
        this.navigate('screen-drilldown');
    },

    // --- DATA LOADING (MEMBERS / FINANCE / APOLOGY) ---
    async loadRecords(branch, mode) {
        this.navigate('screen-list');
        const container = document.getElementById('list-container');
        document.getElementById('list-title').innerText = `${branch} - ${mode}`;
        container.innerHTML = "Fetching...";

        let endpoint = (mode === 'FINANCE') ? API.get_finance_report : API.retrieve_members;
        if (mode === 'APOLOGY') endpoint = API.view_apologies;

        UI.showLoading();
        try {
            const res = await fetch(`${endpoint}?branch=${encodeURIComponent(branch)}`);
            const data = await res.json();
            container.innerHTML = "";

            if (mode === 'MEMBERS') {
                data.members.forEach(m => {
                    const card = document.createElement("div");
                    card.className = "record-card";
                    card.innerHTML = `
                        <b>${m.firstName} ${m.lastName}</b> 
                        ${m.isVerified ? '<span class="tick">✔ Verified</span>' : ''}
                        <br><small>${m.phone}</small>
                        ${(!m.isVerified && localStorage.getItem("role") === 'BRANCH') ? 
                        `<button class="button" style="width:auto; margin-top:5px;" onclick="App.verifyMember('${m.phone}','${branch}')">Verify</button>` : ''}
                    `;
                    container.appendChild(card);
                });
            } else if (mode === 'FINANCE') {
                data.forEach(f => {
                    const card = document.createElement("div");
                    card.className = "record-card";
                    card.innerHTML = `<b>${f.monthYear}</b><br>Total: R${f.totalOffering}<br><small>W1: ${f.week1} | W2: ${f.week2} | W3: ${f.week3} | W4: ${f.week4}</small>`;
                    container.appendChild(card);
                });
            }
        } catch(e) { 
            container.innerHTML = "No records found."; 
        }
        UI.hideLoading();
    },

    // --- BRANCH LEADER: MEMBER REGISTRATION WITH IMAGE ---
    async registerMember() {
        const name = document.getElementById('m-name').value;
        const phone = document.getElementById('m-phone').value;
        const photoFile = document.getElementById('m-photo').files[0];
        
        UI.showLoading();
        // 1. In a real S3 flow, you'd upload photoFile here to get a URL
        const imageUrl = "https://s3.amazonaws.com/hwbc/placeholder.jpg"; 

        const payload = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1] || "",
            phone: phone,
            branch: localStorage.getItem("branch"),
            imageUrl: imageUrl,
            isVerified: false // Starts as unverified
        };

        try {
            const res = await fetch(API.register_member, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if(res.ok) alert("Member Registered Successfully");
        } catch (e) { alert("Error: " + e.message); }
        UI.hideLoading();
    },

    // --- BRANCH LEADER: VERIFY MEMBER (THE GREEN TICK) ---
    async verifyMember(phone, branch) {
        if(!confirm("Verify this member?")) return;
        UI.showLoading();
        try {
            const res = await fetch(API.verify_member, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, branch, status: true })
            });
            if(res.ok) {
                alert("Member Verified!");
                this.loadMembers(branch); // Refresh the list to show tick
            }
        } catch (e) { alert("Verification failed"); }
        UI.hideLoading();
    },



    // --- LOAD MEMBERS (SHOWS GREEN TICK IF VERIFIED) ---
    async loadMembers(branch) {
        UI.showLoading();
        const container = document.getElementById("list-container");
        container.innerHTML = "Loading...";
        this.navigate('screen-list');

        try {
            const res = await fetch(`${API.retrieve_members}?branch=${encodeURIComponent(branch)}`);
            const data = await res.json();
            container.innerHTML = "";

            data.members.forEach(m => {
                const card = document.createElement("div");
                card.className = "record-card";
                const isVerified = m.isVerified === true; // The Green Tick logic

                card.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <b>${m.firstName} ${m.lastName}</b> 
                            ${isVerified ? '<span style="color:#4ade80; font-weight:bold; margin-left:10px;">✔ Verified</span>' : ''}
                            <br><small>${m.phone}</small>
                        </div>
                        ${(!isVerified && localStorage.getItem("role") === 'BRANCH') ? 
                          `<button class="button" style="width:auto; padding:5px 10px;" onclick="App.verifyMember('${m.phone}', '${branch}')">Verify</button>` : ''}
                    </div>
                `;
                container.appendChild(card);
            });
        } catch (e) { container.innerHTML = "Error loading members."; }
        UI.hideLoading();
    },

    // --- BRANCH LEADER: WEEKLY FINANCE UPDATE ---
    async updateWeeklyFinance() {
        const month = document.getElementById('fin-month').value;
        const week = document.getElementById('fin-week').value;
        const amount = document.getElementById('fin-amount').value;

        UI.showLoading();
        try {
            await fetch(API.update_finance, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    branchName: localStorage.getItem("branch"),
                    monthYear: month,
                    weekNumber: week,
                    amount: amount
                })
            });
            alert("Week " + week + " recorded!");
            this.navigate('screen-dashboard');
        } catch (e) { alert("Failed to update finance"); }
        UI.hideLoading();
    },

    // --- CONTENT MANAGEMENT ---
    openForm(type) {
        const container = document.getElementById('form-fields');
        document.getElementById('form-title').innerText = "Upload " + type;
        container.innerHTML = `
            <div class="input-group"><label>Title</label><input id="f-title" class="input-field"></div>
            <div class="input-group"><label>${type === 'SERMON' ? 'Preacher' : 'Artist'}</label><input id="f-desc" class="input-field"></div>
            <div class="input-group"><label>Select File</label><input type="file" id="f-media" class="input-field"></div>
            <div class="input-group"><label>Thumbnail/Poster</label><input type="file" id="f-thumb" class="input-field"></div>
        `;
        this.navigate('screen-form');
    },

    async submitContent() {
        alert("File Uploading to S3...");
        this.navigate('screen-dashboard');
    },

    async submitMemberRegistration() {
        await this.registerMember();
        this.navigate('screen-dashboard');
    },

    async submitWeeklyFinance() {
        await this.updateWeeklyFinance();
    }
};

window.onload = () => App.init();