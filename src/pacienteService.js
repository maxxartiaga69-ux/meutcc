import {inserirusuario} from '../repository/paciente.js'
const cadastrarPaciente = (nome, email)=>{
    const novousuario = {
        id: uuid(),
        nome: nome,
        email: email
    }
    return inserirPaciente(novousuario)
}