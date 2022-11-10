import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {JefeOperaciones, Propietario} from '../models';
import {JefeOperacionesRepository, PropietarioRepository, VehiculoRepository} from '../repositories';
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(

    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,

    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,

    @repository(JefeOperacionesRepository)
    public jefeoperacionesRepository: JefeOperacionesRepository

  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {

    let clave = generator(8, false);
    return clave;
  }

  CifrarClave(clave: string) {

    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;

  }

  IdentificarPropietario(Usuario: string, Clave: string) {
    try {
      let p = this.propietarioRepository.findOne({where: {Correo: Usuario, Contrasenia: Clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }

  }

  IdentificarJefeOperaciones(Usuario: string, Clave: string) {
    try {
      let p = this.jefeoperacionesRepository.findOne({where: {Correo: Usuario, Contrasenia: Clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }

  }

  GenerarTokenPropietario(propietario: Propietario) {

    let token = jwt.sign({
      data: {
        id: propietario.Id,
        correo: propietario.Correo,
        nombre: propietario.Nombre + " " + propietario.Apellido,


      }

    },
      Llaves.clavejwt)
    return token
  }

  GenerarTokenJefeOperaciones(jefeOperaciones: JefeOperaciones) {

    let token = jwt.sign({
      data: {
        id: jefeOperaciones.Id,
        correo: jefeOperaciones.Correo,
        nombre: jefeOperaciones.Nombre + " " + jefeOperaciones.Apellido,


      }

    },
      Llaves.clavejwt)
    return token
  }

  validarTokenJWT(token: string) {

    try {

      let datos = jwt.verify(token, Llaves.clavejwt);
      return datos;

    } catch {
      return false;
    }

  }
}
