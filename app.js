        function generateLinks() {
        var domain = document.getElementById('domain').value.trim();
        var dorks = [
            'site:' + domain + ' inurl:& | inurl:=',
            'site:' + domain + ' ext:php | ext:aspx | ext:asp | ext:jsp | ext:jspx | ext:html | ext:htm | ext:xhtm | ext:cfm | ext:action | ext:struts | ext:do | ext:sql | ext:json | ext:xd | ext:axd | ext:svc | ext:svn | ext:swp | ext:nsf',
            'site:' + domain + ' ext:txt | ext:ini | ext:pem | ext:key | ext:db | ext:env | ext:sh | ext:swp | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:reg | ext:inf | ext:rdp | ext:ora | ext:config | ext:cnf | ext:cfg | ext:conf | ext:dbf | ext:mdb | ext:log | ext:yml | ext:yaml | ext:json | ext:xml | "logs"',
            'site:' + domain + ' inurl:return= | inurl:next= | inurl:redir= | inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:&',
            'site:' + domain + ' ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup | ext:tar | ext:gz | ext:zip',
            'site:' + domain + ' ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv | ext:crt | ext:pfx | ext:xlsx | ext:xls',
            'site:' + domain + ' inurl:apidocs | inurl:swagger | inurl:api-explorer | filetype:wsdl | filetype:WSDL | ext:svc | inurl:wsdl | Filetype: ?wsdl | inurl:asmx?wsdl | inurl:_vti_bin/sites.asmx?wsdl',
            'site:' + domain + ' inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:&',
            'site:' + domain + ` site:dev.azure.com ${domain} | site:site:onedrive.live.com ${domain} | site:digitaloceanspaces.com ${domain} | site:sharepoint.com ${domain} | site:s3-external-1.amazonaws.com ${domain} | site:s3.dualstack.us-east-1.amazonaws.com ${domain} | site:dropbox.com/s ${domain} | site:box.com/s ${domain} | site:docs.google.com inurl:"/d/" ${domain} | site:s3.amazonaws.com ${domain} | site:blob.core.windows.net ${domain} | site:googleapis.com ${domain} | site:drive.google.com ${domain}`,
            'site:' + domain + ' intitle:"index of /admin" "admin"',
            'site:' + domain + ' intitle:"Welcome to Nginx" | inurl:"app/kibana" | inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace"',
        ];
        
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        dorks.forEach(function(dork) {
            var link = 'https://www.google.com/search?q=' + encodeURIComponent(dork);

            var linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.target = '_blank';
            linkElement.textContent = dork;
            resultsDiv.appendChild(linkElement);

            resultsDiv.appendChild(document.createElement('br'));
        });
        };

        var input = document.getElementById("domain");
        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("myBtn").click();
        }
        });
