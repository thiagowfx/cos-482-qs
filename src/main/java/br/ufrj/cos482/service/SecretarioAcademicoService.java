package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.SecretarioAcademicoDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing SecretarioAcademico.
 */
public interface SecretarioAcademicoService {

    /**
     * Save a secretarioAcademico.
     *
     * @param secretarioAcademicoDTO the entity to save
     * @return the persisted entity
     */
    SecretarioAcademicoDTO save(SecretarioAcademicoDTO secretarioAcademicoDTO);

    /**
     *  Get all the secretarioAcademicos.
     *  
     *  @return the list of entities
     */
    List<SecretarioAcademicoDTO> findAll();

    /**
     *  Get the "id" secretarioAcademico.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SecretarioAcademicoDTO findOne(Long id);

    /**
     *  Delete the "id" secretarioAcademico.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
