/*Banco de Dados Utilizados
**Load      - load
**Usuario   - user
**Cliente   - client
**Fazenda   - farm
**Visita    - visit
*/

import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('pouchdb:api');

import {post} from '../connection/conn';

const db_load = new PouchDB('load');
const db_user = new PouchDB('user');
const db_client = new PouchDB('client');
const db_farm = new PouchDB('farm');
const db_form = new PouchDB('form');
const db_visit = new PouchDB('visit');
const db_log = new PouchDB('log');
const db_agenda = new PouchDB('agenda');

export const GetLoad = async function () {
    try {
        var doc = await db_load.get('load');
        return doc;
    } catch (err) {
        var put = await db_load.put({
            _id: 'load',
            user_login: '',
            user_pass: ''
        });
        if (put.ok){
            var doc = await db_load.get('load');
            return doc;
        }
    }
}

export const SaveLoad = async function (data) {
    try {
        var doc = await db_load.get('load');
        var put = await db_load.post({
            ... doc,
            user_login: data.cpf,
            user_pass: data.senha
        });

        if (put.ok){
            var doc = await db_load.get('load');
            return doc;
        }
    } catch (err) {
        var put = await db_load.post({
            _id: 'load',
            user_login: data.cpf,
            user_pass: data.senha
        });
        
        if (put.ok){
            var doc = await db_load.get('load');
            return doc;
        }
    }
}

export const GetUser = async function (cpf) {
    console.log('0')
    try{
        var doc = await db_user.find({
            selector: {
                cpf: {$eq: cpf}
            },
            limit: 1
        });
        return doc;
    } catch (err) {
        console.log(err);
        console.log('3')
        return null;
    }
}

export const SaveUser = async function(data) {
    try{
        var doc = await db_user.find({
            selector: {
                cpf: {$eq:  data.cpf}
            }
        });
        var save = await db_user.post({
            ... doc,
            ... data
        });
        return save;
    } catch {
        try {
            var doc = await db_user.put({
                ... data
            });
            return doc;
        } catch (err) {
            return null;
        }
        

    }
}

export const SaveClient = async function (data){
    if (data.cpf){
        try {
            var doc = await db_client.put({
                _id: data.cpf,
                ... data
            });

            return doc;
        } catch (err) {
            try {

                var get = await db_client.get(data.cpf);
                var doc = await db_client.put({
                    ... get,
                    ... data
                });

                return doc;
            }catch (err) {
                return null;
            }
        }
    } else {
        return null;
    }
}

export const GetClient = async function (cpf){
    if (cpf) {
        try {
            var doc = await db_client.get(cpf);
            return doc;
        } catch (err) {
            return null;
        }
    } else {

        return null;

    }
}

export const SaveLog = async function (data) {
    try {
        var doc = await db_log.post({
            data : {... data}
        });

        return doc;

    } catch (err) {

        return false ;

    }
}

export const UpdateLog = async function () {
    try {

        var all = await db_log.allDocs({
            include_docs: true,
            attachments: true
        });

        all.rows.map((index, value) => {
            post({ ... value.doc.data}).then( (resp) => {
                if (resp.data.status){
                    db_log.remove(value.doc);
                }
            })
        })

    } catch (err) {
        console.log(err);
    }
    
}