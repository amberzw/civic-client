(function() {
  'use strict';
  angular.module('civic.events')
    .config(GenesViewConfig)
    .controller(GenesViewController);

  // @ngInject
  function GenesViewConfig($stateProvider) {
    $stateProvider
      .state('events.genes', {
        abstract: true,
        url: '/genes/:geneId',
        templateUrl: 'app/views/events/genes/GenesView.tpl.html',
        resolve: /* @ngInject */ {
          Genes: 'Genes',
          MyGeneInfo: 'MyGeneInfo',
          gene: function(Genes, $stateParams) {
            console.log('$stateProvider.resolve.gene called.');
            return Genes.get({
              'geneId': $stateParams.geneId
            });
          },
          myGene: function(MyGeneInfo, gene) {
            return MyGeneInfo.getDetails({'geneId': gene.entrez_id });
          }
        },
        controller: 'GenesViewController',
        onExit: /* @ngInject */ function($deepStateRedirect) {
          $deepStateRedirect.reset();
        }
      });
    // additional events.genes states here
  }

  // @ngInject
  function GenesViewController(Genes, MyGeneInfo, gene, myGeneInfo, $log) {
    $log.info('GenesViewController instantiated.');
    var ctrl = $scope;
    var geneView = ctrl.geneView = {};

    geneView.config = {
      name: 'gene',
      state: 'events.genes',
      data: {
        gene: gene,
        myGene: myGeneInfo
      },
      services: {
        Genes: Genes,
        MyGeneInfo: MyGeneInfo
      }
    };

    geneView.actions = {

    };
  }

})();
