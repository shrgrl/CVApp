sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter",
	"sap/m/MessageToast"
], function (BaseController, JSONModel, History, formatter, MessageToast) {
	"use strict";

	return BaseController.extend("projeler.ozgecmis.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});

			// <<<<<<<<< LİSAN BAŞLANGIÇ
			var lisanData = {
				Lisan: "",
				Id: ""
			};
			var oModel = new JSONModel(lisanData);
			this.getView().setModel(oModel, "lisanBilgiler");
			// <<<<<<<<< LİSAN BİTİŞ

			// <<<<<<<<< Sertifika ve Eğitimler BAŞLANGIÇ
			var seregitData = {
				SerEgit: "",
				Id: ""
			};
			var oModel = new JSONModel(seregitData);
			this.getView().setModel(oModel, "seregitBilgiler");
			// <<<<<<<<< Sertifika ve Eğitimler BİTİŞ

			// <<<<<<<<< Deneyimer BAŞLANGIÇ
			var deneyimData = {
				Deneyim: "",
				Id: ""
			};
			var oModel = new JSONModel(deneyimData);
			this.getView().setModel(oModel, "deneyimBilgiler");
			// <<<<<<<<< Deneyimer BİTİŞ

			// <<<<<<<<< Projeler BAŞLANGIÇ
			var projeData = {
				// Sorumluluk: "",
				Gorev: "",
				Sektor: "",
				Devamsure: "",
				Tanim: "",
				Musteri: "",
				Id: ""
			};
			var oModel = new JSONModel(projeData);
			this.getView().setModel(oModel, "projeBilgiler");
			// <<<<<<<<< Projeler BİTİŞ

			// <<<<<<<<< Sorumluluk BAŞLANGIÇ
			var sorumlulukData = {
				Sorumluluk: "",
				Id: ""
			};
			var oModel = new JSONModel(sorumlulukData);
			this.getView().setModel(oModel, "sorumlulukBilgiler");
			// <<<<<<<<< Sorumluluk BİTİŞ
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */

		/////////// BEGIN OF LISAN
		_getlisanEkleDialog: function () {
			if (!this._oLisanEkleDialog) {
				this._oLisanEkleDialog = sap.ui.xmlfragment("lisanFragment", "projeler.ozgecmis.fragment.lisanEkle", this);
				this.getView().addDependent(this._oLisanEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLisanEkleDialog);
			}
			return this._oLisanEkleDialog;
		},

		onLisanEkle: function () {
			// MessageToast.show("Basıldı");
			this._getlisanEkleDialog().open();
		},

		onlisanEkleGeri: function () {
			this._getlisanEkleDialog().close();
		},

		onlisanEkleKayit: function () {
			var that = this;
			// var vperLisan = sap.ui.getCore().byId("inputperLisan").getValue();
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vperLisan = sap.ui.core.Fragment.byId("lisanFragment", "inputperLisan").getValue();
			var vperId = sap.ui.core.Fragment.byId("lisanFragment", "inputperId").getValue();
			var lisanData = {
				perLisan: vperLisan,
				perId: vperId
			};

			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/lisanSet", lisanData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getlisanEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getlisanEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF LISAN

		/////////// BEGIN OF SERTIFIKA VE EGITIMLER
		_getSerEgitEkleDialog: function () {
			if (!this._oSerEgitEkleDialog) {
				this._oSerEgitEkleDialog = sap.ui.xmlfragment("seregitFragment", "projeler.ozgecmis.fragment.seregitEkle", this);
				this.getView().addDependent(this._oSerEgitEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSerEgitEkleDialog);
			}
			return this._oSerEgitEkleDialog;
		},

		onSerEgitEkle: function () {
			// MessageToast.show("Basıldı");
			this._getSerEgitEkleDialog().open();
		},

		onseregitEkleGeri: function () {
			this._getSerEgitEkleDialog().close();
		},

		onseregitEkleKayit: function () {
			var that = this;
			// var vperSerEgit = sap.ui.getCore().byId("inputperSerEgit").getValue();
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vperSerEgit = sap.ui.core.Fragment.byId("seregitFragment", "inputperSerEgit").getValue();
			var vperId = sap.ui.core.Fragment.byId("seregitFragment", "inputperId").getValue();
			var SerEgitData = {
				perSerEgit: vperSerEgit,
				perId: vperId
			};

			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/serEgitSet", SerEgitData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getSerEgitEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getlisanEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF SERTIFIKA VE EGITIMLER

		/////////// BEGIN OF DENEYİMLER
		_getDeneyimEkleDialog: function () {
			if (!this._oDeneyimEkleDialog) {
				this._oDeneyimEkleDialog = sap.ui.xmlfragment("deneyimFragment", "projeler.ozgecmis.fragment.deneyimEkle", this);
				this.getView().addDependent(this._oDeneyimEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDeneyimEkleDialog);
			}
			return this._oDeneyimEkleDialog;
		},

		onDeneyimEkle: function () {
			// MessageToast.show("Basıldı");
			this._getDeneyimEkleDialog().open();
		},

		onDeneyimEkleGeri: function () {
			this._getDeneyimEkleDialog().close();
		},

		onDeneyimEkleKayit: function () {
			var that = this;
			// var vperDeneyim = sap.ui.getCore().byId("inputperDeneyim").getValue();
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vperDeneyim = sap.ui.core.Fragment.byId("deneyimFragment", "inputperDeneyim").getValue();
			var vperId = sap.ui.core.Fragment.byId("deneyimFragment", "inputperId").getValue();
			var deneyimData = {
				perDeneyim: vperDeneyim,
				perId: vperId
			};

			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/deneyimSet", deneyimData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getDeneyimEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getDeneyimEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF DENEYİMLER

		/////////// BEGIN OF PROJELER
		_getProjelerEkleDialog: function () {
			if (!this._oProjectEkleDialog) {
				this._oProjectEkleDialog = sap.ui.xmlfragment("projeFragment", "projeler.ozgecmis.fragment.projeEkle", this);
				this.getView().addDependent(this._oProjectEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oProjectEkleDialog);
			}
			return this._oProjectEkleDialog;
		},

		onProjelerEkle: function () {
			// MessageToast.show("Basıldı");
			this._getProjelerEkleDialog().open();
		},

		onProjelerEkleGeri: function () {
			this._getProjelerEkleDialog().close();
		},

		onProjelerEkleKayit: function () {
			var that = this;
			// var vprojSorumluluk = sap.ui.getCore().byId("inputprojSorumluluk").getValue();
			// var vprojGorev = sap.ui.getCore().byId("inputprojGorev").getValue();
			// var vprojSektor = sap.ui.getCore().byId("inputprojSektor").getValue();
			// var vprojDevamsure = sap.ui.getCore().byId("inputprojDevamsure").getValue();
			// var vprojTanim = sap.ui.getCore().byId("inputprojTanim").getValue();
			// var vprojMusteri = sap.ui.getCore().byId("inputprojMusteri").getValue();
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vprojGorev = sap.ui.core.Fragment.byId("projeFragment", "inputprojGorev").getValue();
			var vprojSektor = sap.ui.core.Fragment.byId("projeFragment", "inputprojSektor").getValue();
			var vprojDevamsure = sap.ui.core.Fragment.byId("projeFragment", "inputprojDevamsure").getValue();
			var vprojTanim = sap.ui.core.Fragment.byId("projeFragment", "inputprojTanim").getValue();
			var vprojMusteri = sap.ui.core.Fragment.byId("projeFragment", "inputprojMusteri").getValue();
			var vperId = sap.ui.core.Fragment.byId("projeFragment", "inputperId").getValue();
			var ProjelerData = {
				// projSorumluluk: vprojSorumluluk,
				projGorev: vprojGorev,
				projSektor: vprojSektor,
				projDevamsure: vprojDevamsure,
				projTanim: vprojTanim,
				projMusteri: vprojMusteri,
				perId: vperId

			};
			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/projelerSet", ProjelerData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getProjelerEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getProjelerEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF PROJELER

		/////////// BEGIN OF SORUMLULUK
		_getSorumlulukDialog: function () {
			if (!this._oSorumlulukDialog) {
				this._oSorumlulukDialog = sap.ui.xmlfragment("sorumlulukGosterFragment", "projeler.ozgecmis.fragment.sorumluluklar", this);
				this.getView().addDependent(this._oSorumlulukDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSorumlulukDialog);
			}
			return this._oSorumlulukDialog;
		},

		onSorumluluk: function () {
			// MessageToast.show("Basıldı");
			this._getSorumlulukDialog().open();
		},

		onSorumlulukGeri: function () {
			this._getSorumlulukDialog().close();
		},

		_getSorumlulukEkleDialog: function () {
			if (!this._oSorumlulukEkleDialog) {
				this._oSorumlulukEkleDialog = sap.ui.xmlfragment("sorumlulukekleFragment", "projeler.ozgecmis.fragment.sorumlulukEkle", this);
				this.getView().addDependent(this._oSorumlulukEkleDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oSorumlulukEkleDialog);
			}
			return this._oSorumlulukEkleDialog;
		},

		onSorumlulukEkle: function () {
			// MessageToast.show("Basıldı");
			this._getSorumlulukEkleDialog().open();
		},

		onSorumlulukEkleGeri: function () {
			this._getSorumlulukEkleDialog().close();
		},

		onSorumlulukEkleKayit: function () {
			var that = this;
			// var vprojSorumluluk = sap.ui.getCore().byId("inputprojSorumluluk").getValue();
			// var vperId = sap.ui.getCore().byId("inputperId").getValue();
			var vprojSorumluluk = sap.ui.core.Fragment.byId("sorumlulukekleFragment", "inputprojSorumluluk").getValue();
			var vperId = sap.ui.core.Fragment.byId("sorumlulukekleFragment", "inputperId").getValue();
			var SorumlulukData = {
				projSorumluluk: vprojSorumluluk,
				perId: vperId

			};
			sap.ui.core.BusyIndicator.show();
			this.getView().getModel().create("/sorumlulukSet", SorumlulukData, {
				success: function (oData) {
					sap.ui.core.BusyIndicator.hide();
					that._getSorumlulukEkleDialog().close();
					that.onRefresh();
					MessageToast.show("Başarılı");
				},
				error: function (oError) {
					sap.ui.core.BusyIndicator.hide();
					that._getSorumlulukEkleDialog().close();
					MessageToast.show("Başarısız");
				}
			});
		},
		/////////// END OF SORUMLULUK

		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("kisiselSet", {
					perId: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function (sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.perId,
				sObjectName = oObject.perIsim;

			oViewModel.setProperty("/busy", false);

			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		onRefresh: function () {
			var oLisanTable = this.byId("lisanTable");
			oLisanTable.getBinding("items").refresh();

			var oSeregitTable = this.byId("seregitTable");
			oSeregitTable.getBinding("items").refresh();

			var oDeneyimTable = this.byId("deneyimTable");
			oDeneyimTable.getBinding("items").refresh();

			var oProjeTable = this.byId("projeTable");
			oProjeTable.getBinding("items").refresh();

			var oSorumlulukTable = this.byId("sorumluluklarTable");
			oSorumlulukTable.getBinding("items").refresh();
		}

	});

});