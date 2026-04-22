const Content = {    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        const container = document.getElementById('dynamic-form-fields');

        if (type === 'YOUTH') {
            document.getElementById('page-title').innerText = "Soccer Tournament";
            document.getElementById('page-desc').innerText = "Fixtures & Tournament Stats";
            
            container.innerHTML = `
                <label>Tournament Category</label>
                <select id="soccer-category" onchange="Content.toggleSoccerFields()">
                    <option value="FIXTURE">Match Fixtures & Results</option>
                    <option value="LOG">Team Standings (Log)</option>
                    <option value="SCORER">Goal Scorers</option>
                    <option value="SAVES">Goalkeeper Saves</option>
                </select>
                <div id="soccer-inputs"></div>
            `;
            this.toggleSoccerFields();
        }
    },

    toggleSoccerFields() {
        const category = document.getElementById('soccer-category').value;
        const inputs = document.getElementById('soccer-inputs');

        if (category === 'FIXTURE') {
            inputs.innerHTML = `
                <label>Match (e.g. Gauteng vs ESwatini)</label>
                <input type="text" id="f-match" placeholder="Home vs Away">
                <label>Date</label>
                <input type="date" id="f-date">
                <label>Venue</label>
                <input type="text" id="f-venue" placeholder="Tsakane grounds">
                <label>Time</label>
                <input type="text" id="f-time" placeholder="11:00am">
                <label>Score (use 'vs' if pending)</label>
                <input type="text" id="f-score" value="vs">
            `;
        } else if (category === 'LOG') {
            inputs.innerHTML = `
                <label>Team Name</label>
                <input type="text" id="l-team">
                <label>Won</label><input type="number" id="l-won" value="0">
                <label>Drawn</label><input type="number" id="l-drawn" value="0">
                <label>Lost</label><input type="number" id="l-lost" value="0">
            `;
        } else {
            const label = category === 'SCORER' ? "Goals" : "Saves";
            inputs.innerHTML = `
                <label>Team Name</label><input type="text" id="s-team">
                <label>Player Name</label><input type="text" id="s-player">
                <label>Number of ${label}</label><input type="number" id="s-count" value="0">
            `;
        }
    },

    async publish() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        let payload = {};

        if (type === 'YOUTH') {
            const category = document.getElementById('soccer-category').value;
            payload.type = `SOCCER_${category}`;
            
            if (category === 'FIXTURE') {
                payload.title = document.getElementById('f-match').value;
                payload.description = `${document.getElementById('f-time').value} @ ${document.getElementById('f-venue').value}`;
                payload.date = document.getElementById('f-date').value;
                payload.won = document.getElementById('f-score').value;
            } else if (category === 'LOG') {
                payload.title = document.getElementById('l-team').value;
                payload.won = document.getElementById('l-won').value;
                payload.drawn = document.getElementById('l-drawn').value;
                payload.lost = document.getElementById('l-lost').value;
            } else {
                payload.title = document.getElementById('s-player').value;
                payload.description = document.getElementById('s-team').value;
                payload.won = document.getElementById('s-count').value;
            }
        } else {
            // Standard Sermon/Music logic
            payload = {
                title: document.getElementById('content-title').value,
                description: document.getElementById('content-desc').value,
                type: type
            };
        }

        UI.showLoading();
        try {
            const res = await fetch(API.youth, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if(res.ok) alert("Tournament Updated!");
        } catch (e) { alert("Failed: " + e.message); }
        UI.hideLoading();
    }
};

window.onload = () => Content.init();