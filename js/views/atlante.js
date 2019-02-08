{
    "tagName": "div",
    "id": "adagio-home",
    "className": "adagio-atlante",
    "template": _.template(`
    <style>    
    #map {
       position:relative;       
    }
    #criar_rota {
        height: 65px;        
    }
    #logo {
        position: fixed;        
        bottom: 0;
        left:0;       
        margin-left: 96px;         
        margin-bottom: 10px;     
    }
    </style>
    <div class="container-fluid">
        <div id="criar_rota" class="row">
            <div class="col-xs-12">
                <div class="container-fluid">                
                    <div class="row"> 
                        <div class="col-sm-3 s_campos">                        
                            <label class="control-label">Origem</label>                        
                            <input name="origem" type="text" id="origem_id"  class="form-control" placeholder="Digite a origem"/>
                            </div>
                            <div class="col-sm-3 s_campos">
                            <label class="control-label">Destino</label>
                            <div class="input-group">
                                <input name="destino" type="text" id="destino_id"  class="form-control" placeholder="Digite o destino"/>
                                <span class="input-group-btn">
                                    <button id="btn_criar_rota" type="button" class="btn btn-default" style="margin:0 auto">Rota</button>
                                </span>
                            </div>
                        </div>                                            
                        <div class="col-sm-4 col-sm-offset-1 s_campos">                    
                            <label class="control-label s_labels">Perímetro (Raio de 150 KM)</label>
                            <div class="input-group">  
                                <input name="local_perimetro" type="text" id="local_perimetro_id" class="form-control" placeholder="Digite o local"/>
                                <span class="input-group-btn">
                                    <button id="btn_buscar_local_perimetro" type="button" class="btn btn-default">Buscar</button>
                                </span> 
                            </div>
                        </div>                                                        
                    </div>                    
                </div>
            </div>           
        </div>   
        <div class="row">        
            <div id="map" class="container-fluid"></div>            
        </div> 
        <div class="row">
        <div id="logo"><img src="../images/logo_atlante.png"></div>
        </div>       
    </div>
      
    `,
    {"variable": 'adagio'}),
    "initialize": function () {
        try {
            this.load("web_wo_top");
            this.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDdyfSqDUG5W7DZ3lmInmcjbqMz51iGgx8&language=pt-BR", "js");
            this.getScript("/routeboxer-master/src/RouteBoxer.js", "js");
            this.getScript ("/markerclusterer/src/markerclusterer.js", "js");
            this.getScript ("/jquery-ui-1.12.1.custom/jquery-ui.min.js", "js");
            this.release();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            //
        }
    },
    "render": function () {
        try {
            if (this.collection)
            {
                this.$el.html(this.template(this.model)).attr("class", this.className);
            }
            else
            {
                this.$el.attr("class", this.className);
            }
            this.mapa();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            return this;
        }
    },
    "mapa": function () {
        var _this = this,
        $map = this.$("#map"),
        height = $(window).height() - $("#systemctl").outerHeight() - 15;
        $map.css("height", height);
        var mapOptions = {
            center: new google.maps.LatLng(-14.235,-51.9253),
            zoom: 8,
            mapTypeId: 'roadmap',
        };    
        var map = new google.maps.Map(document.getElementById('map'),mapOptions);
        var markerClusterer = new MarkerClusterer(map);
        var markers = [];


        //instantiate the RouteBoxer library
        var routeBoxer = new RouteBoxer();

        //Criação das rotas
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer(
           /* {
                draggable:true,
                map: map
            }*/);        
        var geocoder = new google.maps.Geocoder();

        directionsDisplay.addListener('directions_changed', function() {
            var result = directionsDisplay.getDirections();

           /* if(result.routes.length > 0 && result.routes[0].legs[0].via_waypoint.length > 0) {
                var wayPoint = result.routes[0].legs[0].via_waypoint[0];
                console.log(wayPoint.location.toString());    
                alert(wayPoint.location.toString());            
            }*/
            //computeTotalDistance(directionsDisplay.getDirections());
        });
        

        // criando marcadores dos campos de origem e de destino
      /*  marker_rota_origem = new google.maps.Marker({
            map: map,
            draggable: true,
        });  

        marker_rota_destino = new google.maps.Marker({
            map: map,
            draggable: true,
        }); */       
        
        // define a rota em texto;
        //directionsDisplay.setPanel(document.getElementById('trajeto-texto'));
   
        this.$("#origem_id").autocomplete({
            source: function (request, response) {
                geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                    response($.map(results, function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            latitude: item.geometry.location.lat(),
                            longitude: item.geometry.location.lng()
                        }
                    }));
                })
            }//,
           /* select: function (event, ui) {                
                lat_origem = ui.item.latitude;
                lat_origem = lat_origem.toFixed(4);
                lon_origem = ui.item.longitude;
                lon_origem = lon_origem.toFixed(4);
               // this.$("#lat_origem_id").val(ui.item.latitude);               
               // this.$("#lon_origem").val(ui.item.longitude);
              //  var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
               // marker_rota_origem.setPosition(location);
                //map.setCenter(location);
               // map.setZoom(8);
            }*/
        });

        this.$("#destino_id").autocomplete({
            source: function (request, response) {
                geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                    response($.map(results, function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            latitude: item.geometry.location.lat(),
                            longitude: item.geometry.location.lng()
                        }
                    }));
                })
            }//,
           /* select: function (event, ui) {
                lat_destino = ui.item.latitude; 
                lat_destino = lat_destino.toFixed(4);
                lon_destino = ui.item.longitude;
                lon_destino = lon_destino.toFixed(4);

                //this.$("#txtLatitude").val(ui.item.latitude);
                //this.$("#txtLongitude").val(ui.item.longitude);
               // var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
               // marker_rota_destino.setPosition(location);
                //map.setCenter(location);
                //map.setZoom(8);
            }*/
        });

        //usar a própria localização como origem
       /* if (navigator.geolocation) { // Se o navegador do usuário tem suporte ao Geolocation
            navigator.geolocation.getCurrentPosition(function (position) {
          
               pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Com a latitude e longitude que retornam do Geolocation, criamos um LatLng
               map.setCenter(pontoPadrao);
            
               var geocoder = new google.maps.Geocoder();
            
               geocoder.geocode({ // Usando nosso velho amigo geocoder, passamos a latitude e longitude do geolocation, para pegarmos o endereço em formato de string
                  "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
               },
               function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                     $("#origem_id").val(results[0].formatted_address);
                  }
               });
            });
         }*/

         this.$("#local_perimetro_id").autocomplete({
            source: function (request, response) {
                geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                    response($.map(results, function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            latitude: item.geometry.location.lat(),
                            longitude: item.geometry.location.lng()
                        }
                    }));
                })
            },
            /*select: function (event, ui) {                
                //lat_local = ui.item.latitude;
                //lat_local = lat_local.toFixed(4);
                //lon_local = ui.item.longitude;
                //lon_local = lon_local.toFixed(4);
               // this.$("#lat_origem_id").val(ui.item.latitude);               
               // this.$("#lon_origem").val(ui.item.longitude);
                var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
                if($("#origem_id").val() == "" && $("#destino_id").val() == ""){
                    displayCoordinates(location);
                }
               // marker_rota_origem.setPosition(location);
                //map.setCenter(location);
               // map.setZoom(8);
            }*/
        });

        $("#btn_criar_rota").click(function() {            
            if(!$("#origem_id").val() == "" && !$("#destino_id").val() == "" && $("#local_perimetro_id").val() == ""){       
                criarRota($("#origem_id").val(), $("#destino_id").val());               
            }                
        })

       /* $("#destino_id").blur(function() {
            if(!$("#origem_id").val() == "" && !$("#destino_id").val() == "" && $("#local_perimetro_id").val() == ""){
                criarRota($("#origem_id").val(), $("#destino_id").val());               
            }
        })  */    
        
        $(document).keypress(function(e) {
            if(e.which == 13) {
                if(!$("#origem_id").val() == "" && !$("#destino_id").val() == "" && $("#local_perimetro_id").val() == ""){
                    criarRota($("#origem_id").val(), $("#destino_id").val());               
                }
            }
        })   

        $("#btn_buscar_local_perimetro").click(function() {            
            if(!$("#local_perimetro_id").val() == "" && $("#origem_id").val() == "" && $("#destino_id").val() == ""){       
               buscarLocalPerimetro($("#local_perimetro_id").val());               
            }                
        })

        /*$("#local_perimetro_id").blur(function() {
            if(!$("#local_perimetro_id").val() == "" && $("#origem_id").val() == "" && $("#destino_id").val() == ""){
                buscarLocalPerimetro($("#local_perimetro_id").val());               
            }
        }) */     
        
        $(document).keypress(function(e) {
            if(e.which == 13) {
                if(!$("#local_perimetro_id").val() == "" && $("#origem_id").val() == "" && $("#destino_id").val() == ""){
                   buscarLocalPerimetro($("#local_perimetro_id").val());               
                }
            }
        })   

        //Search places having coordinates inside the boxes
        function findPlaces(boxes) {

           // deleteMarkers();
            var arraySouthWestLat = [];
            var arraySouthWestLng = [];
            var arrayNorthEastLat = [];
            var arrayNorthEastLng = [];
            for (var i = 0; i < boxes.length; i++) {
            
                arraySouthWestLat[i] = boxes[i].getSouthWest().lat().toFixed(4);
                arraySouthWestLng[i] = boxes[i].getSouthWest().lng().toFixed(4);
                arrayNorthEastLat[i] = boxes[i].getNorthEast().lat().toFixed(4);
                arrayNorthEastLng[i] = boxes[i].getNorthEast().lng().toFixed(4);

            }
            arraySouthWestLat = JSON.stringify(arraySouthWestLat);
            arraySouthWestLng = JSON.stringify(arraySouthWestLng);
            arrayNorthEastLat = JSON.stringify(arrayNorthEastLat);
            arrayNorthEastLng = JSON.stringify(arrayNorthEastLng);

            params = 'arraySouthWestLat='+arraySouthWestLat+'&arraySouthWestLng='+arraySouthWestLng+'&arrayNorthEastLat='+arrayNorthEastLat+'&arrayNorthEastLng='+arrayNorthEastLng;
            
            var dados = $("input[name^='atlante_options']").serialize()+'&'+params;
            $.ajax({
                url: adagio.environment.getEndpoint("atlante"),
                method: "post",
                data: $("input[name^='atlante_options']").serialize()+'&'+params,
                context: _this
            }).done(function (retorno) {
                //this.model.set(retorno.model);

                //console.log(this.model.query);                
                deleteMarkers();
                if(retorno.qtdados>0)
                {
                    // esta variável vai definir a área de mapa a abranger e o nível do zoom
                    // de acordo com as posições dos marcadores  
                    var bounds = new google.maps.LatLngBounds();                   

                    for (var i = 0; i < retorno.qtdados; i++) {
                        var latlng = new google.maps.LatLng(retorno.query[i].latitude, retorno.query[i].longitude);
                        var pontuavel_type = retorno.query[i].pontuavel_type;
                        var id_ponto = retorno.query[i].id;

                        createMarker(latlng, pontuavel_type, id_ponto);                            
                        setMapOnAll(map);

                        // Os valores de latitude e longitude do marcador são adicionados à
                        // variável bounds
                        bounds.extend(latlng); 
                    }

                    // Depois de criados todos os marcadores,
                    // a API, através da sua função fitBounds, vai redefinir o nível do zoom
                    // e consequentemente a área do mapa abrangida de acordo com
                    // as posições dos marcadores
                    map.fitBounds(bounds);
                    // map.setZoom(8);
                   // console.log($("input[name^='atlante_options']").serialize());
                   if($("input[name^='atlante_options']:checked").length == 1){

                        // Add a marker clusterer to manage the markers.
                        markerClusterer = new MarkerClusterer(map, markers,
                    {imagePath: '/markerclusterer/images/m'});
                    }
                }
            }).fail(function (retorno) {
                alert("Um erro ocorreu!");
            });
        }

        function criarRota(origem, destino){

            var enderecoPartida = origem;
            var enderecoChegada = destino;

            //Novo objeto google.maps.DirectionsRequest, contendo:
            var request = {
                //origem
                origin: enderecoPartida,
                //destino
                destination: enderecoChegada,
                //meio de transporte, nesse caso de carro
                travelMode: google.maps.TravelMode.DRIVING

            };

            directionsService.route(request, function(result, status){
                //se deu tudo certo, é renderizado no mapa o resultado
               // alert(status);
                if(status == google.maps.DirectionsStatus.OK){
                    //aqui relaciona o directionsDisplay com o mapa
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(result);

                    // Box around the overview path of the first route
                    var path = result.routes[0].overview_path;
                    //alert(path);
                    var distance = 10;//km
                    var boxes = routeBoxer.box(path, distance);
                    //alert(boxes);
                    if(!$("input[name^='atlante_options']").serialize()=='')
                    {                        
                        findPlaces(boxes);
                    }       
                                
                }
                else {
                    alert("Não foi possível encontrar rotas entre origem e destino!");
                    deleteMarkers();
                    directionsDisplay.setMap(null);
                    //console.log("Directions query failed: " + status);
                }
            });


        }

        function buscarLocalPerimetro(local){
           
            geocoder.geocode({ 'address': local + ', Brasil', 'region': 'BR' }, function (results, status) {
               
                    if(status == google.maps.GeocoderStatus.OK){
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();
                        var location = new google.maps.LatLng(latitude, longitude);    
                       // alert(location);      
                       if(!$("input[name^='atlante_options']").serialize()=='')
                       {         
                            displayCoordinates(location);
                       }
                    }else{
                        alert('Erro ao converter endereço: ' + status);
                    }
             
            });
        }

        // Cria a nova Info Window com referência à variável infoWindow.
        // O conteúdo da Info Window é criado na função createMarker.
        infoWindow = new google.maps.InfoWindow();

        // Evento que fecha a infoWindow com click no mapa.
        google.maps.event.addListener(map, 'click', function() {
            infoWindow.close();
        });

        // Chama o método displayCoordinates passando a latitude e longitude central quando arrasta o mapa
        // função debounce, agrupa muitos eventos em um único. 

        /*google.maps.event.addListener(map,'dragend', _.debounce(function(){
            if(!$("input[name^='atlante_options']").serialize()=='' && $("#origem_id").val() == "" && $("#destino_id").val() == "")
                {
                    //alert(map.getCenter());
                    displayCoordinates(map.getCenter()); 
                    //criarRota();
                    
                }
        },2000));*/

        /*google.maps.event.addListener(map, 'dragend', function ()
        {
            if(!$("input[name^='atlante_options']").serialize()=='')
            {
                displayCoordinates(map.getCenter()); 
            }
        }); */


        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            //alert("oi");
            markerClusterer.clearMarkers();
            clearMarkers();                    
            markers = [];           
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function displayCoordinates(pnt) {
            params = "";
            /*if(pnt == 0){
               // alert(lat_origem);
               // alert(lng_origem);
                 //alert(lat_destino);
                // alert(lng_destino);

                var origem = new google.maps.LatLng(lat_origem, lng_origem);
                var destino = new google.maps.LatLng(lat_destino, lng_destino);
                var distancia_pontos = google.maps.geometry.spherical.computeDistanceBetween(origem, destino)/1000;
                var pontos_origem_destino = [];
                 pontos_origem_destino = [lat_origem, lng_origem, lat_destino, lng_destino];
                 params = 'pontos_origem_destino='+pontos_origem_destino+'&distancia_pontos='+distancia_pontos;
               
            }*/
           // pontos_origem_destino = lon_origem;
            
           // alert(pontos_origem_destino);
            //alert(lat_origem);
            //if(!pnt == 0) {
                var lat = pnt.lat(); lat = lat.toFixed(4);
                var lng = pnt.lng(); lng = lng.toFixed(4); 
                params = 'latitude='+lat+'&longitude='+lng;
           // }

            console.log(_this.model.attributes);

            $.ajax({
                url: adagio.environment.getEndpoint("atlante"),
                data: $("input[name^='atlante_options']").serialize()+'&'+params,
                context: _this,
               // global: false
            }).done(function (retorno) {
                this.model.set(retorno.model);

                //console.log(this.model.query);

                deleteMarkers();
                directionsDisplay.setMap(null);

                if(retorno.qtdados>0)
                {
                    // esta variável vai definir a área de mapa a abranger e o nível do zoom
                    // de acordo com as posições dos marcadores  
                    var bounds = new google.maps.LatLngBounds();                   

                    for (var i = 0; i < retorno.qtdados; i++) {
                        var latlng = new google.maps.LatLng(retorno.query[i].latitude, retorno.query[i].longitude);
                        var pontuavel_type = retorno.query[i].pontuavel_type;
                        var id_ponto = retorno.query[i].id;

                        createMarker(latlng, pontuavel_type, id_ponto);                            
                        setMapOnAll(map);

                        // Os valores de latitude e longitude do marcador são adicionados à
                        // variável bounds
                        bounds.extend(latlng); 
                    }

                    // Depois de criados todos os marcadores,
                    // a API, através da sua função fitBounds, vai redefinir o nível do zoom
                    // e consequentemente a área do mapa abrangida de acordo com
                    // as posições dos marcadores
                    map.fitBounds(bounds);
                    // map.setZoom(8);
                     
                    if($("input[name^='atlante_options']:checked").length == 1){

                        // Add a marker clusterer to manage the markers.
                        markerClusterer = new MarkerClusterer(map, markers,
                        {imagePath: '/markerclusterer/images/m'});
                    }
                }
            }).fail(function (retorno) {
                alert("Um erro ocorreu!");
            });

        } 

        // Função que cria os marcadores e define o conteúdo de cada Info Window.
        function createMarker(latlng, pontuavel_type,id_ponto){
            var icone = "";
            var titulo = "";

            if(pontuavel_type == 'pontosAcionamento')
            {
                icone = 'assets/Templatic-map-icons/conversation-map-icon.png';
                titulo = 'Acionamento';
            }
            else if(pontuavel_type == 'pontosCombustivel')
            {
                icone = 'assets/Templatic-map-icons/fillingstation.png';
                titulo = 'Posto de Combustível';
            }
            else if(pontuavel_type == 'pontosErb')
            {
                icone = 'assets/Templatic-map-icons/wifi.png';
                titulo = 'ERB';
            }
            else if(pontuavel_type == 'pontosHospedagem')
            {
                icone = 'assets/Templatic-map-icons/motel-23.png';
                titulo = 'Hospedagem';
            }
            else if(pontuavel_type == 'pontosPedagio')
            {
                icone = 'assets/Templatic-map-icons/tollstation5.png';
                titulo = 'Pedágio';
            }
            else if(pontuavel_type == 'pontosPolicia')
            {
                icone = 'assets/Templatic-map-icons/police3.png';
                titulo = 'Posto Policial';
            }
            else if(pontuavel_type == 'pontosPrestador')
            {
                icone = 'assets/Templatic-map-icons/findajob2.png';
                titulo = 'Prestador';
            }
            else if(pontuavel_type == 'pontosReferencia')
            {
                icone = 'assets/Templatic-map-icons/information.png';
                titulo = 'Referência';
            }
            else if(pontuavel_type == 'pontosRisco')
            {
                icone = 'assets/Templatic-map-icons/caution2.png';
                titulo = 'Ponto de Risco';
            }
            else if(pontuavel_type == 'pontosRodoviario')
            {
                icone = 'assets/Templatic-map-icons/skull2.png';
                titulo = 'Risco Rodoviário';
            }
            else if(pontuavel_type == 'pontosTransportadora')
            {
                icone = 'assets/Templatic-map-icons/truck-tools3.png';
                titulo = 'Transportadora';
            }

            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                title: titulo,
                icon: icone
            });

            markers.push(marker);

            // Evento que dá instrução à API para estar alerta ao click no marcador.
            // Define o conteúdo e abre a Info Window.
            google.maps.event.addListener(marker, 'click', function() {
                var tipo = "";
                var nome = "";
                var lat = latlng.lat(); lat = lat.toFixed(4);
                var lng = latlng.lng(); lng = lng.toFixed(4); 

                $.ajax({
                    url: adagio.environment.getEndpoint("atlante/id_ponto"),
                    data: {id_ponto},
                    context: _this,
                    global: false
                }).done(function (retorno) {
                    if(pontuavel_type == 'pontosAcionamento')
                    {
                        nome = retorno.nome_central;
                    }
                    else if(pontuavel_type == 'pontosCombustivel')
                    {
                        nome = retorno.nome;
                    }
                    else if(pontuavel_type == 'pontosErb')
                    {
                        nome = retorno.titulo;
                    }
                    else if(pontuavel_type == 'pontosHospedagem')
                    {
                        nome = retorno.nome;
                    }
                    else if(pontuavel_type == 'pontosPedagio')
                    {
                        nome = retorno.descricao;
                    }
                    else if(pontuavel_type == 'pontosPolicia')
                    {
                        nome = retorno.instituicao;
                    }
                    else if(pontuavel_type == 'pontosPrestador')
                    {
                        nome = retorno.nome;
                    }
                    else if(pontuavel_type == 'pontosReferencia')
                    {
                        nome = retorno.nome;
                    }
                    else if(pontuavel_type == 'pontosRisco')
                    {
                        nome = retorno.descricao;
                    }
                    else if(pontuavel_type == 'pontosRodoviario')
                    {
                        nome = retorno.descricao;
                    }
                    else if(pontuavel_type == 'pontosTransportadora')
                    {
                        nome = retorno.nome;
                    }             

                    // Variável que define a estrutura do HTML a inserir na Info Window.
                    var iwContent = '<div id="iw_container">' +
                    '<div class="iw_title">' + titulo + '</div>'+
                    '<div class="iw_title">' + nome + '</div>'+
                    '<div class="iw_title">' + lat + ',' +lng + '</div>';

                    // O conteúdo da variável iwContent é inserido na Info Window.
                    infoWindow.setContent(iwContent);

                    // A Info Window é aberta com um click no marcador.
                    infoWindow.open(map, marker);

                }).fail(function (retorno) {
                    alert("Um erro ocorreu!");
                });  
            });
        } 
    }
}