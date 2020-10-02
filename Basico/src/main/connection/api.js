import {post, URL_API} from './conn';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { normalizeString } from '../../libs/functions';

export const getUser = (data) => {
    var sql = `SELECT U.cpf, U.nome, U.senha, R.unidade FROM campo_racoes.usuario AS U 
              INNER JOIN campo_racoes.usuario_representante AS UR ON 
              UR.usuario_id = U.cpf 
              INNER JOIN campo_racoes.representante AS R ON 
              UR.representante_id = R.cpf 
              WHERE U.cpf = ${data.cpf} AND U.senha = ${data.senha}`;
    return post({
        acao: 'sql',
        sql: sql
    });
}


export const getFazenda = (data) => {
    var sql = `SELECT C.representante_id AS representante_cpf , U.nome AS representante_nome, U.unidade AS representante_unidade, 
                C.cpf AS cliente_cpf, C.nome AS cliente_nome, C.regiao AS cliente_cidade, C.uf AS cliente_estado, C.unidade AS cliente_unidade, 
                F.nome AS fazenda_nome, F.cidade AS fazenda_cidade, F.uf AS fazenda_estado, F.tipo AS fazenda_tipo, F.id AS fazenda_id
                FROM campo_racoes.representante AS U 
                INNER JOIN campo_racoes.usuario_representante AS UR ON UR.usuario_id = U.cpf 
                INNER JOIN campo_racoes.cliente_campo AS C ON C.representante_id = UR.representante_id 
                INNER JOIN campo_racoes.fazenda AS F ON F.cliente_campo_id = C.cpf 
                WHERE U.cpf = ${data.cpf} LIMIT 10`;
    return post({
        acao: 'sql',
        sql: sql
    });
}

export const searchFazenda = (data) => {

  var sql = `SELECT C.representante_id AS representante_cpf , U.nome AS representante_nome, U.unidade AS representante_unidade, 
                C.cpf AS cliente_cpf, C.nome AS cliente_nome, C.regiao AS cliente_cidade, C.uf AS cliente_estado, C.unidade AS cliente_unidade, 
                F.nome AS fazenda_nome, F.cidade AS fazenda_cidade, F.uf AS fazenda_estado, F.tipo AS fazenda_tipo, F.id AS fazenda_id
                FROM campo_racoes.representante AS U 
                INNER JOIN campo_racoes.usuario_representante AS UR ON UR.usuario_id = U.cpf 
                INNER JOIN campo_racoes.cliente_campo AS C ON C.representante_id = UR.representante_id 
                INNER JOIN campo_racoes.fazenda AS F ON F.cliente_campo_id = C.cpf 
                WHERE U.cpf = ${data.cpf} AND C.cpf = ${data.cliente} LIMIT 10`;
    return post({
        acao: 'sql',
        sql: sql
    });
}

export const getAllFazenda = () => {
  var sql = `SELECT C.representante_id AS representante_cpf , U.nome AS representante_nome, U.unidade AS representante_unidade, 
                C.cpf AS cliente_cpf, C.nome AS cliente_nome, C.regiao AS cliente_cidade, C.uf AS cliente_estado, C.unidade AS cliente_unidade, 
                F.nome AS fazenda_nome, F.cidade AS fazenda_cidade, F.uf AS fazenda_estado, F.tipo AS fazenda_tipo, F.id AS fazenda_id
                FROM campo_racoes.representante AS U 
                INNER JOIN campo_racoes.usuario_representante AS UR ON UR.usuario_id = U.cpf 
                INNER JOIN campo_racoes.cliente_campo AS C ON C.representante_id = UR.representante_id 
                INNER JOIN campo_racoes.fazenda AS F ON F.cliente_campo_id = C.cpf`;
    return post({
        acao: 'sql',
        sql: sql
    });
}

export const getAllUser = () => {
  var sql = `SELECT U.cpf, U.nome, U.senha, R.unidade FROM campo_racoes.usuario AS U 
            INNER JOIN campo_racoes.usuario_representante AS UR ON 
            UR.usuario_id = U.cpf 
            INNER JOIN campo_racoes.representante AS R ON 
            UR.representante_id = R.cpf`;
  return post({
      acao: 'sql',
      sql: sql
  });
}

export const searchFazendaNome = (data) => {

  data.cliente = normalizeString(data.cliente);

  var sql = `SELECT C.representante_id AS representante_cpf , U.nome AS representante_nome, U.unidade AS representante_unidade, 
                C.cpf AS cliente_cpf, C.nome AS cliente_nome, C.regiao AS cliente_cidade, C.uf AS cliente_estado, C.unidade AS cliente_unidade, 
                F.nome AS fazenda_nome, F.cidade AS fazenda_cidade, F.uf AS fazenda_estado, F.tipo AS fazenda_tipo, F.id AS fazenda_id
                FROM campo_racoes.representante AS U 
                INNER JOIN campo_racoes.usuario_representante AS UR ON UR.usuario_id = U.cpf 
                INNER JOIN campo_racoes.cliente_campo AS C ON C.representante_id = UR.representante_id 
                INNER JOIN campo_racoes.fazenda AS F ON F.cliente_campo_id = C.cpf 
                WHERE U.cpf = ${data.cpf} AND C.nome LIKE '%${data.cliente}%' LIMIT 10`;
    return post({
        acao: 'sql',
        sql: sql
    });

}

