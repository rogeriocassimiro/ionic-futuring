/**
 * Created by rogerio on 23/07/15.
 */
app

    .controller('ContatosCtrl', function ($scope, pouchDB) {

        // Cria a base
        var db = pouchDB('contatos'), pagina = 0;

        $scope.showSpinner = true;

        $scope.contatos = [];

        var ping = db.createIndex({
            index: {
                fields: ['nome', 'type']
            }
        });

        function whenUnblocked() {
            return ping;
        }

        function find(p) {
            whenUnblocked().then(function () {

                db.allDocs({limit: 0}).then(function (res) {
                    console.dir(res);
                })

                return db.find({
                    skip: p * 10,
                    limit: 10,
                    selector: {type: 'tabelaContato', nome: {$exists: true}},
                    sort: ['nome']
                });
            }).then(function (res) {
                if (res.docs.length > 0) {
                    ++pagina;
                    $scope.contatos = $scope.contatos.concat(res.docs);
                } else {
                    $scope.showSpinner = false;
                }

                // Dispara evento para a diretiva <ion-infinite-scroll> finalizar o carregamento
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).catch(function (err) {
                console.dir(err);
            });
        }

        $scope.loadMore = function () {
            find(pagina);
        }

       $scope.editarContato = function (contato) {
            $scope.contato = contato;
        }

        $scope.excluirContato = function (contato) {
            db.remove(contato).then(function (res) {
                $scope.contatos = [];
                pagina = 0;
                find(pagina);
            }).catch(function (err) {
                console.dir(err);
            })
        }


    });