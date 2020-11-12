sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast) {
	"use strict";

	return BaseController.extend("projeler.ozgecmis.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			// <<<<<<<<< KİŞİSEL BAŞLANGIÇ
			var kisiselData = {
				Id: "",
				Isim: "",
				dTarih: new Date(), //new Date() bugünün tarihini veriyor. Bu alanı boş bırakınca hata verdiği için bugünün tarihini verdik.
				Mail: "",
				isAdrc: "",
				Hakkinda: "",
				Lisans: "",
				Uyruk: ""
			};
			var oModel = new JSONModel(kisiselData);
			this.getView().setModel(oModel, "kisiselBilgiler");
			// <<<<<<<<< KİŞİSEL BİTİŞ

			// // <<<<<<<<< LİSAN BAŞLANGIÇ
			// var lisanData = {
			// 	Lisan: "",
			// 	Id: ""
			// };
			// var oModel = new JSONModel(lisanData);
			// this.getView().setModel(oModel, "lisanBilgiler");
			// // <<<<<<<<< LİSAN BİTİŞ

			// // <<<<<<<<< Sertifika ve Eğitimler BAŞLANGIÇ
			// var seregitData = {
			// 	SerEgit: "",
			// 	Id: ""
			// };
			// var oModel = new JSONModel(seregitData);
			// this.getView().setModel(oModel, "seregitBilgiler");
			// // <<<<<<<<< Sertifika ve Eğitimler BİTİŞ

			// // <<<<<<<<< Deneyimer BAŞLANGIÇ
			// var deneyimData = {
			// 	Deneyim: "",
			// 	Id: ""
			// };
			// var oModel = new JSONModel(deneyimData);
			// this.getView().setModel(oModel, "deneyimBilgiler");
			// // <<<<<<<<< Deneyimer BİTİŞ

			// // <<<<<<<<< Projeler BAŞLANGIÇ
			// var projeData = {
			// 	// Sorumluluk: "",
			// 	Gorev: "",
			// 	Sektor: "",
			// 	Devamsure: "",
			// 	Tanim: "",
			// 	Musteri: "",
			// 	Id: ""
			// };
			// var oModel = new JSONModel(projeData);
			// this.getView().setModel(oModel, "projeBilgiler");
			// // <<<<<<<<< Projeler BİTİŞ

			// // <<<<<<<<< Sorumluluk BAŞLANGIÇ
			// var sorumlulukData = {
			// 	Sorumluluk: "",
			// 	Id: ""
			// };
			// var oModel = new JSONModel(sorumlulukData);
			// this.getView().setModel(oModel, "sorumlulukBilgiler");
			// // <<<<<<<<< Sorumluluk BİTİŞ
		},

		// onSearchActivity: function () {
		// 	var sFilterData = this.getView().getModel("kisiselBilgiler").getData();
		// 	var aFilter = [];
		// 	aFilter.push(new Filter("perId", FilterOperator.EQ, sFilterData.Id));
		// 	var oBinding = this.getView().byId("table").getBinding("items");
		// 	oBinding.filter(aFilter);
		// },

		/////////// BEGIN OF YENI EKLE
		_getyeniEkleDialog: function () {
			if (!this._oYeniEkleDialog) {
				// this._oYeniEkleDialog = sap.ui.xmlfragment("yeniEkleId", "projeler.ozgecmis.fragment.yeniEkle", this);
				this._oYeniEkleDialog = sap.ui.xmlfragment("yeniEkleFragment", "projeler.ozgecmis.fragment.yeniEkle", this);
				this.getView().addDependent(this._oYeniEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oYeniEkleDialog);
			}
			return this._oYeniEkleDialog;
		},

		onyeniEkle: function () {
			this._getyeniEkleDialog().open();
		},

		onyeniEkleGeri: function () {
			this._getyeniEkleDialog().close();
		},

		onyeniEkleKayit: function () {
			var that = this;
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vperId = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperId").getValue();
			// var vperIsim = sap.ui.getCore().byId("inputperIsim").getValue();
			var vperIsim = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperIsim").getValue();
			// var vperdTarih = sap.ui.getCore().byId("inputperdTarih").getDateValue();
			var vperdTarih = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperdTarih").getDateValue();
			// var vperMail = sap.ui.getCore().byId("inputperMail").getValue();
			var vperMail = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperMail").getValue();
			// var vperisAdrc = sap.ui.getCore().byId("inputperisAdrc").getValue();
			var vperisAdrc = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperisAdrc").getValue();
			// var vperHakkinda = sap.ui.getCore().byId("inputperHakkinda").getValue();
			var vperHakkinda = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperHakkinda").getValue();
			// var vperLisans = sap.ui.getCore().byId("inputperLisans").getValue();
			var vperLisans = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperLisans").getValue();
			// var vperUyruk = sap.ui.getCore().byId("inputperUyruk").getValue();
			var vperUyruk = sap.ui.core.Fragment.byId("yeniEkleFragment", "inputperUyruk").getValue();

			var kisiselData = {
				perUyruk: vperUyruk,
				perLisans: vperLisans,
				perHakkinda: vperHakkinda,
				perisAdrc: vperisAdrc,
				perMail: vperMail,
				perdTarih: vperdTarih,
				perIsim: vperIsim,
				perId: vperId
			};

			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/kisiselSet", kisiselData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getyeniEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getyeniEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF YENI EKLE

		// /////////// BEGIN OF LISAN
		// _getlisanEkleDialog: function () {
		// 	if (!this._oLisanEkleDialog) {
		// 		this._oLisanEkleDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.lisanEkle", this);
		// 		this.getView().addDependent(this._oLisanEkleDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLisanEkleDialog);
		// 	}
		// 	return this._oLisanEkleDialog;
		// },

		// onLisanEkle: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getlisanEkleDialog().open();
		// },

		// onlisanEkleGeri: function () {
		// 	this._getlisanEkleDialog().close();
		// },

		// onlisanEkleKayit: function () {
		// 	var that = this;
		// 	var vperLisan = sap.ui.getCore().byId("inputperLisan").getValue();
		// 	var vperId = sap.ui.getCore().byId("inputperId").getValue();
		// 	var lisanData = {
		// 		perLisan: vperLisan,
		// 		perId: vperId
		// 	};

		// 	sap.ui.core.BusyIndicator.show();
		// 	this.getView().getModel().create("/lisanSet", lisanData, {
		// 		success: function (oData) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getlisanEkleDialog().close();
		// 			that.onRefresh();
		// 			MessageToast.show("Başarılı");
		// 		},
		// 		error: function (oError) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getlisanEkleDialog().close();
		// 			MessageToast.show("Başarısız");
		// 		}
		// 	});
		// },
		// /////////// END OF LISAN

		// /////////// BEGIN OF SERTIFIKA VE EGITIMLER
		// _getSerEgitEkleDialog: function () {
		// 	if (!this._oSerEgitEkleDialog) {
		// 		this._oSerEgitEkleDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.seregitEkle", this);
		// 		this.getView().addDependent(this._oSerEgitEkleDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSerEgitEkleDialog);
		// 	}
		// 	return this._oSerEgitEkleDialog;
		// },

		// onSerEgitEkle: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getSerEgitEkleDialog().open();
		// },

		// onseregitEkleGeri: function () {
		// 	this._getSerEgitEkleDialog().close();
		// },

		// onseregitEkleKayit: function () {
		// 	var that = this;
		// 	var vperSerEgit = sap.ui.getCore().byId("inputperSerEgit").getValue();
		// 	var vperId = sap.ui.getCore().byId("inputperId").getValue();
		// 	var SerEgitData = {
		// 		perSerEgit: vperSerEgit,
		// 		perId: vperId
		// 	};

		// 	sap.ui.core.BusyIndicator.show();
		// 	this.getView().getModel().create("/serEgitSet", SerEgitData, {
		// 		success: function (oData) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getlisanEkleDialog().close();
		// 			that.onRefresh();
		// 			MessageToast.show("Başarılı");
		// 		},
		// 		error: function (oError) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getlisanEkleDialog().close();
		// 			MessageToast.show("Başarısız");
		// 		}
		// 	});
		// },
		// /////////// END OF SERTIFIKA VE EGITIMLER

		// /////////// BEGIN OF DENEYİMLER
		// _getDeneyimEkleDialog: function () {
		// 	if (!this._oDeneyimEkleDialog) {
		// 		this._oDeneyimEkleDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.deneyimEkle", this);
		// 		this.getView().addDependent(this._oDeneyimEkleDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDeneyimEkleDialog);
		// 	}
		// 	return this._oDeneyimEkleDialog;
		// },

		// onDeneyimEkle: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getDeneyimEkleDialog().open();
		// },

		// onDeneyimEkleGeri: function () {
		// 	this._getDeneyimEkleDialog().close();
		// },

		// onDeneyimEkleKayit: function () {
		// 	var that = this;
		// 	var vperDeneyim = sap.ui.getCore().byId("inputperDeneyim").getValue();
		// 	var vperId = sap.ui.getCore().byId("inputperId").getValue();
		// 	var deneyimData = {
		// 		perDeneyim: vperDeneyim,
		// 		perId: vperId
		// 	};

		// 	sap.ui.core.BusyIndicator.show();
		// 	this.getView().getModel().create("/deneyimSet", deneyimData, {
		// 		success: function (oData) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getDeneyimEkleDialog().close();
		// 			that.onRefresh();
		// 			MessageToast.show("Başarılı");
		// 		},
		// 		error: function (oError) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getDeneyimEkleDialog().close();
		// 			MessageToast.show("Başarısız");
		// 		}
		// 	});
		// },
		// /////////// END OF DENEYİMLER

		// /////////// BEGIN OF PROJELER
		// _getProjelerEkleDialog: function () {
		// 	if (!this._oProjectEkleDialog) {
		// 		this._oProjectEkleDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.projeEkle", this);
		// 		this.getView().addDependent(this._oProjectEkleDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oProjectEkleDialog);
		// 	}
		// 	return this._oProjectEkleDialog;
		// },

		// onProjelerEkle: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getProjelerEkleDialog().open();
		// },

		// onProjelerEkleGeri: function () {
		// 	this._getProjelerEkleDialog().close();
		// },

		// onProjelerEkleKayit: function () {
		// 	var that = this;
		// 	// var vprojSorumluluk = sap.ui.getCore().byId("inputprojSorumluluk").getValue();
		// 	var vprojGorev = sap.ui.getCore().byId("inputprojGorev").getValue();
		// 	var vprojSektor = sap.ui.getCore().byId("inputprojSektor").getValue();
		// 	var vprojDevamsure = sap.ui.getCore().byId("inputprojDevamsure").getValue();
		// 	var vprojTanim = sap.ui.getCore().byId("inputprojTanim").getValue();
		// 	var vprojMusteri = sap.ui.getCore().byId("inputprojMusteri").getValue();
		// 	var vperId = sap.ui.getCore().byId("inputperId").getValue();
		// 	var ProjelerData = {
		// 		// projSorumluluk: vprojSorumluluk,
		// 		projGorev: vprojGorev,
		// 		projSektor: vprojSektor,
		// 		projDevamsure: vprojDevamsure,
		// 		projTanim: vprojTanim,
		// 		projMusteri: vprojMusteri,
		// 		perId: vperId

		// 	};
		// 	sap.ui.core.BusyIndicator.show();
		// 	this.getView().getModel().create("/projelerSet", ProjelerData, {
		// 		success: function (oData) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getProjelerEkleDialog().close();
		// 			that.onRefresh();
		// 			MessageToast.show("Başarılı");
		// 		},
		// 		error: function (oError) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getProjelerEkleDialog().close();
		// 			MessageToast.show("Başarısız");
		// 		}
		// 	});
		// },
		// /////////// END OF PROJELER

		// /////////// BEGIN OF SORUMLULUK
		// _getSorumlulukDialog: function () {
		// 	if (!this._oSorumlulukDialog) {
		// 		this._oSorumlulukDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.sorumluluklar", this);
		// 		this.getView().addDependent(this._oSorumlulukDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSorumlulukDialog);
		// 	}
		// 	return this._oSorumlulukDialog;
		// },

		// onSorumluluk: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getSorumlulukDialog().open();
		// },

		// onSorumlulukGeri: function () {
		// 	this._getSorumlulukDialog().close();
		// },

		// _getSorumlulukEkleDialog: function () {
		// 	if (!this._oSorumlulukEkleDialog) {
		// 		this._oSorumlulukEkleDialog = sap.ui.xmlfragment("projeler.ozgecmis.fragment.sorumlulukEkle", this);
		// 		this.getView().addDependent(this._oSorumlulukEkleDialog);
		// 		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSorumlulukEkleDialog);
		// 	}
		// 	return this._oSorumlulukEkleDialog;
		// },

		// onSorumlulukEkle: function () {
		// 	// MessageToast.show("Basıldı");
		// 	this._getSorumlulukEkleDialog().open();
		// },

		// onSorumlulukEkleGeri: function () {
		// 	this._getSorumlulukEkleDialog().close();
		// },

		// onSorumlulukEkleKayit: function () {
		// 	var that = this;
		// 	var vprojSorumluluk = sap.ui.getCore().byId("inputprojSorumluluk").getValue();
		// 	var vperId = sap.ui.getCore().byId("inputperId").getValue();
		// 	var SorumlulukData = {
		// 		projSorumluluk: vprojSorumluluk,
		// 		perId: vperId

		// 	};
		// 	sap.ui.core.BusyIndicator.show();
		// 	this.getView().getModel().create("/sorumlulukSet", SorumlulukData, {
		// 		success: function (oData) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getSorumlulukEkleDialog().close();
		// 			that.onRefresh();
		// 			MessageToast.show("Başarılı");
		// 		},
		// 		error: function (oError) {
		// 			sap.ui.core.BusyIndicator.hide();
		// 			that._getSorumlulukEkleDialog().close();
		// 			MessageToast.show("Başarısız");
		// 		}
		// 	});
		// },
		// /////////// END OF SORUMLULUK

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		// onUpdateFinished: function (oEvent) {
		// 	// update the worklist's object counter after the table update
		// 	var sTitle,
		// 		oTable = oEvent.getSource(),
		// 		iTotalItems = oEvent.getParameter("total");
		// 	// only update the counter if the length is final and
		// 	// the table is not empty
		// 	if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
		// 		sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
		// 	} else {
		// 		sTitle = this.getResourceBundle().getText("worklistTableTitle");
		// 	}
		// 	this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		// },

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());

			var sFilterData = this.getView().getModel("kisiselBilgiler").getData();
			var aFilter = [];
			aFilter.push(new Filter("perId", FilterOperator.EQ, sFilterData.Id));
			var oBinding = this.getView().byId("lisanTable").getBinding("items");
			oBinding.filter(aFilter);
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack: function () {
			// eslint-disable-next-line sap-no-history-manipulation
			history.go(-1);
		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function (oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("perId")
			});
		}

	});
});