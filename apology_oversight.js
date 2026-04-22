const ApologyOversight = {
    selectedBranch: null,    init() {
        if (!UI.checkAuth()) return;
        this.renderCircuits();
    },

    renderCircuits() {
        const grid = document.getElementById("oversight-grid");
        document.getElementById("flow-title").innerText = "1. Select Circuit";
        grid.innerHTML = "";

        Object.keys(CIRCUITS).forEach(circuit => {
            const btn = document.createElement("button");
            btn.className = "button";
            btn.innerText = circuit;
            btn.onclick = () => this.renderBranches(circuit);
            grid.appendChild(btn);
        });
    },

    renderBranches(circuit) {
        const grid = document.getElementById("oversight-grid");
        document.getElementById("flow-title").innerText = `2. Select Branch in ${circuit}`;
        grid.innerHTML = "";

        CIRCUITS[circuit].forEach(branch => {
            const btn = document.createElement("button");
            btn.className = "button btn-secondary";
            btn.style.color = "var(--primary)";
            btn.style.borderColor = "var(--primary)";
            btn.innerText = branch;
            btn.onclick = () => this.fetchApologies(branch);
            grid.appendChild(btn);
        });

        // Add a back button to circuits
        const backBtn = document.createElement("button");
        backBtn.className = "button btn-secondary";
        backBtn.innerText = "← Back to Circuits";
        backBtn.onclick = () => this.renderCircuits();
        grid.appendChild(backBtn);
    },

    async fetchApologies(branchName) {
        const date = document.getElementById('apology-date').value;
        if (!date) return alert("Please select a date first");

        this.selectedBranch = branchName;
        UI.showLoading();

        try {
            // Correct API query using branch and date
            const url = `${API.view_apologies}?branch=${encodeURIComponent(branchName)}&date=${date}`;
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("idToken")}` }
            });
            const data = await res.json();

            this.displayResults(data, branchName, date);
        } catch (e) {
            alert("Error retrieving apologies: " + e.message);
        } finally {
            UI.hideLoading();
        }
    },

    displayResults(records, branch, date) {
        const container = document.getElementById("apology-list");
        document.getElementById("results-title").innerText = `${branch} - ${date}`;
        container.innerHTML = "";

        if (!records || records.length === 0) {
            container.innerHTML = "<p style='text-align:center; padding: 2rem;'>No apologies submitted for this date.</p>";
        } else {
            records.forEach(ap => {
                const item = document.createElement("div");
                item.className = "apology-item";
                item.innerHTML = `
                    <h4>${ap.memberName}</h4>
                    <p><strong>Reason:</strong> ${ap.reason}</p>
                    <small style="opacity:0.6">Signed: ${new Date(ap.timestamp).toLocaleString()}</small>
                `;
                container.appendChild(item);
            });
        }

        document.getElementById("results-area").style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    }
};

window.onload = () => ApologyOversight.init();