import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!'

export class PNPDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.scope = $scope;
    this.uiSegmentSrv = uiSegmentSrv;
    this.target.host = this.target.host || this.datasource.DEFAULT_HOST;
    this.target.service = this.target.service || this.datasource.DEFAULT_SERVICE;
    this.target.perflabel = this.target.perflabel || this.datasource.DEFAULT_PERFLABEL;
    this.target.type = this.target.type || 'AVERAGE';
    this.target.fill = this.target.fill || 'fill';
  }

  getHost() {
    return this.datasource.metricFindQuery(this.target, "host", true)
      .then(this.uiSegmentSrv.transformToSegments(false));
  }

  getService() {
    return this.datasource.metricFindQuery(this.target, "service", true)
      .then(this.uiSegmentSrv.transformToSegments(false));
  }

  getPerflabel() {
    return this.datasource.metricFindQuery(this.target, "perflabel", true)
      .then(this.uiSegmentSrv.transformToSegments(false));
  }

  onChangeInternal() {
    this.panelCtrl.refresh();
  }

  getCollapsedText() {
    if(this.target.perflabel == this.datasource.DEFAULT_PERFLABEL &&
       this.target.host      == this.datasource.DEFAULT_HOST &&
       this.target.service   == this.datasource.DEFAULT_SERVICE) {
        return("click to edit query");
    }
    return(this.target.perflabel
           +': '+this.target.host
           +' - '+this.target.service
           );
  }
}

PNPDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