export const getTxt = (nome) => {
    var path = `http://api.setcanhoto.com.br/api_campo_racoes/v1/assets/txt/${nome}.txt`;
    console.log(path);
    axios.defaults.headers = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
    return axios.get(path);
}

export const addVisitaForm = (data) => {

  var sql = `INSERT INTO \`campo_racoes\`.\`visita_formulario\` (\`fazenda_id\`, \`representante_id\`, \`tecnico_id\`, \`estado\`, \`cidade\`, \`visita_data\`, \`quem_atendeu\`, \`quem_solicitou\`, \`visita_motivo\`, \`ocorrencia_problema_relatado\`, \`ocorrencia_problema_resolucao\`, \`latitude\`, \`longitude\`) `;
  sql += `VALUES ('${data.fazenda_id}','${data.representante_id}','${data.tecnico_id}','${data.estado}','${data.cidade}',`;
  sql += `'${data.visita_data}','${data.quem_atendeu}','${data.quem_solicitou}','${data.visita_motivo}',`;
  sql += `'${data.ocorrencia_problema_relatado}','${data.ocorrencia_problema_resolucao}','${data.latitude}','${data.longitude}')`;
  
  return post({
    acao: 'sql',
    sql: sql
  });

}

export const sendVisita = (data) => {

  var uploadBegin = (response) => {
    var jobId = response.jobId;
    console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
  };
  
  var uploadProgress = (response) => {
    var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
    console.log('UPLOAD IS ' + percentage + '% DONE!');
  };

  var body = {
    "acao" : "visita_tecnica_add",
    "cliente_id" : data.cliente_id,
    "fazenda_id" : data.fazenda_id,
    "tecnico_id" : data.tecnico_id,
    "representante_id" : data.representante_id,
    "unidade" : data.unidade,
    "tipo": data.tipo,
    "latitude" : data.latitude+"",
    "longitude" : data.longitude+"",
    "data_envio" : data.data_envio,
    "formulario" : data.formulario
  }

  var files = [];

  /*data.imagens.map( (value, index) => {
    files.push({
      name: value.name,
      filename: `${value.name}.jpeg`,
      filepath: value.url,
      filetype: 'image/jpeg'
    });
  });*/



  /*RNFS.uploadFiles({
    toUrl: URL_API,
    files: files.length > 0 ? files : [],
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    fields: body,
    begin: uploadBegin,
    progress: uploadProgress,
  }).promise.then( (resp) => {
    console.log(resp.data)
  }).catch( err => console.log(err))*/

  var form = new FormData();

  form.append("acao" , "visita_tecnica_add")
  form.append("cliente_id" , data.cliente_id)
  form.append("fazenda_id" , data.fazenda_id)
  form.append("tecnico_id" , data.tecnico_id)
  form.append("representante_id" , data.representante_id)
  form.append("unidade" , data.unidade)
  form.append("tipo", data.tipo)
  form.append("latitude" , data.latitude+"")
  form.append("longitude" , data.longitude+"")
  form.append("data_envio" , data.data_envio)
  form.append("formulario" , data.formulario)

  data.imagens.map( (value, index) => {
    form.append('imagem[]',{
      name: `${value.name}.jpeg`,
      uri: value.url,
      type: 'image/jpeg'
    });
  });
   
  var post = axios({
    method: 'post',
        url: URL_API,
        data: form,
        headers: {'Content-Type': 'multipart/form-data' }
    });

    return post;
}

export const sendTxt = (texto,nome) => {

  //console.log(texto);

    var path = RNFS.DocumentDirectoryPath + `/${nome}.txt`;

    var uploadBegin = (response) => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };
    
    var uploadProgress = (response) => {
      var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    return RNFS.writeFile(path, texto, 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');

        var files = [
          {
            name: 'arquivo',
            filename: `${nome}.txt`,
            filepath: path,
            filetype: 'txt'
          }];

          return RNFS.uploadFiles({
            toUrl: URL_API,
            files: files,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
            },
            fields: {
              'acao': 'txt_add',
              'nome': `${nome}.txt`,
            },
            /*begin: uploadBegin,
            progress: uploadProgress,*/
          })
      })
      .catch((err) => {
        console.log(err.message);
      });

}

export const apiToState = (data) => {
    var array = [];
    data.map((value, index) => {
        var arrayIndex = array.findIndex(item => item.cpfcnpj === value.cliente_cpf);
        if (arrayIndex >= 0){
            array[arrayIndex].fazenda.push({
                nome: value.fazenda_nome,
                tipo: value.fazenda_tipo,
                cidade: value.fazenda_cidade,
                estado: value.fazenda_estado,
                id: value.fazenda_id,
            });
        } else {
            array.push({
                cpfcnpj: value.cliente_cpf,
                representante: value.representante_cpf,
                unidade: value.cliente_unidade,
                nome: value.cliente_nome,
                regiao: value.cliente_cidade,
                estado: value.cliente_estado,
                qtd: 0,
                fazenda: [{
                    nome: value.fazenda_nome,
                    tipo: value.fazenda_tipo,
                    cidade: value.fazenda_cidade,
                    estado: value.fazenda_estado,
                    id: value.fazenda_id
                }]
            })
        }
    });
    array.map((value, index) => {
        array[index].qtd = value.fazenda.length;
    })

    return array;
}