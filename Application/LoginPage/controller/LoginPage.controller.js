sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("SapUI5Tutorial.Application.LoginPage.controller.LoginPage", {

        onInit: function () {
            this.getDatas();
        },
        getDatas: function () {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/comments',
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    oModel.setProperty("/personData", res)
                    debugger
                }
            });
        },
        onSearch: function (oEvent) {
            var sQuery = oEvent.mParameters.newValue
            var aFilters = [];
            var list = this.byId("ID_DEMO");
            var binding = list.getBinding("items");
            if (sQuery.trim() != "") {
                var amountFilter = new Filter("name", FilterOperator.Contains, sQuery);
                var nameFilter = new sap.ui.model.Filter("email", sap.ui.model.FilterOperator.Contains, sQuery);
                var cityFilter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters = [amountFilter, nameFilter, cityFilter]
                var finalFilter = new sap.ui.model.Filter({
                    filters: aFilters,
                    and: false
                })
                binding.filter(finalFilter, "Application");
            }else binding.filter([], "Application")
            debugger

        },
        myFactory: function (sId, oContext) {
            if (oModel.oData.personData) {
                var element;
                var elementId;
                var model = oContext.sPath
                if (oModel.getProperty(model).id >= 6 && oModel.getProperty(model).id <= 9) {
                    element = new sap.m.Text({
                        text: "{id}"
                    });
                } else if (oModel.getProperty(model).id >= 10) {
                    element = new sap.m.Button({
                        text: "{id}",
                        type: "Accept"
                    })
                }
                else {
                    element = new sap.m.Input({
                        value: "{id}",
                        editable: false
                    });
                }
                  elementId=  new sap.m.Button({
                    width:"35%",
                        text: "{name}",
                        type:"Reject",
                    });
                debugger
                return new sap.m.ColumnListItem({
                    cells: [new sap.m.Text({
                        wrapping: true,
                        text: "{body}"
                    }),
                    elementId,
                    new sap.m.Text({
                        wrapping: true,
                        text: "{email}"
                    }),
                        element
                    ]
                });
            }
        },
    });

});