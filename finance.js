const Finance = {
    // --- BRANCH LEADER: SUBMIT WEEKLY ---
    async submitUpdate() {
        const branch = localStorage.getItem("branch");
        const month = document.getElementById('fin-month').value; // YYYY-MM
        const week = document.getElementById('fin-week').value;   // 1, 2, 3, 4
        const amount = document.getElementById('fin-amount').value;

        UI.showLoading();
        try {
            const res = await fetch(API.update_finance, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    branchName: branch,
                    monthYear: month,
                    weekNumber: week,
                    amount: amount
                })
            });
            if(res.ok) {
                alert(`Week ${week} Updated. Total recalculated.`);
                window.location.reload();
            }
        } catch (e) { alert("Finance update failed"); }
        finally { UI.hideLoading(); }
    },

    // --- AUDIT VIEW (FINANCE/NATIONAL LEADER) ---
    async loadReport(branchName) {
        UI.showLoading();
        try {
            const res = await fetch(`${API.get_finance}?branch=${encodeURIComponent(branchName)}`);
            const data = await res.json();
            
            const tbody = document.getElementById("member-audit-body");
            tbody.innerHTML = "";
            
            data.forEach(rec => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${rec.monthYear}</td>
                    <td>R${rec.totalOffering}</td>
                    <td><small>W1: ${rec.week1} | W2: ${rec.week2} | W3: ${rec.week3} | W4: ${rec.week4}</small></td>
                    <td><span class="status-paid">SUBMITTED</span></td>
                `;
                tbody.appendChild(tr);
            });
            document.getElementById('audit-results').style.display = 'block';
        } catch (e) { alert("Error loading report"); }
        finally { UI.hideLoading(); }
    }
};