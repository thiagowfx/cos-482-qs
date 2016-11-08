package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.LogDoSistemaDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing LogDoSistema.
 */
public interface LogDoSistemaService {

    /**
     * Save a logDoSistema.
     *
     * @param logDoSistemaDTO the entity to save
     * @return the persisted entity
     */
    LogDoSistemaDTO save(LogDoSistemaDTO logDoSistemaDTO);

    /**
     *  Get all the logDoSistemas.
     *  
     *  @return the list of entities
     */
    List<LogDoSistemaDTO> findAll();

    /**
     *  Get the "id" logDoSistema.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    LogDoSistemaDTO findOne(Long id);

    /**
     *  Delete the "id" logDoSistema.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
