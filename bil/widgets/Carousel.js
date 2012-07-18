define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_Container",
        "dojo/text!./templates/Carousel.html",
        "dojo/query",
        "dojo/on",
        "dojo/has",
        "dojo/_base/window",
        "dojo/_base/event",
        "dojo/_base/fx"], 
    function(declare, _WidgetBase, _TemplatedMixin, _Container, Template, query, on, has, window, event, fx) {
        /**
         * Виджет карусели, данный виджет отображает все виджеты в виде карусли, 
         * которые были указаны в поле children
         */
        var Carousel = declare("bil.widgets.Carousel", [_WidgetBase, _TemplatedMixin, _Container], {
            
            templateString: Template,
            children: [],
            header: "",
            pageSize: 3,
            scrollStep: 20, // размер шага прокрутик в пикселях
            animationSpeed: 800, // скорсть анимации
            showArrows: true, //
            
            _deckSize: 0, // размер видимой части деки
            _isFocused: false, // признак того что сейчас указатель мышки находится на карусели
            _childWidgetBox: null,
            _rightEnd: 0, // правая граница прокрутки виджета
            _pointer: 0,
            
            postCreate: function () {
                this.inherited(arguments);
                var self = this;
                
                // отрисовываем все дочерние виджеты
                dojo.forEach(this.children, function(widget) {
                    self.addChild(widget);
                });
            },
            
            /**
             * Настраиваем видимую область
             */
            startup: function() {
                this.inherited(arguments);
                var self = this;
                
                // получаем реальный размер дочернего виджета, после рендеринга
                var children = query(".dojogpCarouselChildren")[0];
                if (children != undefined) {
                    this._childWidgetBox = dojo.marginBox(children);
                   
                    // устанавливаем размер видимой деки области 
                    this._deckSize = this._childWidgetBox.w * this.pageSize;
                    dojo.style(this.deckNode, "width", this._deckSize + "px");
    
                    // устанавливаем общий размер каруслеи
                    var innerDeckSize = this._childWidgetBox.w * this.getChildren().length;
                    dojo.style(this.containerNode, "width", innerDeckSize + "px");

                    // рассчитываем правую границу прокрутки 
                    var end = innerDeckSize - this._deckSize;
                    this._rightEnd = end * -1;
                    
              
                    if (this.showArrows) {
                        // Вычисляем размер всего элемента (дека + стрелки)
                        var arrow = query(".dojogpCarousel .arrow")[0];
                        var arrowBox = dojo.marginBox(arrow);
                        console.log(arrowBox);
                        var allSize = this._deckSize + (arrowBox.w * 2);
                        dojo.style(this.domNode, "width", allSize + "px");
                        
                        // смещаем правую стрелку
                        dojo.style(this.rightArrowNode, "left", allSize + "px");
                    } else {
                        this.hideArrow();
                    }
                    
                    // если виджеты влезают в одну страницу
                    if (this.getChildren().length <= this.pageSize) {
                        this.hideArrow();
                    }
                }
                
                // присоединям событие прокртуи колесика мышки
                var node = this.domNode;
                
                // отключаем событие прокрутки страницы, если указатель мыши находится на карусели
                on(window.body(), (!has("mozilla") ? "mousewheel" : "DOMMouseScroll"), function(e){
                    if(self._isFocused){
                       event.stop(e); 
                    }
                });
                
                on(node, (!has("mozilla") ? "mousewheel" : "DOMMouseScroll"), function(e){
                     var scroll = e[(!has("mozilla") ? "wheelDelta" : "detail")] * (!has("mozilla") ? 1 : -1);
                     
                     if (scroll > 0) {
                         self._scroll(self.scrollStep); 
                     } else {
                         self._scroll(-1 * self.scrollStep);
                     }
                     
                });
                
            },
            
            hideArrow: function() {
                dojo.style(this.rightArrowNode,"display", "none");
                dojo.style(this.leftArrowNode,"display", "none");
            },
            
            showArrow: function() {
                dojo.style(this.rightArrowNode,"display", "table-cell");
                dojo.style(this.leftArrowNode,"display", "table-cell");
            },
            
            /**
             * @overload method from dijit/_Container
             * Неопходмо т.к. при добавлении дочернего виджета, нужно пересчитывать размер карусели и крайнию границу
             */
            addChild: function(widget) {
                this.inherited(arguments);
                dojo.addClass(widget.domNode, "dojogpCarouselChildren");
               
                if (this._childWidgetBox != undefined && this._childWidgetBox.w != undefined) {
                    // устанавливаем общий размер каруслеи
                    var innerDeckSize = this._childWidgetBox.w * this.getChildren().length;
                    dojo.style(this.containerNode, "width", innerDeckSize + "px");

                    // рассчитываем правую границу прокрутки 
                    var end = innerDeckSize - this._deckSize;
                    this._rightEnd = end * -1;
                }

                if (this.getChildren().length > this.pageSize) {
                    this.showArrow();
                }
            },
            
            removeChild: function() {
                this.inherited(arguments);
                
                if (this._childWidgetBox != undefined && this._childWidgetBox.w != undefined) {
                    // устанавливаем общий размер каруслеи
                    var innerDeckSize = this._childWidgetBox.w * this.getChildren().length;
                    dojo.style(this.containerNode, "width", innerDeckSize + "px");

                    // рассчитываем правую границу прокрутки 
                    var end = innerDeckSize - this._deckSize;
                    this._rightEnd = end * -1;
                }

                if (this.getChildren().length <= this.pageSize) {
                    this.hideArrow();
                }
            },
            
            /**
             * Метод перелистывания страница вперед
             */
            next: function() {
                var curentPage = this._truncate(this._pointer/this._childWidgetBox.w);
                this._move((curentPage * this._childWidgetBox.w)- this._childWidgetBox.w);
            },
            
            /**
             * Метод перелистывания страница назад
             */
            prev: function() {
                var curentPage = Math.round(this._pointer/this._childWidgetBox.w);
                this._move((curentPage * this._childWidgetBox.w) + this._childWidgetBox.w);
            },
            
            _truncate: function (n) {
                return Math[n > 0 ? "floor" : "ceil"](n);
            },
            
            /**
             * Перемещение деки на заданное расстояние
             */
            _move:function(newMarginLeft) {
                var self = this;
                if (newMarginLeft <= 0 && newMarginLeft >= this._rightEnd ) {
                    dojo.animateProperty({
                        node: self.containerNode,
                        properties: {
                            marginLeft: { start: self._pointer, end: newMarginLeft }
                        },
                        onEnd: function() {
                            self._pointer = newMarginLeft;
                        },
                        duration: self.animationSpeed
                    }).play();
                } 
            },
            
            /**
             * Метод прокртки карусели
             * @param step - на сколько пикселей сместить карусел, может принимать отрицательные значения
             */
            _scroll: function(step) {

                var newMarginLeft = this._pointer + step;
                
                // если щаг не попадает в допустимый интервал
                if (newMarginLeft >= 0 || newMarginLeft <= this._rightEnd ) {
                    // доведения скрола до кноца, если шаг превышает оставшееся расстояние
                    // доводим влево
                    if (this._pointer >= this._rightEnd && step < 0) {
                        newMarginLeft =  this._rightEnd;
                    } else /** доводим вправо**/ if (this._pointer <= 0 && step > 0) {
                        newMarginLeft = 0;
                    } 
                    
                }
                
                this._pointer = newMarginLeft;
                dojo.style(this.containerNode, "margin", "0 0 0 " + newMarginLeft + "px");
            },
            
            _onMouseOver: function() {
                this._isFocused = true;
            },
            
            _onMouseOut: function() {
                this._isFocused = false;
            }
            
        });
        
        return Carousel;

});


