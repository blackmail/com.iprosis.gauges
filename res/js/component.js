sap.designstudio.sdk.Component.subclass("com.iprosis.gauges.jGauge", function() {

	var that = this;
	var saveDataResultCell = null;
	var gHeader = null;
	var minV = null;
	var maxV = null;
	var divName = null;
	var jHeight = null ;
	var jWidth = null;
	var gValue = null;
	var noData = "No Data was selected!<br>Please choose Data Source and ResultCell.";
	var dataS = "Data was selected, object will appear in running time.";
	var gaugeType = null;


	function creatjGauge(chartType, jWidth, jHeight){
				
		if ( chartType == "donut" ){
			var angleValue = 0.35;
			var lineWidthValue = 0.15;
			var cOpts = setOpts(angleValue, lineWidthValue);
			return cOpts;
		} else {
			angleValue = 0.15;
			lineWidthValue = 0.44;
			cOpts = setOpts(angleValue, lineWidthValue);
			return cOpts;
		}
	}
		
	function setOpts(angleValue, lineWidthValue){	
		var gOpts = {
			  lines: 0.12,
			  angle: angleValue,
			  lineWidth: lineWidthValue,
			  fontSize: 0.14,
			  pointer: {
			    length: 0.9,
			    strokeWidth: 0.035,
			    color: '#000000'
			  },
			  limitMax: 'false',
			  colorStart: '#6FADCF',
			  colorStop: '#8FC0DA',
			  strokeColor: '#E0E0E0',
			  generateGradient: true
			};
		return gOpts;
	}	
	
	
	this.init = function() {					  
		this.$().click(function() {
			//that.fireEvent("onclick");
			//alert(gValue);
			sap.ui.commons.MessageBox.alert(gValue);
		});
	};
	
	this.afterUpdate = function() {
		var data = null;
		this.$().empty();
						
		divName = this.$().attr('id');		
		this.$().css({"width":jWidth, "height":jHeight});		
							
		//if ( saveDataResultCell ){			
			if ( sap && sap.zen && sap.zen.designmode){
				this.$().append(dataS);
			}
			
			//gValue = parseFloat(saveDataResultCell.data).toFixed(2);
			gValue = 1000;
							
			switch(gaugeType){
				case 1:
					var g = new JustGage({			 			 				
						 id: divName,
						 value: gValue,
						 min: minV,
						 max: maxV,
						 title:	 gHeader,				 
						 shadowOpacity:1,
						 shadowSize:0,
						 shadowVerticalOffset:10			 				
						 });
					break;
				case 2:								
					this.$().addClass("jgauge");
					var demoGauge1 = new jGauge();
					demoGauge1.id = divName;
					demoGauge1.ticks.start = minV; 
					demoGauge1.ticks.end = maxV;
					demoGauge1.label.precision = 2;
					demoGauge1.init();
					demoGauge1.setValue(gValue); 
					break;
				case 3:										
					this.$().addClass("jgauge");
					var demoGauge1 = new jGauge();
					demoGauge1.id = divName;
					demoGauge1.ticks.start = minV; 
					demoGauge1.ticks.end = maxV;
					demoGauge1.segmentStart = -225;
					demoGauge1.segmentEnd = 45;
					demoGauge1.width = 170;
					demoGauge1.height = 170;
					demoGauge1.label.precision = 2;
					demoGauge1.imagePath = 'img/jgauge_face_taco.png';
					demoGauge1.needle.imagePath = 'img/jgauge_needle_taco.png';
	                demoGauge1.ticks.color = 'rgba(0, 0, 0, 0)';
	                demoGauge1.range.color = 'rgba(0, 0, 0, 0)';
	                demoGauge1.ticks.labelRadius = 45;
	                demoGauge1.ticks.labelColor = '#0ce';
	                demoGauge1.needle.xOffset = 0;
					demoGauge1.needle.yOffset = 0;
	                demoGauge1.label.yOffset = 55;
	                demoGauge1.label.color = '#fff';
					demoGauge1.init();
					demoGauge1.setValue(gValue);
					break;
				case 4:						
					this.$().append( "<canvas width=" + jWidth + " height=" + jHeight + " id=\"canvas-donut\"></canvas>" );							
					this.$().append( "<div id=\"donut-textfield\">" + gValue + "</div>" );								
					
					var target = document.getElementById('canvas-donut');				
					var Opts = creatjGauge("donut");			
					var donut = new Donut(target).setOptions(Opts);
	
					donut.minValue = minV;
					donut.maxValue = maxV;
					donut.set(gValue);
					
					var Opts = creatjGauge("donut", jWidth, jHeight);		
					break;
				case 5:
					this.$().append( "<canvas width=" + jWidth + " height=" + jHeight + " id=\"canvas-gauge\"></canvas>" );							
					this.$().append( "<div id=\"gauge-textfield\">" + gValue + "</div>" );								
					
					var target = document.getElementById('canvas-gauge');				
					var Opts = creatjGauge("gauge");				
					var gauge = new Gauge(target).setOptions(Opts);
	
					gauge.minValue = minV;
					gauge.maxValue = maxV;				
					gauge.set(gValue);
					
					var Opts = creatjGauge("gauge", jWidth, jHeight);	
					break;						
			}
			
		/*} else {
			this.$().append(noData);
		}*/					
	};
	
	//property setter/getter functions	
	this.dataResultCell = function(value) {
		if (value === undefined) {
			return saveDataResultCell;
		} else {
			saveDataResultCell = value;
			return this;
		}
	};

	this.guageHeader = function(value) {
		if (value === undefined) {
			return gHeader = "";
		} else {
			gHeader = value;
			return this;
		}
	};
		
	this.minValue = function(value) {
		if (value === undefined) {
			return minV = 0;
		} else {
			minV = value;
			return this;
		}
	};

	this.maxValue = function(value) {
		if (value === undefined) {
			return maxV = 100;
		} else {
			maxV = value;
			return this;
		}
	};		
		
	this.color = function(value) {
		if (value === undefined) {
			return this.$().css("background-color");
		} else {
			this.$().css("background-color", value);
			return this;
		}
	};
				
	this.HEIGHT = function(value) {
		if (value === undefined) {
			return jHeight = 160 + "px";
		} else {
			jHeight = value.val() + "px";
			return this;
		}
	};
	
	this.WIDTH = function(value) {
		if (value === undefined) {
			return jWidth = 240 + "px";
		} else {
			jWidth = value.val() + "px";
			return this;
		}						
	};
	
	this.gType = function(value) {
		if (value === undefined) {
			return gaugeType = 1;
		} else {
			gaugeType = value;
			return this;
		}						
	};
	
});