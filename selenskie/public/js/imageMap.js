/* 
 * JQuery Plugin
 * Данный плагин для библиотеки jquery позволяет создать из картинки, картографический 
 * слой для фремворка Openlayers, что позволит работать с картинкой как с обычной картой
 * Также для данного плагина определенны методы по управлени и добавлению новых объектов 
 * на карту (картинку)
 */

(function( $ ){


    /**========== свойства ========== **/
    this.map = null;             // объект карты OpenLayers
    this.graphicLayer = null;    // слой с пользовательской картинкой
    this.placesLayer = null;     // слой с постройками
    this.newPlacesLayer = null;  // слой с новыми постройками
    this.w = 0;
    this.h = 0;
    
    var settings = {
        'layerName': 'Изображение', 
        'imgUrl': 'map.jpg',   // путь к изображению, которое должно быть отрисовано
        'imgWidth': 1000,    // ширина картинки в пикселях
        'imgHeight': 1000,    // высота картинки в пикселях
        'isAdmin': false,
        'isMobile': false,
        'jsonUrl': 'data/houses.json', // путь к файлу или сервису с описанием земель
        'userSettings': {},
        'onSelect': function(data) {console.log (data)},
        'onUnselect': function() {console.log('unselect');}
    }
    
    /** =============== методы ============== **/
    var methods = {

        /**
        * Метод иницилизации карты
        */
        init: function(id, options) {
           	var w, h;

            /** настройки, которые могут быть переопределенны из вне **/
            settings = $.extend(settings, options);

            w =  settings.imgWidth;
            h =  settings.imgHeight;
            
            /** =========  инициализация объекта ============== **/
			this.map = new OpenLayers.Map(id, {
				numZoomLevels: 2,
				maxExtent: new OpenLayers.Bounds(-w, h, w, h),
				controls: [
					new OpenLayers.Control.Navigation({
						zoomBoxEnabled: false,
						zoomWheelEnabled: true
					}),
					new OpenLayers.Control.PanZoomBar()
                    //new OpenLayers.Control.LayerSwitcher({'ascending':false})
				],
				eventListeners: {
					"move": function( event ){
						//console.log (event);
					}
				}
			});
            // формируем слой с картинкой
            this.graphicLayer = methods.createImgLayer();
            this.newPlacesLayer = methods.createVectorLayer();
            this.displayProjection = new OpenLayers.Projection("EPSG:4326");
            this.map.addLayers([this.graphicLayer, this.newPlacesLayer]);
            this.map.setCenter( new OpenLayers.LonLat(0,0), 2 );
			
			//methods.addFeatures(); // Добавляем участки на карту
            // если админисратор, то добавить инструменты, для создания объектов
            if (settings.isAdmin) {
                var editorControl = new OpenLayers.Control.EditingToolbar(this.newPlacesLayer);
                this.map.addControl(editorControl);
            }

            return this;
        },

        /**
        * Метод получения всех объетков с слоя new!
        **/
        getPolygon: function(i) {
            try {

				i = i || 0;

                var out_options = {
                    'internalProjection': this.map.baseLayer.projection,
                    'externalProjection': new OpenLayers.Projection( this.map.baseLayer.projection)
                };
                var geojsonWriter = new OpenLayers.Format.GeoJSON(out_options);
                
                if (this.newPlacesLayer.features && this.newPlacesLayer.features.length > 0) {
                    var str = geojsonWriter.write(this.newPlacesLayer.features[i - 1], false);
				} else {
                    return undefined;
                }
                var start = str.indexOf('"coordinates":') + '"coordinates":['.length;
                var end = str.indexOf('"crs":') - ']},'.length;

                return str.substring(start,end);
            } catch (err) {
                console.log(err);
            }
            
            return this;
        },

        /**
        * Метод создания картографического слоя из картинки, которую пользо-
        * ватель указа в настройках плагина
        **/
        createImgLayer: function() {
            var w =  settings.imgWidth,
            	h =  settings.imgHeight;
            
            var layer = new OpenLayers.Layer.Image(
                settings.layerName,
                settings.imgUrl,
                new OpenLayers.Bounds(-w/2, -h/2, w/2, h/2),
                new OpenLayers.Size(w, h),
                {
                    numZoomLevels: 2
                }
            );
            
            layer.events.on({
                loadstart: function() {
                    $("#preloader").css("display", "block"); // запускаем прелоадер
                },
                loadend: function() {
                	$("#preloader").fadeOut(1600, "linear", function() { 
                		console.log("img loading complete"); 
                	});
                }
            });
			
            return layer;
        },

        /**
        * Метод создания нового векторного слоя
        */
        createVectorLayer: function() {
            return new OpenLayers.Layer.Vector("Новые", {
                rendererOptions: {zIndexing: true}
            });
        },
        
		/**
		 * Метод выделения сущности по ее номеру
		*/
		selectFeature: function(number, callback) {
			var self = this,
			 	points = [],
				ft, i;
			
			for(i=0; i<this.workLayer.features.length; i++) {
				ft = this.workLayer.features[i];
				
				if(ft.data.number == number) {
					points.push(ft);
				}
			}
			
			for(var i=0; i<this.newLayer.features.length; i++) {
				var ft = this.newLayer.features[i];
				
				if(ft.data.number == number) {
					points.push(ft);
				}
			}
			
			for(var i=0; i<this.soldLayer.features.length; i++) {
				var ft = this.soldLayer.features[i];
				
				if(ft.data.number == number) {
					points.push(ft);
				}
			}
			
			
			// если найден один участок с таким номером
			if (points.length == 1) {
				ft = points[0];
				this.map.setCenter(ft.geometry.bounds.getCenterLonLat(), 2);
				callback(ft, this.map.getPixelFromLonLat(ft.geometry.bounds.getCenterLonLat()));
				this.selectControl.select(ft);			
			} 
			// если несколько точек, то оставить в центре экрана
			if (points.length > 1) {
				var bounds = new OpenLayers.Bounds();
				var ft = null;
				for (var i=0; i<points.length; i++) {
					var _ft = points[i];
					bounds.extend(_ft.geometry.bounds.getCenterLonLat());
					this.selectControl.select(_ft);			
					if (ft == null || _ft.geometry.bounds.top > ft.geometry.bounds.top) {
						ft = _ft
					}
				}
				
				this.map.setCenter(bounds.getCenterLonLat(), 2);
				callback(ft, this.map.getPixelFromLonLat(ft.geometry.bounds.getCenterLonLat()));
				
			}
		},
		
		/**
		 * Метод снятия выделения сущности по ее номеру
		*/
		unselectFeature: function(number) {
			var self = this;

			$.each(this.workLayer.features, function(i, ft) {
				if(ft.data.number == number) {
					self.selectControl.unselect(ft);
				}
			});
			
			$.each(this.newLayer.features, function(i, ft) {
				if(ft.data.number == number) {
					self.selectControl.unselect(ft);
				}
			});
			
			$.each(this.soldLayer.features, function(i, ft) {
				if(ft.data.number == number) {
					self.selectControl.unselect(ft);
				}
			});

		},
        
		/*
         * Метод добавления построек на карту
         **/
        addFeatures: function(url) {
            var self = this,
				geoJsonFormat = new OpenLayers.Format.GeoJSON();

			$.getJSON(settings.jsonUrl, function(places) {
                var newLayer = new OpenLayers.Layer.Vector("Свободные", {
                    "styleMap": new OpenLayers.StyleMap(layersStyle['new']['unchecked'])
                });
                var soldLayer = new OpenLayers.Layer.Vector("Проданные", {
                    "styleMap": new OpenLayers.StyleMap(layersStyle['sold']['unchecked'])
                });
                var waitLayer = new OpenLayers.Layer.Vector("Зарезервированые", {
                    "styleMap":new OpenLayers.StyleMap(layersStyle['wait']['unchecked'])
                });
                var workLayer = new OpenLayers.Layer.Vector("Инфоструктура", {
                    "styleMap":new OpenLayers.StyleMap(layersStyle['work']['unchecked'])
                });
                
				self.workLayer = workLayer;
                self.newLayer = newLayer;
				self.soldLayer = soldLayer;
                self.waitLayer = waitLayer;
				self.map.addLayers([newLayer, soldLayer, waitLayer, workLayer]);

                $.each(places.places, function(key, object){   
                    var feature = geoJsonFormat.read(object.geometry);
                    feature[0].data = object.data;
              		
              		// если участок исправлне пользователем, то учесть его изменения
                    if (settings.userSettings["N_"+object.data.number] != undefined) {
              			var obj = settings.userSettings["N_"+object.data.number];
              		 	
              		 	for ( keyVar in obj ) {
              		 		if(obj[keyVar] != undefined) {
              		 			feature[0].data[keyVar] = obj[keyVar];
              		 		}
							console.log(obj[keyVar]);
						}
						
              			console.log(feature);
              		}

					object.data = feature[0].data;
              			
                    if (object.data.status == "new") {
                        newLayer.addFeatures(feature);
                    }

                    if (object.data.status == "sold") {
                        soldLayer.addFeatures(feature);
                    }

                    if (object.data.status == "wait") {
                        waitLayer.addFeatures(feature);
                    } 
                    
                    if (object.data.status == "work") {
                        workLayer.addFeatures(feature);
                    } 
                });
                
                // если не мобильный браузер, иначе это айпод или айфон
                var selectControl = null;
                if (!settings.isMobile) {
                    selectControl = new OpenLayers.Control.SelectFeature([newLayer, soldLayer, waitLayer, workLayer],
                    {
                        onSelect: function(ft) {settings.onSelect(ft.data)
                            }, 
                        onUnselect: function() {settings.onUnselect()},
                        hover: true
                    });
                } else {

                }
				selectControl.handlers.feature.stopDown = false;
                self.map.addControl(selectControl);
                self.selectControl =  selectControl;
				selectControl.activate();
                   
            });	

            return this;
        },


        showLayer: function ( element ) {

            if (element.id == "new"){
                this.newLayer.setVisibility ( false );
                if (element.checked)
                    this.newLayer.styleMap =  new OpenLayers.StyleMap(layersStyle['new']['checked']);
                else
                    this.newLayer.styleMap = new OpenLayers.StyleMap(layersStyle['new']['unchecked']);
                this.newLayer.setVisibility ( true );
            }
            if (element.id == "sold"){

                this.soldLayer.setVisibility ( false );
                if (element.checked)
                    this.soldLayer.styleMap = new OpenLayers.StyleMap(layersStyle['sold']['checked']);
                else
                    this.soldLayer.styleMap = new OpenLayers.StyleMap(layersStyle['sold']['unchecked']);
                this.soldLayer.setVisibility ( true );
            }
            if (element.id == "wait"){
                this.waitLayer.setVisibility ( false );
                if (element.checked)
                    this.waitLayer.styleMap = new OpenLayers.StyleMap(layersStyle['wait']['checked']);
                else
                    this.waitLayer.styleMap = new OpenLayers.StyleMap(layersStyle['wait']['unchecked']);
                this.waitLayer.setVisibility ( true );
            }
        }
    };



    $.fn.imageMap = function( options ) {
        return methods.init(this[0].id, options );
    };
    
}).call( (window.imageMap = {}) , jQuery );



