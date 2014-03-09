sap.designstudio.sdk.PropertyPage.subclass("com.iprosis.gauges.jGaugePropertyPage",  function() {

	var that = this;

	this.init = function() {
		$("#form").submit(function() {
			that.firePropertiesChanged(["gType"]);
			return false;
		});
	};

	this.gType = function(value) {
		if (value === undefined) {			
			return $("#aps_color").val();			
		} else {
			$("#aps_color").val(value);			
			return this;
		}
	};
});