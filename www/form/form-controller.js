/**
 * Created by rogerio on 23/07/15.
 */
app

    .controller('FormCtrl', function ($scope, pouchDB) {

        var db = pouchDB('contatos'), pagina = 0;

        $scope.contato = {};

        $scope.salvarContato = function (contato) {
            if (contato && contato.nome && contato.telefone) {

                $scope.contato = contato;

                // Estudar IIFE
                var promise = (function (contato) {
                    contato.type = 'tabelaContato';
                    contato.timestamp = new Date().getTime();

                    if (!contato._id) {
                        return db.post(contato);
                    } else {
                        return db.put(contato);
                    }
                })(contato);

                // Estudar promises
                promise.then(function (res) {

                    $scope.contato = {};
                    pagina = 0;
                }).catch(function (err) {
                    console.dir(err);
                });

            } else {
                alert('NÃÃÃÃÃO!');
            }
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

    })

