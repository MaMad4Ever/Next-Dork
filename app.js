        function generateLinks() {
        var domain = document.getElementById('domain').value.trim();
        var dorks = [
            'site:' + domain + ' inurl:&',
            'site:' + domain + ' ext:php | ext:aspx | ext:asp | ext:jsp | ext:html | ext:htm',
            'site:' + domain + ' ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:xml',
            'site:' + domain + ' inurl:url= | inurl:return= | inurl:next= | inurl:redir= inurl:http',
            'site:' + domain + ' inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:&',
            'site:' + domain + ' inurl:config | inurl:env | inurl:setting | inurl:backup | inurl:admin | inurl:php',
            'site:' + domain + ' inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:&',
            'site:' + domain + ' inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer',
            'site:' + domain + ' inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:&',
            'site:' + domain + ' inurl:(unsubscribe|register|feedback|signup|join|contact|profile|user|comment|api|developer|affiliate|upload|mobile|upgrade|password)',
            'site:' + domain + ' inurl:admin | Administrator | adm | login | l0gin | wp-loging',
            'site:' + domain + ' intitle:"index of /admin" "admin"',
            'site:' + domain + ' intitle:"Welcome to Nginx"',
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
