// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'pouchdb'])


    .config(function (pouchDBProvider, POUCHDB_METHODS, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom');

        var findMethods = {
            createIndex: 'qify',
            getIndexes: 'qify',
            deleteIndex: 'qify',
            find: 'qify'
        };

        pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, findMethods);

        $stateProvider
            .state('Contatos', {
                url: '/',
                templateUrl: 'contatos/contatos.html',
                controller: 'ContatosCtrl',
                cache : false
            })
            .state('Form', {
                url: '/form',
                templateUrl: 'form/form.html',
                controller: "FormCtrl",
                cache : false
            })

        $urlRouterProvider.otherwise('/');

    })


    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

    })