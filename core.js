// js/core.js
const UI = {
    showLoading() { document.getElementById("spinner-overlay").style.display = "flex"; },
    hideLoading() { document.getElementById("spinner-overlay").style.display = "none"; },
    
    togglePassword(id) {
        const el = document.getElementById(id);
        el.type = el.type === "password" ? "text" : "password";
        el.nextElementSibling.innerText = el.type === "password" ? "SHOW" : "HIDE";
    },

const Export = {
    pdf() {
        // This triggers the print dialog. 
        // Leaders can select "Save as PDF" to download the record.
        window.print();
    }
};

    logout() {
        localStorage.clear();
        window.location.href = "index.html";
    },

    checkAuth() {
        if (!localStorage.getItem("idToken")) {
            window.location.href = "index.html";
        }
    }
};
