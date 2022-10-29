import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import fetch from 'node-fetch';
import {Llaves} from '../config/llaves';
import {Mecanico} from '../models';
import {MecanicoRepository} from '../repositories';
import {AutenticacionService} from '../services';

export class MecanicoController {
  constructor(
    @repository(MecanicoRepository)
    public mecanicoRepository: MecanicoRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/mecanicos')
  @response(200, {
    description: 'Mecanico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mecanico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {
            title: 'NewMecanico',
            exclude: ['Id'],
          }),
        },
      },
    })
    mecanico: Omit<Mecanico, 'Id'>,
  ): Promise<Mecanico> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveSifrada = this.servicioAutenticacion.CifrarClave(clave);
    mecanico.Contrasenia = claveSifrada
    let p = await this.mecanicoRepository.create(mecanico);

    let destino = mecanico.Correo;
    let asunto = 'Datos de registro en la plataforma mecanico';
    let contenido = `Hola ${mecanico.Nombre} ${mecanico.Apellido} su nombre de usuario es: ${mecanico.Correo} y su contraseña es: ${clave}`;

    fetch(`${Llaves.urlServicioNotificaciones}/email?destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {

        console.log(data)
      })

    return p;
  }

  @get('/mecanicos/count')
  @response(200, {
    description: 'Mecanico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mecanico) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.mecanicoRepository.count(where);
  }

  @get('/mecanicos')
  @response(200, {
    description: 'Array of Mecanico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mecanico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mecanico) filter?: Filter<Mecanico>,
  ): Promise<Mecanico[]> {
    return this.mecanicoRepository.find(filter);
  }

  @patch('/mecanicos')
  @response(200, {
    description: 'Mecanico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Mecanico,
    @param.where(Mecanico) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.mecanicoRepository.updateAll(mecanico, where);
  }

  @get('/mecanicos/{id}')
  @response(200, {
    description: 'Mecanico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mecanico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mecanico, {exclude: 'where'}) filter?: FilterExcludingWhere<Mecanico>
  ): Promise<Mecanico> {
    return this.mecanicoRepository.findById(id, filter);
  }

  @patch('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Mecanico,
  ): Promise<void> {
    await this.mecanicoRepository.updateById(id, mecanico);
  }

  @put('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mecanico: Mecanico,
  ): Promise<void> {
    await this.mecanicoRepository.replaceById(id, mecanico);
  }

  @del('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mecanicoRepository.deleteById(id);
  }
}
