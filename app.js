"use strict";

const ENGINES = {
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q="
};

const form = document.getElementById("searchForm");
const domainInput = document.getElementById("domain");
const resultsDiv = document.getElementById("results");
const resultCount = document.getElementById("resultCount");
const errorDiv = document.getElementById("error");

let currentDomain = "";

function normalizeDomain(value) {
    let input = value.trim();

    if (!input) {
        throw new Error("Please enter a domain.");
    }

    // Accept both example.com and https://example.com.
    if (!/^[a-z][a-z\d+.-]*:\/\//i.test(input)) {
        input = `https://${input}`;
    }

    let url;

    try {
        url = new URL(input);
    } catch {
        throw new Error("Please enter a valid domain.");
    }

    if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are supported.");
    }

    if (
        url.username ||
        url.password ||
        !url.hostname.includes(".") ||
        url.hostname.startsWith(".") ||
        url.hostname.endsWith(".") ||
        url.hostname.includes("..") ||
        !/^[a-z\d.-]+$/i.test(url.hostname) ||
        url.hostname.split(".").some(
            part => !part || part.startsWith("-") || part.endsWith("-")
        )
    ) {
        throw new Error("Please enter a valid domain, such as example.com.");
    }

    return url.hostname.toLowerCase();
}

function getSelectedEngine() {
    return document.querySelector('input[name="engine"]:checked')?.value
        || "google";
}

function buildSearchUrl(query) {
    const engine = ENGINES[getSelectedEngine()];
    return engine + encodeURIComponent(query);
}

function showError(message = "") {
    errorDiv.textContent = message;
    errorDiv.hidden = !message;
}

function createQueryCard(query, index) {
    const card = document.createElement("article");
    card.className = "result-card";

    const top = document.createElement("div");
    top.className = "result-card-top";

    const number = document.createElement("span");
    number.className = "query-number";
    number.textContent = String(index).padStart(2, "0");

top.append(number);

    const queryText = document.createElement("code");
    queryText.className = "query-text";
    queryText.textContent = query;

    const actions = document.createElement("div");
    actions.className = "query-actions";

    const openLink = document.createElement("a");
    openLink.className = "open-link";
    openLink.href = buildSearchUrl(query);
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.textContent = `Search with ${getSelectedEngine()}`;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.textContent = "Copy query";

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(query);
            copyButton.textContent = "Copied!";
        } catch {
            copyButton.textContent = "Copy unavailable";
        }

        setTimeout(() => {
            copyButton.textContent = "Copy query";
        }, 1500);
    });

    actions.append(openLink, copyButton);
    card.append(top, queryText, actions);

    return card;
}

const DORKS = [
    'site:{domain} inurl:& | inurl:=',
    'site:{domain} ext:php | ext:aspx | ext:asp | ext:jsp | ext:jspx | ext:html | ext:htm | ext:xhtm | ext:cfm | ext:action | ext:struts | ext:do | ext:sql | ext:json | ext:xd | ext:axd | ext:svc | ext:svn | ext:swp | ext:nsf',
    'site:{domain} ext:txt | ext:ini | ext:pem | ext:key | ext:db | ext:env | ext:sh | ext:swp | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:reg | ext:inf | ext:rdp | ext:ora | ext:config | ext:cnf | ext:cfg | ext:conf | ext:dbf | ext:mdb | ext:log | ext:yml | ext:yaml | ext:json | ext:xml | "logs"',
    'site:{domain} inurl:return= | inurl:next= | inurl:redir= | inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page=',
    'site:{domain} ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup | ext:tar | ext:gz | ext:zip',
    'site:{domain}  ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv | ext:crt | ext:pfx | ext:xlsx | ext:xls',
    'site:{domain}  inurl:apidocs | inurl:swagger | inurl:api-explorer | inurl:api-docs | filetype:wsdl | filetype:WSDL | ext:svc | inurl:wsdl | Filetype: ?wsdl | inurl:asmx?wsdl | inurl:_vti_bin/sites.asmx?wsdl',
    'site:{domain} site:dev.azure.com {domain} | site:site:onedrive.live.com {domain} | site:digitaloceanspaces.com {domain} | site:sharepoint.com {domain} | site:s3-external-1.amazonaws.com {domain} | site:s3.dualstack.us-east-1.amazonaws.com {domain} | site:dropbox.com/s {domain} | site:box.com/s {domain} | site:docs.google.com inurl:"/d/" {domain} | site:s3.amazonaws.com {domain} | site:blob.core.windows.net {domain} | site:googleapis.com {domain} | site:drive.google.com {domain}',
    'site:{domain}  intitle:"index of /admin" "admin"',
    'site:{domain} intitle:"Welcome to Nginx" | inurl:"app/kibana" | inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace"',
];

function renderResults(domain) {
    resultsDiv.replaceChildren();

    DORKS.forEach((template, index) => {
        const query = template.replaceAll("{domain}", domain);

        resultsDiv.appendChild(
            createQueryCard(query, index + 1)
        );
    });

    resultCount.textContent = `${DORKS.length} QUERIES`;
}

function refreshSearchLinks() {
    document.querySelectorAll(".result-card").forEach(card => {
        const query = card.querySelector(".query-text").textContent;
        const link = card.querySelector(".open-link");

        link.href = buildSearchUrl(query);
        link.textContent = `Search with ${getSelectedEngine()}`;
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();
    showError();

    try {
        currentDomain = normalizeDomain(domainInput.value);
        domainInput.value = currentDomain;
        renderResults(currentDomain);
    } catch (error) {
        resultsDiv.replaceChildren();
        resultCount.textContent = "0 QUERIES";
        showError(error.message);
    }
});

document.querySelectorAll('input[name="engine"]').forEach(input => {
    input.addEventListener("change", refreshSearchLinks);
});
