(function () {
            
            if (!($ = window.jQuery)) {
                script = document.createElement('script');
                script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
                script.onload = makeBeautiful;
                document.body.appendChild(script);
            }
            else {
                makeBeautiful();
            }

            function loadScript(s)
            {
                script = document.createElement('script');
                script.src = s;
                document.body.appendChild(script);
            }

            function loadSupportScripts() {
                loadScript("jquery.tablesorter.js");
            }

            function handleMapMouseOver() {
                var alt = $(this).attr("alt");
                if (alt == "all")
                    $(this).attr("title", "all: 500");
                else {
                    $(this).attr("title", alt + ": " + $("img[alt='" + alt + "']").length);
                }
            }

            function handleMapClick(e) {
                $("#maphr").css("width", "755px");
                e.preventDefault();
                var mapBorderLefts = new Array();
                mapBorderLefts['all'] = 0;
                mapBorderLefts['Politics'] = 144;
                mapBorderLefts['Bully Pulpit'] = 144+95;
                mapBorderLefts['Force'] = 144+95+120;
                mapBorderLefts['Brains'] = 144 + 95 + 120+110;
                mapBorderLefts['Money'] = 144 + 95 + 120 + 110 + 75;
                mapBorderLefts['Good'] = 144 + 95 + 120 + 110 + 75 + 90;
                mapBorderLefts['Evil'] = 144 + 95 + 120 + 110 + 75 + 90 + 70;

                var mapBorderRights = new Array();
                mapBorderRights['all'] = 0;
                mapBorderRights['Politics'] = 530;
                mapBorderRights['Bully Pulpit'] = 530 - 125;
                mapBorderRights['Force'] = 530 - 125 - 105;
                mapBorderRights['Brains'] = 530 - 125 - 105 - 88;
                mapBorderRights['Money'] = 530 - 125 - 105 - 88 - 80;
                mapBorderRights['Good'] = 530 - 125 - 105 - 88 - 80 - 70;
                mapBorderRights['Evil'] = 530 - 125 - 105 - 88 - 80 - 70 - 70;
                var alt = $(this).attr("alt");
                var width = 755 - (mapBorderLefts[alt]+mapBorderRights[alt]);

                var css = {
                    width: width+"px",
                    "margin-left":mapBorderLefts[alt],
                    "margin-right": mapBorderRights[alt]
                };
                $("#maphr").css(css);

                if (alt == "all")
                    $("tr").fadeIn(300);
                else {
                    $("tr:not(thead tr)").fadeOut();
                    $("img[alt='" + alt + "']").parent().parent().fadeIn(300);
                }
                
            };

            function setupSorter() {
                /*do sorting*/
                var tbody = $("img[alt='Politics']").parent().parent().parent();
                var thead = tbody.before("<thead><tr><th>Person</th><th>Role</th><th>Location</th><th>Categories</th></tr></thead>");
                var headcss = {
                    "font-family": "Arial",
                    "text-transform": "Capitalize",
                    "cursor": "pointer",
                    "text-align":"justify"
                    };

                $("th").css(headcss);
                $(thead.parent()).tablesorter({});
            }

            function makeBeautiful() {
                script = document.createElement('script');
                script.src = 'http://cdn.jsdelivr.net/tablesorter/2.0.5b/jquery.tablesorter.min.js';
                script.onload = setupSorter;
                document.body.appendChild(script);

                
                var imgreplace = "<img id='mostpowerful_500' src='http://www.foreignpolicy.com/files/fp_uploaded_images/130423_0_key-755.jpg' usemap='#map_powerful_500' border='0' width='755' height='26' alt='' />";
                //var imgreplace = "<img id='mostpowerful_500' src='./files/fp_uploaded_images/130423_0_key-755.jpg' usemap='#map_powerful_500' border='0' width='755' height='26' alt='' />";
                var maphtml = "<map id='map_powerful_500' name='map_powerful_500'> " +
                "<area shape='rect' coords='43,0,134,21' href='#' alt='all' title='all'    /> " +
                "<area shape='rect' coords='142,0,226,21' href='#' alt='Politics'   title='Politics'    />" +
                "<area shape='rect' coords='238,0,346,21' href='#' alt='Bully Pulpit'      title='Bully Pulpit'    />" +
                "<area shape='rect' coords='356,0,455,21' href='#' alt='Force'      title='Force'    />" +
                "<area shape='rect' coords='465,0,537,21' href='#' alt='Brains'     title='Brains'    />" +
                "<area shape='rect' coords='544,0,619,21' href='#' alt='Money'      title='Money'    />" +
                "<area shape='rect' coords='631,0,688,21' href='#' alt='Good'       title='Good'    />" +
                "<area shape='rect' coords='704,0,750,21' href='#' alt='Evil'       title='Evil'    />" + 
                //"<area shape='rect' coords='753,24,755,26' href='http://www.image-maps.com/index.php?aff=mapped_users_8201305281834201' alt='Image Map' title='Image Map' />" +
                "</map>"

                /*replace image with image map id- ideally, should just be a list of links */
                $("img[src*='130423_0_key-755.jpg']").replaceWith(imgreplace);
                /*insert image map*/
                $("img[src*='130423_0_key-755.jpg']").after(maphtml);
                var hrhtml = "<hr id='maphr' />";
                /*add tracking border for selection points*/
                $("img[src*='130423_0_key-755.jpg']").after(hrhtml);
                var hr = {
                    border: 1,
                    color: "#f00",
                    "background-color": "#f00",
                    height: "5px",
                    margin: "1em 0",
                    width: "755px"
                }
                $("#maphr").css(hr);

                $('map area').click(handleMapClick);

                $('map area').mouseover(handleMapMouseOver);
            }
        }());
