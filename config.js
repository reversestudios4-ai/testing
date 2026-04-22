// js/config.js
const API = {
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
    register_member: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/register_member",
    retrieve_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/retrieve_branch_member",
    view_circuit_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/view_circuit_members",
    view_all_members: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/retrieve_all_members",
    verify_member: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/verify_member",
    view_apologies: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/view_apologies",
    // Add all other content APIs here...

sermon: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/sermons",
music: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/music",
events: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/events",
gallery: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/gallery",
youth: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/youth",
kids: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/kids",
busaries: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/busaries",
tutotirials: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/educational_tutorials",
bootcamp: "https://byc6aq06e6.execute-api.us-east-1.amazonaws.com/prod/career_development",
};

const CIRCUITS = {
    "Gauteng Circuit": ["Daveyton","Tsakane","Soshanguve","Soweto","Vosloorus"],
    "Highveld Circuit": ["Badplaas","Breyton","Ermelo","Machododorp","Nhlazatshe","Secunda","Witbank"],
    "Lowveld Circuit": ["Barberton","Ka-Mhlutshwa","Matsulu","Mshadza","Ndlunkulu"],
    "Eswatini Circuit": ["Matsapha","Siteki"]
};