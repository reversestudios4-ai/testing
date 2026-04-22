// dashboard/js/dashboard.js
const Dashboard = {
    init() {
        UI.checkAuth();
        const role = localStorage.getItem("role");
        const branch = localStorage.getItem("branch");
        const email = localStorage.getItem("email");

        document.getElementById("welcome-text").innerText = `Shalom, ${role}`;
        document.getElementById("user-info").innerText = `${email} | ${branch}`;

        this.setupRoleAccess(role);
    },

    setupRoleAccess(role) {
        const grid = document.getElementById("action-grid");
        const navNational = document.getElementById("nav-national");
        const navFinance = document.getElementById("nav-finance");
        const navBranch = document.getElementById("nav-branch");

        if (role === 'NATIONAL' || role === 'SECRETARY') {
            navNational.style.display = 'block';
            grid.innerHTML = `
                <button class="button" onclick="window.location.href='content.html?type=SERMON'">Manage Sermons</button>
                <button class="button" onclick="window.location.href='content.html?type=MUSIC'">Manage Music</button>
                <button class="button" onclick="window.location.href='content.html?type=EVENTS'">Manage Events</button>
<button class="button" onclick="window.location.href='content.html?type=YOUTH'">Manage Youth</button>
                <button class="button" onclick="window.location.href='apology_oversight.html'">Apology Audit</button>
            `;
        } else if (role === 'FINANCE') {
            navFinance.style.display = 'block';
            grid.innerHTML = `<button class="button" onclick="window.location.href='finance.html'">Audit Circuits</button>`;
        } else if (role === 'BRANCH') {
            navBranch.style.display = 'block';
            grid.innerHTML = `
                <button class="button" onclick="window.location.href='members.html'">Register Member</button>
                <button class="button" onclick="window.location.href='branch_finance.html'">Financial Update</button>
            `;
        }
    }
};

window.onload = () => Dashboard.init();