import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('pouchdb:api');

const db_load = new PouchDB('load');
const db_user = new PouchDB('user');
const db_client = new PouchDB('client');
const db_farm = new PouchDB('farm');
const db_form = new PouchDB('form');
const db_visit = new PouchDB('visit');
const db_log = new PouchDB('log');
const db_agenda = new PouchDB('agenda');

const ver = '0.0.1';

const struct_load = {
    user_login: '',
    user_pass: '',
    version: ''
}

const struct_user = {
    cpf: '',
    nome: '',
    senha: '',
    token: '',
    email: '',
    telefone_fixo: '',
    celular: '',
    regiao_atuacao: '',
    unidade: ''
}

const struct_client = {
    cpf: '',
    nome: '',
    aniversario: '',
    moradia: '',
    familia: '',
    estado: '',
    cidade: '',
    regiao: ''
}

export default Update = async function (){
    try {
        var doc = await db_load.get('load');
        if (doc.version === ver){
            return true
        } else {
            var column = await updateTables();
        }
    } catch (err) {
        var put = await db_load.put({
            _id: 'load',
            user_login: '',
            user_pass: '',
            version: '0.0.0'
        }); /// ALTERAR PARA PRODUÇÃO
        if (put.ok){
            var doc = await db_load.get('load');
            return false;
        }
    }
}

const updateTables = async function () {
    var promise_load = db_load.allDocs().then( (resp) => {
        if(resp.total_rows > 0){
            resp.rows.map( (value, index) => {
                let doc = { ... struct_load , ... value.doc};
                if ( ! objectCheck(value.doc,doc) ){
                    db_load.put(doc);
                }
            })
        }
    });

    var promise_user = db_user.allDocs().then( (resp) => {
        if(resp.total_rows > 0){
            resp.rows.map( (value, index) => {
                let doc = { ... struct_user , ... value.doc};
                if ( ! objectCheck(value.doc,doc) ){
                    db_user.put(doc);
                }
            });
        }
    });

    var promise_client = db_client.allDocs().then( (resp) => {
        if(resp.total_rows > 0){
            resp.rows.map( (value, index) => {
                let doc = { ... struct_client , ... value.doc};
                if ( ! objectCheck(value.doc,doc) ){
                    db_udb_clientser.put(doc);
                }
            });
        }
    });


    

}

const objectCheck = function (o1, o2){
    for (var key in o2) {
        if (! o1[key]){
            return false;
        }
    }

    return true;
}