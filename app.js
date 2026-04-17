const API = {
    // Leadership Auth
    signup_national: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/signup_national",
    signin_national: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/signin_national",
    signup_secretary: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/secretary_signup",
    signin_secretary: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/secretary_signin",
    signup_finance: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/finance_signup",
    signin_finance: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/finance_signin",
    signup_circuit: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/hwbc_signup_circut",
    signin_circuit: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/hwbc_circut_signin",
    signup_branch: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/signup_branch",
    signin_branch: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/signin_branch",

    // Member Management
    register_member: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/register_member",
    retrieve_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/retrieve_branch_member",
    view_circuit_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/view_circuit_members",
    view_all_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/retrieve_all_members",
    download_member_pdf: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/download_member_pdf",

    // Finance & Audit
    verify_member: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/verify_member",
    update_finance: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/update_finance",
    get_finance_report: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/get_finance_report",

    // Content Publishing
    sermons: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/sermons",
    music: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/music",
    events: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/events",
    gallery: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/gallery",
    youth: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/youth",
    kids: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/kids",
    socials: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/socials",
    busaries: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/busaries",
    career_development: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/career_development",
    educational_tutorials: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/educational_tutorials",

    // Leaders
    view_all_leaders: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/view_all_leaders"
};

const App = {
    circuits: {
        "Gauteng Circuit": ["Daveyton","Tsakane","Soshanguve","Soweto","Vosloorus"],
        "Highveld Circuit": ["Badplaas","Breyton","Ermelo","Machododorp","Nhlazatshe","Secunda","Witbank"],
        "Lowveld Circuit": ["Barberton","Ka-Mhlutshwa","Matsulu","Mshadza","Ndlunkulu"],
        "Eswatini Circuit": ["Matsapha","Siteki"]
    },

    init() {
        console.log('App init called');
        this.populateSelects();
    },

    populateSelects() {
        console.log('Populating selects');
        const branchSelect = document.getElementById('branch-select');
        const circuitSelect = document.getElementById('circuit-select');
        const loginRoleSelect = document.getElementById('login-role');
        const roleSelect = document.getElementById('role-select');

        console.log('roleSelect:', roleSelect);
        console.log('loginRoleSelect:', loginRoleSelect);

        // Populate branches from all circuits
        const allBranches = Object.values(this.circuits).flat();
        allBranches.forEach(branch => {
            const option = document.createElement('option');
            option.value = branch;
            option.textContent = branch;
            branchSelect.appendChild(option);
        });

        // Populate circuits
        Object.keys(this.circuits).forEach(circuit => {
            const option = document.createElement('option');
            option.value = circuit;
            option.textContent = circuit;
            circuitSelect.appendChild(option);
        });

        // Populate roles
        const roles = [
            { value: 'NATIONAL', text: 'National Leader' },
            { value: 'SECRETARY', text: 'Secretary' },
            { value: 'FINANCE', text: 'Finance Leader' },
            { value: 'BRANCH', text: 'Branch Leader' },
            { value: 'CIRCUIT', text: 'Circuit Leader' }
        ];
        roles.forEach(role => {
            const option1 = document.createElement('option');
            option1.value = role.value;
            option1.textContent = role.text;
            roleSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = role.value;
            option2.textContent = role.text;
            loginRoleSelect.appendChild(option2);
        });

        console.log('roleSelect options length:', roleSelect.options.length);
        console.log('loginRoleSelect options length:', loginRoleSelect.options.length);
    },

    togglePassword(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.type = el.type === "password" ? "text" : "password";
        const toggleBtn = el.parentElement.querySelector('.toggle-pass');
        if (toggleBtn) {
            toggleBtn.innerText = el.type === "password" ? "SHOW" : "HIDE";
        }
    },

    navigate(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
        document.getElementById(id).classList.add('active-screen');
    },

    showLoading() { document.getElementById("spinner-overlay").style.display = "flex"; },
    hideLoading() { document.getElementById("spinner-overlay").style.display = "none"; },

    toggleBranchList() {
        const role = document.getElementById('role-select').value;
        document.getElementById('branch-select-group').style.display = (role === 'BRANCH') ? 'block' : 'none';
        document.getElementById('circuit-select-group').style.display = (role === 'CIRCUIT') ? 'block' : 'none';
    },

    handleRoleSelection() {
        this.role = document.getElementById('role-select').value;
        if (this.role === 'NATIONAL' || this.role === 'SECRETARY' || this.role === 'FINANCE') {
            this.branch = 'National HQ';
        } else if (this.role === 'BRANCH') {
            this.branch = document.getElementById('branch-select').value;
        } else if (this.role === 'CIRCUIT') {
            this.branch = document.getElementById('circuit-select').value;
        }
        if (!this.role || !this.branch) return alert("Selection required.");
        this.navigate('screen-register');
    },

    async register() {
        this.showLoading();
        try {
            const url = API[`signup_${this.role.toLowerCase()}`] || API.signup_branch;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById("reg-email").value,
                    password: document.getElementById("reg-password").value,
                    role: this.role,
                    branch: this.branch,
                    username: document.getElementById("reg-username").value
                })
            });
            if (!res.ok) throw new Error("Registration Failed");
            alert("Leader Registered Successfully");
            this.navigate('screen-login');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    async login() {
        const role = document.getElementById("login-role").value;
        this.showLoading();
        try {
            const url = API[`signin_${role.toLowerCase()}`] || API.signin_branch;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById("login-email").value,
                    password: document.getElementById("login-password").value
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login Failed");

            localStorage.setItem("idToken", data.AuthenticationResult.IdToken);
            localStorage.setItem("role", data.role);
            localStorage.setItem("branch", data.branch || data.circuit);

            document.getElementById("user-display").innerText = `HWBC DASHBOARD ADMIN - Role: ${data.role} | Location: ${data.branch || data.circuit || "National HQ"}`;

            // Reset Sections
            document.getElementById('national-section').style.display = 'none';
            document.getElementById('finance-section').style.display = 'none';
            document.getElementById('branch-section').style.display = 'none';
            document.getElementById('circuit-section').style.display = 'none';

            // Role Routing
            if (data.role === 'NATIONAL' || data.role === 'SECRETARY') {
                document.getElementById('national-section').style.display = 'grid';
            } else if (data.role === 'FINANCE') {
                document.getElementById('finance-section').style.display = 'block';
                this.renderFinanceDashboard('REG');
            } else if (data.role === 'BRANCH') {
                document.getElementById('branch-section').style.display = 'grid';
            } else if (data.role === 'CIRCUIT') {
                document.getElementById('circuit-section').style.display = 'grid';
                // Circuit dashboard is ready
            }

            this.navigate("screen-dashboard");
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    // --- FINANCE LEADER LOGIC ---
    renderFinanceDashboard(type) {
        const container = document.getElementById("finance-circuit-container");
        container.innerHTML = "<h3>Select Circuit</h3>";
        Object.keys(this.circuits).forEach(circuit => {
            const btn = document.createElement("button");
            btn.className = "button";
            btn.innerText = circuit;
            btn.onclick = () => this.renderFinanceBranches(circuit, type);
            container.appendChild(btn);
        });
    },

    renderFinanceBranches(circuit, type) {
        const container = document.getElementById("finance-circuit-container");
        container.innerHTML = `<h3>${circuit} Branches</h3>`;
        this.circuits[circuit].forEach(branch => {
            const btn = document.createElement("button");
            btn.className = "button btn-secondary";
            btn.innerText = branch;
            btn.onclick = () => this.viewBranchAudit(branch, type);
            container.appendChild(btn);
        });
    },

    async viewBranchAudit(branchName, type) {
        this.showLoading();
        try {
            const res = await fetch(`${API.retrieve_members}?branch=${branchName}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                }
            });
            const data = await res.json();
            const list = document.getElementById("finance-member-list");
            list.innerHTML = `<h4>Audit: ${branchName}</h4>`;
            
            data.members.forEach(m => {
                const isPaid = (type === 'REG' ? m.isVerified : m.offeringStatus);
                const div = document.createElement("div");
                div.className = "member-card";
                div.innerHTML = `
                    <div style="flex:1"><b>${m.firstName} ${m.lastName}</b><br>
                    Status: <span style="color:${isPaid ? '#4CAF50' : '#FF5252'}">${isPaid ? 'PAID' : 'PENDING'}</span></div>
                    <button class="button tab-btn" style="width:auto" onclick="window.open('${m.depositSlip}')">SLIP</button>
                `;
                list.appendChild(div);
            });
            this.navigate('screen-finance-members');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    // --- BRANCH LEADER LOGIC ---
    async registerMember() {
        this.showLoading();
        try {
            const payload = {
                firstName: document.getElementById("m-first").value,
                lastName: document.getElementById("m-last").value,
                address: document.getElementById("m-address").value,
                branch: localStorage.getItem("branch"),
                timestamp: new Date().toLocaleString()
            };
            const res = await fetch(API.register_member, { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                },
                body: JSON.stringify(payload) 
            });
            if (res.ok) alert("Member Registered & Professional PDF Generated!");
            this.navigate('screen-dashboard');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    async viewBranchMembers() {
        this.showLoading();
        try {
            const branch = localStorage.getItem("branch");
            const res = await fetch(`${API.retrieve_members}?branch=${branch}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                }
            });
            const data = await res.json();
            const list = document.getElementById("finance-member-list"); // Reuse for simplicity
            list.innerHTML = `<h4>Members: ${branch}</h4>`;
            data.members.forEach(m => {
                const div = document.createElement("div");
                div.className = "member-card";
                div.innerHTML = `<b>${m.firstName} ${m.lastName}</b><br>${m.address}`;
                list.appendChild(div);
            });
            this.navigate('screen-finance-members');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    // --- CIRCUIT LEADER LOGIC ---
    async viewCircuitMembers() {
        this.showLoading();
        try {
            const circuit = localStorage.getItem("branch");
            const res = await fetch(`${API.view_circuit_members}?circuit=${circuit}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                }
            });
            const data = await res.json();
            const list = document.getElementById("finance-member-list");
            list.innerHTML = `<h4>Members in ${circuit}</h4>`;
            data.members.forEach(m => {
                const div = document.createElement("div");
                div.className = "member-card";
                div.innerHTML = `<b>${m.firstName} ${m.lastName}</b><br>Branch: ${m.branch}`;
                list.appendChild(div);
            });
            this.navigate('screen-finance-members');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    async viewCircuitFinances() {
        this.showLoading();
        try {
            const circuit = localStorage.getItem("branch");
            const res = await fetch(`${API.get_finance_report}?circuit=${circuit}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                }
            });
            const data = await res.json();
            const list = document.getElementById("finance-member-list");
            list.innerHTML = `<h4>Finances in ${circuit}</h4>`;
            // Assuming data has finance info
            data.reports.forEach(r => {
                const div = document.createElement("div");
                div.className = "member-card";
                div.innerHTML = `<b>${r.branch}</b><br>Total: ${r.total}`;
                list.appendChild(div);
            });
            this.navigate('screen-finance-members');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    // --- NATIONAL/SECRETARY LOGIC ---
    async openBranches() {
        // For now, show all circuits and branches
        this.renderFinanceDashboard('VIEW'); // Reuse for viewing
    },

    openSermons() { this.navigateContent('SERMONS', 'Preacher Name'); },
    openMusic() { this.navigateContent('MUSIC', 'Artist Name'); },
    openEvents() { this.navigateContent('EVENTS', 'Event Date'); },
    openBursaries() { this.navigateContent('BUSARIES', 'Closing Date'); },
    openGallery() { this.navigateContent('GALLERY', 'Description'); },

    navigateContent(type, label) {
        this.currentType = type;
        document.getElementById('mgmt-title').innerText = `Manage ${type}`;
        document.getElementById('mgmt-desc-label').innerText = label;
        this.navigate('screen-manage-content');
    },

    async saveContent() {
        this.showLoading();
        const endpoint = API[this.currentType.toLowerCase()];
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                },
                body: JSON.stringify({
                    title: document.getElementById('mgmt-name').value,
                    description: document.getElementById('mgmt-desc').value,
                    date: new Date().toLocaleDateString()
                })
            });
            if (res.ok) alert("Published Successfully!");
            this.navigate('screen-dashboard');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    async viewAllLeaders() {
        this.showLoading();
        try {
            const res = await fetch(API.view_all_leaders, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("idToken")}`
                }
            });
            const data = await res.json();
            const list = document.getElementById("leaders-list");
            list.innerHTML = `<h4>All Registered Leaders</h4>`;
            data.leaders.forEach(l => {
                const div = document.createElement("div");
                div.className = "member-card";
                div.innerHTML = `<b>${l.username}</b><br>Role: ${l.role}<br>Location: ${l.branch}`;
                list.appendChild(div);
            });
            this.navigate('screen-leaders');
        } catch (e) { alert(e.message); } finally { this.hideLoading(); }
    },

    logout() { localStorage.clear(); location.reload(); }
};

App.init();
window.App = App;